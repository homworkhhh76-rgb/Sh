(() => {
  'use strict';
  const QUEUE_KEY = 'cash_top_sync_queue_v3';
  const AUTH_KEY = 'cash_top_firebase_auth_v1';
  const DEVICE_KEY = 'cash_top_device_id_v1';
  const LAST_SYNC_KEY = 'cash_top_last_sync_v1';

  let getState = () => null;
  let applyState = () => {};
  let onStatus = () => {};
  let syncing = false;
  let initialized = false;
  let status = {
    state: navigator.onLine ? 'idle' : 'offline',
    pending: readQueue().length,
    lastSync: localStorage.getItem(LAST_SYNC_KEY) || '',
    message: ''
  };

  function config(){
    return window.CASH_TOP_FIREBASE_CONFIG || {};
  }
  function uid(){
    return 'sync_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
  }
  function deviceId(){
    let id = localStorage.getItem(DEVICE_KEY);
    if(!id){
      id = 'device_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(DEVICE_KEY,id);
    }
    return id;
  }
  function readQueue(){
    try{
      const q=JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
      return Array.isArray(q)?q:[];
    }catch{return [];}
  }
  function writeQueue(queue){
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-200)));
  }
  function emit(next={}){
    status={...status,...next,pending:readQueue().length};
    try{ onStatus({...status}); }catch{}
    return status;
  }
  function enqueue(label='تحديث بيانات', type='change'){
    const queue=readQueue();
    queue.push({id:uid(),label,type,createdAt:new Date().toISOString(),deviceId:deviceId()});
    writeQueue(queue);
    emit({state:navigator.onLine?'local':'offline',message:'تغييرات محلية معلقة'});
    if(navigator.onLine) scheduleAutoSync(900);
  }
  function clearQueue(){
    writeQueue([]);
  }
  function getStatus(){
    return {...status,pending:readQueue().length};
  }
  function ts(value){
    const n=Date.parse(value || '');
    return Number.isFinite(n)?n:0;
  }
  function clone(value){
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }
  function mergeById(localList=[], remoteList=[]){
    const map=new Map();
    [...remoteList,...localList].forEach(item=>{
      if(!item || !item.id) return;
      const existing=map.get(item.id);
      if(!existing){
        map.set(item.id,clone(item));
        return;
      }
      const a=ts(existing.updatedAt || existing.timestamp || existing.createdAt);
      const b=ts(item.updatedAt || item.timestamp || item.createdAt);
      if(b>=a) map.set(item.id,clone(item));
    });
    return Array.from(map.values());
  }
  function mergeStates(local, remote){
    if(!remote) return clone(local);
    if(!local) return clone(remote);
    const localReset=ts(local.meta?.forceResetAt);
    const remoteReset=ts(remote.meta?.forceResetAt);
    if(localReset>remoteReset) return clone(local);
    if(remoteReset>localReset) return clone(remote);
    const merged={};
    merged.createdAt = ts(local.createdAt) && ts(remote.createdAt)
      ? (ts(local.createdAt)<=ts(remote.createdAt)?local.createdAt:remote.createdAt)
      : (local.createdAt || remote.createdAt || new Date().toISOString());
    merged.users=mergeById(local.users,remote.users);
    merged.customers=mergeById(local.customers,remote.customers);
    merged.items=mergeById(local.items,remote.items);
    merged.transactions=mergeById(local.transactions,remote.transactions)
      .sort((a,b)=>ts(b.timestamp)-ts(a.timestamp));
    const localSourceTs=ts(local.meta?.sourcePhonesUpdatedAt);
    const remoteSourceTs=ts(remote.meta?.sourcePhonesUpdatedAt);
    if(localSourceTs===remoteSourceTs){
      merged.sourcePhones=Array.from(new Set([...(remote.sourcePhones||[]),...(local.sourcePhones||[])]));
    }else{
      merged.sourcePhones=clone(localSourceTs>remoteSourceTs?(local.sourcePhones||[]):(remote.sourcePhones||[]));
    }
    const localMetaTs=ts(local.meta?.updatedAt);
    const remoteMetaTs=ts(remote.meta?.updatedAt);
    merged.meta={
      ...(remote.meta||{}),
      ...(localMetaTs>=remoteMetaTs?(local.meta||{}):{}),
      updatedAt:new Date(Math.max(localMetaTs,remoteMetaTs,Date.now())).toISOString(),
      sourcePhonesUpdatedAt: localSourceTs>=remoteSourceTs
        ? (local.meta?.sourcePhonesUpdatedAt || merged.createdAt)
        : (remote.meta?.sourcePhonesUpdatedAt || merged.createdAt),
      schemaVersion:3,
      lastSyncedBy:deviceId()
    };
    return merged;
  }
  function authStorage(){
    try{return JSON.parse(localStorage.getItem(AUTH_KEY)||'null');}catch{return null;}
  }
  function saveAuth(data){
    localStorage.setItem(AUTH_KEY,JSON.stringify(data));
  }
  async function fetchWithTimeout(url,options={},timeout=18000){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),timeout);
    try{
      return await fetch(url,{...options,signal:controller.signal,cache:'no-store'});
    }finally{clearTimeout(timer);}
  }
  async function refreshToken(refreshToken){
    const cfg=config();
    const body=new URLSearchParams({grant_type:'refresh_token',refresh_token:refreshToken});
    const res=await fetchWithTimeout(`https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(cfg.apiKey)}`,{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body
    });
    if(!res.ok) throw new Error('تعذر تجديد جلسة Firebase.');
    const data=await res.json();
    const auth={
      idToken:data.id_token,
      refreshToken:data.refresh_token,
      expiresAt:Date.now()+(Number(data.expires_in||3600)-120)*1000,
      uid:data.user_id
    };
    saveAuth(auth);
    return auth.idToken;
  }
  async function anonymousToken(){
    const cfg=config();
    const res=await fetchWithTimeout(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${encodeURIComponent(cfg.apiKey)}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({returnSecureToken:true})
    });
    if(!res.ok){
      const err=await res.json().catch(()=>({}));
      const code=err?.error?.message || '';
      if(code.includes('OPERATION_NOT_ALLOWED')) return null;
      throw new Error('تعذر تسجيل اتصال Firebase.');
    }
    const data=await res.json();
    const auth={
      idToken:data.idToken,
      refreshToken:data.refreshToken,
      expiresAt:Date.now()+(Number(data.expiresIn||3600)-120)*1000,
      uid:data.localId
    };
    saveAuth(auth);
    return auth.idToken;
  }
  async function getIdToken(){
    const cfg=config();
    if(!cfg.apiKey) return null;
    const auth=authStorage();
    if(auth?.idToken && Number(auth.expiresAt)>Date.now()) return auth.idToken;
    if(auth?.refreshToken){
      try{return await refreshToken(auth.refreshToken);}catch{localStorage.removeItem(AUTH_KEY);}
    }
    try{return await anonymousToken();}catch{return null;}
  }
  function databaseEndpoint(token=''){
    const cfg=config();
    const base=String(cfg.databaseURL||'').replace(/\/+$/,'');
    const path=String(cfg.rootPath||'cashTopChargeApp/v3').replace(/^\/+|\/+$/g,'');
    const auth=token?`?auth=${encodeURIComponent(token)}`:'';
    return `${base}/${path}/state.json${auth}`;
  }
  async function readRemote(token){
    const res=await fetchWithTimeout(databaseEndpoint(token),{
      method:'GET',
      headers:{'X-Firebase-ETag':'true','Accept':'application/json'}
    });
    if(!res.ok){
      if(res.status===401 || res.status===403) throw new Error('رفض Firebase الوصول. فعّل Anonymous Auth وطبّق ملف القواعد.');
      throw new Error(`تعذر قراءة Firebase (${res.status}).`);
    }
    return {data:await res.json(),etag:res.headers.get('ETag') || '*'};
  }
  async function writeRemote(token,data,etag='*'){
    const res=await fetchWithTimeout(databaseEndpoint(token),{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'If-Match':etag
      },
      body:JSON.stringify(data)
    });
    if(res.status===412) return {conflict:true};
    if(!res.ok){
      if(res.status===401 || res.status===403) throw new Error('رفض Firebase حفظ البيانات. راجع المصادقة والقواعد.');
      throw new Error(`تعذر حفظ Firebase (${res.status}).`);
    }
    return {ok:true,data:await res.json().catch(()=>data)};
  }

  let autoTimer=null;
  function scheduleAutoSync(delay=1200){
    clearTimeout(autoTimer);
    autoTimer=setTimeout(()=>syncNow(false),delay);
  }
  async function syncNow(manual=false){
    if(syncing) return {ok:false,message:'المزامنة جارية الآن.'};
    if(!navigator.onLine){
      emit({state:'offline',message:'لا يوجد إنترنت'});
      return {ok:false,offline:true};
    }
    const cfg=config();
    if(!cfg.databaseURL || !cfg.apiKey){
      emit({state:'error',message:'بيانات Firebase غير مكتملة'});
      return {ok:false,message:'بيانات Firebase غير مكتملة في firebase-config.js.'};
    }
    syncing=true;
    emit({state:'syncing',message:'جاري رفع وسحب البيانات'});
    try{
      const token=await getIdToken();
      let merged=null;
      for(let attempt=0;attempt<4;attempt++){
        const remote=await readRemote(token);
        merged=mergeStates(getState(),remote.data);
        merged.meta ||= {};
        merged.meta.lastSyncedAt=new Date().toISOString();
        merged.meta.lastSyncedBy=deviceId();
        const write=await writeRemote(token,merged,remote.etag);
        if(write.conflict) continue;
        applyState(merged);
        clearQueue();
        const lastSync=new Date().toISOString();
        localStorage.setItem(LAST_SYNC_KEY,lastSync);
        emit({state:'synced',lastSync,message:'تمت المزامنة'});
        syncing=false;
        return {ok:true,state:merged};
      }
      throw new Error('حدث تعارض متكرر أثناء المزامنة. أعد المحاولة.');
    }catch(error){
      const message=error?.name==='AbortError'?'انتهت مهلة الاتصال. البيانات ما زالت محفوظة محلياً.':(error?.message||'تعذرت المزامنة.');
      emit({state:'error',message});
      syncing=false;
      return {ok:false,message};
    }
  }
  function init(options={}){
    if(initialized) return;
    initialized=true;
    getState=options.getState || getState;
    applyState=options.applyState || applyState;
    onStatus=options.onStatus || onStatus;
    emit({state:navigator.onLine?(readQueue().length?'local':'idle'):'offline'});
    window.addEventListener('online',()=>{emit({state:readQueue().length?'local':'idle'});scheduleAutoSync(500);});
    window.addEventListener('offline',()=>emit({state:'offline',message:'محفوظ محلياً'}));
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState==='visible' && navigator.onLine) scheduleAutoSync(600);
    });
    setInterval(()=>{if(navigator.onLine) syncNow(false);},60000);
    if(navigator.onLine) scheduleAutoSync(1200);
  }
  window.CashTopSync={init,enqueue,syncNow,getStatus,mergeStates};
})();
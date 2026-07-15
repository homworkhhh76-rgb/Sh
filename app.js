const STORAGE_KEY = 'charge_point_app_v1';
    const SESSION_KEY = 'charge_point_session_v1';
    const currency = 'شيكل';
    let state = loadState();
    let currentUser = null;
    let activeSection = 'dashboard';
    let operationFocus = 'charge';
    let reportPeriod = 'day';
    let invoiceDraft = [];
    let activeCustomerProfileId = '';

    function iconSvg(name){
      const icons = {
        home:'<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 11.2 12 4l8.5 7.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.75 10.2V20h4.5v-5.25h3.5V20h4.5v-9.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        bolt:'<svg viewBox="0 0 24 24" fill="none"><path d="M13 2.75 5 14h6l-1 7.25L19 9.5h-6l1-6.75Z" fill="currentColor"/></svg>',
        users:'<svg viewBox="0 0 24 24" fill="none"><path d="M16.5 19.25c0-2.35-2-4.25-4.5-4.25s-4.5 1.9-4.5 4.25" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="1.8"/><path d="M19.5 18.25c0-1.65-1.18-3.04-2.8-3.52M16.2 5.2a2.8 2.8 0 0 1 0 5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
        box:'<svg viewBox="0 0 24 24" fill="none"><path d="m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M4.5 7.7 12 12l7.5-4.3M12 21v-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
        chart:'<svg viewBox="0 0 24 24" fill="none"><path d="M5 20V4M5 20h15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8.5 16v-4M12.5 16V8M16.5 16v-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
        settings:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor" stroke-width="1.8"/><path d="M19.1 13.3c.08-.43.13-.86.13-1.3s-.05-.87-.13-1.3l2-1.55-2-3.45-2.45.98a8 8 0 0 0-2.25-1.3L14.05 2h-4.1L9.6 5.38a8 8 0 0 0-2.25 1.3L4.9 5.7l-2 3.45 2 1.55c-.08.43-.13.86-.13 1.3s.05.87.13 1.3l-2 1.55 2 3.45 2.45-.98a8 8 0 0 0 2.25 1.3l.35 3.38h4.1l.35-3.38a8 8 0 0 0 2.25-1.3l2.45.98 2-3.45-2-1.55Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
        phone:'<svg viewBox="0 0 24 24" fill="none"><path d="M8 2.75h8A2.25 2.25 0 0 1 18.25 5v14A2.25 2.25 0 0 1 16 21.25H8A2.25 2.25 0 0 1 5.75 19V5A2.25 2.25 0 0 1 8 2.75Z" stroke="currentColor" stroke-width="1.8"/><path d="M10 18h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 7.25 9.9 12h3.1L12 16.75 15.9 10h-3.1L12 7.25Z" fill="currentColor"/></svg>',
        money:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6.5 9.5h1M16.5 14.5h1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
        juice:'<svg viewBox="0 0 24 24" fill="none"><path d="M7 7h10l-.9 12.1A2 2 0 0 1 14.1 21H9.9a2 2 0 0 1-2-1.9L7 7Z" stroke="currentColor" stroke-width="1.8"/><path d="M9 7V4.8c0-1.1.9-2 2-2h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 11h8M10 15h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
        alert:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 8v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 16.8h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M10.4 3.8 2.9 18a2 2 0 0 0 1.8 3h14.6a2 2 0 0 0 1.8-3L13.6 3.8a1.8 1.8 0 0 0-3.2 0Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
        wallet:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 8.5h16M7 13h4M7 17h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" stroke-width="1.8"/></svg>'
      };
      return icons[name] || icons.bolt;
    }

    const navItems = [
      {id:'dashboard', title:'الرئيسية', icon:'home'},
      {id:'operations', title:'عمليات', icon:'bolt'},
      {id:'customers', title:'زبائن', icon:'users'},
      {id:'inventory', title:'مخزون', icon:'box'},
      {id:'expenses', title:'مصاريف', icon:'money'},
      {id:'reports', title:'تقارير', icon:'chart'},
      {id:'settings', title:'إعدادات', icon:'settings'}
    ];

    function uid(prefix='id'){
      return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,7);
    }
    function nowISO(){ return new Date().toISOString(); }
    function num(v){ const n = Number(v); return Number.isFinite(n) ? n : 0; }
    function money(v){ return `${num(v).toFixed(2)} ${currency}`; }
    function qty(v){ return Number(num(v).toFixed(0)).toString(); }
    function esc(value){
      return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
    }
    function formatDateTime(iso){
      try { return new Intl.DateTimeFormat('ar', {dateStyle:'medium', timeStyle:'short'}).format(new Date(iso)); }
      catch { return iso; }
    }
    function formatDate(iso){
      try { return new Intl.DateTimeFormat('ar', {dateStyle:'medium'}).format(new Date(iso)); }
      catch { return iso; }
    }
    function startOfDay(d){ const x=new Date(d); x.setHours(0,0,0,0); return x; }
    function startOfMonth(d){ const x=new Date(d); x.setDate(1); x.setHours(0,0,0,0); return x; }
    function withinPeriod(iso, period){
      const d = new Date(iso), now = new Date();
      if(period === 'all') return true;
      if(period === 'day') return d >= startOfDay(now);
      if(period === 'week') { const s = new Date(now); s.setDate(now.getDate()-6); s.setHours(0,0,0,0); return d >= s; }
      if(period === 'month') return d >= startOfMonth(now);
      return true;
    }
    function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  let loaded = null;
  if(raw){
    try { loaded = JSON.parse(raw); } catch(e){}
  }
  if(!loaded){
    const createdAt = nowISO();
    loaded = {
      users:[
        {id:'manager', name:'المدير', role:'manager', pin:'0000', active:true, updatedAt:createdAt},
        {id:'user1', name:'مستخدم 1', role:'user', pin:'1111', active:true, updatedAt:createdAt},
        {id:'user2', name:'مستخدم 2', role:'user', pin:'2222', active:true, updatedAt:createdAt}
      ],
      sourcePhones:['جهاز الشحن 1','جهاز الشحن 2'],
      customers:[],
      items:[
        {id:uid('item'), name:'', stock:0, price:1, active:true, updatedAt:createdAt},
        {id:uid('item'), name:'', stock:0, price:0, active:true, updatedAt:createdAt}
      ],
      transactions:[],
      expenses:[],
      createdAt,
      meta:{updatedAt:createdAt, sourcePhonesUpdatedAt:createdAt, schemaVersion:4}
    };
  }
  return migrateState(loaded);
}
    function saveState(label='تحديث بيانات', type='change'){
  const stamp = nowISO();
  state.meta ||= {};
  state.meta.updatedAt = stamp;
  state.meta.schemaVersion = 4;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if(window.CashTopSync) window.CashTopSync.enqueue(label, type);
  updateSyncUI();
}
    function findUser(id){
  return state.users.find(u => u.id === id && u.active !== false && u.deleted !== true);
}
    function getCustomer(id){
  return state.customers.find(c => c.id === id && c.deleted !== true);
}
    function getItem(id){
  return state.items.find(i => i.id === id && i.deleted !== true);
}
    function displayItemName(item){ return item?.name?.trim() || 'صنف بدون اسم'; }

function migrateState(data){
  const now = nowISO();
  data ||= {};
  data.users = Array.isArray(data.users) ? data.users : [];
  data.customers = Array.isArray(data.customers) ? data.customers : [];
  data.items = Array.isArray(data.items) ? data.items : [];
  data.transactions = Array.isArray(data.transactions) ? data.transactions : [];
  data.expenses = Array.isArray(data.expenses) ? data.expenses : [];
  data.sourcePhones = Array.isArray(data.sourcePhones) ? data.sourcePhones : [];
  data.createdAt ||= now;
  data.meta ||= {};
  data.meta.updatedAt ||= data.createdAt;
  data.meta.sourcePhonesUpdatedAt ||= data.meta.updatedAt;
  data.meta.schemaVersion = 4;
  data.users.forEach(u => { u.updatedAt ||= data.meta.updatedAt; });
  data.customers.forEach(c => {
    c.balance = num(c.balance);
    c.createdAt ||= data.createdAt;
    c.updatedAt ||= c.createdAt;
  });
  data.items.forEach(i => {
    i.price = num(i.price);
    i.stock = num(i.stock);
    i.updatedAt ||= data.meta.updatedAt;
  });
  data.transactions.forEach(t => {
    t.timestamp ||= data.createdAt;
    t.updatedAt ||= t.timestamp;
    if(t.paymentMethod === undefined) t.paymentMethod = '';
    if(t.type === 'invoice' && !Array.isArray(t.lines)) t.lines = [];
  });
  data.expenses.forEach(e => {
    e.timestamp ||= data.createdAt;
    e.updatedAt ||= e.timestamp;
    e.amount = Math.max(0, num(e.amount));
    e.paymentMethod ||= 'cash';
  });
  return data;
}
function persistStateOnly(nextState=state){
  state = migrateState(nextState);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function touchEntity(entity){
  if(entity) entity.updatedAt = nowISO();
}
function balanceMeta(value){
  const n = num(value);
  if(n > 0) return {kind:'debt', cls:'danger-text', label:'مديونية', amount:n};
  if(n < 0) return {kind:'credit', cls:'ok-text', label:'موجب', amount:Math.abs(n)};
  return {kind:'zero', cls:'muted', label:'متوازن', amount:0};
}
function balanceText(value){
  const b = balanceMeta(value);
  return `${b.label}: ${money(b.amount)}`;
}
function balanceHtml(value){
  const b = balanceMeta(value);
  return `<span class="${b.cls}">${esc(b.label)}: ${money(b.amount)}</span>`;
}
function paymentMethodLabel(value){
  return {cash:'نقدي', bank:'تحويل بنكي', wallet:'محفظة', jawwal_pay:'Jawwal Pay', debt:'دين'}[value] || 'غير محدد';
}
function paidValue(id){
  const el = document.getElementById(id);
  return el && el.value !== '' ? Math.max(0, num(el.value)) : 0;
}
function requirePaymentMethod(paid, selectId){
  const method = document.getElementById(selectId)?.value || '';
  if(paid > 0 && !method){
    toast('اختر طريقة الدفع: نقدي أو تحويل بنكي أو Jawwal Pay.');
    return null;
  }
  if(method === 'debt' && paid > 0){
    toast('عند اختيار دين يجب أن يكون المدفوع صفرًا.');
    return null;
  }
  return method;
}
function setPaidZero(type){
  const id = type === 'charge' ? 'chargePaid' : 'salePaid';
  const input = document.getElementById(id);
  if(input) input.value = '0';
}
function setPaidFull(type){
  if(type === 'charge'){
    const input = document.getElementById('chargePaid');
    if(input) input.value = Math.max(0, num(document.getElementById('chargeAmount')?.value)).toFixed(2);
  } else {
    const total = Math.max(0, num(document.getElementById('saleQty')?.value)) * Math.max(0, num(document.getElementById('saleUnitPrice')?.value));
    const input = document.getElementById('salePaid');
    if(input) input.value = total.toFixed(2);
  }
}
function refreshPayShortcuts(){ /* القيم تُحسب عند الضغط على دفع كامل */ }
async function hashPin(pin){
  const text = String(pin || '');
  if(globalThis.crypto?.subtle){
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  return `legacy:${btoa(unescape(encodeURIComponent(text)))}`;
}
async function verifyPin(user, pin){
  if(!user) return false;
  if(user.pinHash) return user.pinHash === await hashPin(pin);
  return String(user.pin || '') === String(pin || '');
}
function applyRemoteState(remoteState){
  const sessionId = localStorage.getItem(SESSION_KEY);
  persistStateOnly(remoteState);
  if(sessionId) currentUser = findUser(sessionId) || currentUser;
  renderLoginUsers();
  if(currentUser && document.getElementById('appShell') && !document.getElementById('appShell').classList.contains('hidden')){
    renderNav();
    renderAll();
  }
}
function initializeSync(){
  if(!window.CashTopSync) return;
  window.CashTopSync.init({
    getState:()=>state,
    applyState:applyRemoteState,
    onStatus:updateSyncUI
  });
}
function updateSyncUI(status){
  const info = status || window.CashTopSync?.getStatus?.() || {state:navigator.onLine?'idle':'offline', pending:0};
  const labels = {
    offline:['أوفلاين','محفوظ محلياً'],
    syncing:['جاري المزامنة','يرجى الانتظار'],
    synced:['متزامن','كل البيانات مرفوعة'],
    error:['تعذر الاتصال','التغييرات محفوظة'],
    idle:['جاهز','لا تغييرات معلقة'],
    local:['محلي','بانتظار الاتصال']
  };
  const pair = labels[info.state] || labels.idle;
  const btn = document.getElementById('syncBtn');
  if(btn){
    btn.dataset.state = info.state;
    document.getElementById('syncStatusText').textContent = pair[0];
    document.getElementById('syncStatusSub').textContent = info.pending ? `${info.pending} معلّق` : pair[1];
    const count = document.getElementById('syncPendingCount');
    count.textContent = info.pending || 0;
    count.classList.toggle('hidden', !info.pending);
  }
  const s1=document.getElementById('settingsSyncStatus');
  const s2=document.getElementById('settingsPendingCount');
  const s3=document.getElementById('settingsLastSync');
  if(s1) s1.textContent=pair[0];
  if(s2) s2.textContent=String(info.pending || 0);
  if(s3) s3.textContent=info.lastSync ? formatDateTime(info.lastSync) : 'لم تتم بعد';
}
async function syncNow(){
  if(!window.CashTopSync) return toast('ملف المزامنة غير متاح.');
  const result = await window.CashTopSync.syncNow(true);
  if(result?.ok) toast('تمت مزامنة جميع البيانات مع Firebase.');
  else if(result?.offline) toast('لا يوجد إنترنت. التغييرات ستبقى معلقة حتى عودة الاتصال.');
  else if(result?.message) toast(result.message);
}

    function init(){
  renderLoginUsers();
  initializeSync();
  const sessionId = localStorage.getItem(SESSION_KEY);
  if(sessionId && findUser(sessionId)){
    currentUser = findUser(sessionId);
    showApp();
  } else {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('appShell').classList.add('hidden');
  }
  updateSyncUI();
}
    function renderLoginUsers(){
  const el=document.getElementById('loginUser');
  if(!el) return;
  const selected=el.value;
  const users=state.users.filter(u=>u.active!==false && u.deleted!==true);
  el.innerHTML = users.map(u=>`<option value="${esc(u.id)}">${esc(u.name)} - ${u.role === 'manager' ? 'مدير' : 'مستخدم'}</option>`).join('');
  if(users.some(u=>u.id===selected)) el.value=selected;
  enhanceSelects();
}
    async function login(){
  const id = document.getElementById('loginUser').value;
  const pin = document.getElementById('loginPin').value.trim();
  const user = findUser(id);
  const err = document.getElementById('loginError');
  if(!user || !(await verifyPin(user, pin))){
    err.textContent = 'بيانات الدخول غير صحيحة.';
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  currentUser = user;
  localStorage.setItem(SESSION_KEY, user.id);
  showApp();
}
    function logout(){
      localStorage.removeItem(SESSION_KEY);
      currentUser = null;
      document.getElementById('loginPin').value='';
      document.getElementById('loginScreen').classList.remove('hidden');
      document.getElementById('appShell').classList.add('hidden');
      renderLoginUsers();
    }
    function showApp(){
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('appShell').classList.remove('hidden');
      renderNav();
      renderAll();
    }
    function isManager(){ return currentUser?.role === 'manager'; }
    function renderNav(){
      const items = navItems.filter(i => !i.managerOnly || isManager());
      const html = items.map(i => `<button class="nav-btn ${activeSection===i.id?'active':''}" onclick="goSection('${i.id}')"><span class="ico">${iconSvg(i.icon)}</span><span>${i.title}</span></button>`).join('');
      document.getElementById('sideNav').innerHTML = html;
      document.getElementById('bottomNav').innerHTML = items.map(i => `<button class="nav-btn ${activeSection===i.id?'active':''}" onclick="goSection('${i.id}')"><span class="ico">${iconSvg(i.icon)}</span><span>${i.title}</span></button>`).join('');
    }
    function goSection(id){
      activeSection = id;
      document.querySelectorAll('.section').forEach(s => s.classList.toggle('active', s.id === id));
      const nav = navItems.find(i=>i.id===id);
      document.getElementById('pageTitle').textContent = nav?.title || 'الرئيسية';
      renderNav();
      renderAll();
      window.scrollTo({top:0, behavior:'smooth'});
    }

    function renderAll(){
      document.getElementById('todayLine').textContent = formatDateTime(nowISO());
      document.getElementById('currentUserText').textContent = `${currentUser.name} (${currentUser.role === 'manager' ? 'مدير' : 'مستخدم'})`;
      document.getElementById('userAvatar').textContent = currentUser.name.trim().charAt(0) || 'م';
      renderCustomerSelects();
      renderSourcePhoneSelects();
      renderItemSelects();
      renderDashboard();
      renderCustomers();
      renderInventory();
      renderExpenses();
      renderReports();
      renderSettings();
      enhanceSelects();
    }

    const customerComboConfigs = [
      {text:'chargeCustomerText', hidden:'chargeCustomer', menu:'chargeCustomerMenu'},
      {text:'saleCustomerText', hidden:'saleCustomer', menu:'saleCustomerMenu'},
      {text:'paymentCustomerText', hidden:'paymentCustomer', menu:'paymentCustomerMenu'},
      {text:'invoiceCustomerText', hidden:'invoiceCustomer', menu:'invoiceCustomerMenu'}
    ];
    function customerLabel(c){ return `${c.name}${c.phone ? ' - ' + c.phone : ''}`; }
    function normText(v){ return String(v || '').trim().toLowerCase(); }
    function setComboValue(cfg, customer){
  const input = document.getElementById(cfg.text);
  const hidden = document.getElementById(cfg.hidden);
  if(!input || !hidden) return;
  input.classList.remove('has-debt','has-credit');
  if(customer){
    input.value = customerLabel(customer);
    hidden.value = customer.id;
    input.classList.toggle('has-debt', num(customer.balance) > 0);
    input.classList.toggle('has-credit', num(customer.balance) < 0);
  } else {
    input.value = '';
    hidden.value = '';
  }
}
    function findComboConfig(textId){ return customerComboConfigs.find(c => c.text === textId || c.hidden === textId || c.menu === textId); }
    function selectCustomerCombo(textId, customerId){
      const cfg = findComboConfig(textId); if(!cfg) return;
      const customer = getCustomer(customerId);
      setComboValue(cfg, customer);
      closeCustomerMenus();
    }
    function closeCustomerMenus(){
      customerComboConfigs.forEach(cfg => document.getElementById(cfg.menu)?.classList.remove('open'));
    }
    function showCustomerSuggestions(cfg, query=''){
  const menu = document.getElementById(cfg.menu);
  const input = document.getElementById(cfg.text);
  const hidden = document.getElementById(cfg.hidden);
  if(!menu || !input || !hidden) return;
  const activeCustomers = state.customers.filter(c=>c.deleted!==true);
  const q = normText(query);
  let list = activeCustomers.slice();
  input.classList.remove('has-debt','has-credit');
  if(q){
    list = list.filter(c => normText(`${c.name} ${c.phone || ''}`).includes(q));
    const exact = activeCustomers.find(c => normText(c.name) === q || normText(customerLabel(c)) === q || normText(c.phone) === q);
    hidden.value = exact ? exact.id : '';
    if(exact){
      input.classList.toggle('has-debt', num(exact.balance) > 0);
      input.classList.toggle('has-credit', num(exact.balance) < 0);
    }
  }
  list.sort((a,b)=> num(b.balance)-num(a.balance) || a.name.localeCompare(b.name,'ar'));
  list = list.slice(0,8);
  const typedName = input.value.trim();
  if(!activeCustomers.length){
    menu.innerHTML = typedName ? `<div class="combo-empty">سيتم إنشاء "${esc(typedName)}" كعميل جديد عند حفظ العملية.</div>` : '<div class="combo-empty">اكتب اسم الزبون؛ سيتم إضافته تلقائياً عند حفظ العملية.</div>';
  } else if(!list.length){
    menu.innerHTML = typedName ? `<div class="combo-empty">لا يوجد زبون بهذا الاسم. سيتم إنشاء "${esc(typedName)}" كعميل جديد عند حفظ العملية.</div>` : '<div class="combo-empty">لا يوجد زبون مطابق.</div>';
  } else {
    menu.innerHTML = list.map(c => {
      const b=balanceMeta(c.balance);
      return `<button type="button" class="combo-option ${b.kind}" onmousedown="selectCustomerCombo('${cfg.text}','${c.id}')"><span>${esc(customerLabel(c))}</span><small>${esc(b.label)}: ${money(b.amount)}</small></button>`;
    }).join('');
  }
  menu.classList.add('open');
}
    function bindCustomerCombo(cfg){
  const input = document.getElementById(cfg.text);
  const hidden = document.getElementById(cfg.hidden);
  if(!input || !hidden) return;
  input.oninput = () => showCustomerSuggestions(cfg, input.value);
  input.onfocus = () => showCustomerSuggestions(cfg, input.value);
  input.onblur = () => setTimeout(closeCustomerMenus, 160);
  const selected = getCustomer(hidden.value);
  input.classList.remove('has-debt','has-credit');
  if(selected){
    input.value = customerLabel(selected);
    input.classList.toggle('has-debt', num(selected.balance)>0);
    input.classList.toggle('has-credit', num(selected.balance)<0);
  } else {
    hidden.value = '';
    if(!input.value) input.placeholder = 'اكتب اسم الزبون أو اختر من الاقتراحات';
  }
}
    function renderCustomerSelects(){
      customerComboConfigs.forEach(bindCustomerCombo);
    }
    function renderSourcePhoneSelects(){
  const html = state.sourcePhones.map(p => `<option value="${esc(p)}">${esc(p)}</option>`).join('');
  ['chargeSourcePhone','invoiceChargeSource'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.innerHTML = html || '<option value="">أضف جهاز مصدر من الإعدادات</option>';
  });
  enhanceSelects();
}
    function renderItemSelects(){
  const html = state.items.filter(i=>i.active!==false && i.deleted!==true).map(i => `<option value="${esc(i.id)}">${esc(displayItemName(i))} — المخزون: ${qty(i.stock)} — السعر: ${money(i.price)}</option>`).join('');
  ['saleItem','stockItem','invoiceSaleItem'].forEach(id => { const el=document.getElementById(id); if(el) el.innerHTML = html || '<option value="">أضف صنف أولاً</option>'; });
  fillItemPrice();
  fillInvoiceItemPrice();
  enhanceSelects();
}
    function showOperationForm(type){ openOperationModal(type); }
    function openOperationModal(type){
  operationFocus = type;
  const modal = document.getElementById('operationModal');
  const charge = document.getElementById('chargeCard');
  const juice = document.getElementById('juiceCard');
  const title = document.getElementById('operationModalTitle');
  const sub = document.getElementById('operationModalSub');
  const icon = document.getElementById('operationModalIcon');
  if(!modal || !charge || !juice) return;
  charge.classList.toggle('hidden', type !== 'charge');
  juice.classList.toggle('hidden', type !== 'juice');
  if(type === 'charge'){
    title.textContent = 'شحن جديد';
    sub.textContent = 'اترك المدفوع فارغاً إذا لم يدفع الزبون، أو اختر دفع كامل. الرصيد يحسب مديونية أو موجب تلقائياً.';
    icon.innerHTML = iconSvg('phone');
  } else {
    title.textContent = 'بيع صنف';
    sub.textContent = 'اختر الصنف والكمية. المدفوع الفارغ يعني لم يدفع، والمخزون ينقص تلقائياً.';
    icon.innerHTML = iconSvg('juice');
  }
  closeCustomerMenus();
  modal.classList.remove('hidden');
}
    function closeOperationModal(event){
      if(event && event.target && event.currentTarget && event.target !== event.currentTarget) return;
      const modal = document.getElementById('operationModal');
      if(modal) modal.classList.add('hidden');
      closeCustomerMenus();
    }
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') closeOperationModal();
    });

    function addCustomer(){
  const name = document.getElementById('customerName').value.trim();
  if(!name) return toast('اكتب اسم الزبون.');
  const phone = document.getElementById('customerPhone').value.trim();
  const balance = Math.max(0, num(document.getElementById('customerOpeningDebt').value));
  const note = document.getElementById('customerNote').value.trim();
  const stamp=nowISO();
  const customer = {id:uid('cust'), name, phone, balance, note, createdAt:stamp, updatedAt:stamp};
  state.customers.push(customer);
  if(balance > 0){
    state.transactions.unshift({id:uid('tx'), type:'opening_debt', customerId:customer.id, customerName:name, total:balance, paid:0, paymentMethod:'', debtBefore:0, debtAfter:balance, debtChange:balance, userId:currentUser.id, userName:currentUser.name, timestamp:stamp, updatedAt:stamp, note:'دين افتتاحي'});
  }
  saveState(`إضافة الزبون ${name}`,'customer');
  ['customerName','customerPhone','customerOpeningDebt','customerNote'].forEach(id => document.getElementById(id).value = id==='customerOpeningDebt'?'0':'');
  renderAll();
  toast('تمت إضافة الزبون.');
}
    function editCustomer(id){
  const c = getCustomer(id); if(!c) return;
  const name = prompt('اسم الزبون:', c.name); if(name === null || !name.trim()) return;
  const phone = prompt('رقم الهاتف:', c.phone || ''); if(phone === null) return;
  const note = prompt('ملاحظة:', c.note || ''); if(note === null) return;
  c.name = name.trim(); c.phone = phone.trim(); c.note = note.trim(); touchEntity(c);
  state.transactions.filter(t=>t.customerId===c.id).forEach(t=>{t.customerName=c.name;});
  saveState(`تعديل الزبون ${c.name}`,'customer'); renderAll(); toast('تم تعديل الزبون.');
}
    function deleteCustomer(id){
  if(!isManager()) return toast('الحذف متاح للمدير فقط.');
  const c = getCustomer(id); if(!c) return;
  if(!confirm(`حذف الزبون ${c.name}؟ لن يتم حذف العمليات القديمة.`)) return;
  c.deleted = true;
  c.active = false;
  touchEntity(c);
  saveState(`حذف الزبون ${c.name}`,'delete'); renderAll(); toast('تم حذف الزبون من القائمة.');
}

    function updateCustomerDebt(customer, total, paid){
  const before = num(customer.balance);
  const after = before + num(total) - num(paid);
  customer.balance = Number(after.toFixed(2));
  touchEntity(customer);
  return {before, after:customer.balance, change:customer.balance - before};
}

    function cleanTypedCustomerName(value){
      return String(value || '').replace(/\s+-\s+.*$/,'').trim();
    }
    function findCustomerByTypedName(name){
  const q = normText(name);
  if(!q) return null;
  return state.customers.find(c => c.deleted!==true && (normText(c.name) === q || normText(customerLabel(c)) === q || (c.phone && normText(c.phone) === q))) || null;
}
    function getOrCreateCustomerFromCombo(hiddenId, textId, contextLabel){
  const hidden = document.getElementById(hiddenId);
  const input = document.getElementById(textId);
  const selected = getCustomer(hidden?.value);
  if(selected) return {customer:selected, created:false};
  const typed = cleanTypedCustomerName(input?.value);
  if(!typed){ toast('اكتب اسم الزبون.'); return null; }
  const existing = findCustomerByTypedName(typed);
  if(existing){
    if(hidden) hidden.value = existing.id;
    if(input){
      input.value = customerLabel(existing);
      input.classList.remove('has-debt','has-credit');
      input.classList.toggle('has-debt', num(existing.balance)>0);
      input.classList.toggle('has-credit', num(existing.balance)<0);
    }
    return {customer:existing, created:false};
  }
  const stamp=nowISO();
  const customer = {id:uid('cust'), name:typed, phone:'', balance:0, note:`أُضيف تلقائياً من ${contextLabel || 'عملية'}`, createdAt:stamp, updatedAt:stamp};
  state.customers.push(customer);
  if(hidden) hidden.value = customer.id;
  if(input){ input.value = customerLabel(customer); input.classList.remove('has-debt','has-credit'); }
  return {customer, created:true};
}
    function fillInvoiceItemPrice(){
  const item = getItem(document.getElementById('invoiceSaleItem')?.value);
  const input = document.getElementById('invoiceSalePrice');
  if(item && input && !input.dataset.manual) input.value = num(item.price).toFixed(2);
}
function invoiceDraftTotal(){ return invoiceDraft.reduce((sum,line)=>sum+num(line.total),0); }
function draftSoldQty(itemId){ return invoiceDraft.filter(l=>l.type==='sale' && l.itemId===itemId).reduce((s,l)=>s+num(l.quantity),0); }
function renderInvoiceDraft(){
  const box=document.getElementById('invoiceDraftList');
  const total=invoiceDraftTotal();
  if(box){
    box.innerHTML=invoiceDraft.length ? `<table><thead><tr><th>النوع</th><th>التفاصيل</th><th>القيمة</th><th></th></tr></thead><tbody>${invoiceDraft.map((line,idx)=>`<tr><td><span class="pill ${line.type==='charge'?'ok':'warn'}">${line.type==='charge'?'شحن':'عصير / صنف'}</span></td><td>${line.type==='charge'?`من ${esc(line.sourcePhone)}${line.targetPhone?' — '+esc(line.targetPhone):''}`:`${esc(line.itemName)} × ${qty(line.quantity)} بسعر ${money(line.unitPrice)}`}</td><td>${money(line.total)}</td><td><button type="button" class="btn danger small" onclick="removeInvoiceLine(${idx})">إزالة</button></td></tr>`).join('')}</tbody></table>` : '<div class="empty">أضف شحنًا أو صنفًا واحدًا على الأقل.</div>';
  }
  const totalEl=document.getElementById('invoiceTotal');
  if(totalEl) totalEl.textContent=money(total);
  const paid=document.getElementById('invoicePaid');
  const method=document.getElementById('invoicePaymentMethod')?.value;
  if(paid && method==='debt') paid.value='0';
  else if(paid && (!paid.value || paid.dataset.auto==='1')){ paid.value=total.toFixed(2); paid.dataset.auto='1'; }
}
function addInvoiceChargeLine(){
  const sourcePhone=document.getElementById('invoiceChargeSource')?.value || '';
  const targetPhone=document.getElementById('invoiceChargeTarget')?.value.trim() || '';
  const amount=Math.max(0,num(document.getElementById('invoiceChargeAmount')?.value));
  if(!sourcePhone) return toast('اختر جهاز مصدر الشحن.');
  if(amount<=0) return toast('اكتب قيمة الشحن.');
  invoiceDraft.push({id:uid('line'),type:'charge',sourcePhone,targetPhone,total:amount});
  document.getElementById('invoiceChargeAmount').value='';
  document.getElementById('invoiceChargeTarget').value='';
  renderInvoiceDraft();
}
function addInvoiceSaleLine(){
  const item=getItem(document.getElementById('invoiceSaleItem')?.value);
  if(!item) return toast('اختر الصنف.');
  const quantity=Math.floor(num(document.getElementById('invoiceSaleQty')?.value));
  const unitPrice=Math.max(0,num(document.getElementById('invoiceSalePrice')?.value));
  if(quantity<=0) return toast('اكتب كمية صحيحة.');
  if(draftSoldQty(item.id)+quantity>num(item.stock)) return toast(`المخزون غير كافٍ. المتوفر: ${qty(item.stock)}`);
  invoiceDraft.push({id:uid('line'),type:'sale',itemId:item.id,itemName:displayItemName(item),quantity,unitPrice,total:Number((quantity*unitPrice).toFixed(2))});
  document.getElementById('invoiceSaleQty').value='1';
  delete document.getElementById('invoiceSalePrice').dataset.manual;
  fillInvoiceItemPrice();
  renderInvoiceDraft();
}
function removeInvoiceLine(index){ invoiceDraft.splice(index,1); renderInvoiceDraft(); }
function invoicePaymentChanged(){
  const method=document.getElementById('invoicePaymentMethod')?.value || '';
  const paid=document.getElementById('invoicePaid');
  if(!paid) return;
  if(method==='debt'){ paid.value='0'; paid.dataset.auto='1'; paid.disabled=true; }
  else { paid.disabled=false; paid.value=invoiceDraftTotal().toFixed(2); paid.dataset.auto='1'; }
}
function resetInvoiceForm(){
  invoiceDraft=[];
  ['invoiceCustomerText','invoiceCustomer','invoiceChargeTarget','invoiceChargeAmount','invoiceNote'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const qtyEl=document.getElementById('invoiceSaleQty'); if(qtyEl) qtyEl.value='1';
  const method=document.getElementById('invoicePaymentMethod'); if(method){method.value='';refreshModernSelect(method);}
  const paid=document.getElementById('invoicePaid'); if(paid){paid.value='';paid.disabled=false;delete paid.dataset.auto;}
  renderInvoiceDraft();
}
function saveUnifiedInvoice(){
  if(!invoiceDraft.length) return toast('أضف شحنًا أو صنفًا واحدًا على الأقل.');
  const total=invoiceDraftTotal();
  const method=document.getElementById('invoicePaymentMethod')?.value || '';
  if(!method) return toast('اختر طريقة الدفع.');
  const customerResult=getOrCreateCustomerFromCombo('invoiceCustomer','invoiceCustomerText','فاتورة موحدة');
  if(!customerResult) return;
  const customer=customerResult.customer;
  let paid=method==='debt'?0:Math.max(0,num(document.getElementById('invoicePaid')?.value));
  if(method!=='debt' && document.getElementById('invoicePaid')?.value==='') paid=total;
  for(const line of invoiceDraft){
    if(line.type==='sale'){
      const item=getItem(line.itemId);
      if(!item || num(item.stock)<num(line.quantity)) return toast(`المخزون غير كافٍ للصنف ${line.itemName}.`);
    }
  }
  invoiceDraft.filter(l=>l.type==='sale').forEach(line=>{const item=getItem(line.itemId);item.stock=Math.max(0,num(item.stock)-num(line.quantity));touchEntity(item);});
  const debt=updateCustomerDebt(customer,total,paid);
  const stamp=nowISO();
  state.transactions.unshift({id:uid('tx'),type:'invoice',invoiceNumber:`INV-${Date.now().toString().slice(-8)}`,customerId:customer.id,customerName:customer.name,lines:JSON.parse(JSON.stringify(invoiceDraft)),total,paid,paymentMethod:method,debtBefore:debt.before,debtAfter:debt.after,debtChange:debt.change,userId:currentUser.id,userName:currentUser.name,timestamp:stamp,updatedAt:stamp,note:document.getElementById('invoiceNote')?.value.trim()||''});
  saveState(`فاتورة موحدة للزبون ${customer.name}`,'operation');
  resetInvoiceForm(); renderAll();
  toast(`تم حفظ الفاتورة في عملية واحدة. ${balanceText(debt.after)}${customerResult.created?' — تمت إضافة الزبون تلقائياً.':''}`);
}
function transactionDebtChange(t){
  if(!t || t.deleted===true) return 0;
  if(t.type==='payment') return -num(t.paid);
  if(t.type==='opening_debt') return num(t.total);
  if(['charge','sale','invoice'].includes(t.type)) return num(t.total)-num(t.paid);
  return 0;
}
function recalculateCustomerLedger(customerId){
  const customer=getCustomer(customerId); if(!customer) return;
  let balance=0;
  state.transactions.filter(t=>t.deleted!==true && t.customerId===customerId).sort((a,b)=>new Date(a.timestamp)-new Date(b.timestamp)).forEach(t=>{
    const before=balance; const change=transactionDebtChange(t); balance=Number((balance+change).toFixed(2));
    t.debtBefore=before; t.debtChange=change; t.debtAfter=balance;
  });
  customer.balance=balance; touchEntity(customer);
}
function soldByTransaction(t){
  const out={};
  if(t?.type==='sale' && t.itemId) out[t.itemId]=num(t.quantity);
  if(t?.type==='invoice') (t.lines||[]).filter(l=>l.type==='sale'&&l.itemId).forEach(l=>out[l.itemId]=(out[l.itemId]||0)+num(l.quantity));
  return out;
}
function managerDeleteTransaction(id){
  if(!isManager()) return toast('حذف العمليات متاح للمدير فقط.');
  const t=state.transactions.find(x=>x.id===id && x.deleted!==true); if(!t) return;
  if(!confirm(`حذف العملية ${txLabel(t.type)}؟ سيتم عكس أثرها على الرصيد والمخزون.`)) return;
  if(t.type==='stock'){
    const item=getItem(t.itemId); if(item && num(item.stock)<num(t.quantity)) return toast('لا يمكن حذف إضافة المخزون لأن جزءًا من الكمية تم بيعه.');
    if(item){item.stock=num(item.stock)-num(t.quantity);touchEntity(item);}
  }
  const sold=soldByTransaction(t); Object.entries(sold).forEach(([itemId,q])=>{const item=getItem(itemId);if(item){item.stock=num(item.stock)+num(q);touchEntity(item);}});
  t.deleted=true; t.updatedAt=nowISO();
  if(t.customerId) recalculateCustomerLedger(t.customerId);
  saveState(`حذف عملية ${txLabel(t.type)}`,'delete'); renderAll(); if(activeCustomerProfileId) renderCustomerProfile(); toast('تم حذف العملية وعكس أثرها.');
}
function askNumber(label,value,min=0){ const v=prompt(label,String(num(value))); if(v===null) return null; const n=Number(v); if(!Number.isFinite(n)||n<min){toast('القيمة المدخلة غير صحيحة.');return undefined;} return n; }
function managerEditTransaction(id){
  if(!isManager()) return toast('تعديل العمليات متاح للمدير فقط.');
  const t=state.transactions.find(x=>x.id===id && x.deleted!==true); if(!t) return;
  const candidate=JSON.parse(JSON.stringify(t));
  let inventoryDelta={};
  if(t.type==='charge'){
    const total=askNumber('قيمة الشحن:',t.total); if(total==null||total===undefined)return;
    const paid=askNumber('المدفوع:',t.paid); if(paid==null||paid===undefined)return;
    const method=prompt('طريقة الدفع: cash / bank / jawwal_pay / debt',t.paymentMethod||'cash'); if(method===null)return;
    const source=prompt('جهاز المصدر:',t.sourcePhone||''); if(source===null)return;
    const target=prompt('نوع الجهاز المشحون:',t.targetPhone||''); if(target===null)return;
    const note=prompt('ملاحظة:',t.note||''); if(note===null)return;
    Object.assign(candidate,{total,paid,paymentMethod:method,sourcePhone:source.trim(),targetPhone:target.trim(),note:note.trim()});
  } else if(t.type==='sale'){
    const qRaw=askNumber('الكمية:',t.quantity,1); if(qRaw==null||qRaw===undefined)return; const quantity=Math.floor(qRaw);
    const unitPrice=askNumber('سعر الوحدة:',t.unitPrice); if(unitPrice==null||unitPrice===undefined)return;
    const paid=askNumber('المدفوع:',t.paid); if(paid==null||paid===undefined)return;
    const method=prompt('طريقة الدفع: cash / bank / jawwal_pay / debt',t.paymentMethod||'cash'); if(method===null)return;
    const note=prompt('ملاحظة:',t.note||''); if(note===null)return;
    inventoryDelta[t.itemId]=num(t.quantity)-quantity;
    Object.assign(candidate,{quantity,unitPrice,total:Number((quantity*unitPrice).toFixed(2)),paid,paymentMethod:method,note:note.trim()});
  } else if(t.type==='invoice'){
    const newLines=JSON.parse(JSON.stringify(t.lines||[]));
    for(const line of newLines){
      if(line.type==='charge'){
        const amount=askNumber(`قيمة الشحن (${line.sourcePhone||''}):`,line.total); if(amount==null||amount===undefined)return;
        const source=prompt('جهاز مصدر الشحن:',line.sourcePhone||''); if(source===null)return;
        const target=prompt('الجهاز / الرقم المشحون:',line.targetPhone||''); if(target===null)return;
        Object.assign(line,{total:amount,sourcePhone:source.trim(),targetPhone:target.trim()});
      }else if(line.type==='sale'){
        const qRaw=askNumber(`كمية ${line.itemName}:`,line.quantity,1); if(qRaw==null||qRaw===undefined)return;
        const price=askNumber(`سعر ${line.itemName}:`,line.unitPrice); if(price==null||price===undefined)return;
        line.quantity=Math.floor(qRaw);line.unitPrice=price;line.total=Number((line.quantity*price).toFixed(2));
      }
    }
    const paid=askNumber('المدفوع:',t.paid); if(paid==null||paid===undefined)return;
    const method=prompt('طريقة الدفع: cash / bank / jawwal_pay / debt',t.paymentMethod||'cash'); if(method===null)return;
    const note=prompt('ملاحظة:',t.note||''); if(note===null)return;
    const oldSold=soldByTransaction(t), newSold={}; newLines.filter(l=>l.type==='sale').forEach(l=>newSold[l.itemId]=(newSold[l.itemId]||0)+num(l.quantity));
    for(const itemId of new Set([...Object.keys(oldSold),...Object.keys(newSold)])) inventoryDelta[itemId]=num(oldSold[itemId])-num(newSold[itemId]);
    Object.assign(candidate,{lines:newLines,total:newLines.reduce((s,l)=>s+num(l.total),0),paid,paymentMethod:method,note:note.trim()});
  } else if(t.type==='payment'){
    const paid=askNumber('قيمة الدفعة:',t.paid,0.01); if(paid==null||paid===undefined)return;
    const method=prompt('طريقة الدفع: cash / bank / jawwal_pay',t.paymentMethod||'cash'); if(method===null)return;
    const note=prompt('ملاحظة:',t.note||''); if(note===null)return;
    Object.assign(candidate,{paid,paymentMethod:method,note:note.trim()});
  } else if(t.type==='opening_debt'){
    const total=askNumber('قيمة الدين الافتتاحي:',t.total); if(total==null||total===undefined)return;
    const note=prompt('ملاحظة:',t.note||''); if(note===null)return; Object.assign(candidate,{total,note:note.trim()});
  } else if(t.type==='stock'){
    const qRaw=askNumber('كمية المخزون:',t.quantity,0); if(qRaw==null||qRaw===undefined)return; const quantity=Math.floor(qRaw);
    const note=prompt('ملاحظة:',t.note||''); if(note===null)return;
    inventoryDelta[t.itemId]=quantity-num(t.quantity);
    Object.assign(candidate,{quantity,note:note.trim()});
  }
  for(const [itemId,delta] of Object.entries(inventoryDelta)){
    const item=getItem(itemId); if(!item) continue;
    if(num(item.stock)+num(delta)<0) return toast(`المخزون غير كافٍ للصنف ${displayItemName(item)}.`);
  }
  for(const [itemId,delta] of Object.entries(inventoryDelta)){const item=getItem(itemId);if(item){item.stock=Number((num(item.stock)+num(delta)).toFixed(2));touchEntity(item);}}
  if(candidate.paymentMethod==='debt') candidate.paid=0;
  Object.assign(t,candidate,{updatedAt:nowISO()});
  if(t.customerId) recalculateCustomerLedger(t.customerId);
  saveState(`تعديل عملية ${txLabel(t.type)}`,'operation'); renderAll(); if(activeCustomerProfileId) renderCustomerProfile(); toast('تم تعديل العملية وتحديث الرصيد والمخزون.');
}
function openCustomerProfile(id){ activeCustomerProfileId=id; renderCustomerProfile(); document.getElementById('customerProfileModal')?.classList.remove('hidden'); }
function closeCustomerProfile(event){ if(event&&event.target!==event.currentTarget)return; document.getElementById('customerProfileModal')?.classList.add('hidden'); }
function customerTransactions(id){ return state.transactions.filter(t=>t.deleted!==true&&t.customerId===id).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp)); }
function customerTotals(list){
  let charge=0,sale=0,payments=0;
  list.forEach(t=>{if(t.type==='charge')charge+=num(t.total);if(t.type==='sale')sale+=num(t.total);if(t.type==='payment')payments+=num(t.paid);if(t.type==='invoice')(t.lines||[]).forEach(l=>{if(l.type==='charge')charge+=num(l.total);if(l.type==='sale')sale+=num(l.total);});});
  return {charge,sale,payments};
}
function renderCustomerProfile(){
  const c=getCustomer(activeCustomerProfileId); if(!c)return;
  const list=customerTransactions(c.id), totals=customerTotals(list);
  document.getElementById('customerProfileTitle').textContent=`ملف الزبون: ${c.name}`;
  document.getElementById('customerProfileInfo').innerHTML=`<div class="profile-grid"><div><span>الهاتف</span><strong>${esc(c.phone||'-')}</strong></div><div><span>الرصيد الحالي</span><strong class="${balanceMeta(c.balance).cls}">${balanceText(c.balance)}</strong></div><div><span>إجمالي الشحن</span><strong>${money(totals.charge)}</strong></div><div><span>إجمالي المشتريات</span><strong>${money(totals.sale)}</strong></div><div><span>إجمالي الدفعات</span><strong>${money(totals.payments)}</strong></div><div><span>عدد العمليات</span><strong>${list.length}</strong></div></div><p class="hint">${esc(c.note||'لا توجد ملاحظات على الزبون.')}</p>`;
  document.getElementById('customerProfileTransactions').innerHTML=transactionsTable(list,500);
}
function printCustomerReport(){
  const c=getCustomer(activeCustomerProfileId); if(!c)return; const list=customerTransactions(c.id), totals=customerTotals(list);
  const win=window.open('','_blank','width=1000,height=800'); if(!win)return toast('اسمح بفتح النوافذ لطباعة التقرير.');
  win.document.write(`<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>تقرير ${esc(c.name)}</title><style>body{font-family:Arial;padding:24px;color:#111}h1{margin:0 0 8px}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:20px 0}.summary div{border:1px solid #ddd;border-radius:10px;padding:12px}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #ddd;padding:7px;text-align:right}.actions{display:none}</style></head><body><h1>تقرير الزبون: ${esc(c.name)}</h1><p>الهاتف: ${esc(c.phone||'-')} — ${esc(balanceText(c.balance))}</p><div class="summary"><div>الشحن<br><strong>${money(totals.charge)}</strong></div><div>المشتريات<br><strong>${money(totals.sale)}</strong></div><div>الدفعات<br><strong>${money(totals.payments)}</strong></div><div>العمليات<br><strong>${list.length}</strong></div></div>${transactionsTable(list,1000)}<script>window.onload=()=>window.print()<\/script></body></html>`); win.document.close();
}

    function addCharge(){
  const customerResult = getOrCreateCustomerFromCombo('chargeCustomer', 'chargeCustomerText', 'عملية شحن');
  if(!customerResult) return;
  const customer = customerResult.customer;
  const sourcePhone = document.getElementById('chargeSourcePhone').value;
  if(!sourcePhone) return toast('أضف أو اختر جهاز مصدر الشحن.');
  const amount = num(document.getElementById('chargeAmount').value);
  if(amount <= 0) return toast('اكتب قيمة الشحنة.');
  const paid = paidValue('chargePaid');
  const paymentMethod = requirePaymentMethod(paid,'chargePaymentMethod');
  if(paymentMethod === null) return;
  const targetPhone = document.getElementById('chargeTargetPhone').value.trim();
  const debt = updateCustomerDebt(customer, amount, paid);
  const stamp=nowISO();
  state.transactions.unshift({
    id:uid('tx'), type:'charge', customerId:customer.id, customerName:customer.name,
    sourcePhone, targetPhone, total:amount, paid, paymentMethod, debtBefore:debt.before, debtAfter:debt.after, debtChange:debt.change,
    userId:currentUser.id, userName:currentUser.name, timestamp:stamp, updatedAt:stamp, note:document.getElementById('chargeNote').value.trim()
  });
  saveState(`شحن جديد للزبون ${customer.name}`,'operation');
  ['chargeAmount','chargePaid','chargeTargetPhone','chargeNote','chargeCustomerText'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('chargeCustomer').value = '';
  document.getElementById('chargePaymentMethod').value='';
  refreshModernSelect(document.getElementById('chargePaymentMethod'));
  renderAll();
  closeOperationModal();
  toast(`تم تسجيل الشحن. ${balanceText(debt.after)}${customerResult.created ? ' — تمت إضافة الزبون تلقائياً.' : ''}`);
}
    function fillItemPrice(){
      const item = getItem(document.getElementById('saleItem')?.value);
      const priceInput = document.getElementById('saleUnitPrice');
      if(item && priceInput && !priceInput.dataset.manual){ priceInput.value = num(item.price); }
    }
    document.addEventListener('input', (e)=>{
      if(e.target && e.target.id === 'saleUnitPrice') e.target.dataset.manual = '1';
      if(e.target && e.target.id === 'invoiceSalePrice') e.target.dataset.manual = '1';
      if(e.target && e.target.id === 'invoicePaid') e.target.dataset.auto = '0';
    });
    function addSale(){
  const customerResult = getOrCreateCustomerFromCombo('saleCustomer', 'saleCustomerText', 'عملية بيع');
  if(!customerResult) return;
  const customer = customerResult.customer;
  const item = getItem(document.getElementById('saleItem').value);
  if(!item) return toast('اختر الصنف.');
  const quantity = Math.floor(num(document.getElementById('saleQty').value));
  if(quantity <= 0) return toast('اكتب كمية صحيحة.');
  if(num(item.stock) < quantity) return toast(`المخزون غير كافٍ. المتوفر: ${qty(item.stock)}`);
  const unitPrice = num(document.getElementById('saleUnitPrice').value);
  const total = unitPrice * quantity;
  const paid = paidValue('salePaid');
  const paymentMethod = requirePaymentMethod(paid,'salePaymentMethod');
  if(paymentMethod === null) return;
  item.stock = Math.max(0, num(item.stock) - quantity); touchEntity(item);
  const debt = updateCustomerDebt(customer, total, paid);
  const stamp=nowISO();
  state.transactions.unshift({
    id:uid('tx'), type:'sale', customerId:customer.id, customerName:customer.name,
    itemId:item.id, itemName:displayItemName(item), quantity, unitPrice, total, paid, paymentMethod,
    debtBefore:debt.before, debtAfter:debt.after, debtChange:debt.change,
    userId:currentUser.id, userName:currentUser.name, timestamp:stamp, updatedAt:stamp, note:document.getElementById('saleNote').value.trim()
  });
  saveState(`بيع صنف للزبون ${customer.name}`,'operation');
  ['saleQty','salePaid','saleNote','saleCustomerText'].forEach(id=>document.getElementById(id).value = id==='saleQty'?'1':'');
  document.getElementById('saleCustomer').value = '';
  document.getElementById('salePaymentMethod').value='';
  refreshModernSelect(document.getElementById('salePaymentMethod'));
  delete document.getElementById('saleUnitPrice').dataset.manual;
  renderAll();
  closeOperationModal();
  toast(`تم تسجيل البيع. ${balanceText(debt.after)}${customerResult.created ? ' — تمت إضافة الزبون تلقائياً.' : ''}`);
}
    function addPayment(){
  const customerResult = getOrCreateCustomerFromCombo('paymentCustomer', 'paymentCustomerText', 'دفعة وترصيد');
  if(!customerResult) return;
  const customer = customerResult.customer;
  const amount = num(document.getElementById('paymentAmount').value);
  if(amount <= 0) return toast('اكتب قيمة الدفعة.');
  const paymentMethod = requirePaymentMethod(amount,'paymentMethod');
  if(paymentMethod === null) return;
  const before = num(customer.balance);
  const after = Number((before - amount).toFixed(2));
  customer.balance = after; touchEntity(customer);
  const stamp=nowISO();
  state.transactions.unshift({
    id:uid('tx'), type:'payment', customerId:customer.id, customerName:customer.name,
    total:0, paid:amount, paymentMethod, debtBefore:before, debtAfter:after, debtChange:after-before,
    userId:currentUser.id, userName:currentUser.name, timestamp:stamp, updatedAt:stamp, note:document.getElementById('paymentNote').value.trim()
  });
  saveState(`دفعة من ${customer.name} عبر ${paymentMethodLabel(paymentMethod)}`,'payment');
  ['paymentAmount','paymentNote','paymentCustomerText'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('paymentCustomer').value='';
  document.getElementById('paymentMethod').value='';
  refreshModernSelect(document.getElementById('paymentMethod'));
  renderAll();
  toast(`تم تسجيل الدفعة. ${balanceText(after)}${customerResult.created ? ' — تمت إضافة الزبون تلقائياً.' : ''}`);
}

    function addStock(){
  const item = getItem(document.getElementById('stockItem').value);
  if(!item) return toast('اختر الصنف.');
  const quantity = Math.floor(num(document.getElementById('stockQty').value));
  if(quantity <= 0) return toast('اكتب كمية صحيحة.');
  item.stock = num(item.stock) + quantity; touchEntity(item);
  const stamp=nowISO();
  state.transactions.unshift({id:uid('tx'), type:'stock', itemId:item.id, itemName:displayItemName(item), quantity, total:0, paid:0, paymentMethod:'', userId:currentUser.id, userName:currentUser.name, timestamp:stamp, updatedAt:stamp, note:document.getElementById('stockNote').value.trim()});
  saveState(`إضافة مخزون ${displayItemName(item)}`,'inventory');
  ['stockQty','stockNote'].forEach(id=>document.getElementById(id).value='');
  renderAll();
  toast('تمت إضافة الكمية للمخزون.');
}
    function addItem(){
  const name = document.getElementById('itemName').value.trim();
  const price = Math.max(0, num(document.getElementById('itemPrice').value));
  const stock = Math.max(0, Math.floor(num(document.getElementById('itemStock').value)));
  const stamp=nowISO();
  const item = {id:uid('item'), name, price, stock, active:true, updatedAt:stamp};
  state.items.push(item);
  if(stock > 0){
    state.transactions.unshift({id:uid('tx'), type:'stock', itemId:item.id, itemName:displayItemName(item), quantity:stock, total:0, paid:0, paymentMethod:'', userId:currentUser.id, userName:currentUser.name, timestamp:stamp, updatedAt:stamp, note:'كمية بداية'});
  }
  saveState(`إضافة الصنف ${displayItemName(item)}`,'inventory');
  ['itemName','itemPrice','itemStock'].forEach(id=>document.getElementById(id).value='');
  renderAll();
  toast('تمت إضافة الصنف.');
}
    function updateItem(id, field, value){
  const item = getItem(id); if(!item) return;
  if(field === 'name') item.name = value.trim();
  if(field === 'price') item.price = Math.max(0, num(value));
  if(field === 'stock') item.stock = Math.max(0, Math.floor(num(value)));
  touchEntity(item);
  saveState(`تعديل الصنف ${displayItemName(item)}`,'inventory'); renderAll();
}
    function deleteItem(id){
  if(!isManager()) return toast('الحذف والإخفاء متاحان للمدير فقط.');
  const item = getItem(id); if(!item) return;
  if(!confirm(`حذف/إخفاء الصنف ${displayItemName(item)}؟`)) return;
  item.active = false; item.deleted=true; touchEntity(item);
  saveState(`إخفاء الصنف ${displayItemName(item)}`,'delete'); renderAll(); toast('تم إخفاء الصنف.');
}

    function addExpense(){
  const category=document.getElementById('expenseCategory')?.value.trim()||'';
  const amount=Math.max(0,num(document.getElementById('expenseAmount')?.value));
  const paymentMethod=document.getElementById('expensePaymentMethod')?.value||'cash';
  const note=document.getElementById('expenseNote')?.value.trim()||'';
  if(!category) return toast('اكتب نوع المصروف.');
  if(amount<=0) return toast('اكتب قيمة المصروف.');
  const stamp=nowISO(); state.expenses.unshift({id:uid('exp'),category,amount,paymentMethod,note,userId:currentUser.id,userName:currentUser.name,timestamp:stamp,updatedAt:stamp});
  saveState(`إضافة مصروف ${category}`,'expense');
  ['expenseCategory','expenseAmount','expenseNote'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';}); renderAll(); toast('تم تسجيل المصروف.');
}
function periodExpenses(period=reportPeriod){ return state.expenses.filter(e=>e.deleted!==true&&withinPeriod(e.timestamp,period)); }
function editExpense(id){
  if(!isManager()) return toast('تعديل المصاريف متاح للمدير فقط.'); const e=state.expenses.find(x=>x.id===id&&x.deleted!==true);if(!e)return;
  const category=prompt('نوع المصروف:',e.category);if(category===null||!category.trim())return;
  const amount=askNumber('قيمة المصروف:',e.amount,0.01);if(amount==null||amount===undefined)return;
  const method=prompt('طريقة الدفع: cash / bank / jawwal_pay',e.paymentMethod||'cash');if(method===null)return;
  const note=prompt('ملاحظة:',e.note||'');if(note===null)return;
  Object.assign(e,{category:category.trim(),amount,paymentMethod:method,note:note.trim(),updatedAt:nowISO()});saveState(`تعديل مصروف ${e.category}`,'expense');renderAll();toast('تم تعديل المصروف.');
}
function deleteExpense(id){
  if(!isManager()) return toast('حذف المصاريف متاح للمدير فقط.');const e=state.expenses.find(x=>x.id===id&&x.deleted!==true);if(!e)return;
  if(!confirm(`حذف المصروف ${e.category}؟`))return;e.deleted=true;e.updatedAt=nowISO();saveState(`حذف مصروف ${e.category}`,'delete');renderAll();toast('تم حذف المصروف.');
}
function expensesTable(list,maxRows=300){
  const rows=list.slice(0,maxRows);if(!rows.length)return '<div class="empty">لا توجد مصاريف.</div>';
  return `<table><thead><tr><th>الوقت</th><th>النوع</th><th>القيمة</th><th>طريقة الدفع</th><th>المستخدم</th><th>ملاحظة</th>${isManager()?'<th>إجراء</th>':''}</tr></thead><tbody>${rows.map(e=>`<tr><td>${esc(formatDateTime(e.timestamp))}</td><td>${esc(e.category)}</td><td class="danger-text">${money(e.amount)}</td><td>${esc(paymentMethodLabel(e.paymentMethod))}</td><td>${esc(e.userName||'-')}</td><td>${esc(e.note||'')}</td>${isManager()?`<td class="actions" style="margin:0"><button class="btn secondary small" onclick="editExpense('${e.id}')">تعديل</button><button class="btn danger small" onclick="deleteExpense('${e.id}')">حذف</button></td>`:''}</tr>`).join('')}</tbody></table>`;
}
function renderExpenses(){
  const box=document.getElementById('expensesTable');if(!box)return;const list=state.expenses.filter(e=>e.deleted!==true).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
  const total=list.reduce((s,e)=>s+num(e.amount),0);document.getElementById('expensesTotal').textContent=money(total);box.innerHTML=expensesTable(list,500);
}

    function periodTransactions(period=reportPeriod){ return state.transactions.filter(t => t.deleted!==true && withinPeriod(t.timestamp, period)); }
    function txLabel(type){
  return {invoice:'فاتورة موحدة', charge:'شحن', sale:'بيع', stock:'مخزون', payment:'دفعة / ترصيد', opening_debt:'دين افتتاحي'}[type] || type;
}
    function txDetails(t){
  if(t.type === 'invoice') return (t.lines||[]).map(l=>l.type==='charge'?`شحن ${money(l.total)} من ${esc(l.sourcePhone||'-')}`:`${esc(l.itemName||'-')} × ${qty(l.quantity)}`).join(' + ') || '-';
  if(t.type === 'charge') return `جهاز المصدر: ${esc(t.sourcePhone || '-')} / نوع الجهاز: ${esc(t.targetPhone || '-')}`;
  if(t.type === 'sale') return `${esc(t.itemName || '-')} × ${qty(t.quantity)} بسعر ${money(t.unitPrice)}`;
  if(t.type === 'stock') return `${esc(t.itemName || '-')} + ${qty(t.quantity)}`;
  if(t.type === 'payment') return `دفعة: ${money(t.paid)} عبر ${esc(paymentMethodLabel(t.paymentMethod))}`;
  if(t.type === 'opening_debt') return `دين افتتاحي: ${money(t.total)}`;
  return '-';
}
    function transactionsTable(list, maxRows=100){
  const rows = list.slice(0,maxRows);
  if(!rows.length) return '<div class="empty">لا توجد عمليات.</div>';
  return `<table><thead><tr><th>الوقت</th><th>النوع</th><th>الزبون</th><th>التفاصيل</th><th>الإجمالي</th><th>المدفوع</th><th>طريقة الدفع</th><th>الرصيد بعد</th><th>المستخدم</th><th>ملاحظة</th>${isManager()?'<th>إجراء</th>':''}</tr></thead><tbody>${rows.map(t=>{
    const b=typeof t.debtAfter==='number'?balanceMeta(t.debtAfter):null;
    return `<tr>
      <td>${esc(formatDateTime(t.timestamp))}</td>
      <td><span class="pill ${t.type==='charge'?'ok':t.type==='sale'?'warn':t.type==='payment'?'ok':''}">${txLabel(t.type)}</span></td>
      <td class="${b?.cls || ''}">${esc(t.customerName || '-')}</td>
      <td>${txDetails(t)}</td>
      <td>${money(t.total || 0)}</td>
      <td>${money(t.paid || 0)}</td>
      <td>${t.paymentMethod ? esc(paymentMethodLabel(t.paymentMethod)) : '-'}</td>
      <td>${b ? balanceHtml(t.debtAfter) : '-'}</td>
      <td>${esc(t.userName || '-')}</td>
      <td>${esc(t.note || '')}</td>
      ${isManager()?`<td class="actions" style="margin:0"><button class="btn secondary small" onclick="managerEditTransaction('${t.id}')">تعديل</button><button class="btn danger small" onclick="managerDeleteTransaction('${t.id}')">حذف</button></td>`:''}
    </tr>`;
  }).join('')}</tbody></table>`;
}
    function calcStats(list){
  const paymentMethods={cash:0,bank:0,wallet:0,jawwal_pay:0,debt:0,unspecified:0};
  let chargeCount=0,chargeTotal=0,saleCount=0,saleQty=0,saleTotal=0;
  const charged=new Set();
  list.forEach(t=>{
    if(t.type==='charge'){chargeCount++;chargeTotal+=num(t.total);charged.add(t.targetPhone||t.customerName||t.id);}
    if(t.type==='sale'){saleCount++;saleQty+=num(t.quantity);saleTotal+=num(t.total);}
    if(t.type==='invoice') (t.lines||[]).forEach(l=>{if(l.type==='charge'){chargeCount++;chargeTotal+=num(l.total);charged.add(l.targetPhone||t.customerName||l.id);}if(l.type==='sale'){saleCount++;saleQty+=num(l.quantity);saleTotal+=num(l.total);}});
    const paid=num(t.paid); if(paid>0){const key=['cash','bank','wallet','jawwal_pay','debt'].includes(t.paymentMethod)?t.paymentMethod:'unspecified';paymentMethods[key]+=paid;}
  });
  const payments=list.filter(t=>t.type==='payment');
  return {chargeCount,chargeTotal,chargedPhones:charged.size,saleCount,saleQty,saleTotal,paidTotal:list.reduce((s,t)=>s+num(t.paid),0),paymentsTotal:payments.reduce((s,t)=>s+num(t.paid),0),debtTotal:state.customers.filter(c=>c.deleted!==true&&num(c.balance)>0).reduce((s,c)=>s+num(c.balance),0),creditTotal:state.customers.filter(c=>c.deleted!==true&&num(c.balance)<0).reduce((s,c)=>s+Math.abs(num(c.balance)),0),paymentMethods,lowStock:state.items.filter(i=>i.active!==false&&i.deleted!==true&&num(i.stock)<=3).length};
}
    function statCard(icon, label, value, note=''){
      return `<div class="card stat"><div class="icon">${iconSvg(icon)}</div><div class="label">${label}</div><div class="num">${value}</div><div class="muted">${note}</div></div>`;
    }
    function renderDashboard(){
  const today = periodTransactions('day');
  const s = calcStats(today);
  const activeCustomers=state.customers.filter(c=>c.deleted!==true);
  document.getElementById('dashboardStats').innerHTML = [
    statCard('phone','عدد الشحن اليوم', s.chargeCount, `أجهزة/عمليات: ${s.chargedPhones}`),
    statCard('money','قيمة الشحن اليوم', money(s.chargeTotal), 'إجمالي الشحن'),
    statCard('juice','مبيعات الأصناف اليوم', qty(s.saleQty), `القيمة: ${money(s.saleTotal)}`),
    statCard('alert','إجمالي المديونية', money(s.debtTotal), `${activeCustomers.filter(c=>num(c.balance)>0).length} مديونية — الموجب ${money(s.creditTotal)}`)
  ].join('');
  document.getElementById('recentTable').innerHTML = transactionsTable(state.transactions.filter(t=>t.deleted!==true), 8);
  const debts = activeCustomers.filter(c=>num(c.balance)>0).sort((a,b)=>num(b.balance)-num(a.balance)).slice(0,5);
  const credits = activeCustomers.filter(c=>num(c.balance)<0).sort((a,b)=>num(a.balance)-num(b.balance)).slice(0,5);
  const low = state.items.filter(i=>i.active!==false && i.deleted!==true && num(i.stock)<=3);
  const alerts = [];
  if(debts.length) alerts.push(...debts.map(c=>`<div class="summary-item"><span class="danger-text">${esc(c.name)} — مديونية</span><strong>${money(c.balance)}</strong></div>`));
  if(credits.length) alerts.push(...credits.map(c=>`<div class="summary-item"><span class="ok-text">${esc(c.name)} — موجب</span><strong class="ok-text">${money(Math.abs(c.balance))}</strong></div>`));
  if(low.length) alerts.push(...low.slice(0,5).map(i=>`<div class="summary-item"><span>مخزون قليل: ${esc(displayItemName(i))}</span><strong class="${num(i.stock)<=0?'danger-text':'muted'}">${qty(i.stock)}</strong></div>`));
  if(!alerts.length) alerts.push('<div class="empty">لا توجد مديونيات أو أرصدة موجبة أو تنبيهات مخزون حالياً.</div>');
  document.getElementById('alertsBox').innerHTML = alerts.join('');
}
    function renderCustomers(){
  const customers=state.customers.filter(c=>c.deleted!==true);
  const debts = customers.filter(c=>num(c.balance)>0).sort((a,b)=>num(b.balance)-num(a.balance));
  const credits = customers.filter(c=>num(c.balance)<0).sort((a,b)=>num(a.balance)-num(b.balance));
  const parts=[];
  if(debts.length) parts.push(...debts.map(c=>`<div class="summary-item"><span class="danger-text">${esc(c.name)}${c.phone ? ' - '+esc(c.phone):''}</span><strong class="danger-text">مديونية ${money(c.balance)}</strong></div>`));
  if(credits.length) parts.push(...credits.map(c=>`<div class="summary-item"><span class="ok-text">${esc(c.name)}${c.phone ? ' - '+esc(c.phone):''}</span><strong class="ok-text">موجب ${money(Math.abs(c.balance))}</strong></div>`));
  document.getElementById('debtSummary').innerHTML = parts.length ? parts.join('') : '<div class="empty">لا توجد مديونيات أو أرصدة موجبة.</div>';
  const html = customers.length ? `<table><thead><tr><th>الاسم</th><th>الهاتف</th><th>رصيد الحساب</th><th>ملاحظة</th><th>أضيف بتاريخ</th><th>إجراء</th></tr></thead><tbody>${customers.map(c=>{
    const b=balanceMeta(c.balance);
    return `<tr>
      <td class="${b.cls}"><button class="link-btn" onclick="openCustomerProfile('${c.id}')">${esc(c.name)}</button> ${b.kind==='debt'?'<span class="debt-dot"></span>':b.kind==='credit'?'<span class="credit-dot"></span>':''}</td>
      <td>${esc(c.phone || '-')}</td>
      <td>${balanceHtml(c.balance)}</td>
      <td>${esc(c.note || '')}</td>
      <td>${esc(formatDate(c.createdAt))}</td>
      <td class="actions" style="margin:0"><button class="btn secondary small" onclick="openCustomerProfile('${c.id}')">فتح الملف</button><button class="btn secondary small" onclick="editCustomer('${c.id}')">تعديل</button>${isManager()?`<button class="btn danger small" onclick="deleteCustomer('${c.id}')">حذف</button>`:''}</td>
    </tr>`;
  }).join('')}</tbody></table>` : '<div class="empty">لا يوجد زبائن بعد.</div>';
  document.getElementById('customersTable').innerHTML = html;
}
    function renderInventory(){
  const items=state.items.filter(i=>i.active!==false && i.deleted!==true);
  document.getElementById('itemsEditor').innerHTML = items.map(i=>`
    <div class="inline-edit">
      <div class="field"><label>اسم الصنف</label><input value="${esc(i.name)}" placeholder="صنف بدون اسم" onchange="updateItem('${i.id}','name',this.value)"></div>
      <div class="field"><label>السعر (شيكل)</label><input type="number" min="0" step="0.01" value="${num(i.price)}" onchange="updateItem('${i.id}','price',this.value)"></div>
      <div class="field"><label>المخزون</label><input type="number" min="0" step="1" value="${qty(i.stock)}" onchange="updateItem('${i.id}','stock',this.value)"></div>
      ${isManager()?`<button class="btn danger small" onclick="deleteItem('${i.id}')">إخفاء</button>`:''}
    </div>`).join('') || '<div class="empty">لا توجد أصناف.</div>';
  const html = items.length ? `<table><thead><tr><th>الصنف</th><th>السعر</th><th>المخزون</th><th>الحالة</th></tr></thead><tbody>${items.map(i=>`
    <tr><td>${esc(displayItemName(i))}</td><td>${money(i.price)}</td><td class="${num(i.stock)<=0?'danger-text':num(i.stock)<=3?'danger-text':'ok-text'}">${qty(i.stock)}</td><td>${num(i.stock)<=0?'<span class="pill danger">نفد</span>':num(i.stock)<=3?'<span class="pill warn">قليل</span>':'<span class="pill ok">متوفر</span>'}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">لا يوجد مخزون.</div>';
  document.getElementById('inventoryTable').innerHTML = html;
}
    function setReportPeriod(period){
      reportPeriod = period;
      document.querySelectorAll('.tab[data-period]').forEach(t => t.classList.toggle('active', t.dataset.period === period));
      renderReports();
    }
    function renderReports(){
  const list = periodTransactions(reportPeriod);
  const s = calcStats(list);
  document.getElementById('reportStats').innerHTML = [
    statCard('phone','عمليات الشحن', s.chargeCount, `قيمة: ${money(s.chargeTotal)}`),
    statCard('phone','عدد الأجهزة المشحونة', s.chargedPhones, 'حسب نوع الجهاز/الزبون'),
    statCard('juice','كمية المبيعات', qty(s.saleQty), `قيمة: ${money(s.saleTotal)}`),
    statCard('wallet','المدفوعات المحصلة', money(s.paidTotal), `دفعات ترصيد: ${money(s.paymentsTotal)}`),
    statCard('money','المصاريف', money(periodExpenses(reportPeriod).reduce((sum,e)=>sum+num(e.amount),0)), 'إجمالي مصاريف الفترة')
  ].join('');
  const bySource = {};
  list.forEach(t=>{
    if(t.type==='charge'){
      const k=t.sourcePhone||'غير محدد'; bySource[k]||={count:0,total:0};bySource[k].count++;bySource[k].total+=num(t.total);
    }
    if(t.type==='invoice') (t.lines||[]).filter(l=>l.type==='charge').forEach(l=>{const k=l.sourcePhone||'غير محدد';bySource[k]||={count:0,total:0};bySource[k].count++;bySource[k].total+=num(l.total);});
  });
  document.getElementById('sourceReport').innerHTML = Object.keys(bySource).length ? `<table><thead><tr><th>جهاز المصدر</th><th>عدد العمليات</th><th>إجمالي الشحن</th></tr></thead><tbody>${Object.entries(bySource).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v.count}</td><td>${money(v.total)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">لا توجد عمليات شحن في الفترة.</div>';
  const methods=[
    ['cash','نقدي'],
    ['bank','تحويل بنكي'],
    ['jawwal_pay','Jawwal Pay'],
    ['wallet','محفظة (قديم)'],
    ['unspecified','غير محدد']
  ];
  document.getElementById('paymentMethodReport').innerHTML = `<table><thead><tr><th>طريقة الدفع</th><th>المبلغ المحصل</th></tr></thead><tbody>${methods.map(([k,label])=>`<tr><td>${label}</td><td class="${k==='unspecified'?'muted':'ok-text'}">${money(s.paymentMethods[k]||0)}</td></tr>`).join('')}</tbody></table>`;
  const byUser = {};
  list.forEach(t=>{
    const k = t.userName || 'غير محدد';
    byUser[k] ||= {ops:0,charge:0,sale:0,paid:0};
    byUser[k].ops++;
    if(t.type==='charge') byUser[k].charge += num(t.total);
    if(t.type==='sale') byUser[k].sale += num(t.total);
    if(t.type==='invoice') (t.lines||[]).forEach(l=>{if(l.type==='charge')byUser[k].charge+=num(l.total);if(l.type==='sale')byUser[k].sale+=num(l.total);});
    byUser[k].paid += num(t.paid);
  });
  document.getElementById('userReport').innerHTML = Object.keys(byUser).length ? `<table><thead><tr><th>المستخدم</th><th>عدد العمليات</th><th>شحن</th><th>مبيعات</th><th>مدفوع</th></tr></thead><tbody>${Object.entries(byUser).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v.ops}</td><td>${money(v.charge)}</td><td>${money(v.sale)}</td><td>${money(v.paid)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">لا توجد عمليات في الفترة.</div>';
  document.getElementById('periodTransactionsTable').innerHTML = transactionsTable(list, 300);
  const expenseReport=document.getElementById('periodExpensesTable'); if(expenseReport) expenseReport.innerHTML=expensesTable(periodExpenses(reportPeriod),300);
}
    function renderSettings(){
  const currentName=document.getElementById('settingsCurrentUser');
  if(currentName && currentUser) currentName.textContent=`${currentUser.name} (${currentUser.role==='manager'?'مدير':'مستخدم'})`;
  updateSyncUI();
  const notice = document.getElementById('managerOnlyNotice');
  const content = document.getElementById('settingsContent');
  if(!notice || !content) return;
  notice.classList.toggle('hidden', isManager());
  content.classList.toggle('hidden', !isManager());
  if(!isManager()) return;
  const users=state.users.filter(u=>u.deleted!==true);
  document.getElementById('usersTable').innerHTML = `<table><thead><tr><th>الاسم</th><th>الصلاحية</th><th>PIN</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>${users.map(u=>`
    <tr><td>${esc(u.name)}</td><td>${u.role==='manager'?'مدير':'مستخدم'}</td><td><span class="pill ok">محمي</span></td><td>${u.active===false?'<span class="pill danger">موقوف</span>':'<span class="pill ok">نشط</span>'}</td><td>${u.id===currentUser.id?'<span class="muted">الحالي</span>':`<button class="btn danger small" onclick="toggleUser('${u.id}')">${u.active===false?'تفعيل':'إيقاف'}</button>`}</td></tr>`).join('')}</tbody></table>`;
  document.getElementById('sourcePhonesList').innerHTML = state.sourcePhones.map((p,idx)=>`<div class="summary-item"><span>${esc(p)}</span><button class="btn danger small" onclick="removeSourcePhone(${idx})">حذف</button></div>`).join('') || '<div class="empty">لا توجد أجهزة مصدر.</div>';
  const managerPinUser=document.getElementById('managerPinUser');
  if(managerPinUser){
    const selected=managerPinUser.value;
    managerPinUser.innerHTML=users.map(u=>`<option value="${esc(u.id)}">${esc(u.name)} - ${u.role==='manager'?'مدير':'مستخدم'}</option>`).join('');
    if(users.some(u=>u.id===selected)) managerPinUser.value=selected;
  }
}
    async function addUser(){
  if(!isManager()) return toast('هذه العملية للمدير فقط.');
  const name = document.getElementById('newUserName').value.trim();
  const pin = document.getElementById('newUserPin').value.trim();
  const role = document.getElementById('newUserRole').value;
  if(!name || !pin) return toast('اكتب اسم المستخدم و PIN.');
  if(pin.length < 4) return toast('PIN يجب أن يكون 4 خانات على الأقل.');
  const stamp=nowISO();
  state.users.push({id:uid('user'), name, pinHash:await hashPin(pin), role, active:true, updatedAt:stamp});
  saveState(`إضافة المستخدم ${name}`,'security');
  ['newUserName','newUserPin'].forEach(id=>document.getElementById(id).value='');
  renderLoginUsers(); renderAll(); toast('تمت إضافة المستخدم.');
}
    function toggleUser(id){
  if(!isManager()) return toast('هذه العملية للمدير فقط.');
  const u = state.users.find(x=>x.id===id && x.deleted!==true); if(!u) return;
  u.active = u.active === false;
  touchEntity(u);
  saveState(`${u.active?'تفعيل':'إيقاف'} المستخدم ${u.name}`,'security'); renderLoginUsers(); renderAll();
}
    function addSourcePhone(){
  if(!isManager()) return toast('هذه العملية للمدير فقط.');
  const p = document.getElementById('newSourcePhone').value.trim();
  if(!p) return toast('اكتب اسم الجهاز/الخط.');
  if(!state.sourcePhones.includes(p)) state.sourcePhones.push(p);
  state.meta.sourcePhonesUpdatedAt=nowISO();
  document.getElementById('newSourcePhone').value='';
  saveState(`إضافة جهاز المصدر ${p}`,'settings'); renderAll(); toast('تمت إضافة جهاز المصدر.');
}
    function removeSourcePhone(idx){
  if(!isManager()) return toast('الحذف متاح للمدير فقط.');
  if(!confirm('حذف جهاز المصدر؟ العمليات القديمة تبقى محفوظة.')) return;
  const removed=state.sourcePhones[idx] || '';
  state.sourcePhones.splice(idx,1);
  state.meta.sourcePhonesUpdatedAt=nowISO();
  saveState(`حذف جهاز المصدر ${removed}`,'delete'); renderAll();
}

async function changeCurrentPin(){
  if(!currentUser) return;
  const currentPin=document.getElementById('currentPin').value.trim();
  const newPin=document.getElementById('newCurrentPin').value.trim();
  const confirmPin=document.getElementById('confirmCurrentPin').value.trim();
  if(!(await verifyPin(currentUser,currentPin))) return toast('PIN الحالي غير صحيح.');
  if(newPin.length<4) return toast('PIN الجديد يجب أن يكون 4 خانات على الأقل.');
  if(newPin!==confirmPin) return toast('تأكيد PIN غير مطابق.');
  currentUser.pinHash=await hashPin(newPin);
  delete currentUser.pin;
  touchEntity(currentUser);
  saveState(`تغيير PIN للمستخدم ${currentUser.name}`,'security');
  ['currentPin','newCurrentPin','confirmCurrentPin'].forEach(id=>document.getElementById(id).value='');
  renderLoginUsers(); renderAll(); toast('تم تغيير PIN وإضافته إلى المزامنة.');
}
async function managerChangePin(){
  if(!isManager()) return toast('هذه العملية للمدير فقط.');
  const user=state.users.find(u=>u.id===document.getElementById('managerPinUser').value && u.deleted!==true);
  const pin=document.getElementById('managerNewPin').value.trim();
  if(!user) return toast('اختر المستخدم.');
  if(pin.length<4) return toast('PIN الجديد يجب أن يكون 4 خانات على الأقل.');
  user.pinHash=await hashPin(pin);
  delete user.pin;
  touchEntity(user);
  saveState(`تغيير PIN للمستخدم ${user.name}`,'security');
  document.getElementById('managerNewPin').value='';
  renderLoginUsers(); renderAll(); toast('تم تغيير PIN للمستخدم.');
}
    function exportData(){
      const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `cash-top-backup-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    }
    function importData(event){
  if(!isManager()) return toast('الاستيراد متاح للمدير فقط.');
  const file = event.target.files?.[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const data = migrateState(JSON.parse(reader.result));
      if(!data.users || !data.transactions) throw new Error('bad');
      state = data;
      saveState('استيراد نسخة بيانات','import');
      renderLoginUsers(); renderAll(); toast('تم استيراد البيانات وإضافتها إلى المزامنة.');
    }catch(e){ toast('ملف الاستيراد غير صالح.'); }
  };
  reader.readAsText(file);
  event.target.value='';
}
    function resetApp(){
  if(!isManager()) return toast('المسح متاح للمدير فقط.');
  if(!confirm('تحذير: سيتم مسح كل البيانات محلياً ومن Firebase بعد المزامنة. هل أنت متأكد؟')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  state.meta.forceResetAt=nowISO();
  saveState('إعادة ضبط التطبيق','reset');
  localStorage.removeItem(SESSION_KEY);
  logout();
  toast('تمت إعادة ضبط التطبيق. اضغط مزامنة لإرسال الحالة الجديدة.');
}
    let toastTimer;
    function toast(message){
      clearTimeout(toastTimer);
      let el = document.getElementById('toast');
      if(!el){
        el = document.createElement('div');
        el.id='toast';
        el.style.cssText='position:fixed;left:16px;bottom:86px;z-index:9999;background:linear-gradient(135deg,#0ea5e9,#14b8a6);color:#fff;padding:13px 16px;border-radius:16px;font-weight:900;box-shadow:0 12px 35px rgba(0,0,0,.35);max-width:min(420px,calc(100vw - 32px))';
        document.body.appendChild(el);
      }
      el.textContent = message;
      el.classList.remove('hidden');
      toastTimer = setTimeout(()=>el.classList.add('hidden'), 3200);
    }


    /* تثبيت كتطبيق PWA */
    let deferredInstallPrompt = null;
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      document.getElementById('installAppBtn')?.classList.remove('hidden');
    });
    async function installApp(){
      if(!deferredInstallPrompt){
        toast('لو زر التثبيت غير متاح، افتح قائمة Chrome ثم اختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية.');
        return;
      }
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice.catch(()=>null);
      deferredInstallPrompt = null;
      document.getElementById('installAppBtn')?.classList.add('hidden');
    }
    if('serviceWorker' in navigator){
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(()=>{});
      });
    }

    /* تحويل select العادي إلى قائمة حديثة */
    function closeAllModernSelects(except){
      document.querySelectorAll('.modern-select.open').forEach(w => {
        if(w !== except) w.classList.remove('open');
      });
    }
    function refreshModernSelect(select){
      if(!select || select.dataset.enhanced !== '1') return;
      const wrapper = select.closest('.modern-select');
      if(!wrapper) return;
      const btn = wrapper.querySelector('.modern-select-btn');
      const menu = wrapper.querySelector('.modern-select-menu');
      if(!btn || !menu) return;
      const selected = select.options[select.selectedIndex];
      btn.textContent = selected ? selected.textContent : 'اختر';
      menu.innerHTML = '';
      Array.from(select.options).forEach(opt => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'modern-select-option' + (opt.value === select.value ? ' selected' : '');
        item.textContent = opt.textContent || 'اختر';
        item.addEventListener('click', (e) => {
          e.preventDefault();
          select.value = opt.value;
          select.dispatchEvent(new Event('change', {bubbles:true}));
          wrapper.classList.remove('open');
          refreshModernSelect(select);
        });
        menu.appendChild(item);
      });
    }
    function enhanceSelects(){
      document.querySelectorAll('select').forEach(select => {
        if(select.dataset.enhanced === '1'){
          refreshModernSelect(select);
          return;
        }
        const wrapper = document.createElement('div');
        wrapper.className = 'modern-select';
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        select.classList.add('native-select-hidden');
        select.dataset.enhanced = '1';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'modern-select-btn';

        const menu = document.createElement('div');
        menu.className = 'modern-select-menu';

        wrapper.appendChild(btn);
        wrapper.appendChild(menu);

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const willOpen = !wrapper.classList.contains('open');
          closeAllModernSelects(wrapper);
          wrapper.classList.toggle('open', willOpen);
        });
        menu.addEventListener('click', e => e.stopPropagation());
        select.addEventListener('change', () => refreshModernSelect(select));
        refreshModernSelect(select);
      });
    }
    document.addEventListener('click', () => closeAllModernSelects());

    renderInvoiceDraft();
    init();

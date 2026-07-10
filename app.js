const STORAGE_KEY = 'charge_point_app_v1';
    const SESSION_KEY = 'charge_point_session_v1';
    const currency = 'شيكل';
    let state = loadState();
    let currentUser = null;
    let activeSection = 'dashboard';
    let operationFocus = 'charge';
    let reportPeriod = 'day';

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
      {id:'reports', title:'تقارير', icon:'chart'},
      {id:'settings', title:'إعدادات', icon:'settings', managerOnly:true}
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
      if(raw){
        try { return JSON.parse(raw); } catch(e){}
      }
      return {
        users:[
          {id:'manager', name:'المدير', role:'manager', pin:'0000', active:true},
          {id:'user1', name:'مستخدم 1', role:'user', pin:'1111', active:true},
          {id:'user2', name:'مستخدم 2', role:'user', pin:'2222', active:true}
        ],
        sourcePhones:['جهاز الشحن 1','جهاز الشحن 2'],
        customers:[],
        items:[
          {id:uid('item'), name:'', stock:0, price:1, active:true},
          {id:uid('item'), name:'', stock:0, price:0, active:true}
        ],
        transactions:[],
        createdAt:nowISO()
      };
    }
    function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    function findUser(id){ return state.users.find(u => u.id === id && u.active !== false); }
    function getCustomer(id){ return state.customers.find(c => c.id === id); }
    function getItem(id){ return state.items.find(i => i.id === id); }
    function displayItemName(item){ return item?.name?.trim() || 'صنف بدون اسم'; }

    function init(){
      renderLoginUsers();
      const sessionId = localStorage.getItem(SESSION_KEY);
      if(sessionId && findUser(sessionId)){
        currentUser = findUser(sessionId);
        showApp();
      } else {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('appShell').classList.add('hidden');
      }
    }
    function renderLoginUsers(){
      document.getElementById('loginUser').innerHTML = state.users.filter(u=>u.active!==false).map(u=>`<option value="${esc(u.id)}">${esc(u.name)} - ${u.role === 'manager' ? 'مدير' : 'مستخدم'}</option>`).join('');
      enhanceSelects();
    }
    function login(){
      const id = document.getElementById('loginUser').value;
      const pin = document.getElementById('loginPin').value.trim();
      const user = findUser(id);
      const err = document.getElementById('loginError');
      if(!user || user.pin !== pin){
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
      document.getElementById('bottomNav').innerHTML = items.slice(0,5).map(i => `<button class="nav-btn ${activeSection===i.id?'active':''}" onclick="goSection('${i.id}')"><span class="ico">${iconSvg(i.icon)}</span><span>${i.title}</span></button>`).join('');
    }
    function goSection(id){
      if(id === 'settings' && !isManager()) id = 'dashboard';
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
      renderReports();
      renderSettings();
      enhanceSelects();
    }

    const customerComboConfigs = [
      {text:'chargeCustomerText', hidden:'chargeCustomer', menu:'chargeCustomerMenu'},
      {text:'saleCustomerText', hidden:'saleCustomer', menu:'saleCustomerMenu'},
      {text:'paymentCustomerText', hidden:'paymentCustomer', menu:'paymentCustomerMenu'}
    ];
    function customerLabel(c){ return `${c.name}${c.phone ? ' - ' + c.phone : ''}`; }
    function normText(v){ return String(v || '').trim().toLowerCase(); }
    function setComboValue(cfg, customer){
      const input = document.getElementById(cfg.text);
      const hidden = document.getElementById(cfg.hidden);
      if(!input || !hidden) return;
      if(customer){
        input.value = customerLabel(customer);
        hidden.value = customer.id;
        input.classList.toggle('has-debt', num(customer.balance) > 0);
      } else {
        input.value = '';
        hidden.value = '';
        input.classList.remove('has-debt');
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
      const q = normText(query);
      let list = state.customers.slice();
      if(q){
        list = list.filter(c => normText(`${c.name} ${c.phone || ''}`).includes(q));
        const exact = state.customers.find(c => normText(c.name) === q || normText(customerLabel(c)) === q || normText(c.phone) === q);
        hidden.value = exact ? exact.id : '';
        input.classList.toggle('has-debt', exact ? num(exact.balance) > 0 : false);
      }
      list.sort((a,b)=> num(b.balance)-num(a.balance) || a.name.localeCompare(b.name,'ar'));
      list = list.slice(0,8);
      const typedName = input.value.trim();
      if(!state.customers.length){
        menu.innerHTML = typedName ? `<div class="combo-empty">سيتم إنشاء "${esc(typedName)}" كعميل جديد عند حفظ العملية.</div>` : '<div class="combo-empty">اكتب اسم الزبون؛ سيتم إضافته تلقائياً عند حفظ العملية.</div>';
      } else if(!list.length){
        menu.innerHTML = typedName ? `<div class="combo-empty">لا يوجد زبون بهذا الاسم. سيتم إنشاء "${esc(typedName)}" كعميل جديد عند حفظ العملية.</div>` : '<div class="combo-empty">لا يوجد زبون مطابق.</div>';
      } else {
        menu.innerHTML = list.map(c => `<button type="button" class="combo-option ${num(c.balance)>0?'debt':''}" onmousedown="selectCustomerCombo('${cfg.text}','${c.id}')"><span>${esc(customerLabel(c))}</span><small>${num(c.balance)>0 ? 'دين: '+money(c.balance) : 'بدون دين'}</small></button>`).join('');
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
      if(selected){
        input.value = customerLabel(selected);
        input.classList.toggle('has-debt', num(selected.balance)>0);
      } else {
        hidden.value = '';
        input.classList.remove('has-debt');
        if(!input.value) input.placeholder = 'اكتب اسم الزبون أو اختر من الاقتراحات';
      }
    }
    function renderCustomerSelects(){
      customerComboConfigs.forEach(bindCustomerCombo);
    }
    function renderSourcePhoneSelects(){
      const html = state.sourcePhones.map(p => `<option value="${esc(p)}">${esc(p)}</option>`).join('');
      const el = document.getElementById('chargeSourcePhone');
      if(el) el.innerHTML = html || '<option value="">أضف جهاز مصدر من الإعدادات</option>';
      enhanceSelects();
    }
    function renderItemSelects(){
      const html = state.items.filter(i=>i.active!==false).map(i => `<option value="${esc(i.id)}">${esc(displayItemName(i))} — المخزون: ${qty(i.stock)} — السعر: ${money(i.price)}</option>`).join('');
      ['saleItem','stockItem'].forEach(id => { const el=document.getElementById(id); if(el) el.innerHTML = html || '<option value="">أضف صنف أولاً</option>'; });
      fillItemPrice();
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
        sub.textContent = 'سجّل الشحنة مع جهاز المصدر، نوع الجهاز المشحون، القيمة، المدفوع، والدين المتبقي.';
        icon.innerHTML = iconSvg('phone');
      } else {
        title.textContent = 'بيع صنف';
        sub.textContent = 'اختر الصنف والكمية، وسيتم إنقاص المخزون تلقائياً.';
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
      const balance = num(document.getElementById('customerOpeningDebt').value);
      const note = document.getElementById('customerNote').value.trim();
      const customer = {id:uid('cust'), name, phone, balance:Math.max(0,balance), note, createdAt:nowISO()};
      state.customers.push(customer);
      if(balance > 0){
        state.transactions.unshift({id:uid('tx'), type:'opening_debt', customerId:customer.id, customerName:name, total:balance, paid:0, debtBefore:0, debtAfter:balance, debtChange:balance, userId:currentUser.id, userName:currentUser.name, timestamp:nowISO(), note:'دين افتتاحي'});
      }
      saveState();
      ['customerName','customerPhone','customerOpeningDebt','customerNote'].forEach(id => document.getElementById(id).value = id==='customerOpeningDebt'?'0':'');
      renderAll();
      toast('تمت إضافة الزبون.');
    }
    function editCustomer(id){
      const c = getCustomer(id); if(!c) return;
      const name = prompt('اسم الزبون:', c.name); if(name === null || !name.trim()) return;
      const phone = prompt('رقم الهاتف:', c.phone || ''); if(phone === null) return;
      const note = prompt('ملاحظة:', c.note || ''); if(note === null) return;
      c.name = name.trim(); c.phone = phone.trim(); c.note = note.trim();
      saveState(); renderAll(); toast('تم تعديل الزبون.');
    }
    function deleteCustomer(id){
      const c = getCustomer(id); if(!c) return;
      if(!confirm(`حذف الزبون ${c.name}؟ لن يتم حذف العمليات القديمة.`)) return;
      state.customers = state.customers.filter(x => x.id !== id);
      saveState(); renderAll(); toast('تم حذف الزبون من القائمة.');
    }

    function updateCustomerDebt(customer, total, paid){
      const before = num(customer.balance);
      const after = Math.max(0, before + num(total) - num(paid));
      customer.balance = after;
      return {before, after, change: after - before};
    }

    function cleanTypedCustomerName(value){
      return String(value || '').replace(/\s+-\s+.*$/,'').trim();
    }
    function findCustomerByTypedName(name){
      const q = normText(name);
      if(!q) return null;
      return state.customers.find(c => normText(c.name) === q || normText(customerLabel(c)) === q || (c.phone && normText(c.phone) === q)) || null;
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
        if(input){ input.value = customerLabel(existing); input.classList.toggle('has-debt', num(existing.balance)>0); }
        return {customer:existing, created:false};
      }
      const customer = {id:uid('cust'), name:typed, phone:'', balance:0, note:`أُضيف تلقائياً من ${contextLabel || 'عملية'}`, createdAt:nowISO()};
      state.customers.push(customer);
      if(hidden) hidden.value = customer.id;
      if(input){ input.value = customerLabel(customer); input.classList.remove('has-debt'); }
      return {customer, created:true};
    }
    function addCharge(){
      const customerResult = getOrCreateCustomerFromCombo('chargeCustomer', 'chargeCustomerText', 'عملية شحن');
      if(!customerResult) return;
      const customer = customerResult.customer;
      const sourcePhone = document.getElementById('chargeSourcePhone').value;
      if(!sourcePhone) return toast('أضف أو اختر جهاز مصدر الشحن.');
      const amount = num(document.getElementById('chargeAmount').value);
      if(amount <= 0) return toast('اكتب قيمة الشحنة.');
      let paid = document.getElementById('chargePaid').value === '' ? amount : num(document.getElementById('chargePaid').value);
      paid = Math.max(0, paid);
      const targetPhone = document.getElementById('chargeTargetPhone').value.trim();
      const debt = updateCustomerDebt(customer, amount, paid);
      state.transactions.unshift({
        id:uid('tx'), type:'charge', customerId:customer.id, customerName:customer.name,
        sourcePhone, targetPhone, total:amount, paid, debtBefore:debt.before, debtAfter:debt.after, debtChange:debt.change,
        userId:currentUser.id, userName:currentUser.name, timestamp:nowISO(), note:document.getElementById('chargeNote').value.trim()
      });
      saveState();
      ['chargeAmount','chargePaid','chargeTargetPhone','chargeNote','chargeCustomerText'].forEach(id=>document.getElementById(id).value='');
      document.getElementById('chargeCustomer').value = '';
      renderAll();
      closeOperationModal();
      toast(`تم تسجيل الشحن. رصيد دين الزبون الآن: ${money(debt.after)}${customerResult.created ? ' — تمت إضافة الزبون تلقائياً.' : ''}`);
    }
    function fillItemPrice(){
      const item = getItem(document.getElementById('saleItem')?.value);
      const priceInput = document.getElementById('saleUnitPrice');
      if(item && priceInput && !priceInput.dataset.manual){ priceInput.value = num(item.price); }
    }
    document.addEventListener('input', (e)=>{
      if(e.target && e.target.id === 'saleUnitPrice') e.target.dataset.manual = '1';
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
      let paid = document.getElementById('salePaid').value === '' ? total : num(document.getElementById('salePaid').value);
      paid = Math.max(0, paid);
      item.stock = Math.max(0, num(item.stock) - quantity);
      const debt = updateCustomerDebt(customer, total, paid);
      state.transactions.unshift({
        id:uid('tx'), type:'sale', customerId:customer.id, customerName:customer.name,
        itemId:item.id, itemName:displayItemName(item), quantity, unitPrice, total, paid,
        debtBefore:debt.before, debtAfter:debt.after, debtChange:debt.change,
        userId:currentUser.id, userName:currentUser.name, timestamp:nowISO(), note:document.getElementById('saleNote').value.trim()
      });
      saveState();
      ['saleQty','salePaid','saleNote','saleCustomerText'].forEach(id=>document.getElementById(id).value = id==='saleQty'?'1':'');
      document.getElementById('saleCustomer').value = '';
      delete document.getElementById('saleUnitPrice').dataset.manual;
      renderAll();
      closeOperationModal();
      toast(`تم تسجيل البيع. رصيد دين الزبون الآن: ${money(debt.after)}${customerResult.created ? ' — تمت إضافة الزبون تلقائياً.' : ''}`);
    }
    function addPayment(){
      if(!state.customers.length) return toast('أضف زبون أولاً.');
      const customer = getCustomer(document.getElementById('paymentCustomer').value);
      if(!customer) return toast('اختر الزبون.');
      const amount = num(document.getElementById('paymentAmount').value);
      if(amount <= 0) return toast('اكتب قيمة التسديد.');
      const before = num(customer.balance);
      const after = Math.max(0, before - amount);
      customer.balance = after;
      state.transactions.unshift({
        id:uid('tx'), type:'payment', customerId:customer.id, customerName:customer.name,
        total:0, paid:amount, debtBefore:before, debtAfter:after, debtChange:after-before,
        userId:currentUser.id, userName:currentUser.name, timestamp:nowISO(), note:document.getElementById('paymentNote').value.trim()
      });
      saveState();
      ['paymentAmount','paymentNote'].forEach(id=>document.getElementById(id).value='');
      renderAll();
      toast(`تم تسجيل التسديد. الدين الحالي: ${money(after)}`);
    }

    function addStock(){
      const item = getItem(document.getElementById('stockItem').value);
      if(!item) return toast('اختر الصنف.');
      const quantity = Math.floor(num(document.getElementById('stockQty').value));
      if(quantity <= 0) return toast('اكتب كمية صحيحة.');
      item.stock = num(item.stock) + quantity;
      state.transactions.unshift({id:uid('tx'), type:'stock', itemId:item.id, itemName:displayItemName(item), quantity, total:0, paid:0, userId:currentUser.id, userName:currentUser.name, timestamp:nowISO(), note:document.getElementById('stockNote').value.trim()});
      saveState();
      ['stockQty','stockNote'].forEach(id=>document.getElementById(id).value='');
      renderAll();
      toast('تمت إضافة الكمية للمخزون.');
    }
    function addItem(){
      const name = document.getElementById('itemName').value.trim();
      const price = Math.max(0, num(document.getElementById('itemPrice').value));
      const stock = Math.max(0, Math.floor(num(document.getElementById('itemStock').value)));
      const item = {id:uid('item'), name, price, stock, active:true};
      state.items.push(item);
      if(stock > 0){
        state.transactions.unshift({id:uid('tx'), type:'stock', itemId:item.id, itemName:displayItemName(item), quantity:stock, total:0, paid:0, userId:currentUser.id, userName:currentUser.name, timestamp:nowISO(), note:'كمية بداية'});
      }
      saveState();
      ['itemName','itemPrice','itemStock'].forEach(id=>document.getElementById(id).value='');
      renderAll();
      toast('تمت إضافة الصنف.');
    }
    function updateItem(id, field, value){
      const item = getItem(id); if(!item) return;
      if(field === 'name') item.name = value.trim();
      if(field === 'price') item.price = Math.max(0, num(value));
      if(field === 'stock') item.stock = Math.max(0, Math.floor(num(value)));
      saveState(); renderAll();
    }
    function deleteItem(id){
      const item = getItem(id); if(!item) return;
      if(!confirm(`حذف/إخفاء الصنف ${displayItemName(item)}؟`)) return;
      item.active = false;
      saveState(); renderAll(); toast('تم إخفاء الصنف.');
    }

    function periodTransactions(period=reportPeriod){ return state.transactions.filter(t => withinPeriod(t.timestamp, period)); }
    function txLabel(type){
      return {charge:'شحن', sale:'بيع', stock:'مخزون', payment:'تسديد دين', opening_debt:'دين افتتاحي'}[type] || type;
    }
    function txDetails(t){
      if(t.type === 'charge') return `جهاز المصدر: ${esc(t.sourcePhone || '-')} / نوع الجهاز: ${esc(t.targetPhone || '-')}`;
      if(t.type === 'sale') return `${esc(t.itemName || '-')} × ${qty(t.quantity)} بسعر ${money(t.unitPrice)}`;
      if(t.type === 'stock') return `${esc(t.itemName || '-')} + ${qty(t.quantity)}`;
      if(t.type === 'payment') return `تسديد: ${money(t.paid)}`;
      if(t.type === 'opening_debt') return `دين افتتاحي: ${money(t.total)}`;
      return '-';
    }
    function transactionsTable(list, maxRows=100){
      const rows = list.slice(0,maxRows);
      if(!rows.length) return '<div class="empty">لا توجد عمليات.</div>';
      return `<table><thead><tr><th>الوقت</th><th>النوع</th><th>الزبون</th><th>التفاصيل</th><th>الإجمالي</th><th>المدفوع</th><th>الدين بعد</th><th>المستخدم</th><th>ملاحظة</th></tr></thead><tbody>${rows.map(t=>`
        <tr>
          <td>${esc(formatDateTime(t.timestamp))}</td>
          <td><span class="pill ${t.type==='charge'?'ok':t.type==='sale'?'warn':t.type==='payment'?'ok':''}">${txLabel(t.type)}</span></td>
          <td class="${num(t.debtAfter)>0?'danger-text':''}">${esc(t.customerName || '-')}</td>
          <td>${txDetails(t)}</td>
          <td>${money(t.total || 0)}</td>
          <td>${money(t.paid || 0)}</td>
          <td class="${num(t.debtAfter)>0?'danger-text':'ok-text'}">${typeof t.debtAfter === 'number' ? money(t.debtAfter) : '-'}</td>
          <td>${esc(t.userName || '-')}</td>
          <td>${esc(t.note || '')}</td>
        </tr>`).join('')}</tbody></table>`;
    }
    function calcStats(list){
      const charges = list.filter(t=>t.type==='charge');
      const sales = list.filter(t=>t.type==='sale');
      const payments = list.filter(t=>t.type==='payment');
      return {
        chargeCount: charges.length,
        chargeTotal: charges.reduce((s,t)=>s+num(t.total),0),
        chargedPhones: new Set(charges.map(t=>t.targetPhone || t.customerName || t.id)).size,
        saleCount: sales.length,
        saleQty: sales.reduce((s,t)=>s+num(t.quantity),0),
        saleTotal: sales.reduce((s,t)=>s+num(t.total),0),
        paidTotal: list.reduce((s,t)=>s+num(t.paid),0),
        paymentsTotal: payments.reduce((s,t)=>s+num(t.paid),0),
        debtTotal: state.customers.reduce((s,c)=>s+num(c.balance),0),
        lowStock: state.items.filter(i=>i.active!==false && num(i.stock)<=3).length
      };
    }
    function statCard(icon, label, value, note=''){
      return `<div class="card stat"><div class="icon">${iconSvg(icon)}</div><div class="label">${label}</div><div class="num">${value}</div><div class="muted">${note}</div></div>`;
    }
    function renderDashboard(){
      const today = periodTransactions('day');
      const s = calcStats(today);
      document.getElementById('dashboardStats').innerHTML = [
        statCard('phone','عدد الشحن اليوم', s.chargeCount, `جوالات/عمليات: ${s.chargedPhones}`),
        statCard('money','قيمة الشحن اليوم', money(s.chargeTotal), 'إجمالي الشحن'),
        statCard('juice','مبيعات الأصناف اليوم', qty(s.saleQty), `القيمة: ${money(s.saleTotal)}`),
        statCard('alert','إجمالي الديون', money(s.debtTotal), `${state.customers.filter(c=>num(c.balance)>0).length} زبائن عليهم دين`)
      ].join('');
      document.getElementById('recentTable').innerHTML = transactionsTable(state.transactions, 8);
      const debts = state.customers.filter(c=>num(c.balance)>0).sort((a,b)=>num(b.balance)-num(a.balance)).slice(0,5);
      const low = state.items.filter(i=>i.active!==false && num(i.stock)<=3);
      const alerts = [];
      if(debts.length) alerts.push(...debts.map(c=>`<div class="summary-item"><span class="danger-text">${esc(c.name)}</span><strong>${money(c.balance)}</strong></div>`));
      if(low.length) alerts.push(...low.slice(0,5).map(i=>`<div class="summary-item"><span>مخزون قليل: ${esc(displayItemName(i))}</span><strong class="${num(i.stock)<=0?'danger-text':'muted'}">${qty(i.stock)}</strong></div>`));
      if(!alerts.length) alerts.push('<div class="empty">لا توجد ديون أو تنبيهات مخزون حالياً.</div>');
      document.getElementById('alertsBox').innerHTML = alerts.join('');
    }
    function renderCustomers(){
      const debts = state.customers.filter(c=>num(c.balance)>0).sort((a,b)=>num(b.balance)-num(a.balance));
      document.getElementById('debtSummary').innerHTML = debts.length ? debts.map(c=>`<div class="summary-item"><span class="danger-text">${esc(c.name)}${c.phone ? ' - '+esc(c.phone):''}</span><strong>${money(c.balance)}</strong></div>`).join('') : '<div class="empty">لا توجد ديون.</div>';
      const html = state.customers.length ? `<table><thead><tr><th>الاسم</th><th>الهاتف</th><th>الدين الحالي</th><th>ملاحظة</th><th>أضيف بتاريخ</th><th>إجراء</th></tr></thead><tbody>${state.customers.map(c=>`
        <tr>
          <td class="${num(c.balance)>0?'danger-text':''}">${esc(c.name)} ${num(c.balance)>0?'<span class="debt-dot"></span>':''}</td>
          <td>${esc(c.phone || '-')}</td>
          <td class="${num(c.balance)>0?'danger-text':'ok-text'}">${money(c.balance)}</td>
          <td>${esc(c.note || '')}</td>
          <td>${esc(formatDate(c.createdAt))}</td>
          <td class="actions" style="margin:0"><button class="btn secondary small" onclick="editCustomer('${c.id}')">تعديل</button><button class="btn danger small" onclick="deleteCustomer('${c.id}')">حذف</button></td>
        </tr>`).join('')}</tbody></table>` : '<div class="empty">لا يوجد زبائن بعد.</div>';
      document.getElementById('customersTable').innerHTML = html;
    }
    function renderInventory(){
      document.getElementById('itemsEditor').innerHTML = state.items.filter(i=>i.active!==false).map(i=>`
        <div class="inline-edit">
          <div class="field"><label>اسم الصنف</label><input value="${esc(i.name)}" placeholder="صنف بدون اسم" onchange="updateItem('${i.id}','name',this.value)"></div>
          <div class="field"><label>السعر (شيكل)</label><input type="number" min="0" step="0.01" value="${num(i.price)}" onchange="updateItem('${i.id}','price',this.value)"></div>
          <div class="field"><label>المخزون</label><input type="number" min="0" step="1" value="${qty(i.stock)}" onchange="updateItem('${i.id}','stock',this.value)"></div>
          <button class="btn danger small" onclick="deleteItem('${i.id}')">إخفاء</button>
        </div>`).join('') || '<div class="empty">لا توجد أصناف.</div>';
      const html = state.items.filter(i=>i.active!==false).length ? `<table><thead><tr><th>الصنف</th><th>السعر</th><th>المخزون</th><th>الحالة</th></tr></thead><tbody>${state.items.filter(i=>i.active!==false).map(i=>`
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
        statCard('wallet','المدفوعات المحصلة', money(s.paidTotal), `تسديد ديون: ${money(s.paymentsTotal)}`)
      ].join('');
      const bySource = {};
      list.filter(t=>t.type==='charge').forEach(t=>{
        const k = t.sourcePhone || 'غير محدد';
        bySource[k] ||= {count:0,total:0}; bySource[k].count++; bySource[k].total += num(t.total);
      });
      document.getElementById('sourceReport').innerHTML = Object.keys(bySource).length ? `<table><thead><tr><th>جهاز المصدر</th><th>عدد العمليات</th><th>إجمالي الشحن</th></tr></thead><tbody>${Object.entries(bySource).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v.count}</td><td>${money(v.total)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">لا توجد عمليات شحن في الفترة.</div>';
      const byUser = {};
      list.forEach(t=>{
        const k = t.userName || 'غير محدد';
        byUser[k] ||= {ops:0,charge:0,sale:0,paid:0};
        byUser[k].ops++;
        if(t.type==='charge') byUser[k].charge += num(t.total);
        if(t.type==='sale') byUser[k].sale += num(t.total);
        byUser[k].paid += num(t.paid);
      });
      document.getElementById('userReport').innerHTML = Object.keys(byUser).length ? `<table><thead><tr><th>المستخدم</th><th>عدد العمليات</th><th>شحن</th><th>مبيعات</th><th>مدفوع</th></tr></thead><tbody>${Object.entries(byUser).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v.ops}</td><td>${money(v.charge)}</td><td>${money(v.sale)}</td><td>${money(v.paid)}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">لا توجد عمليات في الفترة.</div>';
      document.getElementById('periodTransactionsTable').innerHTML = transactionsTable(list, 300);
    }
    function renderSettings(){
      const notice = document.getElementById('managerOnlyNotice');
      const content = document.getElementById('settingsContent');
      if(!notice || !content) return;
      notice.classList.toggle('hidden', isManager());
      content.classList.toggle('hidden', !isManager());
      if(!isManager()) return;
      document.getElementById('usersTable').innerHTML = `<table><thead><tr><th>الاسم</th><th>الصلاحية</th><th>PIN</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>${state.users.map(u=>`
        <tr><td>${esc(u.name)}</td><td>${u.role==='manager'?'مدير':'مستخدم'}</td><td>${esc(u.pin)}</td><td>${u.active===false?'<span class="pill danger">موقوف</span>':'<span class="pill ok">نشط</span>'}</td><td>${u.id===currentUser.id?'<span class="muted">الحالي</span>':`<button class="btn danger small" onclick="toggleUser('${u.id}')">${u.active===false?'تفعيل':'إيقاف'}</button>`}</td></tr>`).join('')}</tbody></table>`;
      document.getElementById('sourcePhonesList').innerHTML = state.sourcePhones.map((p,idx)=>`<div class="summary-item"><span>${esc(p)}</span><button class="btn danger small" onclick="removeSourcePhone(${idx})">حذف</button></div>`).join('') || '<div class="empty">لا توجد أجهزة مصدر.</div>';
    }
    function addUser(){
      if(!isManager()) return;
      const name = document.getElementById('newUserName').value.trim();
      const pin = document.getElementById('newUserPin').value.trim();
      const role = document.getElementById('newUserRole').value;
      if(!name || !pin) return toast('اكتب اسم المستخدم و PIN.');
      state.users.push({id:uid('user'), name, pin, role, active:true});
      saveState();
      ['newUserName','newUserPin'].forEach(id=>document.getElementById(id).value='');
      renderLoginUsers(); renderAll(); toast('تمت إضافة المستخدم.');
    }
    function toggleUser(id){
      if(!isManager()) return;
      const u = state.users.find(x=>x.id===id); if(!u) return;
      u.active = u.active === false;
      saveState(); renderLoginUsers(); renderAll();
    }
    function addSourcePhone(){
      if(!isManager()) return;
      const p = document.getElementById('newSourcePhone').value.trim();
      if(!p) return toast('اكتب اسم الجهاز/الخط.');
      if(!state.sourcePhones.includes(p)) state.sourcePhones.push(p);
      document.getElementById('newSourcePhone').value='';
      saveState(); renderAll(); toast('تمت إضافة جهاز المصدر.');
    }
    function removeSourcePhone(idx){
      if(!isManager()) return;
      if(!confirm('حذف جهاز المصدر؟ العمليات القديمة تبقى محفوظة.')) return;
      state.sourcePhones.splice(idx,1);
      saveState(); renderAll();
    }
    function exportData(){
      const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `charge-point-backup-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    }
    function importData(event){
      const file = event.target.files?.[0]; if(!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try{
          const data = JSON.parse(reader.result);
          if(!data.users || !data.transactions) throw new Error('bad');
          state = data;
          saveState();
          renderLoginUsers(); renderAll(); toast('تم استيراد البيانات بنجاح.');
        }catch(e){ toast('ملف الاستيراد غير صالح.'); }
      };
      reader.readAsText(file);
      event.target.value='';
    }
    function resetApp(){
      if(!isManager()) return;
      if(!confirm('تحذير: سيتم مسح كل البيانات من هذا المتصفح. هل أنت متأكد؟')) return;
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_KEY);
      state = loadState();
      logout();
      toast('تمت إعادة ضبط التطبيق.');
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

    init();

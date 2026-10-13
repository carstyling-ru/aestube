(() => {
  'use strict';
  const KEY = 'aestube-author-profiles-v1';
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const TYPES = {
    author:{label:'Автор',short:'Автор'},
    doctor:{label:'Подтвержденный врачебный аккаунт',short:'Врач'},
    training:{label:'Обучающий центр',short:'Обучающий центр'}
  };
  // Demonstration account metadata and award events; no production verification is performed.
  const meta = {
    delis:{number:6,type:'training',pro:true,nickname:'delis',joined:'2021-06-11',views:148360},
    davin:{number:42,type:'doctor',pro:true,nickname:'dr-davin-lim',joined:'2023-04-17',views:48200},
    energy:{number:30,type:'doctor',joined:'2024-02-20',views:12600},
    skin:{number:34,type:'doctor',joined:'2024-05-08',views:24500},
    diepenbrock:{number:38,type:'doctor',joined:'2021-03-15',views:108000},
    beyond:{number:36,type:'author',joined:'2025-01-19',views:6500},
    medi:{number:35,type:'training',joined:'2022-08-10',views:32100},
    people:{number:5,type:'author',pro:true,nickname:'people-skin',joined:'2025-06-09',views:2400},
    lisboa:{number:37,type:'author',joined:'2025-03-12',views:8200},
    gulnur:{number:39,type:'doctor',joined:'2024-07-11',views:17400},
    anna:{number:101,type:'doctor',joined:'2025-05-14',views:9300},
    maria:{number:102,type:'author',joined:'2024-01-09',views:22000},
    elena:{number:103,type:'training',joined:'2025-06-12',views:1400},
    irina:{number:104,type:'author',joined:'2026-03-18',views:740},
    olga:{number:105,type:'training',joined:'2023-08-24',views:21000},
    natalia:{number:106,type:'author',joined:'2025-08-16',views:4600}
  };
  const monthly = {
    delis:[{month:'2026-05',rank:7,date:'2026-06-11'},{month:'2026-03',rank:6,date:'2026-04-11'},{month:'2025-09',rank:1,date:'2025-10-11'},{month:'2025-06',rank:19,date:'2025-07-11'}],
    davin:[{month:'2026-05',rank:4,date:'2026-06-11'},{month:'2026-07',rank:18,date:'2026-08-11'}],
    energy:[{month:'2026-08',rank:22,date:'2026-09-11'}],
    diepenbrock:[{month:'2026-09',rank:1,date:'2026-10-11'}],
    medi:[{month:'2026-08',rank:9,date:'2026-09-11'}]
  };
  const viewDates = {delis:['2022-02-18','2024-03-12','2026-05-25'],davin:['2023-09-14','2025-02-12']};
  const awards = [
    {id:'best',name:'Лучший автор',group:'Рейтинг',condition:'Первое место в рейтинге авторов Aestube по итогам месяца.',rule:'month',rank:[1,1],art:'best.svg'},
    {id:'top10',name:'Топ-10 авторов',group:'Рейтинг',condition:'Попадание в Топ-10 авторов Aestube по итогам месяца.',rule:'month',rank:[2,10],art:'top10.svg'},
    {id:'top25',name:'Топ-25 авторов',group:'Рейтинг',condition:'Попадание в Топ-25 авторов Aestube по итогам месяца.',rule:'month',rank:[11,25],art:'top25.svg'},
    {id:'year1',name:'Год на Aestube',group:'Время с нами',condition:'Один год с момента регистрации на Aestube.',rule:'years',value:1,art:'year1.svg'},
    {id:'year3',name:'Три года на Aestube',group:'Время с нами',condition:'Три года с момента регистрации на Aestube.',rule:'years',value:3,art:'year3.svg'},
    {id:'year5',name:'Пять лет на Aestube',group:'Время с нами',condition:'Пять лет с момента регистрации на Aestube.',rule:'years',value:5,art:'year5.svg'},
    {id:'views1k',name:'1 000 просмотров',group:'Просмотры',condition:'Публикации автора набрали суммарно 1 000 просмотров.',rule:'views',value:1000,art:'views1k.svg'},
    {id:'views10k',name:'10 000 просмотров',group:'Просмотры',condition:'Публикации автора набрали суммарно 10 000 просмотров.',rule:'views',value:10000,art:'views10k.svg'},
    {id:'views100k',name:'100 000 просмотров',group:'Просмотры',condition:'Публикации автора набрали суммарно 100 000 просмотров.',rule:'views',value:100000,art:'views100k.svg'}
  ];
  let authors = [], overrides = {};
  try { overrides = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) {}
  const today = () => {const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const dateText = date => new Date(`${date}T12:00:00`).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'}).replace(/\s?г\.$/,'');
  const countText = n => n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14) ? `${n} раза` : `${n} раз`;
  function enrich(a) {
    const data = meta[a.id] || {number:a.id,type:'author',joined:'2025-01-01',views:0};
    const own = overrides[a.id] || {};
    return {...a,...data,nickname:data.pro ? own.nickname ?? data.nickname ?? '' : ''};
  }
  const currentAuthor = () => enrich(authors.find(a=>a.id==='delis') || {id:'delis',name:'Делис'});
  function findAuthor(value) {
    return authors.map(enrich).find(a=>a.id===value || String(a.number)===String(value) || (a.nickname && a.nickname===value));
  }
  function fromURL() {
    const p=new URLSearchParams(location.search);
    return p.has('nickname') ? findAuthor(p.get('nickname')) : findAuthor(p.get('author') || 'delis');
  }
  const identity = a => a.pro && a.nickname ? `nickname=${encodeURIComponent(a.nickname)}` : `author=${encodeURIComponent(a.number)}`;
  const profileURL = a => `author.html?${identity(enrich(a))}`;
  const collectionURL = a => `${profileURL(a)}&collection=1`;
  function badge(a, full = false) {
    const kind = enrich(a).type;
    const t = TYPES[kind];
    if(kind==='author')return '';
    return `<span class="cm-type-badge cm-type-badge--${kind}" title="${t.label}" aria-label="${t.label}">${t.short}</span>`;
  }
  function awardState(a, award) {
    a=enrich(a);let dates=[];
    if(award.rule==='month') dates=(monthly[a.id] || []).filter(e=>e.rank>=award.rank[0] && e.rank<=award.rank[1] && e.date<=today()).map(e=>e.date);
    if(award.rule==='years') {const date=`${Number(a.joined.slice(0,4))+award.value}${a.joined.slice(4)}`;if(date<=today())dates=[date];}
    if(award.rule==='views' && a.views>=award.value) dates=[viewDates[a.id]?.[[1000,10000,100000].indexOf(award.value)] || '2026-09-11'];
    dates.sort().reverse();return {dates,count:dates.length,last:dates[0],earned:dates.length>0};
  }
  const earnedAwards = a => awards.filter(item=>awardState(a,item).earned);
  const art = award => `assets/achievements/${award.art}`;
  function profileFeatures(a, isCollection = false) {
    a=enrich(a);const earned=earnedAwards(a);
    return `${a.nickname ? `<p class="cm-nickname">@${escape(a.nickname)}</p>` : ''}${!isCollection && earned.length ? `<div class="cm-profile-awards"><span class="cm-profile-awards__label">Достижения</span><div class="cm-profile-awards__items">${earned.slice(0,4).map(item=>`<button class="cm-mini-award" type="button" data-achievement="${item.id}" data-award-author="${a.id}" aria-label="${escape(item.name)}" title="${escape(item.name)}"><img src="${art(item)}" alt="">${awardState(a,item).count>1 ? `<span>${awardState(a,item).count}</span>` : ''}</button>`).join('')}<a class="cm-more-awards" href="${collectionURL(a)}" data-toggle-collection aria-expanded="false" aria-controls="cm-inline-collection" data-collapsed-label="${earned.length>4 ? `Ещё ${earned.length-4}` : 'Коллекция'} ›">${earned.length>4 ? `Ещё ${earned.length-4}` : 'Коллекция'} ›</a></div></div>${collectionMarkup()}` : ''}`;
  }
  function collectionMarkup(){return `<section id="cm-inline-collection" class="cm-collection cm-collection--inline" data-collection-content hidden><div class="cm-collection-head"><div><h2 class="hl-small-title">Коллекция <span class="cm-count" data-collection-count></span></h2><p>История достижений автора на Aestube</p></div><button class="button button--secondary" type="button" data-share-collection>Поделиться коллекцией</button></div><div class="cm-collection-share" data-collection-share hidden><label>Ссылка на коллекцию<input readonly aria-label="Ссылка на коллекцию"></label><button class="button button--secondary button--small" data-copy-collection type="button">Копировать</button></div><div class="tabs cm-collection-tabs"><button class="tab active" data-collection-filter="earned" type="button">Получено</button><button class="tab" data-collection-filter="all" type="button">Все достижения</button></div><div class="cm-collection-grid" data-collection-grid></div></section>`;}
  function initProfileCollection(a){
    const section=$('#cm-inline-collection'),toggle=$('[data-toggle-collection]');if(!section || !toggle)return;
    function setOpen(open){section.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Свернуть ‹':toggle.dataset.collapsedLabel;}
    const p=new URLSearchParams(location.search);setOpen(p.get('collection')==='1' || p.has('achievement'));
    toggle.onclick=e=>{e.preventDefault();setOpen(section.hidden);const url=new URL(location.href);if(section.hidden){url.searchParams.delete('collection');url.searchParams.delete('achievement');}else url.searchParams.set('collection','1');history.replaceState(null,'',url);};
    renderCollection(a,section);
  }
  function tabs(a, active) {
    const nav=$('[data-profile-tabs]');if(!nav)return;
    nav.innerHTML=`<a class="author-tab ${active==='author'?'active':''}" href="${profileURL(a)}">Видео</a>${a.id==='delis'?`<a class="author-tab ${active==='gallery'?'active':''}" href="author-gallery.html?${identity(enrich(a))}">Галерея</a>`:''}`;
  }
  function ensureDialog() {
    if($('[data-achievement-dialog]'))return;
    const dialog=document.createElement('dialog');dialog.className='cm-award-dialog';dialog.dataset.achievementDialog='';
    dialog.setAttribute('aria-label','Подробности достижения');
    dialog.innerHTML='<button class="cm-dialog-close" type="button" aria-label="Закрыть подробности">×</button><div class="cm-dialog-art" data-award-art></div><div class="cm-dialog-body"><span class="cm-eyebrow" data-award-group></span><h2 data-award-title></h2><p class="cm-award-description" data-award-description></p><div class="cm-award-owner" data-award-owner></div><section class="cm-award-history" data-award-history></section><div class="cm-dialog-actions"><a class="button button--secondary" data-own-collection>Моя</a><button class="button button--primary" type="button" data-share-award>Поделиться</button></div><div class="cm-share-box" data-share-box hidden><label for="cm-share-url">Ссылка на достижение</label><div><input id="cm-share-url" readonly><button class="button button--secondary button--small" type="button" data-copy-award>Копировать</button></div><p role="status" data-share-status></p></div></div>';
    document.body.appendChild(dialog);
    dialog.addEventListener('close',()=>document.body.classList.remove('cm-award-open'));
    dialog.querySelector('.cm-dialog-close').onclick=()=>dialog.close();
    dialog.addEventListener('click',e=>{if(e.target===dialog && (e.clientX<dialog.getBoundingClientRect().left || e.clientX>dialog.getBoundingClientRect().right || e.clientY<dialog.getBoundingClientRect().top || e.clientY>dialog.getBoundingClientRect().bottom))dialog.close();});
    dialog.querySelector('[data-share-award]').onclick=()=>{dialog.querySelector('[data-share-box]').hidden=false;dialog.querySelector('#cm-share-url').select();};
    dialog.querySelector('[data-copy-award]').onclick=async()=>{try{await navigator.clipboard.writeText(dialog.querySelector('#cm-share-url').value);dialog.querySelector('[data-share-status]').textContent='Ссылка скопирована';}catch(_){dialog.querySelector('[data-share-status]').textContent='Выделите ссылку и скопируйте её вручную.';dialog.querySelector('#cm-share-url').select();}};
  }
  function openAward(id, authorId) {
    const a=findAuthor(authorId), award=awards.find(item=>item.id===id);if(!a || !award)return;
    ensureDialog();const dialog=$('[data-achievement-dialog]'), s=awardState(a,award);
    dialog.querySelector('[data-award-art]').innerHTML=`<img src="${art(award)}" alt="${escape(award.name)}">`;
    dialog.querySelector('[data-award-group]').textContent=award.group;
    dialog.querySelector('[data-award-title]').textContent=award.name;
    dialog.querySelector('[data-award-description]').textContent=`${award.id==='top10'?'Ачивка за попадание в Топ-10 авторов Aestube по итогам месяца.':award.condition} ${s.earned ? `Получена ${countText(s.count)}. Последний — ${dateText(s.last)}.` : 'Пока не получена.'}`;
    dialog.querySelector('[data-award-owner]').innerHTML=`<img src="${a.avatar || 'assets/avatar.jpg'}" alt=""><div><span>Коллекция автора</span><a href="${collectionURL(a)}">${escape(a.name)}</a></div>`;
    dialog.querySelector('[data-award-history]').innerHTML=s.earned ? `<h3>История получения</h3>${s.dates.map(date=>`<div><span>${dateText(date)}</span><span>Получена</span></div>`).join('')}` : `<h3>Как получить</h3><p>${escape(award.condition)}</p>${award.rule==='views'?`<div class="cm-progress"><i style="width:${Math.min(100,a.views/award.value*100)}%"></i></div><p>${a.views.toLocaleString('ru-RU')} из ${award.value.toLocaleString('ru-RU')} просмотров</p>`:''}`;
    dialog.querySelector('[data-own-collection]').href=collectionURL(currentAuthor());
    dialog.querySelector('[data-share-award]').disabled=!s.earned;
    dialog.querySelector('[data-share-box]').hidden=true;dialog.querySelector('[data-share-status]').textContent='';
    const url=new URL(collectionURL(a),location.href);url.searchParams.set('achievement',award.id);dialog.querySelector('#cm-share-url').value=url.href;
    if(!dialog.open)dialog.showModal();document.body.classList.add('cm-award-open');
  }
  function bindAwards() {
    if(document.body.dataset.awardsBound)return;
    document.body.dataset.awardsBound='true';
    document.addEventListener('click',event=>{const button=event.target.closest('[data-achievement]');if(button)openAward(button.dataset.achievement,button.dataset.awardAuthor);});
  }
  function renderCollection(a,root=document) {
    const $ = selector=>root.querySelector(selector);
    const target=$('[data-collection-grid]');if(!target)return;
    a=enrich(a);let category='earned';
    const earned=earnedAwards(a);$('[data-collection-count]').textContent=earned.length;
    $('[data-share-collection]').onclick=()=>{
      const box=$('[data-collection-share]');box.hidden=!box.hidden;box.querySelector('input').value=new URL(collectionURL(a),location.href).href;
    };
    $('[data-copy-collection]').onclick=async()=>{const input=$('[data-collection-share] input');try{await navigator.clipboard.writeText(input.value);showToast('Ссылка на коллекцию скопирована');}catch(_){input.select();showToast('Скопируйте выделенную ссылку');}};
    function render() {
      const visible=awards.filter(item=>category==='all' || awardState(a,item).earned);
      target.innerHTML=visible.length ? visible.map(item=>{const s=awardState(a,item);return `<button class="cm-collectible ${s.earned?'':'is-locked'}" data-achievement="${item.id}" data-award-author="${a.id}" type="button"><span class="cm-collectible__art"><img src="${art(item)}" alt="">${s.count>1?`<b class="cm-award-count">×${s.count}</b>`:''}${!s.earned?'<span class="cm-locked-label">Не получена</span>':''}</span><strong>${item.name}</strong><span>${s.earned ? dateText(s.last) : item.group}</span></button>`;}).join('') : '<p class="cm-empty">Пока нет достижений. Посмотрите все награды и условия их получения.</p>';
    }
    root.querySelectorAll('[data-collection-filter]').forEach(button=>button.onclick=()=>{category=button.dataset.collectionFilter;root.querySelectorAll('[data-collection-filter]').forEach(b=>b.classList.toggle('active',b===button));render();});
    render();bindAwards();const id=new URLSearchParams(location.search).get('achievement');if(id)openAward(id,a.id);
  }
  function initFilter(renderCards) {
    const host=$('[data-author-filter]');if(!host)return;
    let selected=new Set((new URLSearchParams(location.search).get('types') || '').split(',').filter(key=>TYPES[key]));
    host.innerHTML=`<div class="cm-filter-row"><details class="cm-type-filter"><summary><span>Тип аккаунта:</span> <b data-type-filter-label>Все</b><svg class="icon" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></summary><fieldset><legend class="cm-sr-only">Тип аккаунта</legend>${Object.entries(TYPES).map(([id,type])=>`<label><input type="checkbox" value="${id}" ${selected.has(id)?'checked':''}><span>${type.label}</span><b aria-hidden="true">${authors.filter(a=>enrich(a).type===id).length}</b></label>`).join('')}<button class="cm-filter-reset" type="button">Сбросить</button></fieldset></details><span class="cm-filter-result" data-filter-count></span></div><div class="cm-filter-chips" data-type-chips></div>`;
    const detail=host.querySelector('details');
    function update() {
      const list=authors.map(enrich).filter(a=>!selected.size || selected.has(a.type));renderCards(list);
      host.querySelector('[data-type-filter-label]').textContent=!selected.size?'Все':selected.size===1?TYPES[[...selected][0]].short:`Выбрано: ${selected.size}`;
      host.querySelector('[data-filter-count]').textContent=`Показано ${list.length} из ${authors.length}`;
      host.querySelector('[data-type-chips]').innerHTML=[...selected].map(id=>`<button type="button" data-remove-type="${id}">${TYPES[id].short}<span aria-hidden="true">×</span></button>`).join('');
      const url=new URL(location.href);if(selected.size)url.searchParams.set('types',[...selected].join(','));else url.searchParams.delete('types');history.replaceState(null,'',url);
    }
    host.querySelectorAll('input').forEach(input=>input.onchange=()=>{input.checked?selected.add(input.value):selected.delete(input.value);update();});
    host.querySelector('.cm-filter-reset').onclick=()=>{selected.clear();host.querySelectorAll('input').forEach(i=>i.checked=false);update();};
    host.addEventListener('click',e=>{const chip=e.target.closest('[data-remove-type]');if(chip){selected.delete(chip.dataset.removeType);host.querySelector(`input[value="${chip.dataset.removeType}"]`).checked=false;update();}});
    document.addEventListener('click',e=>{if(!host.contains(e.target))detail.open=false;});
    host.addEventListener('keydown',e=>{if(e.key==='Escape'){detail.open=false;host.querySelector('summary').focus();}});update();
  }
  function initSettings() {
    const form=$('[data-profile-settings]');if(!form)return;const a=currentAuthor(), input=$('#cm-profile-nickname');
    input.value=a.nickname || '';
    const status=$('[data-nickname-status]');
    function preview(){const value=input.value.trim().toLowerCase();const url=value?`author.html?nickname=${encodeURIComponent(value)}`:`author.html?author=${a.number}`;$('[data-nickname-url]').textContent=new URL(url,location.href).href;$('[data-open-profile]').href=profileURL(currentAuthor());}
    input.oninput=()=>{status.textContent='';status.classList.remove('is-error');input.setCustomValidity('');preview();};preview();
    form.onsubmit=e=>{
      e.preventDefault();const nick=input.value.trim().toLowerCase();
      let error='';
      if(!a.pro)error='Никнейм доступен для аккаунтов PRO.';
      else if(nick && !/^[a-z][a-z0-9_-]{2,29}$/.test(nick))error='Используйте от 3 до 30 символов: латинские буквы, цифры, дефис или подчёркивание. Начните с буквы.';
      else if(nick && (['admin','support','authors','my','aestube','collection','profile'].includes(nick) || authors.map(enrich).some(other=>other.id!==a.id && (other.nickname===nick || other.id===nick))))error='Этот никнейм занят. Выберите другой.';
      if(error){status.textContent=error;status.classList.add('is-error');input.focus();return;}
      try {const next={...overrides,[a.id]:{...(overrides[a.id] || {}),nickname:nick}};localStorage.setItem(KEY,JSON.stringify(next));overrides=next;status.classList.remove('is-error');status.textContent='Никнейм сохранён';input.value=nick;preview();window.dispatchEvent(new CustomEvent('aestube:profile-updated'));}
      catch(_){status.textContent='Не удалось сохранить никнейм. Проверьте доступность хранилища браузера.';status.classList.add('is-error');}
    };
    $('[data-copy-profile]').onclick=async()=>{try{await navigator.clipboard.writeText($('[data-nickname-url]').textContent);showToast('Ссылка на профиль скопирована');}catch(_){showToast('Выделите ссылку и скопируйте её вручную');}};
  }
  window.AestubeCommunity={init:list=>{authors=list;return list.map(enrich);},enrich,findAuthor,fromURL,currentAuthor,profileURL,collectionURL,badge,profileFeatures,tabs,bindAwards,renderCollection,initProfileCollection,initFilter,initSettings};
})();

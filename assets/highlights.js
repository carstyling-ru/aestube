(() => {
  'use strict';
  const KEY = 'aestube-highlights-v1';
  const HOUR = 3600000;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const community = window.AestubeCommunity;
  const authors = community.init([
    {id:'delis', name:'Делис', avatar:'assets/avatar.jpg', about:'Дистрибьюторская компания косметологических брендов. Обучаем специалистов и делимся результатами.', videos:22},
    {id:'davin', name:'Dr Davin Lim', avatar:'assets/author-davin.jpg', about:'Дерматология, лазерные процедуры и забота о здоровье кожи.', videos:30},
    {id:'energy', name:'energyclinic.ufa', avatar:'assets/author-energy.jpg', about:'Терентьева Зульфия Махмутовна. Эстетическая косметология.', videos:5},
    {id:'skin', name:'Skin Perfect', avatar:'assets/author-skin.jpg', about:'Skin Perfect Medical Aesthetics. Процедуры и результаты.', videos:23},
    {id:'diepenbrock', name:'Dr Diepenbrock', avatar:'assets/author-diepenbrock.jpg', about:'Facial Cosmetic Surgery. Хирургические и нехирургические методики.', videos:45},
    {id:'beyond', name:'GoBeyond Aesthetics', avatar:'assets/author-beyond.jpg', about:'Эстетическая медицина и уход за кожей.', videos:31},
    {id:'medi', name:'MEDiTHREAD', avatar:'assets/author-medi.jpg', about:'Нитевые методики и обучение специалистов.', videos:22},
    {id:'people', name:'People & Skin', avatar:'assets/author-people.webp', about:'Профессиональная косметология и уход.', videos:2},
    {id:'lisboa', name:'Lisboa Beauty', avatar:'assets/author-lisboa.jpg', about:'Lisboa Beauty Service. Красота каждый день.', videos:7},
    {id:'gulnur', name:'Гульнур косметолог', initials:'ГК', about:'Врач дерматовенеролог, косметолог, к.м.н.', videos:16},
    {id:'anna', name:'Анна Миронова', initials:'АМ', demo:true, about:'Инъекционная косметология и клинические разборы.', videos:18},
    {id:'maria', name:'Мария Котова', initials:'МК', demo:true, about:'Пилинги и восстановительные протоколы.', videos:12},
    {id:'elena', name:'Елена Волкова', initials:'ЕВ', demo:true, about:'Аппаратная косметология и уход.', videos:9},
    {id:'irina', name:'Ирина Белова', initials:'ИБ', demo:true, about:'Уход за кожей и профилактика возрастных изменений.', videos:14},
    {id:'olga', name:'Ольга Соколова', initials:'ОС', demo:true, about:'Эстетическая медицина и обучение.', videos:11},
    {id:'natalia', name:'Наталья Орлова', initials:'НО', demo:true, about:'Результаты процедур и ежедневная практика.', videos:8}
  ]);
  const authorById = id => community.findAuthor(id) || authors[0];
  const periodLabel = () => `${state.period} ${state.period === 24 ? 'часа' : 'часов'}`;
  const fontFamilies = {classic:'Inter, sans-serif', editorial:'Georgia, serif', strong:'"Fira Sans", sans-serif'};
  const sampleTitles = ['Результат процедуры', 'Кожа после ухода', 'Из нашей практики', 'Ответ на частый вопрос'];
  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)); } catch (_) {}
  if (!state || state.version !== 1) {
    const now = Date.now();
    state = {version:1, period:24, mode:'all', subscriptions:[], seen:[], reactions:{}, comments:{}, stories:[]};
    authors.forEach((author, i) => {
      state.stories.push({id:`${author.id}-1`, author:author.id, type:i === 9 ? 'video' : 'photo',
        src:i === 9 ? 'assets/highlight-demo.mp4' : ['assets/gallery-single.webp','assets/after.webp','assets/highlight-led.jpg','assets/highlight-laser.jpg'][i % 4],
        cover:i === 9 ? 'assets/highlight-hair.jpg' : ['assets/gallery-single.webp','assets/after.webp','assets/highlight-led.jpg','assets/highlight-laser.jpg'][i % 4],
        title:i === 9 ? 'Трансплантация волос' : sampleTitles[i % 4], created:now - (i * 1.35 + .1) * HOUR,
        duration:i === 9 ? 12 : 7, start:0, pinned:i === 0,
        text:i === 0 ? 'Результат через 14 дней' : '', textStyle:{font:'classic',size:25,color:'#ffffff',background:'#10233f',backdrop:true,align:'center',x:50,y:72}});
    });
    state.stories.push({id:'delis-2',author:'delis',type:'video',src:'assets/highlight-demo.mp4',cover:'assets/highlight-hair.jpg',title:'Коротко о процедуре',created:now - 2 * HOUR,duration:12,start:0,pinned:false,text:''});
    for (let i = 0; i < 5; i++) state.stories.push({id:`delis-archive-${i}`,author:'delis',type:'photo',src:['assets/before.webp','assets/after.webp','assets/video-1.jpg','assets/video-2.jpg','assets/gallery-single.webp'][i],cover:['assets/before.webp','assets/after.webp','assets/video-1.jpg','assets/video-2.jpg','assets/gallery-single.webp'][i],title:['До процедуры','Результат через 14 дней','Обучение специалистов','Новый протокол','Восстановление кожи'][i],created:now - (48 + 24 * i) * HOUR,duration:7,pinned:i === 1,text:''});
    state.seen.push('olga-1','natalia-1');
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
    catch (_) { showToast('Не удалось сохранить изменения. Проверьте доступность хранилища браузера.'); return false; }
  }
  save();
  const activeStories = () => state.stories.filter(s => Date.now() - s.created < state.period * HOUR);
  const allowedStories = () => activeStories().filter(s => state.mode !== 'subscriptions' || !state.subscriptions.length || state.subscriptions.includes(s.author));
  const storiesFor = id => activeStories().filter(s => s.author === id).sort((a,b) => b.created - a.created);
  const isSeen = s => state.seen.includes(s.id);
  const authorSeen = id => { const items = storiesFor(id); return items.length > 0 && items.every(isSeen); };
  function age(time) {
    const hours = (Date.now() - time) / HOUR;
    if (hours < 1) return `${Math.max(1,Math.floor(hours * 60))} мин назад`;
    if (hours < 24) return `${Math.floor(hours)} ч назад`;
    return `${Math.floor(hours / 24)} дн назад`;
  }
  function avatar(a) {
    return a.avatar ? `<img src="${esc(a.avatar)}" alt="${esc(a.name)}">` : `<span class="hl-avatar-initials" style="background:${['#e8e4f3','#e3edf3','#f2e3ea'][authors.indexOf(a)%3]}">${esc(a.initials)}</span>`;
  }
  function ring(a, size = '') {
    const items = storiesFor(a.id);
    return `<span class="hl-ring ${size} ${items.length ? authorSeen(a.id) ? 'is-seen' : '' : 'is-empty'}">${avatar(a)}</span>`;
  }
  const storyURL = (s, scope = 'single') => `highlight-view.html?author=${encodeURIComponent(s.author)}&story=${encodeURIComponent(s.id)}&scope=${scope}`;
  const authorURL = a => community.profileURL(a);
  const viewURL = (a, scope = 'feed') => `highlight-view.html?author=${encodeURIComponent(a.id)}&scope=${scope}`;
  function feed() {
    const target = $('[data-highlight-feed]');
    if (!target) return;
    const sorted = [...authors].filter(a => allowedStories().some(s=>s.author === a.id)).sort((a,b) => Number(authorSeen(a.id)) - Number(authorSeen(b.id)) || Math.max(...storiesFor(b.id).map(s=>s.created)) - Math.max(...storiesFor(a.id).map(s=>s.created)));
    target.innerHTML = sorted.length ? sorted.map(a => {
      const items = storiesFor(a.id);
      return `<a class="hl-avatar-item" href="${viewURL(a)}" aria-label="${esc(a.name)}: ${items.length} ${items.length === 1 ? 'публикация' : 'публикации'}, ${authorSeen(a.id) ? 'просмотрено' : 'не просмотрено'}">${ring(a)}<span class="hl-avatar-item__name">${esc(a.name)}</span>${document.body.dataset.highlightsPage === 'feed' ? `<span class="hl-avatar-item__meta">${items.length} ${items.length === 1 ? 'публикация' : 'публикации'} · ${age(items[0].created)}</span>` : ''}</a>`;
    }).join('') : '<p class="hl-empty">Пока нет актуальных публикаций. Посмотрите закреплённое в профилях авторов.</p>';
    document.querySelectorAll('[data-scroll]').forEach(button => button.onclick = () => target.scrollBy({left:Number(button.dataset.scroll) * target.clientWidth * .8,behavior:'smooth'}));
  }
  const videos = [
    {title:'Which Microneedling Device Is The Best?',image:'assets/highlight-microneedling.jpg',author:'davin',time:'9:26',views:47},
    {title:'The Science of LED’s in Dermatology',image:'assets/highlight-led.jpg',author:'davin',time:'8:18',views:41},
    {title:'Using SkinCeuticals RGN-6 in Your Post-Laser Routine',image:'assets/highlight-laser.jpg',author:'davin',time:'3:52',views:45},
    {title:'HAIR X PEPTIDE',image:'assets/video-1.jpg',author:'delis',time:'1:02',views:382},
    {title:'G&S_EP12 APPLEPEEL',image:'assets/video-2.jpg',author:'delis',time:'1:56',views:181},
    {title:'СкинСинержи',image:'assets/video-3.jpg',author:'delis',time:'3:33',views:176},
    {title:'БРВ Мезофарм',image:'assets/video-4.jpg',author:'delis',time:'0:54',views:129},
    {title:'Трансплантация волос',image:'assets/highlight-hair.jpg',author:'gulnur',time:'0:12',views:63}
  ];
  function videoCard(v) {
    const a = authorById(v.author);
    return `<article class="hl-video-card"><a class="hl-video-card__image" href="playlist-open.html"><img src="${v.image}" alt="${esc(v.title)}"><span>${v.time}</span></a><div class="hl-video-card__body">${a.avatar ? `<img src="${a.avatar}" alt="">` : ''}<div><a class="hl-video-card__title" href="playlist-open.html">${esc(v.title)}</a><a class="hl-video-card__author" href="${authorURL(a)}">${esc(a.name)}</a><span class="hl-video-card__meta">${v.views} · 3 недели назад</span></div></div></article>`;
  }
  function authorCard(a) {
    const subscribed = state.subscriptions.includes(a.id);
    return `<article class="hl-author-card"><a class="hl-profile-link" href="${storiesFor(a.id).length ? viewURL(a,'author') : authorURL(a)}" aria-label="${esc(a.name)}${storiesFor(a.id).length ? ' — смотреть актуальное' : ''}">${ring(a,'hl-ring--large')}</a><div class="cm-name-row"><a class="hl-author-card__name" href="${authorURL(a)}">${esc(a.name)}</a>${community.badge(a)}${a.pro?'<span class="pro-badge">PRO</span>':''}</div><span class="hl-author-card__stats">${a.id === 'delis' ? 6 : 1} подписано · ${a.videos} видео</span><p class="hl-author-card__about">${esc(a.about)}</p>${a.demo ? '<span class="hl-author-card__note">Автор-пример</span>' : ''}<button class="button button--secondary button--small" data-subscribe="${a.id}">${subscribed ? 'Отписаться' : 'Подписаться'}</button></article>`;
  }
  function homeAuthorCard(a, index) {
    const hasHighlights = (index === 1 || index === 2) && storiesFor(a.id).length > 0;
    const authorAvatar = hasHighlights ? ring(a,'hl-ring--large') : `<span class="hl-ring hl-ring--large is-empty">${avatar(a)}</span>`;
    return `<article class="hl-author-card hl-author-card--horizontal"><a class="hl-profile-link" href="${hasHighlights ? viewURL(a,'author') : authorURL(a)}" aria-label="${esc(a.name)}${hasHighlights ? ' — смотреть актуальное' : ''}">${authorAvatar}</a><div class="hl-author-card__content"><div class="cm-name-row"><a class="hl-author-card__name" href="${authorURL(a)}">${esc(a.name)}</a>${community.badge(a)}</div><span class="hl-author-card__stats">${a.id === 'delis' ? 6 : 1} подписано · ${a.videos} видео</span><p class="hl-author-card__about">${esc(a.about)}</p></div></article>`;
  }
  function subscriptions() {
    document.querySelectorAll('[data-subscribe]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.subscribe;
      state.subscriptions = state.subscriptions.includes(id) ? state.subscriptions.filter(x=>x !== id) : [...state.subscriptions,id];
      state.mode = state.subscriptions.length ? 'subscriptions' : 'all';
      save();
      button.textContent = state.subscriptions.includes(id) ? 'Отписаться' : 'Подписаться';
      showToast(state.subscriptions.includes(id) ? 'Вы подписались на автора' : 'Подписка отменена');
    }));
  }
  function home() {
    $('[data-home-sections]').innerHTML = [['Рекомендуемое','recommended',videos.slice(0,4)],['Новое','new',[videos[7],...videos.slice(4,7)]],['Популярное','popular',videos.slice(3,7)],['Лучшее','best',[videos[5],videos[3],videos[4],videos[0]]]].map(([title,id,items]) => `<section class="panel" id="${id}"><div class="hl-section-head"><a class="hl-section-title" href="playlist-open.html">${title} <span>›</span></a></div><div class="hl-video-grid">${items.map(videoCard).join('')}</div></section>`).join('');
    const authorList = $('[data-home-authors]');
    authorList.innerHTML = authors.slice(0,4).map(homeAuthorCard).join('');
    document.querySelectorAll('[data-authors-scroll]').forEach(button => button.addEventListener('click', () => authorList.scrollBy({left:Number(button.dataset.authorsScroll) * (authorList.clientWidth + 16),behavior:'smooth'})));
    subscriptions();
  }
  function renderPins(id) {
    const target = $('[data-author-pins]');
    if (!target) return;
    const pins = state.stories.filter(s=>s.author === id && s.pinned).sort((a,b)=>b.created-a.created);
    const section = target.closest('.hl-pinned-section');
    if (section) section.hidden = !pins.length;
    target.innerHTML = pins.map(s => `<a class="hl-avatar-item" href="${storyURL(s,'pinned')}" aria-label="${esc(s.title)}"><span class="hl-ring is-empty"><img src="${esc(s.cover || s.src)}" alt=""></span><span class="hl-avatar-item__name">${esc(s.title)}</span></a>`).join('');
  }
  function profile() {
    const a = community.fromURL();
    if (!a) { $('[data-author-profile]').innerHTML='<h1 class="hl-section-title">Автор не найден</h1><p class="cm-empty">Проверьте никнейм или выберите автора из списка.</p><a class="button button--secondary" href="authors.html">Авторы</a>'; document.querySelectorAll('[data-profile-tabs], [data-collection-content]').forEach(el=>el.hidden=true); return; }
    document.title = `${a.name} — Aestube`;
    $('[data-author-profile]').innerHTML = `<div class="author-profile__top"><a class="hl-profile-link" href="${storiesFor(a.id).length ? viewURL(a,'pinned') : '#'}" aria-label="Смотреть закреплённое автора">${ring(a,'hl-ring--large')}</a><div><h1 class="author-profile__name">${esc(a.name)} ${community.badge(a,true)} ${a.pro ? '<span class="pro-badge">PRO</span>' : ''}</h1><p class="author-profile__about">${esc(a.about)}</p><div class="author-profile__stats"><span>${a.id === 'delis' ? '6 подписано · 22 видео · 2 фото' : `1 подписано · ${a.videos} видео`}</span></div></div><button class="button button--secondary hl-profile-subscribe" data-subscribe="${a.id}">${state.subscriptions.includes(a.id) ? 'Отписаться' : 'Подписаться'}</button></div>${community.profileFeatures(a,document.body.dataset.highlightsPage==='collection')}`;
    const authorVideos=$('[data-author-videos]');
    if(authorVideos)authorVideos.innerHTML = videos.filter(v=>v.author === a.id).map(videoCard).join('') || videos.slice(4,8).map(v=>videoCard({...v,author:a.id})).join('');
    renderPins(a.id); subscriptions();community.tabs(a,document.body.dataset.highlightsPage);community.bindAwards();community.initProfileCollection(a);
    return a;
  }
  function galleryProfile() {
    const img = $('.author-profile__avatar');
    if (img) { const link = document.createElement('a'); link.className = 'hl-profile-link'; link.href = viewURL(authors[0],'pinned'); link.setAttribute('aria-label','Смотреть закреплённое Делис'); link.innerHTML = ring(authors[0],'hl-ring--large'); img.replaceWith(link); }
    const name=$('.author-profile__name');if(!name.querySelector('.cm-type-badge'))name.insertAdjacentHTML('beforeend',community.badge(authors[0],true));
    if(!$('[data-gallery-awards]')){const features=document.createElement('div');features.dataset.galleryAwards='';features.innerHTML=community.profileFeatures(authors[0]);$('.author-profile__top').after(features);}
    community.tabs(authors[0],'gallery');community.bindAwards();community.initProfileCollection(authors[0]);
    renderPins('delis');
  }
  function manage() {
    const own = state.stories.filter(s=>s.author === 'delis').sort((a,b)=>b.created-a.created);
    const current = own.filter(s=>Date.now()-s.created < state.period * HOUR);
    const archived = own;
    $('[data-my-period]').textContent = `${periodLabel()} после публикации`;
    const card = s => `<article class="hl-manage-card"><a class="hl-avatar-item" href="${storyURL(s)}"><span class="hl-ring ${Date.now()-s.created >= state.period * HOUR ? 'is-empty' : isSeen(s) ? 'is-seen' : ''}"><img src="${esc(s.cover || s.src)}" alt="${esc(s.title)}"></span></a><span class="hl-manage-card__title">${esc(s.title)}</span><span class="hl-manage-card__time">${s.type === 'video' ? 'Видео' : 'Фото'} · ${s.duration} сек · ${age(s.created)}</span><span class="hl-manage-pin">${s.pinned ? 'Закреплено в профиле' : 'Не закреплено'}</span><div class="hl-manage-card__actions"><button class="button button--secondary button--small" data-pin="${s.id}">${s.pinned ? 'Открепить' : 'Закрепить'}</button><button class="button button--danger button--icon" data-delete="${s.id}" aria-label="Удалить ${esc(s.title)}">${icon('trash')}</button></div></article>`;
    $('[data-my-active]').innerHTML = '<a class="hl-add" href="highlight-create.html"><span>+</span><span>Добавить</span></a>' + current.map(card).join('');
    $('[data-my-archive]').innerHTML = archived.map(card).join('') || '<p class="hl-empty">Архив пока пуст.</p>';
    $('[data-archive-count]').textContent = `(${archived.length})`;
    document.querySelectorAll('[data-pin]').forEach(button=>button.addEventListener('click',()=>{const item = state.stories.find(s=>s.id === button.dataset.pin); item.pinned = !item.pinned; save(); manage(); showToast(item.pinned ? 'Публикация закреплена в профиле' : 'Публикация откреплена');}));
    document.querySelectorAll('[data-delete]').forEach(button=>button.addEventListener('click',()=>{ $('[data-delete-dialog]').dataset.story = button.dataset.delete; $('[data-delete-dialog]').showModal(); }));
  }
  function openMediaDB() {
    return new Promise((resolve,reject)=>{ const req = indexedDB.open('aestube-highlight-media',1); req.onupgradeneeded = ()=>req.result.createObjectStore('media'); req.onsuccess = ()=>resolve(req.result); req.onerror = ()=>reject(req.error); });
  }
  async function putMedia(id, blob, cover) {
    const db = await openMediaDB();
    try { await new Promise((resolve,reject)=>{ const tx=db.transaction('media','readwrite'); tx.objectStore('media').put({blob,cover},id); tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error); tx.onabort=()=>reject(tx.error); }); } finally { db.close(); }
  }
  async function getMedia(id) {
    const db = await openMediaDB();
    try { return await new Promise((resolve,reject)=>{ const req=db.transaction('media','readonly').objectStore('media').get(id); req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error); }); } finally { db.close(); }
  }
  async function removeMedia(id) {
    const db = await openMediaDB();
    try { await new Promise((resolve,reject)=>{const tx=db.transaction('media','readwrite');tx.objectStore('media').delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);}); } finally {db.close();}
  }
  async function resolveMedia(s) {
    if (!s.mediaId) return s.src;
    const entry = await getMedia(s.mediaId);
    if (!entry) throw new Error('Файл недоступен');
    return URL.createObjectURL(entry.blob);
  }
  function styleText(el, story, scale = 1) {
    const style = story.textStyle || {};
    el.textContent = story.text || '';
    el.hidden = !story.text;
    Object.assign(el.style,{fontFamily:fontFamilies[style.font] || fontFamilies.classic,fontSize:`${(style.size || 25) * scale}px`,fontWeight:style.font === 'strong' ? '600' : '400',color:style.color || '#ffffff',background:style.backdrop === false ? 'transparent' : style.background || '#10233f',textAlign:style.align || 'center',left:`${style.x ?? 50}%`,top:`${style.y ?? 72}%`});
  }
  function initViewerPopup() {
    if(document.body.dataset.highlightsPage==='viewer')return;
    let dialog,frame,opener;
    function close(){if(dialog?.open)dialog.close();}
    document.addEventListener('click',event=>{
      const link=event.target.closest('a[href]');if(!link || event.defaultPrevented || event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)return;
      const url=new URL(link.href,location.href);if(url.origin!==location.origin || !url.pathname.endsWith('/highlight-view.html'))return;
      event.preventDefault();
      opener=link;
      if(!dialog){
        dialog=document.createElement('dialog');dialog.className='hl-view-dialog';dialog.setAttribute('aria-label','Просмотр короткого видео');
        frame=document.createElement('iframe');frame.title='Просмотр короткого видео';frame.allow='autoplay; fullscreen';dialog.appendChild(frame);document.body.appendChild(dialog);
        dialog.addEventListener('close',()=>{frame.src='about:blank';document.body.classList.remove('hl-popup-open');if(opener?.isConnected)opener.focus();});
      }
      url.searchParams.set('embedded','1');frame.src=url.href;dialog.showModal();document.body.classList.add('hl-popup-open');
    });
    window.addEventListener('message',event=>{if(frame && event.source===frame.contentWindow && event.origin===location.origin && event.data?.type==='aestube:close-viewer')close();});
  }
  async function viewer() {
    const params = new URLSearchParams(location.search);
    const explicit = state.stories.find(s=>s.id === params.get('story'));
    const chosen = params.get('author') || explicit?.author || allowedStories()[0]?.author;
    const scope = params.get('scope') || 'author';
    let queue;
    if (scope === 'pinned') {
      queue = state.stories.filter(s=>s.author === chosen && s.pinned).sort((a,b)=>b.created-a.created);
    } else if (scope === 'feed') {
      const own = storiesFor(chosen).sort((a,b)=>a.created-b.created);
      const remaining = allowedStories().filter(s=>s.author !== chosen && !isSeen(s)).sort((a,b)=>b.created-a.created);
      queue = [...own,...remaining];
    } else if (explicit && explicit.author === chosen) {
      queue = [explicit];
    } else {
      queue = storiesFor(chosen).sort((a,b)=>a.created-b.created);
    }
    let index = Math.max(0, explicit ? queue.findIndex(s=>s.id === explicit.id) : scope === 'pinned' ? 0 : queue.findIndex(s=>s.author === chosen && !isSeen(s)));
    let elapsed=0, last=performance.now(), paused=false, sourceReady=false, finished=false, sourceURL='', renderToken=0;
    const video = $('[data-story-video]');
    const image = $('[data-story-image]');
    const pause = $('[data-story-pause]');
    const exitURL = scope === 'feed' ? 'highlights.html' : scope === 'single' ? 'my-highlights.html' : authorURL(authorById(chosen));
    const embedded=params.get('embedded')==='1' && window.parent!==window;
    function closeViewer(){if(embedded)window.parent.postMessage({type:'aestube:close-viewer'},location.origin);else location.href=exitURL;}
    $('[data-story-end] a').href = exitURL;
    $('.hl-view-close').href = exitURL;
    if(embedded){
      for(const link of [$('.hl-view-close'),$('[data-story-end] a')])link.addEventListener('click',event=>{event.preventDefault();closeViewer();});
      $('[data-story-end] a').textContent='Закрыть просмотр';
    }
    if (scope !== 'feed') {
      $('[data-story-end] h2').textContent = scope === 'pinned' ? (queue.length ? 'Закреплённое просмотрено' : 'Нет закреплённых публикаций') : 'Просмотр завершён';
      $('[data-story-end] p').textContent = scope === 'single' ? 'Вы можете вернуться к своим публикациям.' : 'Другие публикации автора доступны в его профиле.';
      $('[data-story-end] a').textContent = scope === 'single' ? 'Вернуться в кабинет' : 'Вернуться в профиль';
    }
    if(embedded)$('[data-story-end] a').textContent='Закрыть просмотр';
    function markSeen() { const s=queue[index]; if(s && !isSeen(s)) {state.seen.push(s.id);save();} }
    function setPause(value) {
      paused=value; last=performance.now(); pause.textContent=paused ? '▶' : 'Ⅱ'; pause.setAttribute('aria-label',paused ? 'Продолжить' : 'Пауза');
      if(queue[index]?.type === 'video' && sourceReady) {if(paused) video.pause();else video.play().catch(()=>setPause(true));}
    }
    function finish() { finished=true; setPause(true); $('[data-story-end]').hidden=false; $('[data-story-next]').disabled=true; }
    function reactions() {
      const s=queue[index]; if(!s) return;
      const reaction=state.reactions[s.id];
      $('[data-story-like]').setAttribute('aria-pressed',reaction === 'like');
      $('[data-story-dislike]').setAttribute('aria-pressed',reaction === 'dislike');
      $('[data-likes-count]').textContent=12+(reaction === 'like' ? 1 : 0);
      $('[data-story-comments]').innerHTML=(state.comments[s.id] || []).map(t=>`<p><strong>Делис:</strong> ${esc(t)}</p>`).join('');
    }
    async function render() {
      if(!queue.length) {finish();return;}
      const token=++renderToken;
      const s=queue[index], a=authorById(s.author);
      video.pause(); sourceReady=false; elapsed=0; finished=false; paused=false; last=performance.now();
      $('[data-story-end]').hidden=true; $('[data-media-error]').hidden=true;
      $('[data-story-prev]').disabled=index === 0; $('[data-story-next]').disabled=false;
      $('[data-comment-panel]').hidden=true; $('[data-comment-form]').reset();
      pause.textContent='Ⅱ'; pause.setAttribute('aria-label','Пауза');
      $('[data-view-author-avatar]').innerHTML=avatar(a); $('[data-view-author-avatar]').href=authorURL(a);
      $('[data-view-author-name]').textContent=a.name; $('[data-view-author-name]').href=authorURL(a);
      if(embedded){$('[data-view-author-avatar]').target='_top';$('[data-view-author-name]').target='_top';}
      $('[data-story-age]').textContent=age(s.created); $('[data-story-title]').textContent=s.title;
      $('[data-story-position]').textContent=`${index+1} из ${queue.length} · ${s.duration} сек`;
      const items=queue.filter(x=>x.author === s.author);
      $('[data-story-progress]').innerHTML=items.map(x=>`<span><i style="width:${queue.indexOf(x)<index ? 100 : 0}%" ${x.id === s.id ? 'data-current-progress' : ''}></i></span>`).join('');
      styleText($('[data-story-text]'),s,$('[data-story-stage]').clientWidth/300);
      video.hidden=s.type !== 'video'; image.hidden=s.type === 'video'; $('[data-story-sound]').hidden=s.type !== 'video';
      image.onload=()=>{sourceReady=true;last=performance.now();};
      image.onerror=()=>{sourceReady=false;$('[data-media-error]').hidden=false;setPause(true);};
      video.onloadedmetadata=()=>{video.currentTime=s.start || 0;};
      video.oncanplay=()=>{sourceReady=true;last=performance.now();if(!paused) video.play().catch(()=>setPause(true));};
      video.onerror=()=>{sourceReady=false;$('[data-media-error]').hidden=false;setPause(true);};
      try {
        const src=await resolveMedia(s);
        if(token !== renderToken) {if(src.startsWith('blob:')) URL.revokeObjectURL(src); return;}
        if(sourceURL.startsWith('blob:')) URL.revokeObjectURL(sourceURL);
        sourceURL=src;
        if(s.type === 'video') {video.src=src;video.load();} else {image.src=src;if(image.complete && image.naturalWidth) sourceReady=true;}
      } catch (_) {if(token === renderToken) {$('[data-media-error]').hidden=false;setPause(true);}}
      reactions();
    }
    function next() {if(index+1<queue.length) {index++;render();}else finish();}
    function prev() {if(index>0) {index--;render();}}
    $('[data-story-next]').addEventListener('click',next); $('[data-story-prev]').addEventListener('click',prev);
    pause.addEventListener('click',()=>setPause(!paused));
    $('[data-story-sound]').addEventListener('click',()=>{video.muted=!video.muted;$('[data-story-sound]').textContent=video.muted ? '♪' : '♫';$('[data-story-sound]').setAttribute('aria-label',video.muted ? 'Включить звук' : 'Выключить звук');});
    $('[data-story-replay]').addEventListener('click',()=>{index=0;render();});
    for (const reaction of ['like','dislike']) $(`[data-story-${reaction}]`).addEventListener('click',()=>{const s=queue[index];if(!s)return;state.reactions[s.id]=state.reactions[s.id] === reaction ? null : reaction;save();reactions();});
    $('[data-comment-toggle]').addEventListener('click',()=>{const panel=$('[data-comment-panel]');panel.hidden=!panel.hidden;setPause(true);if(!panel.hidden)panel.querySelector('input').focus();});
    $('[data-comment-form]').addEventListener('submit',event=>{event.preventDefault();const input=event.currentTarget.querySelector('input'),s=queue[index];if(!input.value.trim() || !s)return;(state.comments[s.id] ||= []).push(input.value.trim());save();input.value='';reactions();});
    document.addEventListener('keydown',event=>{if(event.key === 'Escape'){closeViewer();return;}if(event.target.matches('input,textarea'))return;if(event.key === 'ArrowRight')next();if(event.key === 'ArrowLeft')prev();if(event.code === 'Space') {event.preventDefault();setPause(!paused);}});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)setPause(true);});
    video.addEventListener('ended',()=>{if(!finished){markSeen();next();}});
    function tick(now) {
      const s=queue[index];
      if(s && !paused && !finished && sourceReady) {
        if(s.type === 'video') {if(!video.paused && !video.seeking && video.readyState >= 3)elapsed=Math.max(0,video.currentTime-(s.start || 0));}
        else elapsed+=Math.min((now-last)/1000,.25);
        const progress=$('[data-current-progress]'); if(progress)progress.style.width=`${Math.min(100,elapsed/s.duration*100)}%`;
        if(elapsed>=s.duration) {markSeen();next();}
      }
      last=now; requestAnimationFrame(tick);
    }
    await render();requestAnimationFrame(tick);
  }
  function editor() {
    const form=$('[data-highlight-form]'), video=$('[data-editor-video]'), image=$('[data-editor-image]'), stage=$('[data-editor-stage]'), overlay=$('[data-editor-text]');
    let type='photo', file=null, objectURL='', duration=7, mediaDuration=0, start=0, end=15, x=50, y=72, align='center', playing=false, previewTimer, fileLoading=false, uploadVersion=0;
    const error=$('[data-editor-error]');
    function fail(message) {error.textContent=message;error.hidden=false;}
    function hideError() {error.hidden=true;}
    function draft() {return {text:$('#hl-overlay-text').value,textStyle:{font:$('#hl-font').value,size:Number($('#hl-font-size').value),color:$('#hl-text-color').value,background:$('#hl-bg-color').value,backdrop:$('#hl-bg-enabled').checked,align,x,y}};}
    function updateText() {styleText(overlay,draft(),stage.clientWidth/300);}
    function stopPreview() {playing=false;video.pause();clearTimeout(previewTimer);$('[data-preview-toggle]').textContent='▶ Просмотр';}
    function updateDuration(normalize = true, seekPreview = true) {
      if(type === 'photo') duration=Number($('#hl-photo-duration').value);
      else {
        start=Math.max(0,Math.min(Number($('#hl-trim-start').value) || 0,Math.max(0,mediaDuration-.1)));
        end=Math.max(start+.1,Math.min(Number($('#hl-trim-end').value) || start+15,mediaDuration,start+15));
        if(normalize) {$('#hl-trim-start').value=Number(start.toFixed(1));$('#hl-trim-end').value=Number(end.toFixed(1));}duration=Number((end-start).toFixed(1));
        $('[data-trim-window]').style.left=`${start/mediaDuration*100}%`; $('[data-trim-window]').style.width=`${duration/mediaDuration*100}%`;
        $('[data-trim-info]').textContent=`Фрагмент ${start.toFixed(1)}–${end.toFixed(1)} сек · ${duration} сек из ${mediaDuration.toFixed(1)}`;
        if(seekPreview && Math.abs(video.currentTime-start) > .03)video.currentTime=start;
      }
      $('[data-duration-output]').textContent=`${duration} сек`; $('[data-preview-time]').textContent=`${duration} сек`;stopPreview();
    }
    async function loadFile(input, wantedType) {
      const chosen=input.files?.[0];if(!chosen)return;
      const allowed=wantedType === 'video' ? ['video/mp4','video/webm'] : ['image/jpeg','image/png','image/webp'];
      if(!allowed.includes(chosen.type)) {fail('Неподдерживаемый формат. Выберите MP4 / WebM или JPG / PNG / WebP.');input.value='';return;}
      if(chosen.size>(wantedType === 'video' ? 100 : 20)*1024*1024) {fail(`Максимальный размер ${wantedType === 'video' ? 'видео — 100' : 'фото — 20'} МБ.`);input.value='';return;}
      const version=++uploadVersion;
      fileLoading=true;stopPreview();hideError();
      const url=URL.createObjectURL(chosen);
      const probe=document.createElement(wantedType === 'video' ? 'video' : 'img');
      try {
        await new Promise((resolve,reject)=>{probe.onerror=()=>reject(new Error('Не удалось прочитать файл. Попробуйте другой.'));if(wantedType === 'video') {probe.preload='metadata';probe.onloadedmetadata=resolve;}else probe.onload=resolve;probe.src=url;});
        if(version !== uploadVersion) {URL.revokeObjectURL(url);return;}
        if(wantedType === 'video' && (probe.videoWidth>probe.videoHeight || !Number.isFinite(probe.duration) || probe.duration<=0)) throw new Error('Выберите вертикальное видео с корректной длительностью.');
        if(objectURL)URL.revokeObjectURL(objectURL);objectURL=url;type=wantedType;file=chosen;
        video.hidden=type !== 'video';image.hidden=type === 'video';
        if(type === 'video') {mediaDuration=probe.duration;start=0;end=Math.min(15,mediaDuration);video.src=url;video.onloadedmetadata=()=>{video.currentTime=0;};$('#hl-trim-start').value=0;$('#hl-trim-end').value=end;$('#hl-trim-start').max=Math.max(0,mediaDuration-.1);$('#hl-trim-end').max=mediaDuration;}
        else image.src=url;
        $('[data-photo-duration]').hidden=type !== 'photo';$('[data-video-trim]').hidden=type !== 'video';$('[data-duration-title]').textContent=type === 'video' ? 'Обрезка видео · до 15 секунд' : 'Длительность показа';
        $('[data-upload-status]').textContent=`${chosen.name} · ${(chosen.size/1024/1024).toFixed(1)} МБ${type === 'video' ? ` · ${mediaDuration.toFixed(1)} сек` : ''}`;
        updateDuration();
      } catch(e) {URL.revokeObjectURL(url);fail(e.message);input.value='';}
      finally {if(version === uploadVersion)fileLoading=false;}
    }
    for(const [selector,kind] of [['[data-upload-video]','video'],['[data-camera-video]','video'],['[data-upload-photo]','photo'],['[data-camera-photo]','photo']]) $(selector).addEventListener('change',event=>loadFile(event.target,kind));
    $('#hl-photo-duration').addEventListener('input',()=>updateDuration());
    for (const selector of ['#hl-trim-start','#hl-trim-end']) {
      $(selector).addEventListener('input',()=>updateDuration(false));
      $(selector).addEventListener('change',()=>updateDuration());
    }
    for(const selector of ['#hl-overlay-text','#hl-font','#hl-font-size','#hl-text-color','#hl-bg-color','#hl-bg-enabled']) $(selector).addEventListener('input',updateText);
    document.querySelectorAll('[data-align]').forEach(button=>button.addEventListener('click',()=>{align=button.dataset.align;document.querySelectorAll('[data-align]').forEach(b=>b.setAttribute('aria-pressed',b===button));updateText();}));
    let drag;
    overlay.addEventListener('pointerdown',event=>{const rect=stage.getBoundingClientRect();drag={rect,dx:event.clientX-rect.left-x/100*rect.width,dy:event.clientY-rect.top-y/100*rect.height};overlay.setPointerCapture(event.pointerId);});
    function keepTextInside() {const maxX=Math.max(5,overlay.offsetWidth/2/stage.clientWidth*100),maxY=Math.max(5,overlay.offsetHeight/2/stage.clientHeight*100);x=Math.max(maxX,Math.min(100-maxX,x));y=Math.max(maxY,Math.min(100-maxY,y));updateText();}
    overlay.addEventListener('pointermove',event=>{if(!drag)return;x=(event.clientX-drag.rect.left-drag.dx)/drag.rect.width*100;y=(event.clientY-drag.rect.top-drag.dy)/drag.rect.height*100;keepTextInside();});
    overlay.addEventListener('pointerup',()=>drag=null);overlay.addEventListener('pointercancel',()=>drag=null);
    overlay.addEventListener('keydown',event=>{if(!event.key.startsWith('Arrow'))return;event.preventDefault();x+=event.key === 'ArrowLeft' ? -2 : event.key === 'ArrowRight' ? 2 : 0;y+=event.key === 'ArrowUp' ? -2 : event.key === 'ArrowDown' ? 2 : 0;keepTextInside();});
    $('[data-preview-toggle]').addEventListener('click',()=>{if(playing){stopPreview();return;}playing=true;$('[data-preview-toggle]').textContent='Ⅱ Пауза';if(type === 'video') {video.currentTime=start;video.play().catch(()=>{stopPreview();fail('Не удалось запустить видео.');});}previewTimer=setTimeout(stopPreview,duration*1000);});
    video.addEventListener('timeupdate',()=>{if(playing && video.currentTime>=end)stopPreview();});
    video.addEventListener('ended',stopPreview);
    function makeCover() {
      const canvas=document.createElement('canvas');canvas.width=180;canvas.height=320;const ctx=canvas.getContext('2d');ctx.fillStyle='#171d28';ctx.fillRect(0,0,180,320);
      const media=type === 'video' ? video : image, width=type === 'video' ? video.videoWidth : image.naturalWidth,height=type === 'video' ? video.videoHeight : image.naturalHeight;
      if(width && height) {const ratio=Math.min(180/width,320/height);ctx.drawImage(media,(180-width*ratio)/2,(320-height*ratio)/2,width*ratio,height*ratio);}
      return canvas.toDataURL('image/jpeg',.75);
    }
    form.addEventListener('submit',async event=>{
      event.preventDefault();hideError();updateDuration(true,false);stopPreview();
      if(fileLoading) {fail('Дождитесь загрузки файла.');return;}
      if(duration<=0 || duration>15 || !Number.isFinite(duration)) {fail('Длительность должна быть от 0,1 до 15 секунд.');return;}
      if(type === 'video' && !video.videoWidth) {fail('Дождитесь загрузки видео.');return;}
      if(type === 'photo' && !image.naturalWidth) {fail('Дождитесь загрузки фото.');return;}
      const button=form.querySelector('[type=submit]');button.disabled=true;button.textContent='Публикуем…';
      const id=`delis-${Date.now()}`;
      const story={id,author:'delis',type,src:type === 'photo' ? image.getAttribute('src') : '',title:$('#hl-title').value.trim() || 'Новая публикация',created:Date.now(),duration,start,pinned:$('#hl-pin').checked,...draft()};
      try {
        if(type === 'video') {
          if(Math.abs(video.currentTime-start) > .03)video.currentTime=start;
          if(video.seeking || video.readyState<2) await new Promise((resolve,reject)=>{
            const timeout=setTimeout(()=>{cleanup();reject(new Error('Видео ещё загружается. Попробуйте опубликовать ещё раз.'));},5000);
            const ready=()=>{if(!video.seeking && video.readyState>=2){cleanup();resolve();}};
            const cleanup=()=>{clearTimeout(timeout);video.removeEventListener('seeked',ready);video.removeEventListener('loadeddata',ready);};
            video.addEventListener('seeked',ready);video.addEventListener('loadeddata',ready);ready();
          });
        }
        if(file) {story.cover=makeCover();await putMedia(id,file,story.cover);story.mediaId=id;delete story.src;}
        else story.cover=story.src;
        state.stories.unshift(story);if(!save()) {state.stories.shift();throw new Error('Не удалось сохранить публикацию.');}
        location.href='my-highlights.html?published=1';
      } catch(e) {fail(e.message || 'Не удалось сохранить файл. Освободите место в браузере и попробуйте снова.');button.disabled=false;button.textContent='Опубликовать';}
    });
    window.addEventListener('resize',updateText);updateText();
  }
  function start() {
    const page=document.body.dataset.highlightsPage;
    if(document.body.dataset.active) {const nav=document.createElement('nav');nav.className='hl-mobile-nav';nav.innerHTML='<a href="index.html">Плейлисты</a><a href="gallery.html">Галерея</a><a href="my-highlights.html">Актуальное</a>';$('.content')?.prepend(nav);}
    $('.mobile-menu')?.addEventListener('click',()=>$('.header__nav')?.classList.toggle('is-open'));
    if(page === 'home') {feed();home();}
    if(page === 'feed')feed();
    if(page === 'authors') community.initFilter(list=>{$('[data-authors-list]').innerHTML=list.map(authorCard).join('');subscriptions();});
    if(page === 'author') profile();
    if(page === 'collection') {const author=community.fromURL();if(author){const url=new URL(community.collectionURL(author),location.href);const achievement=new URLSearchParams(location.search).get('achievement');if(achievement)url.searchParams.set('achievement',achievement);location.replace(url.href);}else profile();}
    if(page === 'settings')community.initSettings();
    if(page === 'gallery') galleryProfile();
    if(page === 'manage') {
      manage();const dialog=$('[data-delete-dialog]');$('[data-delete-cancel]').addEventListener('click',()=>dialog.close());
      $('[data-delete-confirm]').addEventListener('click',()=>{const deleted=state.stories.find(s=>s.id === dialog.dataset.story);state.stories=state.stories.filter(s=>s.id !== dialog.dataset.story);if(save() && deleted?.mediaId)removeMedia(deleted.mediaId).catch(()=>{});dialog.close();manage();showToast('Публикация удалена');});
      if(new URLSearchParams(location.search).has('published'))showToast('Публикация добавлена в актуальное');
    }
    if(page === 'create')editor();
    if(page === 'viewer')viewer();
    initViewerPopup();
  }
  document.addEventListener('DOMContentLoaded', start);
  window.addEventListener('storage', event => {
    if(event.key !== KEY || !event.newValue) return;
    try { const updated=JSON.parse(event.newValue); if(updated.version !== 1)return;state=updated; } catch (_) {return;}
    const page=document.body.dataset.highlightsPage;
    if(page === 'home' || page === 'feed')feed();
    if(page === 'home')$('[data-home-authors]').innerHTML=authors.slice(0,4).map(homeAuthorCard).join('');
    if(page === 'manage')manage();
    if(page === 'author')profile();
    if(page === 'gallery')renderPins('delis');
  });
  window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
})();

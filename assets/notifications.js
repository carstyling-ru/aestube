(() => {
  'use strict';
  const KEY='aestube-notifications-v1';
  const groups=[
    {id:'email',title:'Письма на почту',items:[['replies','Ответы на мои комментарии',false],['ratings','Оценки видео и комментариев',false],['comments','Новые комментарии к видео',false],['digest','Дайджест за день',true],['statistics','Моя статистика',true],['achievements','Новые ачивки',true]]},
    {id:'bell',title:'Колокольчик',items:[['replies','Ответы на мои комментарии',true],['ratings','Оценки видео и комментариев',true],['comments','Новые комментарии к видео',true],['followers','Новые подписчики',true],['achievements','Новые ачивки',true]]}
  ];
  const examples=[
    {id:'reply',image:'assets/author-davin.jpg',name:'Dr Davin Lim',text:'ответил на ваш комментарий к видео.',time:'15 минут назад',href:'playlist-open.html'},
    {id:'follower',image:'assets/author-energy.jpg',name:'energyclinic.ufa',text:'подписалась на вас.',time:'2 часа назад',href:'author.html?author=30'},
    {id:'achievement',image:'assets/achievements/top10.svg',name:'Новое достижение',text:'Вы вошли в Топ-10 авторов Aestube.',time:'Вчера',href:'delis?collection=1&achievement=top10'},
    {id:'comment',image:'assets/author-skin.jpg',name:'Skin Perfect',text:'оставил комментарий к вашему видео.',time:'Вчера',href:'playlist-open.html'}
  ];
  let state={read:[],settings:{}};
  try {const saved=JSON.parse(localStorage.getItem(KEY));if(saved && typeof saved==='object')state={read:Array.isArray(saved.read)?saved.read:[],settings:saved.settings||{}};}catch(_){}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch(_){return false;}}
  function initHeader(){
    const host=document.querySelector('[data-notifications]');if(!host)return;
    host.innerHTML='<button class="nt-bell" type="button" aria-label="Уведомления" aria-expanded="false" aria-controls="nt-panel"><img src="assets/notification-bell.svg" width="24" height="24" alt=""><span class="nt-badge" hidden></span></button><section class="nt-panel" id="nt-panel" aria-label="Уведомления" hidden><div class="nt-panel-head"><h2>Уведомления</h2><div class="nt-more"><button type="button" class="nt-more-button" aria-label="Меню уведомлений" aria-expanded="false">•••</button><div class="nt-menu" hidden><a href="notifications.html">Настройки уведомлений</a><button type="button" data-mark-all>Отметить все как прочитанные</button></div></div></div><div class="nt-list" data-notification-list></div></section>';
    const bell=host.querySelector('.nt-bell'),badge=host.querySelector('.nt-badge'),panel=host.querySelector('.nt-panel'),menu=host.querySelector('.nt-menu'),more=host.querySelector('.nt-more-button'),list=host.querySelector('[data-notification-list]');
    function render(){const unread=examples.filter(item=>!state.read.includes(item.id));badge.hidden=!unread.length;badge.textContent=unread.length>99?'99+':unread.length;bell.setAttribute('aria-label',unread.length?`Уведомления: ${unread.length} непрочитанных`:'Уведомления');list.innerHTML=unread.length?unread.map(item=>`<a class="nt-item" href="${item.href}" data-notice-id="${item.id}"><img src="${item.image}" alt=""><span><span><strong>${item.name}</strong> ${item.text}</span><small>${item.time}</small></span><i aria-hidden="true"></i></a>`).join(''):'<div class="nt-empty"><span class="nt-empty-icon"><img src="assets/notification-bell.svg" width="24" height="24" alt=""></span><strong>Уведомлений пока нет</strong></div>';}
    bell.onclick=()=>{render();panel.hidden=!panel.hidden;bell.setAttribute('aria-expanded',String(!panel.hidden));menu.hidden=true;more.setAttribute('aria-expanded','false');};
    more.onclick=()=>{menu.hidden=!menu.hidden;more.setAttribute('aria-expanded',String(!menu.hidden));};
    host.querySelector('[data-mark-all]').onclick=()=>{state.read=examples.map(item=>item.id);save();render();menu.hidden=true;more.setAttribute('aria-expanded','false');};
    list.addEventListener('click',event=>{const item=event.target.closest('[data-notice-id]');if(item){state.read=[...new Set([...state.read,item.dataset.noticeId])];save();}});
    document.addEventListener('click',event=>{if(!host.contains(event.target)){panel.hidden=true;menu.hidden=true;bell.setAttribute('aria-expanded','false');more.setAttribute('aria-expanded','false');}else if(!event.target.closest('.nt-more')){menu.hidden=true;more.setAttribute('aria-expanded','false');}});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){panel.hidden=true;menu.hidden=true;bell.setAttribute('aria-expanded','false');more.setAttribute('aria-expanded','false');bell.focus();}});
    window.addEventListener('storage',event=>{if(event.key===KEY&&event.newValue){try{const next=JSON.parse(event.newValue);state={read:Array.isArray(next.read)?next.read:[],settings:next.settings||{}};render();}catch(_){}}});render();
  }
  function initSettings(){
    const host=document.querySelector('[data-notification-settings]');if(!host)return;
    host.innerHTML=groups.map(group=>`<section class="panel nt-settings"><h2 class="panel__title">${group.title}</h2><div class="nt-options">${group.items.map(([id,label,initial])=>{const key=`${group.id}.${id}`,checked=Object.hasOwn(state.settings,key)?state.settings[key]:initial;return `<label class="nt-option"><input type="checkbox" data-setting="${key}" ${checked?'checked':''}><span>${label}</span></label>`;}).join('')}</div></section>`).join('')+'<p class="nt-settings-status" role="status" aria-live="polite"></p>';
    host.addEventListener('change',event=>{const input=event.target.closest('[data-setting]');if(!input)return;state.settings[input.dataset.setting]=input.checked;host.querySelector('[role=status]').textContent=save()?'Настройки сохранены':'Не удалось сохранить настройки в браузере';});
  }
  document.addEventListener('DOMContentLoaded',()=>{initHeader();initSettings();});
})();

const icons = {
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3Z"/>',
  upload: '<path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M5 20h14"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  heart: '<path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.8l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-7.4 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 20"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h7v18h-7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  grip: '<circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="18" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/>',
  play: '<path d="m8 5 11 7-11 7Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>'
};

Object.assign(icons, {
  sitePlayCircle: '<path d="M9 9.869c0-1.598 1.78-2.55 3.11-1.665l3.197 2.131a2 2 0 0 1 0 3.329l-3.198 2.131C10.78 16.681 9 15.73 9 14.131V9.87Zm2 4.262L14.197 12 11 9.87v4.262Z" fill="currentcolor"/><path d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0Zm2 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" fill="currentcolor"/>',
  sitePlusCircle: '<path d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0Zm-9 3v-2H9a1 1 0 1 1 0-2h2V9a1 1 0 1 1 2 0v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0Zm11-3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" fill="currentcolor"/>',
  siteBookOpen: '<path d="M16.5 4c1.92 0 3.703.523 5.054 1.42a1 1 0 0 1 .446.833v13a1 1 0 0 1-1.554.833C19.461 19.43 18.073 19 16.5 19s-2.96.431-3.946 1.086a1 1 0 0 1-1.108 0C10.461 19.43 9.073 19 7.5 19s-2.96.431-3.946 1.086A1 1 0 0 1 2 19.253v-13a1 1 0 0 1 .446-.833C3.796 4.523 5.58 4 7.5 4c1.668 0 3.233.395 4.5 1.087C13.267 4.395 14.832 4 16.5 4Zm-9 2c-1.348 0-2.56.317-3.5.82v10.807A9.82 9.82 0 0 1 7.5 17a9.82 9.82 0 0 1 3.5.627V6.819C10.06 6.317 8.848 6 7.5 6Zm9 0c-1.348 0-2.56.317-3.5.82v10.807A9.82 9.82 0 0 1 16.5 17a9.82 9.82 0 0 1 3.5.627V6.819C19.06 6.317 17.848 6 16.5 6Z" fill="currentcolor"/>',
  siteBookmark: '<path d="M17.998 5a1 1 0 0 0-1-1h-10a1 1 0 0 0-1 1v14.382l5.553-2.777a1 1 0 0 1 .894 0l5.553 2.777V5Zm2 16a1 1 0 0 1-1.447.895l-6.553-3.277-6.553 3.277A1 1 0 0 1 3.998 21V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16Z" fill="currentcolor"/>',
  siteUserGroup: '<path d="M6 18c0-.549.074-1.081.213-1.588A2 2 0 0 0 3 18v1h3v-1Zm0-8a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm14 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-6-3a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM8 19h8v-1c0-.527-.101-1.028-.284-1.485A4.002 4.002 0 0 0 8 18v1Zm10 0h3v-1a2 2 0 0 0-3.214-1.587c.139.506.214 1.039.214 1.587v1Zm5 1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2a4 4 0 0 1 6.07-3.42A5.993 5.993 0 0 1 12 12a5.992 5.992 0 0 1 4.929 2.58A4 4 0 0 1 23 18v2ZM8 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm14 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6-3a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="currentcolor"/>',
  siteUser: '<path d="M15 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm2 0A5 5 0 1 1 7 7a5 5 0 0 1 10 0ZM12 13a8 8 0 0 1 8 8 1 1 0 0 1-1 1H5a1 1 0 0 1-1-1 8 8 0 0 1 8-8Zm0 2a6 6 0 0 0-5.915 5h11.83A6 6 0 0 0 12 15Z" fill="currentcolor"/>',
  siteLogout: '<path d="M16.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 1 1-1.414-1.414L18.586 13H7a1 1 0 1 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414ZM12 8V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1a1 1 0 1 1 2 0v1a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a1 1 0 1 1-2 0Z" fill="currentcolor"/>',
  siteImage: '<path d="M21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v13.5A2.25 2.25 0 0 0 2.25 21h19.5A2.25 2.25 0 0 0 24 18.75V5.25A2.25 2.25 0 0 0 21.75 3Zm-.281 15.75H2.53a.281.281 0 0 1-.281-.281V5.53a.281.281 0 0 1 .281-.281H21.47a.281.281 0 0 1 .281.281V18.47a.281.281 0 0 1-.281.281ZM6 7.125a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75ZM4.5 16.5h15v-3.75l-4.102-4.102a.563.563 0 0 0-.796 0L9 14.25l-1.852-1.852a.563.563 0 0 0-.796 0L4.5 14.25v2.25Z" fill="currentcolor"/>',
  siteMenu: '<path d="M20 17.5a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16Zm0-6a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16Zm0-6a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2h16Z" fill="currentcolor"/>'
});

const siteIconNames = new Set(['sitePlayCircle', 'sitePlusCircle', 'siteBookOpen', 'siteBookmark', 'siteUserGroup', 'siteUser', 'siteLogout', 'siteImage', 'siteMenu']);

function icon(name, cls = '') {
  return `<svg class="icon ${siteIconNames.has(name) ? 'icon--site' : ''} ${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ''}</svg>`;
}

function shell() {
  const active = document.body.dataset.active || '';
  const publicPage = document.body.dataset.public === 'true';
  const nav = [
    ['videos', 'sitePlayCircle', 'Мои видео', '', '#'],
    ['upload', 'sitePlusCircle', 'Добавить видео', '', '#'],
    ['playlists', 'list', 'Плейлисты', '4', 'index.html'],
    ['gallery', 'siteImage', 'Галерея', '2', 'gallery.html'],
    ['highlights', 'sitePlayCircle', 'Актуальное', '', 'my-highlights.html'],
    ['history', 'siteBookOpen', 'История просмотров', '', '#'],
    ['favorites', 'siteBookmark', 'Избранное', '1', '#'],
    ['subscriptions', 'siteUserGroup', 'Подписки', '0', '#'],
    ['settings', 'siteUser', 'Профиль', '', '#']
  ];

  document.querySelectorAll('[data-header]').forEach(el => el.innerHTML = `
    <header class="header">
      <div class="header__top">
        <button class="mobile-menu" aria-label="Открыть меню">${icon('menu')}</button>
        <a class="header__logo" href="home.html"><img src="assets/logo.svg" alt="Aestube"></a>
        <label class="header__search">${icon('search')}<input type="search" placeholder="Поиск видео, авторов и плейлистов"></label>
        <a class="header__user" href="author.html?author=delis" aria-label="Профиль Делис"><img class="avatar" src="assets/avatar.jpg" alt=""><span class="header__user-name">Делис</span><span class="pro-badge">PRO</span>${icon('chevronLeft','header__profile-arrow')}</a>
        <div class="language" data-language>
          <button class="language__toggle" type="button" data-language-toggle aria-expanded="false" aria-haspopup="menu" aria-controls="header-language-menu"><span data-language-label>Русский</span>${icon('chevronDown')}</button>
          <div class="language__menu" id="header-language-menu" role="menu" aria-label="Выберите язык" data-language-menu hidden></div>
        </div>
      </div>
      <nav class="header__nav">
        <a class="nav-chip" href="highlights.html">Актуальное</a><a class="nav-chip" href="home.html#new">Новое</a><a class="nav-chip" href="home.html#popular">Популярное</a><a class="nav-chip" href="home.html#best">Лучшее</a><a class="nav-chip" href="authors.html">Авторы</a><a class="nav-chip" href="home.html#categories">Категории</a>
      </nav>
    </header>`);

  document.querySelectorAll('[data-sidebar]').forEach(el => {
    if (publicPage) { el.remove(); return; }
    el.className = 'sidebar';
    el.innerHTML = `
      <nav class="side-nav">
        ${nav.map(([id, ic, label, count, href], i) => `${i === 5 ? '<div class="side-nav__divider"></div>' : ''}<a class="${active === id ? 'active' : ''}" href="${href}">${icon(ic)}<span>${label}</span>${count ? `<em class="side-nav__count">${count}</em>` : ''}</a>`).join('')}
        <div class="side-nav__divider"></div><a href="#">${icon('siteLogout')}<span>Выйти</span></a>
      </nav>`;
  });

  document.querySelectorAll('[data-footer]').forEach(el => el.innerHTML = `<footer class="footer"><span>© 2026 Aestube</span><nav class="footer__links"><a href="#">О проекте</a><a href="#">Политика конфиденциальности</a><a href="#">Пользовательское соглашение</a><a href="#">Обратная связь</a></nav></footer>`);
}

function showToast(text) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `${icon('check')}<span>${text}</span>`;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function initInteractions() {
  initLanguageMenu();
  document.querySelectorAll('[data-toast]').forEach(btn => btn.addEventListener('click', event => {
    if (btn.tagName === 'A' && btn.getAttribute('href') !== '#') return;
    event.preventDefault();
    showToast(btn.dataset.toast);
  }));

  document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const target = document.querySelector(btn.dataset.copy);
    const text = target?.textContent?.trim() || '';
    try { await navigator.clipboard.writeText(text); } catch (_) {}
    showToast('Ссылка скопирована');
  }));

  const accessRadios = document.querySelectorAll('input[name="access"]');
  const privateSettings = document.querySelector('[data-private-settings]');
  const privateOnlyBlocks = document.querySelectorAll('[data-private-only]');
  const updateAccessBlocks = () => {
    const isPrivate = document.querySelector('input[name="access"]:checked')?.value === 'private';
    if (privateSettings) privateSettings.classList.toggle('is-hidden', !isPrivate);
    privateOnlyBlocks.forEach(block => block.hidden = !isPrivate);
  };
  accessRadios.forEach(radio => radio.addEventListener('change', updateAccessBlocks));
  updateAccessBlocks();

  document.querySelectorAll('.email-tag button').forEach(btn => btn.addEventListener('click', () => btn.closest('.email-tag')?.remove()));
  document.querySelectorAll('[data-tab]').forEach(tab => tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    tab.parentElement.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    tab.classList.add('active');
    if (filter) {
      document.querySelectorAll('[data-playlist-card]').forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.type !== filter;
      });
    }
  }));

  document.querySelectorAll('[data-player-item]').forEach(item => item.addEventListener('click', () => {
    document.querySelectorAll('[data-player-item]').forEach(x => x.classList.remove('active'));
    item.classList.add('active');
    const image = item.querySelector('img')?.getAttribute('src');
    const title = item.querySelector('.queue-item__title')?.textContent;
    if (image) document.querySelector('[data-player-image]')?.setAttribute('src', image);
    if (title) document.querySelector('[data-player-title]').textContent = title;
    showToast('Выбрано видео из плейлиста');
  }));

  initGalleryUpload();
  initGalleryViewer();
}

function initLanguageMenu() {
  const languages = {ru:'Русский', en:'English', tr:'Türkçe', pt:'Português'};
  let selected = 'ru';
  try { selected = localStorage.getItem('aestube-language') || 'ru'; } catch (_) {}
  if (!languages[selected]) selected = 'ru';
  document.querySelectorAll('[data-language]').forEach(container => {
    const toggle = container.querySelector('[data-language-toggle]');
    const menu = container.querySelector('[data-language-menu]');
    const label = container.querySelector('[data-language-label]');
    const setOpen = open => { menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); };
    const render = () => {
      label.textContent = languages[selected];
      menu.innerHTML = Object.entries(languages).filter(([code]) => code !== selected).map(([code, name]) => `<button type="button" role="menuitem" data-locale="${code}">${name}</button>`).join('');
    };
    render();
    toggle.addEventListener('click', () => setOpen(menu.hidden));
    toggle.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault(); setOpen(true);
      const items = [...menu.querySelectorAll('[role="menuitem"]')];
      items[event.key === 'ArrowDown' ? 0 : items.length - 1]?.focus();
    });
    menu.addEventListener('click', event => {
      const option = event.target.closest('[data-locale]');
      if (!option) return;
      selected = option.dataset.locale;
      try { localStorage.setItem('aestube-language', selected); } catch (_) {}
      render(); setOpen(false); toggle.focus();
    });
    menu.addEventListener('keydown', event => {
      const items = [...menu.querySelectorAll('[role="menuitem"]')];
      const current = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); items[(current + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus();
      }
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault(); items[event.key === 'Home' ? 0 : items.length - 1]?.focus();
      }
    });
    container.addEventListener('keydown', event => { if (event.key === 'Escape') { setOpen(false); toggle.focus(); } });
    document.addEventListener('click', event => { if (!container.contains(event.target)) setOpen(false); });
    container.addEventListener('focusout', event => { if (!container.contains(event.relatedTarget)) setOpen(false); });
  });
}

function initGalleryUpload() {
  const uploadForm = document.querySelector('[data-gallery-upload]');
  if (!uploadForm) return;

  const modeInputs = uploadForm.querySelectorAll('input[name="gallery-mode"]');
  const afterSlot = uploadForm.querySelector('[data-after-slot]');
  const pairStatus = uploadForm.querySelector('[data-pair-status]');
  const description = uploadForm.querySelector('[data-description]');
  const counter = uploadForm.querySelector('[data-description-count]');

  modeInputs.forEach(input => input.addEventListener('change', () => {
    const paired = input.value === 'pair';
    afterSlot?.classList.toggle('is-hidden', !paired);
    pairStatus?.classList.toggle('is-hidden', !paired);
  }));

  if (description && counter) {
    const updateCounter = () => counter.textContent = `${description.value.length} / ${description.maxLength}`;
    description.addEventListener('input', updateCounter);
    updateCounter();
  }

  const loaded = {};
  uploadForm.querySelectorAll('[data-gallery-file]').forEach(input => input.addEventListener('change', () => {
    const file = input.files?.[0];
    const slot = input.closest('.upload-slot');
    const role = input.dataset.galleryFile;
    const error = slot?.querySelector('[data-file-error]');
    const preview = slot?.querySelector('img');
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!file) return;
    if (!allowed.includes(file.type)) {
      if (error) error.textContent = 'Неподдерживаемый формат. Используйте JPG, PNG или WebP.';
      input.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      if (error) error.textContent = 'Файл больше 10 МБ. Выберите изображение меньшего размера.';
      input.value = '';
      return;
    }
    if (error) error.textContent = '';
    const objectUrl = URL.createObjectURL(file);
    if (preview) { preview.src = objectUrl; preview.hidden = false; }
    slot?.classList.add('has-file');
    const image = new Image();
    image.onload = () => {
      loaded[role] = { width: image.naturalWidth, height: image.naturalHeight };
      const dimensions = slot?.querySelector('[data-file-dimensions]');
      if (dimensions) dimensions.textContent = `${image.naturalWidth} × ${image.naturalHeight} px · ${(file.size / 1024 / 1024).toFixed(1)} МБ`;
      const before = loaded.before;
      const after = loaded.after;
      if (before && after && pairStatus) {
        const sameRatio = Math.abs(before.width / before.height - after.width / after.height) < 0.01;
        pairStatus.classList.toggle('validation--success', sameRatio);
        pairStatus.classList.toggle('validation--error', !sameRatio);
        pairStatus.innerHTML = sameRatio
          ? `${icon('check')}<span>Пропорции совпадают. Пара готова к публикации.</span>`
          : `${icon('info')}<span>Пропорции не совпадают. Обрежьте изображения до одинакового соотношения сторон.</span>`;
      }
    };
    image.src = objectUrl;
  }));
}

function initGalleryViewer() {
  const modal = document.querySelector('[data-gallery-modal]');
  const items = [...document.querySelectorAll('[data-gallery-open]')];
  if (!modal || !items.length) return;

  const single = modal.querySelector('[data-view-single]');
  const comparison = modal.querySelector('[data-view-comparison]');
  const beforeImage = modal.querySelector('[data-before-image]');
  const afterImage = modal.querySelector('[data-after-image]');
  const slider = modal.querySelector('[data-compare-slider]');
  const title = modal.querySelector('[data-view-title]');
  const comparisonCaption = modal.querySelector('[data-comparison-caption]');
  const count = modal.querySelector('[data-view-count]');
  let current = 0;

  function render(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    const paired = item.dataset.type === 'pair';
    single.hidden = paired;
    comparison.hidden = !paired;
    comparisonCaption.hidden = !paired;
    if (paired) {
      beforeImage.src = item.dataset.before;
      afterImage.src = item.dataset.after;
      slider.value = 50;
      afterImage.style.clipPath = 'inset(0 0 0 50%)';
      modal.querySelector('.comparison__handle').style.left = '50%';
    } else {
      single.src = item.dataset.image;
    }
    title.textContent = item.dataset.title || '';
    count.textContent = `${current + 1} / ${items.length}`;
  }

  items.forEach((item, index) => item.addEventListener('click', () => {
    render(index);
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  }));
  modal.querySelectorAll('[data-gallery-close]').forEach(button => button.addEventListener('click', () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }));
  modal.querySelector('[data-gallery-prev]')?.addEventListener('click', () => render(current - 1));
  modal.querySelector('[data-gallery-next]')?.addEventListener('click', () => render(current + 1));
  slider?.addEventListener('input', () => {
    const value = Number(slider.value);
    afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
    modal.querySelector('.comparison__handle').style.left = `${value}%`;
  });
  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('is-open')) return;
    if (event.key === 'Escape') modal.querySelector('[data-gallery-close]')?.click();
    if (event.key === 'ArrowLeft') render(current - 1);
    if (event.key === 'ArrowRight') render(current + 1);
  });
}

document.addEventListener('DOMContentLoaded', () => { shell(); initInteractions(); });

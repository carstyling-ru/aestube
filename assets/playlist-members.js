(() => {
  'use strict';
  const key = 'aestube-playlist-member-comments-v1';
  let comments = {};
  try { comments = JSON.parse(localStorage.getItem(key)) || {}; } catch (_) {}
  document.querySelectorAll('[data-member-comment]').forEach(input => {
    const id = input.dataset.memberComment;
    if (Object.prototype.hasOwnProperty.call(comments, id)) input.value = comments[id];
    input.addEventListener('input', () => {
      comments[id] = input.value;
      try { localStorage.setItem(key, JSON.stringify(comments)); } catch (_) {}
    });
  });
})();

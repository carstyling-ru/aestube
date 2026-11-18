(() => {
  'use strict';
  const community = window.AestubeCommunity;
  const roleLabels = {
    doctor: 'Врач',
    training: 'Обучающий центр',
    distributor: 'Дистрибьютер',
    ambassador: 'Амбассадор индустрии'
  };
  community.badge = author => {
    const {role, level} = community.enrich(author);
    const roleLabel = roleLabels[role];
    const roleBadge = roleLabel ? `<span class="authors2-role" role="img" aria-label="${roleLabel}" title="${roleLabel}"><i class="cm-role-icon cm-role-icon--${role}" aria-hidden="true"></i></span>` : '';
    const levelLabel = level === 'pro' ? 'PRO' : level === 'plus' ? 'PLUS' : '';
    return roleBadge + (levelLabel ? `<span class="authors2-level">${levelLabel}</span>` : '');
  };
})();

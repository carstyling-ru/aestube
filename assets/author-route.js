(() => {
  // Freeze the asset root before removing the directory slash from the visible URL.
  const base=document.querySelector('base');
  base.href=new URL(base.getAttribute('href'),location.href).href;
  const url=new URL(location.href);
  if(url.pathname.endsWith('/index.html'))url.pathname=url.pathname.slice(0,-11);
  else if(url.pathname.endsWith('/') && url.pathname!==new URL(base.href).pathname)url.pathname=url.pathname.slice(0,-1);
  if(url.href!==location.href)history.replaceState(null,'',url.pathname+url.search+url.hash);
})();

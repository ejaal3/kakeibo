const CACHE='kakeibo-v1';
const SHELL=['/','/manifest.webmanifest','/icon.svg','/apple-touch-icon.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.hostname.endsWith('supabase.co'))return; // données : toujours en direct
  if(req.mode==='navigate'){ // page : réseau d'abord, cache si hors ligne
    e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put('/',c));return r}).catch(()=>caches.match('/')));return}
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok&&(url.origin===location.origin||url.hostname.includes('jsdelivr')||url.hostname.includes('gstatic')||url.hostname.includes('googleapis'))){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}return r})));
});

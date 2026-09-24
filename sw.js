const C='picjo',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'no-store'}).then(r=>{if(r&&r.ok)return c.put(u,r)}).catch(()=>{})))));
 self.skipWaiting();
});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 e.respondWith(
  fetch(r,{cache:'no-store'}).then(res=>{
   if(res&&res.ok){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}
   return res;
  }).catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):new Response('',{status:504}))))
 );
});

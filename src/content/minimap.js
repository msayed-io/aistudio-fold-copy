(() => {
  const A=globalThis.AFC=globalThis.AFC||{}; let root, panel, rail, track, preview, raf=0, bootObserver, bootTimer;
  const state={items:[],active:null,signature:''};
  const textOf=turn=>{const bubble=turn.querySelector('div.bubble.user');return (bubble?.textContent||'').replace(/\s+/g,' ').trim();};
  const scrollHost=()=>A.q(document,A.selectors.scroll).el||document.scrollingElement||document.documentElement;
  const chatPanel=()=>document.querySelector('ms-code-assistant-chat')?.closest('.console-left-panel')||document.querySelector('ms-code-assistant-chat')||root?.closest('.console-left-panel')||root?.parentElement;
  const scrollAncestor=el=>{let n=el;while(n&&n!==document.body){const c=getComputedStyle(n);if((c.overflowY==='auto'||c.overflowY==='scroll')&&n.scrollHeight>n.clientHeight)return n;n=n.parentElement;}return document.scrollingElement||document.documentElement;};
  const hostMetrics=()=>{const host=scrollAncestor(panel||root);const r=(panel||host).getBoundingClientRect();return {host,top:r.top,scrollTop:host.scrollTop||0,height:Math.max(host.scrollHeight||0,panel?.scrollHeight||0,1),viewport:Math.max(host.clientHeight||0,panel?.clientHeight||0,r.height||0,window.innerHeight)};};
  const make=(tag,cls)=>{const el=document.createElement(tag);el.className=cls;el.dataset.afcUi='';return el;};
  const frame=()=>{if(!rail||!panel)return;const r=panel.getBoundingClientRect();const w=28;rail.style.left=`${Math.max(r.left+4,r.right-w-4)}px`;rail.style.top=`${Math.max(r.top+12,r.top+r.height/2-150)}px`;rail.style.height=`${Math.max(116,Math.min(300,r.height-24))}px`;};
  const hidePreview=()=>{state.active=null;if(preview)preview.hidden=true;if(rail)rail.classList.remove('afc-minimap-previewing');};
  const showPreview=item=>{state.active=item;preview.textContent='';const title=make('strong','afc-minimap-preview-index');title.textContent=`رسالة المستخدم ${item.index}`;const body=make('span','afc-minimap-preview-text');body.textContent=item.text||'رسالة بدون نص';preview.append(title,body);const b=item.button.getBoundingClientRect(),p=panel.getBoundingClientRect();preview.style.left=`${Math.max(p.left+8,b.left-310)}px`;preview.style.top=`${Math.max(p.top+10,Math.min(p.bottom-90,b.top-8))}px`;preview.hidden=false;};
  const jump=item=>{const m=hostMetrics();const tr=item.turn.getBoundingClientRect();const target=m.scrollTop+(tr.top-m.top)-Math.max(24,(m.viewport-tr.height)/2);m.host.scrollTo({top:Math.max(0,target),behavior:'smooth'});};
  const updatePositions=()=>{raf=0;if(!rail||!root)return;frame();const m=hostMetrics();const usable=Math.max(1,m.height);for(const item of state.items){const tr=item.turn.getBoundingClientRect();const absolute=m.scrollTop+(tr.top-m.top);const pct=Math.max(0,Math.min(1,absolute/usable));item.button.style.top=`${pct*100}%`;}};
  const render=()=>{if(!root||!track)return;const turns=[...panel.querySelectorAll(A.selectors.turn[0])].filter(t=>t.querySelector('div.bubble.user'));const signature=turns.map(t=>t.getAttribute('data-turn-id')||textOf(t).slice(0,32)).join('|');if(signature===state.signature){updatePositions();return;}state.signature=signature;state.items=turns.map((turn,i)=>({turn,index:i+1,text:textOf(turn),button:null}));track.textContent='';for(const item of state.items){const b=make('button','afc-minimap-item');b.type='button';b.setAttribute('aria-label',`الانتقال إلى رسالة المستخدم ${item.index}`);b.addEventListener('mouseenter',()=>showPreview(item));b.addEventListener('focus',()=>showPreview(item));b.addEventListener('mouseleave',hidePreview);b.addEventListener('blur',hidePreview);b.addEventListener('click',()=>jump(item));item.button=b;track.appendChild(b);}updatePositions();};
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(updatePositions);};
  A.startMinimap=()=>{
    if(rail)return;
    root=scrollHost(); panel=chatPanel();
    if(!root||!panel){
      clearTimeout(bootTimer); bootTimer=setTimeout(()=>A.startMinimap(),500);
      if(!bootObserver){bootObserver=new MutationObserver(()=>{if(chatPanel()){bootObserver.disconnect();bootObserver=null;A.startMinimap();}});bootObserver.observe(document.body,{subtree:true,childList:true});}
      return;
    }
    rail=make('aside','afc-minimap');rail.setAttribute('aria-label','التنقل بين رسائل المستخدم');track=make('div','afc-minimap-track');preview=make('div','afc-minimap-preview');preview.hidden=true;rail.append(track,preview);document.body.appendChild(rail);render();const observer=new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes,...x.removedNodes].some(n=>n.nodeType===Node.ELEMENT_NODE&&!n.closest?.('[data-afc-ui]'))))render();});observer.observe(root,{subtree:true,childList:true});root.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});};
})();

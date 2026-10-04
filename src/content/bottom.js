(() => {
  const A=globalThis.AFC=globalThis.AFC||{}; let button, panel, host, raf=0;
  const findPanel=()=>document.querySelector('ms-code-assistant-chat')?.closest('.console-left-panel')||document.querySelector('ms-code-assistant-chat');
  const findHost=el=>{let n=el;while(n&&n!==document.body){const c=getComputedStyle(n);if((c.overflowY==='auto'||c.overflowY==='scroll')&&n.scrollHeight>n.clientHeight)return n;n=n.parentElement;}return document.scrollingElement||document.documentElement;};
  const make=()=>{button=document.createElement('button');button.type='button';button.dataset.afcUi='';button.dataset.afcBottom='';button.className='afc-bottom-button';button.setAttribute('aria-label','الانتقال إلى آخر رسالة');button.title='الانتقال إلى آخر رسالة';button.addEventListener('click',()=>{if(host)host.scrollTo({top:host.scrollHeight,behavior:'smooth'});});document.body.appendChild(button);};
  const update=()=>{raf=0;if(!button)return;panel=findPanel();if(!panel){button.hidden=true;return;}host=findHost(panel);const r=panel.getBoundingClientRect();const atBottom=host.scrollHeight-host.scrollTop-host.clientHeight<48;button.style.left=`${Math.max(8,r.right-52)}px`;button.style.top=`${Math.max(8,r.bottom-64)}px`;button.hidden=atBottom||host.scrollHeight<=host.clientHeight+48;};
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};
  A.startBottomButton=()=>{if(button)return;make();document.addEventListener('scroll',schedule,{passive:true,capture:true});window.addEventListener('resize',schedule,{passive:true});const observer=new MutationObserver(schedule);observer.observe(document.body,{subtree:true,childList:true});schedule();};
})();

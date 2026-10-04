(() => {
  const A = globalThis.AFC = globalThis.AFC || {};
  const textOf = (root, user) => user ? (root.querySelector('ms-cmark-node')?.textContent || '') : A.domToMarkdown(root, {excludeThoughts: !A.settings.includeThoughts});
  async function write(text) { try { await navigator.clipboard.writeText(text); return true; } catch (_) { const ta=document.createElement('textarea'); ta.value=text; ta.setAttribute('readonly',''); ta.style.cssText='position:fixed;inset:-9999px'; document.documentElement.appendChild(ta); ta.select(); let ok=false; try { ok=document.execCommand('copy'); } catch (_) {} ta.remove(); return ok; } }
  A.copyFor = async (bubble, user, button) => { const text=textOf(bubble,user); if (!text.trim()) return A.feedback(button,false); button.disabled=true; const ok=await write(text); A.feedback(button,ok); button.disabled=false; };
  A.feedback=(button,ok)=>{ const old=button.getAttribute('aria-label')||''; button.dataset.afcState=ok?'ok':'error'; button.setAttribute('aria-label',ok?'تم النسخ':'فشل النسخ'); button.title=ok?'تم النسخ':'فشل النسخ'; setTimeout(()=>{button.dataset.afcState='';button.setAttribute('aria-label',old);button.title=old;},1500); };
})();

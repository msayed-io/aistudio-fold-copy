(() => {
  const A = globalThis.AFC = globalThis.AFC || {};
  const esc = s => s.replace(/\\/g,'\\\\').replace(/([*_`\[\]])/g,'\\$1');
  function convert(root, opts = {}) {
    const clone = root.cloneNode(true);
    clone.querySelectorAll('[data-afc-ui], button, [aria-hidden="true"], .material-symbols-outlined, .mat-mdc-tooltip-trigger').forEach(n => n.remove());
    const render = (n, depth=0) => {
      if (n.nodeType === Node.TEXT_NODE) return esc(n.nodeValue || '');
      if (n.nodeType !== Node.ELEMENT_NODE) return '';
      const e=n, tag=e.tagName.toLowerCase();
      if (opts.excludeThoughts && (tag==='ms-chat-step' || tag==='ms-expandable-turn')) return '';
      if (['script','style','button','svg'].includes(tag) || e.matches('[aria-hidden="true"]')) return '';
      if (tag==='ms-code-block') { const code=e.querySelector('pre code'); if (!code) return ''; const lang=e.getAttribute('data-test-language')||''; return `\n\n\`\`\`${lang}\n${code.textContent.trim()}\n\`\`\`\n\n`; }
      if (tag==='br') return '\n';
      const inner=[...e.childNodes].map(c=>render(c,depth)).join('');
      if (/^h[1-6]$/.test(tag)) return `\n\n${'#'.repeat(Number(tag[1]))} ${inner.trim()}\n\n`;
      if (tag==='p' || tag==='div') return `\n${inner.trim()}\n`;
      if (tag==='strong' || tag==='b') return `**${inner.trim()}**`;
      if (tag==='em' || tag==='i') return `*${inner.trim()}*`;
      if (tag==='a') return `[${inner.trim()}](${e.getAttribute('href')||''})`;
      if (tag==='blockquote') return `\n> ${inner.trim().replace(/\n/g,'\n> ')}\n`;
      if (tag==='hr') return '\n\n---\n\n';
      if (tag==='li') return `\n${'  '.repeat(depth)}- ${inner.trim()}`;
      if (tag==='ul' || tag==='ol') return `\n${inner}\n`;
      if (tag==='table') return `\n\n${table(e)}\n\n`;
      return inner;
    };
    const table = t => { const rows=[...t.querySelectorAll('tr')].map(r=>[...r.children].map(c=>c.textContent.trim())); if(!rows.length)return ''; const head=rows[0]; return `| ${head.join(' | ')} |\n| ${head.map(()=> '---').join(' | ')} |\n`+rows.slice(1).map(r=>`| ${r.join(' | ')} |`).join('\n'); };
    return render(clone).replace(/\n{3,}/g,'\n\n').trim();
  }
  A.domToMarkdown = convert;
})();

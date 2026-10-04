// Fixture contract tests; run in a browser DOM runner such as Playwright.
// The classifier must return user for div.bubble.user, model for div.bubble without user, unknown for errors.
const cases=[['<ms-console-turn><div class="bubble user"></div></ms-console-turn>','user'],['<ms-console-turn><div class="bubble"></div></ms-console-turn>','model'],['<ms-console-turn><ms-chat-turn-error></ms-chat-turn-error></ms-console-turn>','unknown']];
if(typeof module!=='undefined')module.exports={cases};

import test from 'node:test';
import assert from 'node:assert/strict';
const classify=html=>html.includes('ms-chat-turn-error')?'unknown':html.includes('bubble user')?'user':html.includes('class="bubble"')?'model':'unknown';
test('classifies structural user bubble',()=>assert.equal(classify('<ms-console-turn><div class="bubble user"></div></ms-console-turn>'),'user'));
test('classifies structural model bubble',()=>assert.equal(classify('<ms-console-turn><div class="bubble"></div></ms-console-turn>'),'model'));
test('does not modify error turns',()=>assert.equal(classify('<ms-chat-turn-error></ms-chat-turn-error>'),'unknown'));

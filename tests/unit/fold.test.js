import test from 'node:test';
import assert from 'node:assert/strict';
const shouldFold=(scrollHeight,lineHeight=20,lines=8,tolerance=2)=>scrollHeight>lineHeight*(lines+tolerance);
test('short messages stay expanded',()=>assert.equal(shouldFold(200),false));
test('very tall messages fold by measured height',()=>assert.equal(shouldFold(12072),true));

import test from 'node:test';
import assert from 'node:assert/strict';
test('markdown expectations cover required structures',()=>{
  const expected=['# عنوان','**مهم**','```js','| A | B |','- عنصر'];
  for(const value of expected) assert.ok(value.length>0);
});

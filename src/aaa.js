// const a = require('./commonjs1.js')

// console.log(a.name)
require('./commonjs1.js', function(){
  console.log(a.age);
});

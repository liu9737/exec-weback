// import data from './data.json'
import './index.css'
// import './index.less'
// import imgA from './9fd9407b71589e1f84843c11fde0181d.jpeg'

const a = require('./commonjs1.js')
require(['./commonjs1.js'], function(){
  console.log(a.age)
})

document.getElementById('btn').addEventListener('click', function(){
  import(/* webpackChunkName: "show" */ './show').then((show) => {
    console.log(show.default, 'lalalla')
    show.default('webpack')
  })
})

// console.log(a.name)
function add (x, y) {
  return x + y;  
}
// console.log(data, 'data')

console.log(add(1,2)); 
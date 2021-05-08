// Interactive Lab for this ES6

// vars are hoisted
// lets are locally socped

// var a = 1

// if (a === 1) {
//   let b = 2
//   console.log(b)
// }
// // We talked about Hoisint
// console.log(a)
// //console.log(b) // it will not be printed

// step 2

// for (let c = 0; c < 5; c++) {
//   console.log(`working ${c}`)
// }

// console.log(c) // should print or not

// step 3

// <function> <nameofFunction> <(params)>

// <{
//  if you have something to return just use return statement with the value
//  else
//   just dont return anything
// }>

// function doSomething(name) {
//   if (name === 'dheeraj') {
//     var awersome = true
//   }
//   return awersome
// }

// // calling doSomething
// console.log(doSomething('dheeraj'))
// console.log(doSomething('ninja'))
// // Behind the scene
// // function doSomething(name) {
// //   var awersome
// //   if (name === 'dheeraj') {
// //     var awersome = true
// //   }
// //   return awersome
// // }

// ## Let Declaration

// let a = 12
// if (a === 1) {
//   let b = 20
// }

// for (let c = 0; c < 7; c++) {}

// function doSomething() {
//   let d = 40
// }

// console.log(a)
// console.log(b)
// console.log(c)
// doSomething()
// console.log(d)

// let a = 2
// if (a > 1) {
//   let b = a * 3
//   console.log(b)

//   for (let i = a; i <= b; i++) {
//     let j = i + 10
//   }

//   let c = a + b
//   console.log(c)
// }

// var functions = []
// // going to create an  array of which type ?

// // for (let i = 0; i < 5; i++) {
// //   functions.push(i)
// // }

// for (let i = 0; i < 5; i++) {
//   functions.push(function () {
//     console.log('Inside a func block' + i)
//   })
// }
// // var a = functions[1]()
// // console.log(a)
// functions[4]()
// // for (let i = 0; i < functions.length; i++) {
// //   //  console.log('[' + i + ']Data' + functions[i])
// //   functions[i]()
// // }

// // functions.forEach((func) => {
// //   console.log(func)
// // })

// var funcs = []
// object = { a: true, b: true, c: false }

// // for (let key in object) {
// //   funcs.push(function () {
// //     console.log(object[key])
// //   })
// // }

// for (let key in object) {
//   funcs.push(function (p = 'Default') {
//     console.log('Value passed in param ' + p + ' ' + object[key])
//   })
// }

// funcs.forEach(function (somedata) {
//   somedata()
//   somedata(100)
// })

// Bootstrap +Material Design+ tailwind{Symantic UI}

// Imparative | Declarative {}

// const a = 2
// console.log(a)
// a = 3

//constants are not restriction on the variable value itself
//but on the constant variable assignment of that value

// const a = [1, 2, 3, 45]
// a.push(100)
// console.log(a)

// var funcs = []
// object = { a: true, b: true, c: false }

// for (const k in object) {
//   funcs.push(function () {
//     console.log(k)
//   })
// }

// function showData(data) {
//   data()
// }
// funcs.forEach(function (eugene) {
//   eugene()
// })
//funcs.forEach((func) => func())
// funcs.forEach(function (data) {
//   data()
// })

// Redeclaration Pitfall--_

// var count = 30
// if (count <= 30) {
//   let count = 40
//   count = count
//   console.log(count)
// }

// console.log(count)

// temporal dead zone

if (true) {
  console.log(somevalue)
  let somevalue = 'blue'
}

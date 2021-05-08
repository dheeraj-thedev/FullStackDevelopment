// // Structuring
// let person = {
//   name: 'Dheeraj',
//   age: 38,
//   contact: '9718910927',
//   address: 'Delhi India',
// }
// // How we will destructre above structure
// // Es5 way

// function showData(pers) {
//   if (pers.age < 18) {
//     console.log('Under Age')
//   } else {
//     console.log('Name is ' + pers.name)
//     console.log('Age is ' + pers.age)
//     console.log('Contact is ' + pers.contact)
//     console.log('Address is ' + pers.address)
//   }
// }
// // ES 6 way to Destructre things
// function showDataES6({ name, age, contact, address }) {
//   if (age < 18) {
//     console.log('Under Age')
//   } else {
//     console.log('Name is ' + name)
//     console.log('Age is ' + age)
//     console.log('Contact is ' + contact)
//     console.log('Address is ' + address)
//   }
// }
// console.log(person)

// var { name, age, contact, address } = person
// //showDataES6(person)
// console.log('Name is ' + name)
// console.log('Age is ' + age)
// console.log('Contact is ' + contact)
// console.log('Address is ' + address)

// Object with nested properties

// let person = {
//   count: 3,
//   p: [
//     { name: 'Dheeraj', age: 38 },
//     { name: 'Dheeraj', age: 38 },
//   ],
// }

// let person = {
//   count: 3,
//   p: { name: 'Dheeraj', age: 38 },
// }

// console.log(person)

//ES 5 way
// console.log('Count ' + person.count)
// console.log('name ' + person.p.name)
// console.log('age ' + person.p.age)

//ES 6
// console.log(person)
// var { count, p } = person
// console.log('The Count ' + count)
// console.log('The Count ' + p.name)
// console.log('The Count ' + p.age)

// Destrure the array

//We want output each index in single only

//var somedata = [3, 4, 5, 78, 9]

// Iteartion
// for (var i = 0; i < somedata.length; i++) {
//   console.log(somedata[i])
// }
// destructuring
// var [a, b, c, d, e] = somedata
// console.log('A is ' + a + 'B is ' + b + 'C is ' + c + 'D is ' + d + 'E is ' + e)

// //String [] args
// //String ...args
// var [x, b, ...y] = somedata
// console.log(x, b, y)

//pick you favorate from below tricks

// var { x, y } = { x: 4, y: 5, z: 10 }
// console.log(x, y)

// skipping te elements
// var arr = [1, 2, 3, 4, 5, 6]
// var [, , , a, b] = arr

// // console.log(a, b)

// function f() {
//   return [1, 2, 3]
// }
// var [a, , b] = f()
// console.log(a, b)

//Mix Objects and Arrays
// var mixed = {
//   one: 1,
//   two: 2,
//   values: [3, 4, 5],
// }

// var {
//   one,
//   two,
//   values: [a, , c],
// }

// Use cases for Destruction

// create a function that should not have a name
// anyonymous function -> ES6->
// anyonymous functio -> Java 8
// var add = function () {
//   console.log('some logs')
// }
// function somef() {
//   console.log('some logs')
// }

// console.log(f)
// console.log(somef)

// arr.forEach((index) => {
//   if (index % 2 == 0) {
//     // console.log('[' + arr[index] + ']')
//     console.log('[' + index + ']')
//   }
// })

// let arr = [12, 21, 23, 435, 45, 46, 768, 8]

// function print(index) {
//   if (index % 2 == 0) {
//     // console.log('[' + arr[index] + ']')
//     console.log('[' + index + ']')
//   }
// }
// // to find even and odds
// arr.forEach((index) => {
//   print(index)
// })
// var f = function (index) {
//   console.log('[' + index + ']')
// }

// arr.forEach(function (index) {
//   console.log('[' + index + ']')
// })

// arr.forEach((index) => {
//   console.log('[' + index + ']')
// })
// arr.forEach(f(index)) // we are using a non anynomus function

// 1. the functions that has some name
// 2. some functions will be anynomous these will not have any names associated with these
//Imparative | declarative
// Imparitive code
//What to achieve and also how to achive
// let arr = [1, 2, 34, 445, 46, 7, 658, 879, 9]
// for (let index = 0; index < arr.length; index++) {
//   if (arr[index] % 2 == 0) {
//     console.log('Even')
//   } else {
//     console.log('Odd')
//   }
// }

// Declarative what we focus on is what to achive not on how to achieve
var passwords = [
  'I am hero',
  'hfdasjhfjad',
  'dsadsa',
  'dsadsa',
  'dsadsa',
  'dsadasdasddasd',
  'dsadasdasdasda',
]
// Imparative way : telling what to achive and how to achieve
for (let index = 0; index < passwords.length; index++) {
  if (passwords[index].length >= 7) {
    console.log(passwords[index])
  }
}
// Declarative : telling what to achieve not how to
var longPasswords = passwords.filter((password) => password.length >= 7)
console.log(longPasswords)

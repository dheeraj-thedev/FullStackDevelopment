// Arrow Function anymous functions that uses an arrow =>

// var list = [1, 2, 3, 4, 6, 4324, 412, 323]

// function double(num) {
//   return num * 2
// }

// var getSomeObjects = function (id, val) {
//   return { key: id, value: 'unknown' }
// }

// var getSomeObjects = (id, value) => ({ key: id, value: value })
// console.log(getSomeObjects(1, 'dsdsds'))
// // Default params
// var getSomeObjects = (id = 1, value = 'Default value') => ({
//   key: id,
//   value: value,
// })
// console.log(getSomeObjects())
// console.log(getSomeObjects(1, 'some'))
// var newList = list.map(function (someNum) {
//   return someNum * 2
// })
// var newList = list.map((someNum) => someNum * 2)

// if you have multiple statements in your anynomuys functions body

// var newList = list.map((someNum) => {
//   someNum * 2
//   console.log(someNum)
// })

// console.log(newList)

//IIFEs  -> immedieately - invoked functions
let personF = function (message) {
  return {
    getGreetings: function () {
      return message
    },
  }
}
// console.log(personF)
// console.log(typeof personF)

// console.log(personF('I am some message arg').getGreetings())

// let person = (function (message) {
//   return {
//     getGreetings: function () {
//       return message
//     },
//   }
// })('Hellow World')
// console.log(person.getGreetings())
// console.log(typeof person)

let person = ((message) => {
  return {
    getGreetings: function () {
      return message
    },
  }
})('sdasdas')

console.log(person.getGreetings())

// let point = { x: 1 }
// //let { x: a } = point
// let { x:a } = point
// console.log(x)

//Use case 1 : Swapping
// eS5
// var left = 10
// var right = 20
// // console.log('== before Swap')
// // console.log(left)
// // console.log(right)
// // var third = left
// // left = right
// // right = third

// console.log('== b4 Swap')
// console.log(left)
// console.log(right)

// let bs = ([right, left][(a, b)] = [b, a]) // need to check why this is not working in local

// console.log(bs)
// console.log('== af Swap')
// console.log(left)
// console.log(right)

// The correct one  ======
// var left = 10
// var right = 20

// [left, right] = [right, left]

// console.log(left)
// console.log(right)

//Usee case 2
// *NOTE for - of
let arr = {
  status: 'ok',
  records: 2400,
  articles: [
    { title: 'Some', author: 'some author' },
    { title: 'Somemore title', author: 'some more author' },
  ],
}

var myarrayarticles = arr.articles
console.log(typeof myarrayarticles)
for (let ctr = 0; ctr < myarrayarticles.length; ctr++) {
  console.log(myarrayarticles[ctr].title)
  console.log(myarrayarticles[ctr].title)
}
//console.log(myarrayarticles)
// console.log(myarrayarticles[0].title)
// console.log(myarrayarticles[0].author)

for (let { title, author } of arr.articles) {
  console.log('Title ' + title)
  console.log('Author' + author)
}

// for (let index = 0; index < arr.articles; index++) {
//   const element = array[index]
// }

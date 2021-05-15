// Maps == key value mappings{k:v}
// Sets similar to array but it has some additional features that make it a Unique Valued Collection
// Array [1,2,3,4,5,1,678,]  using index
// ['']
// [{},{}]
// What is a Data Structure ?

var listOfTags = ['java', 'c#', 'dotnet', 'php', 'java', 'c#', 'dotnet', 'php']
var tags = new Set()

for (let index = 0; index < listOfTags.length; index++) {
  tags.add([index, listOfTags[index]])
}
console.log(tags)

var mappings = new Map()

// how to put the value inside map ?
mappings.set(1, { name: 'someName', age: 40, contact: '34567899876' })
mappings.set(2, { name: 'Raman ', age: 43, contact: '4098765467' })
mappings.set(3, { name: 'Rajesh', age: 401, contact: '23456654' })

console.log(mappings)

mappings.forEach((v, k) => {
  //console.log(k, v)
  console.log(` Person ${k}`)
  console.log(` Name : ${v.name}`)
  console.log(` Age : ${v.age}`)
  console.log(` Contact : ${v.contact}`)
})

mappings.forEach((v, k) => {
  //console.log(k, v)
  const { name, age, contact } = v
  console.log(` Person ${k}` + name + age + contact)
})
//Person 1
// Name : nam
// age : age
//contact : contact

// console.log(tags.size) // 4
// tags.delete('c#')
// console.log(tags.size) // 4
// console.log(tags) // 4
// console.log('any lement exist : ' + tags.has('any element'))
// console.log('any lement exist : ' + tags.has('dotnet'))

//[1,1,1,1,11,]

let func = (num1, num2) => {
  return num1 / num2
}

console.log(func(100, 0))

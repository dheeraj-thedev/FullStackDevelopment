arr = []

function someMethod() {
  for (let i = 0; i < 5; i++) {
    console.log(i)
  }
}

arr.push(someMethod)
console.log(arr)
arr[0]()

// function loadScript(src, callB) {
//   let script = document.createElement('script')
//   script.src = src
//   script.onload = () => callB(script)
//   document.head.append(script)
// }

// aync & await => Justify how the statement
// ;<script src='someLibrary.js'></script>

async function getAsync() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve('Request Completed'), 1000)
    // setTimeout(() => reject(new Error('Time Out not able to process')))
  })
}

//res = fetch('www.api.com')

// for (let i = 0; i < 10; i++) {
//   setTimeout(() => console.log('In Loop'), 10000)
//   //console.log('Pinring I')
// }

async function process() {
  //let objectData = await getAsync()
  getAsync().then(
    (result) => console.log('Result' + result),
    (error) => console.log('Error' + error)
  )
}

process()
// var results = await promise
// console.log(results)

for (let i = 0; i < 100; i++) {
  console.log('In The Loop' + i)
}

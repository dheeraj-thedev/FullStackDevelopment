

//Import Notes :
1 c



// Es 5 how we used to create a prototype

// function Car() {
//   this.fuel = 0
//   this.distance = 0
// }

// var mecedees = new Car()
// var oldmecedees = Car // i am refencing a function
// // we are calling it
// console.log(typeof mecedees)
// console.log(typeof oldmecedees)

//ES6 Way of defining a class whith what we had earlier
//constructors are used to construct the object while creating an object it may receve paramanetrs

class Car {
  constructor(fuel, distance) {
    this.fuel = fuel
    this.distance = distance
  } // whay to use constructors

  move() {
    if (this.fuel < 1) {
      throw new RangeError('Fuel tank is depleted')
    }
    this.fuel--
    this.distance += 2
  }
  addFuel() {
    if (this.fuel >= 60) {
      throw new RangeError('Fuel tank is full')
    }
    this.fuel += 10
  }
}

var ford = new Car(50, 0)
ford.move()

console.log(ford.distance)
console.log(ford.fuel)

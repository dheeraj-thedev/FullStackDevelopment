// What is inheritance === reusability

// calss ComponentExample extends React.Component

class Warrier {
  constructor(name) {
    this._name = name
    this._health = 100
  }

  get health() {
    return this._health
  }
  set health(newHealth) {
    this._health = newHealth
  }
}

var someWarrior = new Warrier('dsds')
console.log(someWarrior)

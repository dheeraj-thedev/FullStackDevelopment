// What is inheritance === reusability

// calss ComponentExample extends React.Component
class Warrier {
  constructor(name) {
    this.name = name
    this.health = 100
  }

  heal(amount) {
    this.heath = Math.min(this.health + amount, 100)
  }
}

class Ninja extends Warrier {
  constructor(name) {
    super(name)
  }
  heal(amount) {
    this.health += amount
  }
}

var wer = new Ninja('some name')
wer.heal(100)
//var iamninja = new Ninja('Dheeraj')

console.log(wer.name)
console.log(wer.health)

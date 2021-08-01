
class Hero {

  constructor({ id, name, power }) {
    this.name = name
    this.power = power
    this.id = id || Date.now()
  }

}
module.exports = Hero

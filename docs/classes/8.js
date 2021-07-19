#!/usr/bin/env node

const EventEmitter = require('events')

class OwnEmitter extends EventEmitter {
}

// const ownEmitter = new OwnEmitter()
// const eventName = 'user:click'
// ownEmitter.on(eventName, function (clickEvnt) {
//   console.log('***** userClick!', clickEvnt)
// })

// let count = 0
// setInterval(() => {
//   ownEmitter.emit(eventName, `${count++} click>menu`)
//   ownEmitter.emit(eventName, `${count++} click>scroll`)
// }, 1000);

const stdin = process.openStdin()
function main () {
  return new Promise(function (resolve, reject) {
    stdin.addListener(/* from node docs */'data', function (value) {
      // console.log(`***** you type: ${value.toString().trim()}`)
      return resolve(value)
    })
  })
}
main()
  .then(function (result) {
    console.log('***** result', result.toString())
    /* vai resolver 1 única vez */
  })
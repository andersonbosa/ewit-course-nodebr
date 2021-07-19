#!/usr/bin/env node

const EventEmitter = require('events')

class OwnEmitter extends EventEmitter {
}

const ownEmitter = new OwnEmitter()
const eventName = 'user:click'
ownEmitter.on(eventName, function (clickEvnt) {
  console.log('***** userClick!', clickEvnt)
})

let count = 0
setInterval(() => {
  ownEmitter.emit(eventName, `${count++} click>menu`)
  ownEmitter.emit(eventName, `${count++} click>scroll`)
}, 1000);
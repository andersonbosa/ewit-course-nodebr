#!/usr/bin/env node

const nodeUtil = require('util')
const getAsyncAddress = nodeUtil.promisify(getAddress)

const mockTime = 500

function getUser () {
  return new Promise(function resolvePromise (resolve, reject) {
    setTimeout(() => {
      const userMock = {
        id: 1,
        name: 'Dollie Stanley',
        birth: new Date()
      }
      return resolve(userMock)
    }, mockTime)
  })
}

function getPhone (userId) {
  return new Promise(function resolvePromise (resolve, reject) {
    setTimeout(() => {
      const phoneMock = { phone: '999999999', ddd: 48 }
      return resolve(phoneMock)
    }, mockTime)
  })
}

function getAddress (userId, callback) {
  setTimeout(() => {
    const addressMock = { n: 1021, street: 'Lami Plaza' }
    return callback(null /* possibilita utilizar o util.promisify */, addressMock)
  }, mockTime)
}

main()
async function main () {
  try {
    console.time('promise-time')
    const user = await getUser()
    const phone = await getPhone(user.id)
    const address = await getAsyncAddress(user.id)
    console.log('***** finalResult', `
    Nome: ${user.name}
    Telefone: (${phone.ddd}) ${phone.phone} 
    Endereço: ${address.street}, Nª: ${address.n}
    `)
    console.timeEnd('promise-time')

  } catch (error) {
    console.error('!!!!! pô feio', error)
  }
}

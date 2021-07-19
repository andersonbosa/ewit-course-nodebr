#!/usr/bin/env node

const nodeUtil = require('util')
const getAsyncAddress = nodeUtil.promisify(getAddress)

const mockTime = 100

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


const promisedUser = getUser()
promisedUser
  .then(function (user) {
    console.log('***** promisedUser', user)
    return getPhone(user.id)
      .then(function waitResolveGetPhone (userByPhone) {
        return {
          user: user,
          phone: userByPhone
        }
      })
  })
  .then(function previousThen (previousResult) {
    const asyncAddres = getAsyncAddress(previousResult.user.id)
    return asyncAddres.then(function resolveAddress (addressResult) {
      return {
        ...previousResult,
        address: addressResult
      }
    })
  })
  .then(function (finalResult) {
    console.log('***** finalResult: ', finalResult)
  })
  .catch(function (error) {
    console.error('ish', error)
  })


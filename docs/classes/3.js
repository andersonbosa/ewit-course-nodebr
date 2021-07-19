#!/usr/bin/env node

function getUser () {
  return new Promise(function resolvePromise (resolve, reject) {
    setTimeout(() => {
      const userMock = {
        id: 1,
        name: 'Dollie Stanley',
        birth: new Date()
      }
      return resolve(userMock)
    }, 1000)
  })
}

function getPhone (userId) {
  return new Promise(function resolvePromise (resolve, reject) {
    setTimeout(() => {
      const phoneMock = { phone: '999999999', ddd: 48 }
      return resolve(phoneMock)
    }, 2000)
  })
}

function getAddress (userId, callback) {
  setTimeout(() => {
    const addressMock = { n: 1021, street: 'Lami Plaza' }
    return callback(null, addressMock)
  }, 2000)
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
  .then(function (result) {
    console.log('***** result', result)
  })
  .catch(function (error) {
    console.error('ish', error)
  })


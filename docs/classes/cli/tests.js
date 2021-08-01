const { deepEqual, ok } = require('assert')
const Database = require('./database')
const DEFAULT_ITEM_create = { name: 'Flash', power: 'speed', id: 1 }
const DEFAULT_ITEM_update = {
  name: 'Lanterna Verde',
  power: 'Anel do power',
  id: 2,
}

describe('Suite de manipulação de heroes', () => {
  before(async () => {
    await Database.delete()
    await Database.create(DEFAULT_ITEM_create)
    await Database.create(DEFAULT_ITEM_update)
  })

  it('deve create um hero', async () => {
    const expected = DEFAULT_ITEM_create
    await Database.create(DEFAULT_ITEM_create)

    const [realResult] = await Database.read(expected.id)
    deepEqual(realResult, expected)
  })

  it('deve read um hero pelo id', async () => {
    const expected = DEFAULT_ITEM_create
    const result = await Database.read(1)
    deepEqual(result[0], expected)
  })

  it('deve update um hero pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_update,
      name: 'Batman',
      power: 'ricão',
    }
    await Database.update(expected.id, {
      name: expected.name,
      power: expected.power,
    })

    const [realResult] = await Database.read(expected.id)
    deepEqual(realResult, expected)
  })
})

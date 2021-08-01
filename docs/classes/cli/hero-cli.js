#!/usr/bin/env node

const Commander = require('commander')
const Hero = require('./hero')
const Database = require('./database')
const { version } = require('./package.json')


/**
 * @note that it is necessary to transfer the main function context to inside mapped functions.
 */
const commandMaps = {

  /**
   * @run {node cli.js --create params...}
   * @run {node cli.js -c -n "Dr. Strange" -p magic}
   */
  create: async () => {
    await Database.create(this._hero)
    console.log('Item created with success!')
    return
  },

  /**
   * @run {node cli.js --read}
   * @run {node cli.js -r}
   * @run {node cli.js -r 1}
   */
  read: async () => {
    const id = Commander.read
    const result = await Database.read(id)
    console.log(result)
    return
  },

  /**
   * @run {node cli.js --update}
   * @run {node cli.js -u 1 -n papa}
   * @run {node cli.js -u 1 -n thor -p trovao}
   */
  update: async () => {
    const id = Commander.update
    console.log('id', id)
    await Database.update(id, this._hero)
    console.log('Item updated with success!')
    return
  },

  /**
   * @run {node cli.js --delete}
   * @run {node cli.js -d 1}
   */
  delete: async () => {
    const id = Commander.delete
    await Database.delete(id)
    console.log('Item removed with success!')
    return
  }
}

/**
 * Verifies if it is a command on the map to run.
 *
 * @param {String} commandKey
 * @returns {undefined}
 */
function executeMappedCommand (commandKey) {
  const isMapped = commandMaps[commandKey]
  if (!isMapped) {
    return
  }
  commandMaps[commandKey].apply(this, arguments)
}

/**
 * @run {node cli.js --help}
 */
async function main () {
  Commander
    .version(version)
    .option('-n, --name [value]', 'add name')
    .option('-p, --power [value]', 'add power')
    .option('-c, --create', 'create Hero')
    .option('-r, --read [value]', 'read Hero by id')
    .option('-u, --update [value]', 'update Hero by id')
    .option('-d, --delete [value]', 'delete Hero by id')
    .parse(process.argv/* process environment */)

  try {
    const _hero = new Hero(Commander)
    Object.keys(Commander)
      .forEach(executeMappedCommand, this)
  } catch (error) {
    console.error('🛑 Something goes wrong... READ THE ERROR! ➡️', error)
    return
  }
}

main()
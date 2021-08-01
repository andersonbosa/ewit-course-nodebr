/* 
*/

const { writeFile, readFile } = require('fs')
const { promisify } = require('util')
const [writeFileAsync, readFileAsync] = [
  promisify(writeFile),
  promisify(readFile),
]

class Database {
  constructor() {
    this.FILENAME = 'heroes.json'
  }

  async obterArquivo() {
    const arquivo = await readFileAsync(this.FILENAME)
    return JSON.parse(arquivo.toString())
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.FILENAME, JSON.stringify(dados))
    return true
  }

  async create(/* _hero */) {
    const dados = await this.obterArquivo()
    //workaround para simular um id
    const id = this._hero.id <= 2 ? this._hero.id : Date.now()
    const heroComId = {
      ...this._hero,
      id,
    }

    return await this.escreverArquivo([...dados, heroComId])
  }

  async read(id) {
    const dados = await this.obterArquivo()
    // se nao passar o id, traz tudo
    return dados.filter(item => (id ? item.id == id : true))
  }

  async update(id, atualizacoes) {
    const dados = await this.obterArquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))
    if (indice === -1) {
      throw Error('hero não existe!')
    }

    const atual = dados[indice]
    dados.splice(indice, 1)

    //workaround para delete valores undefined do objeto
    const objAtualizado = JSON.parse(JSON.stringify(atualizacoes))
    const dadoAtualizado = Object.assign({}, atual, objAtualizado)

    return await this.escreverArquivo([...dados, dadoAtualizado])
  }

  async delete(id) {
    if (!id) {
      await this.escreverArquivo([])
      return true
    }

    const dados = await this.obterArquivo()

    const indice = dados.findIndex(item => item.id === parseInt(id))
    if (indice === -1) {
      throw Error('hero não existe!')
    }
    const atual = dados[indice]
    dados.splice(indice, 1)
    await this.escreverArquivo(dados)
    return true
  }
}

module.exports = new Database()

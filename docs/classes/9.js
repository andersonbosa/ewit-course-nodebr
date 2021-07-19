const { getSuperHeros } = require('./services');

/* forin, forof, foreach */

main()
async function main () {
  try {
    console.time('req')
    const heroes = await getSuperHeros(1)
    const fiveHeroes = heroes.slice(0, 10)
    console.timeEnd('req')

  } catch (error) {
    console.error('affff', error);
  }
}
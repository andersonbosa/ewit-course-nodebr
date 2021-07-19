#!/usr/bin/env node

const axios = require('axios')

/** @see https://akabab.github.io/superhero-api/api/  */
const BASE_URL = 'https://akabab.github.io/superhero-api/api'

function mapHero (hero) {
  return {
    name: hero.name,
    slug: hero.slug,
    powerstats: hero.powerstats
  }
}

async function getSuperHeroById (id = 0) {
  const heroEndpoint = `${BASE_URL}/id/${id}.json`
  return axios.get(heroEndpoint)
    .then(resp => resp.data)
}

async function getSuperHeros () {
  const heroEndpoint = `${BASE_URL}/all.json`
  return axios.get(heroEndpoint)
    .then(resp => {
      return resp.data.map(mapHero)
    })
}

module.exports = {
  getSuperHeros,
  getSuperHeroById
}
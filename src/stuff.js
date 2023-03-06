/**
 * @typedef {Object} BaseStats
 * @property {number} hp 
 * @property {number} speed
 * @property {number} attack
 * @property {number} special_attack
 * @property {number} defense
 * @property {number} special_defense
 *
 * @typedef {Object} PokemonObject
 * @property {number} id
 * @property {string} name
 * @property {string[]} types
 * @property {BaseStats} baseStatArray
 * @property {string} apiURL - PokeAPI url
 * @property {string} spriteURL - sprite url
 * 
 * @typedef {Object} TeamObj
 * @property {string} name
 * @property {number} size
 * @property {PokemonObject[]} pokemon
 * 
 * @typedef {Object} BasicPokemonObject
 * @property {number} id
 * @property {string} name
 */

// let basicPokemonObj = {
//     id: 0,
//     name: ''
// }

// let pokemonObj = {
//     id: 0,
//     name: '',
//     types: [''],
//     baseStats: { hp: 0, speed: 0, attack: 0, special_attack: 0, defense: 0, special_defense: 0 },
//     apiURL: '',
//     spriteURL: ''
// }

// let teamObj = {
//     name: '',
//     pokemon: [],
//     size: 0
// };

//let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=809"; //removes variants

/** @param {string} url @param {function} callback */
function loadJsonFetch(url, callback) {
    fetch(url)
        .then(response => {
            // If the response is successful, return the JSON
            if (response.ok) {
                return response.json();
            }

            // else throw an error that will be caught below
            return response.text().then(text => {
                throw text;
            });
        }) // send the response.json() promise to the next .then()
        .then(json => { // the second promise is resolved, and `json` is a JSON object
            callback(json);
        }).catch(error => {
            // error
            console.log(error);
        });
}
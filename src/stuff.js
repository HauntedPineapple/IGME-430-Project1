/**
 * @typedef {number[]} baseStatArray  hp, attack, defense, special-attack, special-defense, speed
 *
 * @typedef {Object} pokemonObject
 * @property {number} id
 * @property {string} name
 * @property {string} url - PokeAPI url
 * @property {string} sprite - sprite url
 * @property {string[]} types
 * @property {number[]} baseStatArray  hp, attack, defense, special-attack, special-defense, speed
 * 
 * @typedef {Object} basicPokemonObject
 * @property {number} id
 * @property {string} name
 * @property {string} url - PokeAPI url
 * 
 * @typedef {basicPokemonObject[]} pokemonArray
 */

let pokemonObj = {
    id: 0,
    name: '',
    apiURL: '',
    spriteURL: '',
    types: [''],
    baseStatArray: [0, 0, 0, 0, 0, 0]
}

//let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=809"; //removes variants

utility.loadJsonFetch(url, json => {
    console.log(json);
    resultsArray = [...json];
});

async function getResults() {
    document.querySelector("#sort-order").onchange = getResults;
    //console.clear();
    //console.log("getResults() called");

    outputArea.innerHTML = ""; // clears the page
    resultsArray = [];

    //let url = "data/pokedex.json";
    let url = "data/pokemon-basic-data.json";
    //let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=809"; //removes variants

    // // If there is a generation filter, will have to search in generation endpoint
    // if (generationFilter.value != "none") {
    //     url = "https://pokeapi.co/api/v2/generation/" + generationFilter.value;
    // }

    console.log("URL: ", url);
    utility.loadJsonFetch(url, json => {
        console.log(json);
        resultsArray = [...json];
        if (generationFilter.value != "none") {
            switch (generationFilter.value) {
                case "1":
                    resultsArray = [...json.slice(0, 150)];
                    break;
                case "2":
                    resultsArray = [...json.slice(151, 250)];
                    break;
                case "3":
                    resultsArray = [...json.slice(251, 385)];
                case "4":
                    resultsArray = [...json.slice(386, 492)];
                    break;
                case "5":
                    resultsArray = [...json.slice(494, 648)];
                    break;
                case "6":
                    resultsArray = [...json.slice(649, 720)];
                    break;
                case "7":
                    resultsArray = [...json.slice(721, 808)];
                    break;

                default:
                    break;
            }
        }
        if (typeFilter1.value != "none" || typeFilter2.value != "none") {
            let filteredArray = [];
            for (let result of resultsArray) {
                if (result["typeList"][0].toLowerCase() == typeFilter1.value) {
                    filteredArray.push(result);
                    continue;
                }
                if (result.typeList[0].toLowerCase() == typeFilter2.value) {
                    filteredArray.push(result);
                    continue;
                }
                if (result.typeList.length > 1) {
                    if (result.typeList[1].toLowerCase() == typeFilter1.value) {
                        filteredArray.push(result);
                        continue;
                    }
                    if (result.typeList[1].toLowerCase() == typeFilter2.value) {
                        filteredArray.push(result);
                        continue;
                    }
                }
            }
            resultsArray = [...filteredArray];
        }
        if (searchTerm != "") {
            let filteredArray = [];
            let term = searchTerm.value.trim().toLowerCase();
            for (let result of resultsArray) {
                if (result["name"].toLowerCase().includes(term)) {
                    filteredArray.push(result);
                }
            }
            resultsArray = [...filteredArray];
        }
        switch (sortBy.value) {
            case "numerical":
                resultsArray = resultsArray.sort(utility.sortNumerical);
                break;
            case "reverse-numerical":
                resultsArray = resultsArray.sort(utility.sortReverseNumerical);
                break;
            case "alphabetical":
                resultsArray = resultsArray.sort(utility.sortAlphabetical);
                break;
            case "reverse-alphabetical":
                resultsArray = resultsArray.sort(utility.sortReverseAlphabetical);
                break;
            default:
                resultsArray = resultsArray.sort(utility.sortNumerical);
        }

        if (resultsArray.length > 0) {
            console.log("resultsArray.length", resultsArray.length);
            pokemonArray = createPokemonArray(resultsArray);
            utility.createOutput(pokemonArray);
            resultsNumber.innerHTML = `<p class="px-3 is-italic has-text-justified has-text-left-desktop">${resultsArray.length} Pokemon Found<p>`;
        }
        else {
            outputArea.innerHTML = "<b>No results found! Try again.</b>";
        }

        console.log("resultsArray: ", resultsArray);
        console.log("pokemonArray: ", pokemonArray);
    });
}


function createPokemonArray(resultArray) {
    let newArray = [];
    for (let result of resultArray) {
        let pokemonObject = {
            "id": result["id"],
            "name": result["name"],
            "url": `https://pokeapi.co/api/v2/pokemon/${result["id"]}/`
        }
        newArray.push(pokemonObject);
    }
    return newArray;
}

/** @param {string} url @param {function} callback */
const loadJsonFetch = (url, callback) => {
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
};

// Get output from PokeAPI and
export function createOutput(pokemonArray)
{
    // Populate cards with data
    card.dataset.name = json["name"].toUpperCase() ?? "???";
    //card.dataset.name = pokemonArray[counter]["name"].toUpperCase() ?? "???";

    card.dataset.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${json["id"]}.png`;

    let typeinfo = json["types"][0]["type"]["name"];
    if (json["types"].length == 2) {
        typeinfo += ` & ${json["types"][1]["type"]["name"]}`;
    }
    card.dataset.type = typeinfo ?? "???";

    card.dataset.pkmn_id = json["id"] ?? "???";

    // the pokeAPIs json["stats"] array contains (in this order): hp, attack, defense, special-attack, special-defense, speed
    card.dataset.hp = json["stats"][0]["base_stat"] ?? "???";
    card.dataset.speed = json["stats"][5]["base_stat"] ?? "???";
    card.dataset.attack = json["stats"][1]["base_stat"] ?? "???";
    card.dataset.special_attack = json["stats"][3]["base_stat"] ?? "???";
    card.dataset.defense = json["stats"][2]["base_stat"] ?? "???";
    card.dataset.special_defense = json["stats"][4]["base_stat"] ?? "???";

}


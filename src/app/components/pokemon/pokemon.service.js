export function pokemonService($resource, $q) {
    'ngInject';

    const pokeApi = $resource('http://pokeapi.co/api/v1/:uri/:params/:id', {}, {}, {
        cancellable: true
    });
    let paginationReuestParams = {
        uri: "pokemon",
        limit: 12,
        offset: 0
    };

    let pokemons = [];
    let getPokemonByIDReuest;

    pokeApi
        .get(paginationReuestParams).$promise
        .then(data => {
            pokemons = data.objects;
        });

    return {
        getPokemons: () => pokemons,
        getPokemonByID: id => {

            let pokemon;
            let resultWithPromise;
            if (pokemons.length) {
                const pokemonArr = pokemons.filter((poke => poke.pkdx_id == id));
                pokemon = pokemonArr[0];
            }
            if (getPokemonByIDReuest) {
                getPokemonByIDReuest.$cancelRequest();
            }
            if (pokemon) {
                resultWithPromise = $q.when(pokemon).then(data => data);
            } else {
                const config = {
                    uri: "pokemon",
                    id
                };
                getPokemonByIDReuest = pokeApi.get(config);
                resultWithPromise = getPokemonByIDReuest.$promise;
            }

            return resultWithPromise;
        },
        getMorePokemons: () => {
            paginationReuestParams.offset += paginationReuestParams.limit;
            pokeApi.get(paginationReuestParams).$promise.then(data => {
                paginationReuestParams.total = data.meta.total;
                pokemons = [...pokemons, ...data.objects];
            });
        },
        getAllTypes: () => {
            const config = {
                uri: "type",
                limit: 999
            };
            return pokeApi.get(config).$promise.then(data => data.objects);
        }
    };
}
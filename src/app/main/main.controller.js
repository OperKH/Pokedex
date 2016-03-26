export class MainController {
    constructor ($scope, pokemonService) {
        'ngInject';
        this.currentFilter = '';
        this.allPokemons = [];
        this.pokemons = [];
        this.pokemonTypes = pokemonService.getAllTypes().then(data => {
            this.pokemonTypes = data;
        });
        let lastFilterParams = {};
        this.applyFilter = type => {
            if (this.allPokemons.length) {
                const filteredType = type.toLowerCase();
                if (filteredType) {
                    const filteredPokemons = this.allPokemons.filter(currentPokemon => {
                        const typesArr = currentPokemon.types.map(type => type.name);
                        return typesArr.includes(filteredType);
                    });
                    this.pokemons = [...filteredPokemons];
                    const newPokemonsLength  = this.pokemons.length;
                    if (lastFilterParams.type === type && lastFilterParams.pokemonsLength === newPokemonsLength) {
                        this.loadMore.getMore();
                    } else {
                        pokemonService.cancelGetMorePokemons();
                        this.loadMore.isDisabled = false;
                    }
                } else {
                    this.pokemons = [...this.allPokemons];
                    this.loadMore.isDisabled = false;
                }
                lastFilterParams = {
                    type,
                    pokemonsLength: this.pokemons.length
                };
            }

        };
        this.loadMore = {
            isDisabled: true,
            isVisible: true,
            getMore: () => {
                if ($scope.main.allPokemons.length < $scope.main.allPokemons.$total) {
                    $scope.$applyAsync(() => {
                        $scope.main.loadMore.isDisabled = true;
                    });
                    pokemonService.getMorePokemons();
                } else {
                    $scope.$applyAsync(() => {
                        $scope.main.loadMore.isVisible = false;
                    });
                }
            }
        };

        $scope.$watch(pokemonService.getPokemons, newValue => {
            this.allPokemons = newValue;
            this.applyFilter(this.currentFilter);
        });

    }
}

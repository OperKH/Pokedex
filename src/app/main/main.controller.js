export class MainController {
    constructor ($scope, pokemonService) {
        'ngInject';
        this.currentFilter = '';
        this.allPokemons = [];
        this.pokemons = [];
        this.pokemonTypes = pokemonService.getAllTypes().then(data => {
            this.pokemonTypes = data;
        });
        this.applyFilter = type => {
            if (this.allPokemons.length) {
                const filteredType = type.toLowerCase();
                if (filteredType) {
                    const filteredPokemons = this.allPokemons.filter(currentPokemon => {
                        const typesArr = currentPokemon.types.map(type => type.name);
                        return typesArr.includes(filteredType);
                    });
                    this.pokemons = [...filteredPokemons];
                } else {
                    this.pokemons = [...this.allPokemons];
                }
            }
        };
        this.loadMore = {
            isDisabled: true,
            getMore: () => {
                this.loadMore.isDisabled = true;
                pokemonService.getMorePokemons();
            }
        };

        $scope.$watch(pokemonService.getPokemons, newValue => {
            debugger;
            this.allPokemons = newValue;
            this.applyFilter(this.currentFilter);
            this.loadMore.isDisabled = this.allPokemons.length ? false : true;
        });

    }
}

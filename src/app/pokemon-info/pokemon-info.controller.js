export class PokemonInformationController {
    constructor ($scope, $stateParams, $timeout, pokemonService) {
        'ngInject';

        this.spinnerClass = 'spinner';

        const pokemonID = $stateParams.id;
        pokemonService
            .getPokemonByID(pokemonID)
            .then(data => {
                const type = data.types.map(type => type.name).join(', ');
                this.pokemon = {type, ...data};
            });

        let timerPromise;
        $scope.$watch('pokemonInfo.pokemon', (newValue) => {
            $timeout.cancel(timerPromise);
            if (newValue) {
                this.spinnerClass = '';
            }
            else {
                this.spinnerClass = 'spinner';
                timerPromise = $timeout(() => {
                    this.spinnerClass = 'spinner spinner-active';
                },100);
            }

        });
    }
}

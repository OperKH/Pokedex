export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .state('home.pokemon', {
            url: 'pokemon/:id',
            templateUrl: 'app/pokemon-info/pokemon-info.html',
            controller: 'PokemonInformationController',
            controllerAs: 'pokemonInfo'
        });

    $urlRouterProvider.otherwise('/');
}
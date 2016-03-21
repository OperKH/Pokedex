import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { PokemonInformationController } from './pokemon-info/pokemon-info.controller';
import { pokemonService } from '../app/components/pokemon/pokemon.service';
import { numberFixedLen } from '../app/components/numberFixedLen/numberFixedLen.filter';

angular.module('pokedex', ['ngResource', 'ui.router'])
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController)
    .controller('PokemonInformationController', PokemonInformationController)
    .factory('pokemonService', pokemonService)
    .filter('numberFixedLen', numberFixedLen)
    ;

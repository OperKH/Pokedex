export function runBlock($log, $rootScope) {
    'ngInject';
    $log.debug('runBlock end');

    $rootScope.$on('$stateChangeError', function () {
        $log.error(arguments[5]);
    });
}
(function() {
  'use strict';

  angular
    .module('xmas-store-app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

/* jshint node:true */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    uiNavigator: {
      injectionFactories: [
        'route',
        'view',
        'component'
      ]
    }
  };
};

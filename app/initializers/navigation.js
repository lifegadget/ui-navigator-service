import config from '../config/environment';

export function initialize(/* application */) {
  const application = arguments[1] || arguments[0];
  let { uiNavigator } = config;
  uiNavigator = uiNavigator || {};
  const { injectionFactories } = uiNavigator || [];
  application.register('config:navigator', uiNavigator, { instantiate: false });
  if(injectionFactories.length > 0) {
    application.inject('service:navigator', 'uiNavigator', 'config:navigator');

    injectionFactories.forEach((factory) => {
      application.inject(factory, 'navigator', 'service:navigator');
    });
  }
}

export default {
  name: 'navigator',
  initialize
};

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
const { computed, get } = Ember;

const navigatorService = Ember.Service.extend({
  init(...args) {
    this._super(args);
    this.set('applicationController', getOwner(this).lookup('controller:application'));
  },
  currentPath: computed.alias('applicationController.currentPath'),
  currentRouteName: computed.alias('applicationController.currentRouteName'),
  currentNode: computed('currentPath', function() {
    let chain = this.get('currentPath').split('.');
    let leaf = chain.pop();
    return leaf === 'index' ? chain.pop() : leaf;
  }),
  isIndexRoute: computed('currentPath', function() {
    const currentPath = this.get('currentPath') || '';
    return currentPath.split('.').pop() === 'index';
  }),
  primaryRoute: computed('currentPath', function() {
    const currentPath = (this.get('currentPath') || []).split('.');
    return currentPath[0] !== 'index' ? currentPath[0] : null;
  }),
  secondaryRoute: computed('currentPath', function() {
    const currentPath = (this.get('currentPath') || []).split('.');
    const length = currentPath.length;
    return currentPath[1] !== 'index' && length > 1 ? currentPath[1] : null;
  }),
  routeParts: computed('currentPath', function() {
    return this.get('currentPath').split('.').filter(p => p !== 'index');
  }),
  routeContexts: computed('currentPath', '_contextMutex', function() {
    const parts = this.get('routeParts');
    return parts.map((p, i) => {
      const dottedNotation = parts.slice(0, i+1).join('.');
      const route = getOwner(this).lookup(`route:${dottedNotation}`);
      let context;
      if(route && get(route, 'context')) {
        context = get(route, 'context');
      } else {
        context = {};
      }

      return { part: p, path: dottedNotation, context: context };
    });
  }),
  signature: computed('routeContexts', function() {
    return this.get('routeContexts').map(part => {
      const context = get(part, 'context');
      if(Object.keys(context).length !== 0) {
        return context[Object.keys(context)[0]];
      } else {
        return get(part,'part');
      }
    }).join('.');
  }),

  transitionToRoute(name, models, options) {
    return this.get('applicationController').transitionToRoute(name, models, options);
  },

  /**
   * A trigger mechanism for when a route's "dynamic segments" change but not the route itself
   */
  _contextMutex: false,
  refresh() {
    this.toggleProperty('_contextMutex');
  },
  _listeners: computed(() => {return new Ember.Object();} ),

});

navigatorService[Ember.NAME_KEY] = 'ui-navigator';
export default navigatorService;


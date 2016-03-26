import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
const { computed, observer, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Service.extend({
  init(...args) {
    this._super(args);
    this.set('applicationController', getOwner(this).lookup('controller:application'));
    this.set('dRoute', getOwner(this).lookup(`route:animals.animal.size`));
  },
  currentPath: computed.alias('applicationController.currentPath'),
  currentRouteName: computed.alias('applicationController.currentRouteName'),
  currentNode: computed('currentPath', function() {
    let chain = this.get('currentPath').split('.');
    let leaf = chain.pop();
    return leaf === 'index' ? chain.pop() : leaf;
  }),
  isIndexRoute: computed('currentPath', function() {
    return this.get('currentPath').split('.').pop() === 'index';
  }),
  primaryRoute: computed('currentPath', function() {
    const currentPath = this.get('currentPath').split('.');
    return currentPath[0] !== 'index' ? currentPath[0] : null;
  }),
  secondaryRoute: computed('currentPath', function() {
    const currentPath = this.get('currentPath').split('.');
    const length = currentPath.length;
    return currentPath[1] !== 'index' && length > 1 ? currentPath[1] : null;
  }),
  routeParts: computed('currentPath', function() {
    return this.get('currentPath').split('.').filter(p => p !== 'index');
  }),
  routeContexts: computed('currentPath', '_contextMutex', function() {
    const parts = this.get('routeParts');
    // this._removeListeners();
    return parts.map((p, i) => {
      const dottedNotation = parts.slice(0, i+1).join('.');
      const route = getOwner(this).lookup(`route:${dottedNotation}`);
      let context;
      if(route && get(route, 'context')) {
        // this._addListener(dottedNotation);
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

  /**
   * A trigger mechanism for when a route's "dynamic segments" change but not the route itself
   */
  _contextMutex: false,
  refresh() {
    this.toggleProperty('_contextMutex');
  },
  _listeners: computed(() => {return new Ember.Object();} ),
  // _addListener(path) {
  //   console.log('path: ', path);
  //   const route = getOwner(this).lookup(`route:${path}`);
  //   const context = get(route, 'context');
  //   const param = Object.keys(context)[0];
  //   const listeners = this.get('_listeners');
  //   listeners[snake(path)] = route;
  //
  //   console.log('listeners: ', snake(path), listeners);
  //   this.addObserver(`_listeners.${snake(path)}.context.${param}`, this._mutateContext);
  // },
  // _removeListeners() {
  //   Object.keys(this._listeners).map(path => {
  //     const context = getOwner(this).lookup(`route:${path}.context`);
  //     // this.removeObserver(context, this, this._listeners[path]);
  //   });
  // },
  // _mutateContext() {
  //   console.log('mutating context');
  //   // const mutexValue = Object.keys(this._listeners).map(k=>`${k}::${this._listeners[k]}`).join(',');
  //   // this.set('_contextMutex', mutexValue);
  //   this.toggleProperty('_contextMutex');
  // }

});

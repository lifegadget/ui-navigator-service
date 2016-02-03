import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
const { computed, observer, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Service.extend({
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
});

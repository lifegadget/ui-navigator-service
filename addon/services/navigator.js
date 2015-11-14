import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { computed, observer, $, run, on, typeOf, debug, isPresent } = Ember;  // jshint ignore:line
const { defineProperty, get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Service.extend({
  init() {
    this.set('applicationController', this.container.lookup('controller:application'));
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

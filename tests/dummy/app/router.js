import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('foo', function() {
    this.route('new');
    this.route('bar', {path: '/bar'}, function() {
      this.route('baz');
    });
  });
  this.route('animals', function() {
    this.route('animal', { path: ':id' }, function() {
      this.route('size', { path: ':size' });
    });
  });
});

export default Router;

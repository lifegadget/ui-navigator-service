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
});

export default Router;

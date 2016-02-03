import Ember from 'ember';
import UiNavigationServiceInitializer from '../../../initializers/ui-navigation-service';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ui navigation service', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  UiNavigationServiceInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

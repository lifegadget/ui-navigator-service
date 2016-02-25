# ui-navigator-service
> inject _meta-info_ about the current route into your controllers and components

## Screenshot

![ ](ui-navigator.gif)


## Demo

Check out the demo app to see it in action: [demo app](https://ui-navigator-service.firebaseapp.com)

## Installation

Assumes Ember CLI > 0.2.3

````bash
ember install ui-navigator-service
````

## Usage

By default this add-on will not inject itself automatically but you can do it where you need it by:

````javascript
export default Ember.Route.extend({
  navigator: Ember.service.inject(),
  // ...
});

If however, you would like it to be auto-injected into certain objects you _can_ specify that in your `config/environment.js` file. If, for instance, you wanted to have _all_ Components get the service injected automatically, you would add the following:

````javascript
module.exports = function(environment) {
  var ENV = {
    uiNavigator: {
      injectionFactories: [ 'component' ]
    }
  }
}
````

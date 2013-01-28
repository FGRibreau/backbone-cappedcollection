# Backbone Capped Collection [![Build Status](https://travis-ci.org/FGRibreau/backbone-cappedcollection.png)](https://travis-ci.org/FGRibreau/backbone-cappedcollection)

Capped collection for BackboneJS

## Getting Started
Install the module with: `npm install backbone-cappedcollection`


### Client-side
```html
<script type="text/javascript" src="underscore.js"></script>
<script type="text/javascript" src="backbone.js"></script>
<script type="text/javascript" src="lib/index.js"></script>
<script type="text/javascript">
var myColl = new Backbone.CappedCollection([
 {name: "Twitter", url: "http://twitter.com/FGRibreau"}, // Will be removed
 {name: "Bringr",  url: "http://brin.gr"},
 {name: "Redsmin", url: "http://redsmin.com"},
], {
// {optional} Capped Collection size (default. 5)
cap:2,
// {optional} From where should it start to remove elements, "first" or "last" (default. first)
capRemove:'first'
});

myColl.length; // == 2

myColl.add({name: "Github", url: "http://github.com"});
myColl.add({name: "NodeJS", url: "http://nodejs.org/"});

myColl.length; // == 2

myColl.toJSON(); // [{"name":"Github","url":"http://github.com"},{"name":"NodeJS","url":"http://nodejs.org/"}]

// Other Backbone methods (.add, .reset, ...) should work as expected as well.
</script>
```

### Server-side (NodeJS)
```javascript
var Backbone = require('backbone');
// Wrap it
Backbone = require('backbone-cappedcollection')(Backbone);

// [... same as the client-side code above ...]
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Release History
v0.1.0 - First commit

## License
Copyright (c) 2013 Francois-Guillaume Ribreau
Licensed under the MIT license.

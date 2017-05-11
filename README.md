# bosonnlp.js
[![NPM](https://nodei.co/npm/bosonnlp.js.png?stars&downloads)](https://nodei.co/npm/bosonnlp.js/)

## Features

 - Base in Nodejs 7.x stable api.
 - Use A+ promises.
 - Full action params control.
 - Catch more (e.g timeout..).

 ## Usage

 ```javascript
const BosonNLP = require('bostonnlp.js');
const bosonNLP = new BosonNLP({ apiToken : 'YOU_KEY' });
bosonNLP.tag(['今天天气不错'])
        .then(console.log)
        .catch(console.error);
 ```

## License

[MIT](https://mths.be/mit) license.
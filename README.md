# bosonnlp.js
[![NPM](https://nodei.co/npm/bosonnlp.js.png?stars&downloads)](https://nodei.co/npm/bosonnlp.js/)

## Features

 - Based on Nodejs 7.x stable api.
 - Use A+ promises.
 - Full action params control.
 - Catch more (e.g timeout..).

## Usage

 ```javascript
const BosonNLP = require('bostonnlp.js');
const bosonNLP = new BosonNLP({ apiToken : 'YOU_KEY', timeout: 1000 * 10 });

bosonNLP.tag(['今天天气不错','明天天气也不错'], {space_mode: 1})
         .then(console.log)
         .catch(console.error);
 ```
 Default timeout value is 10s.
 Need more method params detail please check http://bosonnlp.com/dev/center


 ## Methods
 ### tag(texts, params)
 - **texts**:
   - `Required`
   - Type: `Array` or `String`
 - **params**:
   - Type: `Object`

 ### sentiment(texts, params)
 - **texts**:
   - `Required`
   - Type: `Array` or `String`
 - **params**:
   - Type: `Object`
   - Value: { auto: true } e.g..

 ### ner(texts, params)
 - **texts**:
   - `Required`
   - Type: `Array` or `String`
 - **params**:
   - Type: `Object`

 ### depparser(texts, params)
 - **texts**:
   - `Required`
   - Type: `Array` or `String`
 - **params**:
   - Type: `Object`

 ### keywords(texts, params)
 - **texts**:
   - `Required`
   - Type: `Array` or `String`
 - **params**:
   - Type: `Object`

 ### classify(texts, params)
 - **texts**:
   - `Required`
   - Type: `Array` or `String`
 - **params**:
   - Type: `Object`

 ### suggest(text, params)
 - **texts**:
   - `Required`
   - Type: `String`
 - **params**:
   - Type: `Object`

 ### summary(texts, params)
 - **texts**:
   - `Required`
   - Type: `Array` or `String`
 - **params**:
   - Type: `Object`

## License

[MIT](https://mths.be/mit) license.

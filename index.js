const http        = require('http');
const queryString = require('querystring');

class BosonNLP {
  constructor({ apiToken = '', timeout = 1000 * 10 }) {
    if (!apiToken) throw Error('The api token is required');

    this.config = {
      timeout
    };

    this.httpOptions = {
      host    : "api.bosonnlp.com",
      port    : 80,
      method  : "POST",
      headers : {
        "Content-Type" : "application/json",
        "Accept"       : "application/json",
        "X-Token"      : apiToken,
      }
    };

    this.apis = {
      'tag'       : '/tag/analysis',
      'sentiment' : '/sentiment/analysis',
      'ner'       : '/ner/analysis',
      'depparser' : '/depparser/analysis',
      'keywords'  : '/keywords/analysis',
      'classify'  : '/classify/analysis',
      'suggest'   : '/suggest/analysis',
      'time'      : '/time/analysis',
      'summary'   : '/summary/analysis',
    };

    Object.keys(this.apis)
          .forEach(key => {
            this[key] = ((text, query) => {
              let action = this.apis[key];
              query && (action += `?${queryString.stringify(query)}`);
              const options = Object.assign({}, this.httpOptions, { path : action });
              return this.request(options, JSON.stringify(text));
            });
          });
  }

  request(options, body) {
    const timeout = this.config.timeout;

    const handle = (resolve, reject) => {
      let data;
      const req = http.request(options, res => {
        res.setEncoding('utf8');

        res.on('data', chunk => data = chunk);
        res.on('end', () => {
          try {
            const _data = JSON.parse(data);
            return resolve(_data);
          } catch (err) {
            return reject(err);
          }
        });
      });

      req.on('error', err => reject(new Error(err)));
      req.on('socket', socket => {
        socket.setTimeout(timeout);
        socket.on('timeout',()=>{
          req.abort();
          return reject('Time out.');
        });
      });
      //req.timeout(1000 * 10, reject(new Error('Time out')));
      req.end(body);
    };
    return new Promise(handle);
  }
}

module.exports = BosonNLP;
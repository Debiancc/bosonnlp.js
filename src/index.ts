import * as Http from 'http';
import QS from 'querystring';

interface APIs {
    [key: string]: string
}

interface Props {
    apiToken: string,
    timeout?: Number
}

interface KeywordOptions {
    topK?: number,
    segmented?: boolean
}

export default class {
    constructor({apiToken, timeout = 1000 * 10}: Props) {
        this.timeout = timeout;

        this.httpOptions = {
            host: 'api.bosonnlp.com',
            port: 80,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Token": apiToken,
            }
        };

        this.reflectApi()
    }

    private readonly timeout: Number;

    private readonly httpOptions: Http.RequestOptions;

    private readonly apis: APIs = {
        'tag': '/tag/analysis',
        'sentiment': '/sentiment/analysis',
        'ner': '/ner/analysis',
        'depparser': '/depparser/analysis',
        'keywords': '/keywords/analysis',
        'classify': '/classify/analysis',
        'suggest': '/suggest/analysis',
        'time': '/time/analysis',
        'summary': '/summary/analysis',
    };


    public keywords(text: string | string[], options?: KeywordOptions): Promise<{word: string, k: number}[]> {
        this.httpOptions.path = this.buildUrlWithQuery('keywords', options);
        return this.request(text);
    }


    private buildUrlWithQuery(action: string, options?: object) {
        return `${action}?${QS.stringify(options)}`
    };

    private reflectApi() {
        Object.keys(this.apis)
            .forEach((key) => {
                Reflect.defineProperty(this, key, {
                    value: (text: string | string[], options?: any) => {
                        this.httpOptions.path = options
                            ? `${this.apis[key]}?${QS.stringify(options)}`
                            : this.apis[key];
                        return this.request(text);
                    }
                });
            });
    }

    private request(body: string | string[]): Promise<any> {
        const handle = (resolve: (data: any) => void, reject: (err: Error) => void) => {
            let data: string = '';
            const req = Http.request(this.httpOptions, res => {
                res.setEncoding('utf8');

                res.on('data', chunk => {
                    data += chunk
                });
                res.on('end', () => {
                    try {
                        const _data = JSON.parse(data);
                        return resolve(_data);
                    } catch (err) {
                        return reject(err);
                    }
                });
            });

            req.on('error', err => reject(err));
            req.on('socket', socket => {
                socket.setTimeout(this.timeout);
                socket.on('timeout', () => {
                    req.abort();
                    return reject(new Error('Time out.'));
                });
            });
            req.end(JSON.stringify(body));
        };
        return new Promise(handle);
    }
}


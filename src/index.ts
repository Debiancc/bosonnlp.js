import * as Http from 'http';
import QS from 'querystring';

interface APIs {
    [key: string]: string
}

interface Props {
    apiToken: string,
    timeout?: Number
}

interface TagOptions {
    space_mode?: 0 | 1 | 2 | 3,
    over_level?: 0 | 1 | 2 | 3 | 4,
    t2s?: 0 | 1,
    special_char_conv?: 0 | 1
}

interface KeywordOptions {
    topK?: number,
    segmented?: boolean
}

export default class BonsonNLP {
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

        // this.reflectApi()
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

    // private reflectApi() {
    //     Object.keys(this.apis)
    //         .forEach((key) => {
    //             Reflect.set(this, key,  (text: string | string[], options?: any) => {
    //                 this.httpOptions.path = options
    //                         ? `${this.apis[key]}?${QS.stringify(options)}`
    //                         : this.apis[key];
    //                     return this.request(text);
    //             });
    //         });
    // }

    private request<T>(body: string | string[], action: string, query?: object): Promise<T> {
        const handle = (resolve: (data: any) => void, reject: (err: Error) => void) => {
            let data: string = '';
            const path = `${this.apis[action]}?${QS.stringify(query)}`;
            console.log(path)
            const req = Http.request({
                ...this.httpOptions,
                ...{path}
            }, res => {
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

    public keywords(text: string | string[], options?: KeywordOptions) {
        return this.request<[number, string][][]>(text, 'keywords', options)
    }

    public tag(text: string | string[], options?: TagOptions) {
        return this.request<{word: string[], tag: string[]}[]>(text, 'tag', options)
    }

    public ner(text: string | string[], options?: {sensitivity?: 1 | 2 | 3 | 4 | 5}) {
        return this.request<{word: string[], tag: string[], entity: [number, number, string][]}[]>(text, 'ner', options);
    }

    public sentiment(text: string | string[], options?: {model?: 'auto' | 'kitchen' | 'food' | 'news' | 'weibo'}) {
        return this.request<[number, number][]>(text, 'sentiment', options);
    }

    public depparser(text: string | string[]) {
        return this.request<{head: number[], role: string[], word: string[], ag: string[]}[]>(text, 'depparser');
    }

    public classify(text: string | string[]) {
        return this.request<number[]>(text, 'classify');
    }

    public suggest(text: string, options? : {top_k?: number}) {
        return this.request<[number, string][]>(text, 'suggest', options);
    }

}


import instance from './index'

describe('Tag action suite', () => {
    it('should be response', async () => {
        const result = await instance.tag('今天天气不错');
        expect(result).toEqual([ { word: [ '今天', '天气', '不错' ], tag: [ 't', 'n', 'a' ] } ]);
    });
});

describe('Keyword action suite', () => {
    it('should be response', async () => {
        const result = await instance.keywords('今天天气不错');
        console.log(result);
        expect(result).toEqual( [
            [ 0.7769201168828866, '天气' ],
            [ 0.5276443786755156, '不错' ],
            [ 0.3434916542278732, '今天' ]
        ]);
    });
});

describe('ner action suite', () => {
    it('should be response', async () => {
        const result = await instance.ner('今天天气不错');
        console.log(result);
        expect(result).not.toBeNull();
    });
});

describe('sentiment action suite', () => {
    it('should be response', async () => {
        const result = await instance.sentiment('今天天气不错');
        console.log(result);
        expect(result).not.toBeNull();
    });
});

describe('depparser action suite', () => {
    it('should be response', async () => {
        const result = await instance.depparser('今天天气不错');
        console.log(result);
        expect(result).not.toBeNull();
    });
});

describe('classify action suite', () => {
    it('should be response', async () => {
        const result = await instance.classify('今天天气不错');
        console.log(result);
        expect(result).not.toBeNull();
    });
});

describe('suggest action suite', () => {
    it('should be response', async () => {
        const result = await instance.suggest('今天天气不错');
        console.log(result);
        expect(result).not.toBeNull();
    });
});

describe('time action suite', () => {
    it('should be response', async () => {
        const result = await instance.time({pattern: '今天天气不错'});
        console.log(result);
        expect(result).not.toBeNull();
    });
});

describe('summary action suite', () => {
    it('should be response', async () => {
        const result = await instance.summary({content: '今天天气不错'});
        console.log(result);
        expect(result).not.toBeNull();
    });
});
import instance from './index'

describe('Tag action suite', () => {
    it('should be response', async () => {
        const result = await instance.tag('今天天气不错');
        expect(result).not.toBeNull();
        console.log(result);
    });
});

describe('Keyword action suite', () => {
    it('should be response', async () => {
        const result = await instance.keywords('今天天气不错');
        console.log(result);
        expect(result).not.toBeNull();
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
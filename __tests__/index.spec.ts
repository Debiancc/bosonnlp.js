import BosonNLP from '../src/index';

describe('BosonNLP common suites', () => {
    it('should invalid token', async () => {
        const instance = new BosonNLP({apiToken: 'debiancc'});
        try {
            await instance.tag('今天天气不错')
        } catch (e) {
            expect(e).toEqual(new Error('Token 验证失败。'))
        }
    });
});
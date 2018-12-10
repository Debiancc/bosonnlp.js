import instance from './index'

// const {describe, it} = intern.getPlugin('interface.bdd');

describe('Tag action suite', () => {
    it('should response', async () => {
        const t = await instance.tag('今天天气不错');
        console.log(t)
    });
});
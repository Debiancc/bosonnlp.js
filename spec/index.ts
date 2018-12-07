import BonsonNLP from '../src/index';

(async () => {
    const nlp = new BonsonNLP({apiToken: '-Pk5St2Y.10194.VTIMJzPP0IjN'});
    try {
       const r = await nlp.keywords(['今天天气不错', '你好']);
       const rr = await nlp.keywords('今天天气不错');

       console.log(JSON.stringify(r, null, 2));
       console.log('======');
        console.log(JSON.stringify(rr, null, 2));
    } catch (e) {
        console.error(e);
    }

})();
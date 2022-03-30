const express = require('express');
const router = express.Router();

router.get(
    '/code',
    async (req, res) => {
        if (!req.query.code) {
            res.send('params required');
        }
        if (req.query.image === 'false') {
            const req1 = require('@aero/http');
            // eslint-disable-next-line prefer-destructuring
            const code = req.query.code;
            const api = ' https://carbonara.aero.bot';
            const img = await req1(api)
                .post()
                .path('/api/cook')
                .body(
                    {
                        code,
                        language: 'auto',
                        theme: 'one-dark',
                        backgroundColor: 'rgb(54, 57, 63)',
                        fontFamily: 'JetBrains Mono',
                        paddingHorizontal: '20px',
                        paddingVertical: '20px',
                        windowControls: false,
                        dropShadowBlurRadius: '10px',
                        dropShadowOffsetY: '0px',
                    },
                    'json'
                )
                .raw();
            res.contentType('image/text');
            const buf = await Buffer.from(img, 'binary');
            res.send({ buf });
        }
        if (req.query.image === 'true') {
            const req1 = require('@aero/http');
            // eslint-disable-next-line prefer-destructuring
            const code = req.query.code;
            const api = ' https://carbonara.aero.bot';
            const img = await req1(api)
                .post()
                .path('/api/cook')
                .body(
                    {
                        code,
                        language: 'auto',
                        theme: 'one-dark',
                        backgroundColor: 'rgb(54, 57, 63)',
                        fontFamily: 'JetBrains Mono',
                        paddingHorizontal: '20px',
                        paddingVertical: '20px',
                        windowControls: false,
                        dropShadowBlurRadius: '10px',
                        dropShadowOffsetY: '0px',
                    },
                    'json'
                )
                .raw();
            res.contentType('image/jpeg');
            const buf = await Buffer.from(img, 'binary');
            res.send(buf);
        }})


module.exports = router;
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
// next({dev}) prepare()
app.prepare()
    .then(() => {
        // instead of setting express to app (as you would in many cases)
        // set server to express since app is set to next({dev}) above
        const server = express();
        // look for incoming url to match regex /speaker/:speakerId
        server.get('/speaker/:speakerId', (req, res) => {
            const actualPage = '/speaker';
            const queryParams = {speakerId: req.params.speakerId};
            // calling app.render does same thing as link element does when 
            // creating client-side route 
            app.render(req, res, actualPage, queryParams);
        });
        // server handling input url via *
        server.get('*', (req, res) => {
            return handle(req, res)
        });
        // server listening on port 3000
        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1)
    });
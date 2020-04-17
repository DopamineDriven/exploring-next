const withCSS = require('@zeit/next-css');
// npm i dotenv-webpack path --save
require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withImages = require('next-images');
module.exports = withCSS(
    withImages(
    {
        // to set defaults, add serverRuntimeConfig and publicRuntimeConfig
        serverRuntimeConfig: {
            // only available on server side
        },
        publicRuntimeConfig: {
            // Will be available on both server and client
            RESTURL_SPEAKERS_PROD:
                "https://www.siliconvalley-codecamp.com/rest/speakers/ps",
            RESTURL_SPEAKER_PROD:
                "https://www.siliconvalley-codecamp.com/rest/speaker",
            RESTURL_SESSIONS_PROD:
                "https://www.siliconvalley-codecamp.com/rest/sessions"
        },
        webpack(config, options) {
            config.plugins = config.plugins || [];
            config.plugins = [
                ...config.plugins,
                // read the .env file
                new Dotenv({
                    path: path.join(__dirname, ".env"),
                    systemvars: true
                })
            ]
            return config;
        }
    })
);
// https://www.youtube.com/watch?v=_9AWYlt86B8
// https://www.lifewire.com/upgrade-windows-10-home-to-pro-4178259
// to run in prod set node.env var to production then run
// node server.js
// Why? Next overrides production with dev for node.env var
// Why could built-in css be commented out? see below
/*
Why This Error Occurred
Custom CSS configuration was added in next.config.js which disables the built-in CSS/SCSS support to prevent conflicting configuration.

A legacy plugin such as @zeit/next-css being added in next.config.js can cause this message.

Possible Ways to Fix It
If you would like to leverage the built-in CSS/SCSS support you can remove any custom CSS configuration or any plugins like @zeit/next-css or @zeit/next-sass in your next.config.js.

If you would prefer not to leverage the built-in support you can ignore this message.
Warning: Detected next.config.js, no exported configuration found. https://err.sh/zeit/next.js/empty-configuration
The static directory has been deprecated in favor of the public directory. https://err.sh/zeit/next.js/static-dir-deprecated
[ error ] ./css/site.css
Global CSS cannot be imported from files other than your Custom <App>. Please move all global CSS imports to pages\_app.jsx.
Read more: https://err.sh/next.js/css-global
Location: src\Layout.jsx
*/
// https://github.com/zeit/next.js/blob/master/errors/built-in-css-disabled.md

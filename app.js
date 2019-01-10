#!/usr/bin/env node

'use strict';

require('dotenv').config();

const Path = require('path');
const Hapi = require('hapi');
const StreamRoutes = require('./routes');
const Engine = require('./engine.js');


const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    compression: false,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

const startApp = async () => {

    try {
        await server.register(StreamRoutes);
        Engine();

        console.log(`Server running at ${server.info.uri}`);
        await server.start();
    }
    catch (err) {
        console.log(`Server error: ${err}`);
        process.exit(1);
    }
};


startApp();

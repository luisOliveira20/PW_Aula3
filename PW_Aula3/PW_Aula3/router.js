const express = require('express');

let PlayerAPI = require('./server/players');
let AuthAPI = require('./server/auth');

let router = require('./router');
var app = express();
app.use(router.initialize());

function initialize(){
    let api = express();
    api.use('/team', PlayerAPI());
    api.use('/auth', AuthAPI());
    
    return api;
}
module.exports = {
    initialize: initialize,
};
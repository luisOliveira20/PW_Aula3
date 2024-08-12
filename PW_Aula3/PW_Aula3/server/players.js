const bodyParser = require('body-parser');
const express = require('express');
const Players = require('../data/platers');
const Users = require('../data/users');
const scopes = require('../data/users/scopes');
const verifyToken = require('../middleware/token');
const cookieParser = require('cookie-parser');

function PlayerRouter(){
    let router = express();

    router.use(bodyParser.json({limit: '100mb'}));
    router.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

    router.use(cookieParser());
    router.use(verifyToken);
    
    router.use(function(req, res, next){
        let token = req.headers['x-access-token'];
        if (!token) {
            return res
                .status(400)
                .send({auth: false, message: 'No token provided.'});
        }
        Users.verifyToken(token)
            .then((decoded) => {
                console.log('DECODED->' + JSON.stringify(decoded, null, 2));
                req.roleUser = decoded.role;
                next();
            })
            .catch(() => {
                res.status(401).send({auth: false, message: 'Not authorized'});
            });
    });
    return router;
}
router
.route('/players')
    .get(
    Users.authorize([scopes['real-all'], scopes['read-posts']]),
        function(req, res, next){
        console.log('get all players');

        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
        const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

        req.pagination = {
            limit: pageLimit,
            skip: pageSkip
        };

        Players.findAll(req.pagination)
        .then((players) => {
            const response = {
                auth: true,
                players: players,
            };
            res.send(players);
            next();
        })
        .catch((err) => {
            next();
        });
    })
    .post(Users.authorize([scopes['manage-posts']]), function(req, res, next){
        console.log('post');
        let body = req.body;
        Players.create(body)
            .then(() => {
                console.log('Created!');
                res.status(200);
                res.send(body);
                next();
            })
            .catch((err) => {
                console.log('Player already exists!');
                err.status = err.status || 500;
                res.status(401);
                next();
            });
    });
module.exports = PlayerRouter;
function PlayerController(PlayerModel) {
    let controller = {
        create,
        findAll,
        findById,
        update,
        removeById
    }
    function create (values) {
        let newPlayer = PlayerModel(values);
        return save(newPlayer);
    }
    function save (newPlayer) {
        return new Promise(function(resolve, reject) {
            newPlayer.save()
            .then(() => resolve('Player created'))
            .catch((err) => reject(err));
        });
    }
    function findAll(pagination){
        const {limit, skip} = pagination;

        return new Promise(function(resolve, reject){
            PlayerModel.find({}, {}, {skip, limit}, function(err, players) {
                if(err) reject(err);
                resolve(players);
            });
        })
        .then (async (players) => {
            const totalPlayers = await PlayerModel.count();
            return Promise.resolve({
                players: players,
                pagination: {
                    pageSize: limit,
                    page: Math.floor(skip/limit),
                    hasMore: (skip + limit) < totalPlayers,
                    total: totalPlayers
                }
            });
        });
    }
    function findById(id){
        return new Promise(function(resolve, reject){
            PlayerModel.findById(id)
            .then((player) => resolve(player))
            .catch((err) => reject(err));
        });
    }
    function update (id, player) {
        return new Promise(function(resolve, reject){
            PlayerModel.findByIdAndUpdate(id, player)
            .then(() => resolve(player))
            .catch((err) => reject(err));
        });
    }
    function removeById (id){
        return new Promise(function(resolve, reject){
            PlayerModel.findByIdAndRemove(id)
            .then(() => resolve())
            .catch((err) => reject(err));
        });
    }
    return controller;
}
router('/players/:playerId')
.get(function(req, res, next){
    console.log('get a player by id');
    let playerId = req.params.playerId;

    Players.findById(playerId)
        .then((player) => {
            res.status(200);
            res.send(player);
            next();
        })
        .catch((err) => {
            res.status(404);
            next();
        });
})
.put(function(req, res, next){
    console.log('update a player by id');
    let playerId = req.params.playerId;
    let body = req.body;

    Players.update(playerId, body)
        .then((player) => {
            res.status(200);
            res.send(player);
            next();
        })
        .catch((err) => {
            res.status(404);
            next();
        });
})
.delete(function(req, res, next){
    console.log('delete a player by id');
    let playerId = req.params.playerId;

    Players.removeById(playerId)
        .then(() => {
            res.status(200);
            res.send();
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(404);
            next();
        });
});

module.exports = PlayerController;
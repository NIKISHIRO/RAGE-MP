const Player = require(ROOT+'/modules/users/player');
const mongodb = require(ROOT+'/config/db/mongodb');
let Points = mongodb.getTeleportModel();

module.exports = {
    CEF_Register_s: (player, login, email, password) => {
        login = String(login).trim();
        password = String(password).trim();
        email = String(email).trim();
        
        let validLogin = (login) => /^[a-zA-Z0-9_-]{3,16}$/.test(login);
        let validPassword = (password) => /^[a-zA-Z0-9_-]{6,30}$/.test(password);
        let validEmail = (email) => /.+@.+\..+/i.test(email);
        
        if (validLogin(login) && validPassword(password) && validEmail(email)) {
            let p = new Player(player);
            p.register(login, email, password);
        }
    },
    
    CEF_Login_s: (player, login, password) => {
        login = String(login).trim();
        password = String(password).trim();

        let p = new Player(player);
        p.login(login, password);
    },
    // OBJECT CREATOR
    objectCreator_s: (player, model, position, rotation, alpha, dimension) => {
        // apa_mp_apa_crashed_usaf_01a
        position = JSON.parse(position);
        rotation = JSON.parse(rotation);

        const object = mp.objects.new(mp.joaat(model), position, {
            rotation: rotation,
            alpha: alpha,
            dimension: dimension
        });

        console.log(object);
    },
    // TELEPORT
    keypress_F4: (player) => {
        console.log('pressed f4')
        Points.find({}, (err,result) =>{
            if (err) return console.log(err);
            let newPoint = result.map((obj) => {
                return {
                    point:obj.point,
                    cords:obj.cords
                }
            });
            let stringPoint = JSON.stringify(newPoint);
            player.call('getPointsClient', [stringPoint]);
        })
    },
    pointget: (player,res) =>{
        result = JSON.parse(res);
        player.spawn(new mp.Vector3(result.x, result.y, result.z))
    },
    deleteget:(player,res) =>{
        result = JSON.parse(res);
        console.log(result);
        Points.deleteMany({point: result.point}, () => {});
    },
    createget: async (player,res) => {
        result = JSON.parse(res);
        console.log(result);
        let cords = player.position;
        await Points.create([{point: result,cords: cords}], function (err, candies) {
            console.log(err);
        });
        await Points.find({}, (err,result) =>{
        console.log(Points);
            if(err) return console.log(err);
            let newPoint = result.map((obj)=>{
                return{
                    point:obj.point,
                    cords:obj.cords
                }
            });
            let stringPoint = JSON.stringify(newPoint);
            player.call('getPointsClient', [stringPoint]);
        });
    }
};
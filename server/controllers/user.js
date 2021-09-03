const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const result = await db.getUser([username]);
        const exisitingUser = result[0];
        if (exisitingUser) {
            return res.status(409).send('Someone already has this Username.');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.registerUser([username, hash]);;;;;;
        const user = registeredUser[0];
        req.session.user = { username: user.username, id: user.id };;;;;
        return res.status(201).send(req.session.user);
    },

    login: async(req, res) => {
        const { username, password } = req.body;
        const foundUser = await req.app.get('db').getUser([username]);
        const user = foundUser[0];
        if (!user) {
            return res.status(401).send('Username not found. Please register as a new user before logging in.');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password.');
        }
        req.session.user = { username: user.username, id: user.id };
    },
    getUser: (req, res) => {
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200)
    }
};
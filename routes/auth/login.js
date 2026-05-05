var express = require('express');
var router = express.Router();
const model_users = require('../../model/model_users');

router.post('/', async (req, res) => {
    const { email, passowrd } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message : 'Username dan password harus diisi' });
    }

    try {
        const result = await model_users.login_JWT(email, passowrd);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;
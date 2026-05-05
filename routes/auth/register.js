var express = require('express');
const model_users = require('../../model/model_users');
var router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message : 'email dan password harus diisi' });
    }

    try {
        const existingUser = await model_users.Login(email);
        if (existingUser) {
            return res.status(400).json({ message : 'Username sudah digunakan' });
        }
        await model_users.registerUser(email, password);
        res.status(201).json({ message : 'Registrasi berhasil' });
    } catch (err) {
        res.status(500).json({ message : 'Terjadi kesalahan', error : err });
    }

});

module.exports = router;
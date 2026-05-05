var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
        const token = req.header('Authorization')?.replace('Bearer', '');
        if (!token) {
            return res.status(403).json({ messages: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'invalid or expired token '});
            }
            req.user = decoded;
            next();
        });
}

module.exports = verifyToken;


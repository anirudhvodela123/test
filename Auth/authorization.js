const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization')
    if (!token) return res.status(401).send('Unauthorized')

    try {
        const verified = jwt.verify(token, 'secretekey')
        req.user = verified._id
        next()
    } catch (error) {
        return res.status(400).send('Invalid Token')
    }
}
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        return res.status(401).json({
            'message': 'No authenticated'
        })
    }

    const token = authHeader.split(' ')[1]

    let decodeToken
    try {
        decodeToken = jwt.verify(token, 'keyforwriter')
    }catch(err){
        return res.status(401).json({
            'message': 'No writer authenticated'
        })
    }
    
    
    if (!decodeToken){
        return res.status(401).json({
            'message': 'No writer authenticated'
        })
    }
    req.writerId = decodeToken.writerId
    next()

}
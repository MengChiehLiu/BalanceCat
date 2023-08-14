const jwt = require('jsonwebtoken');
require('dotenv').config();


// check content type
function checkContentType(type='application/json') {
    return function(req, res, next){
        const content_type = req.header('content-type');
        if (!content_type || content_type.slice(0, type.length) !== type) 
            return res.status(400).json({error: `Only accept ${type}`})
        next();
    };
};


// check Authorization and return id
function checkAuthorization (req, res, next) {
    const auth = req.header('authorization');
    
    // Check if token exists
    if ((!auth) || auth.slice(0,7)!=='Bearer ') 
        return res.status(401).json({ error: 'Authorization token not provided' });
    try{
        const token = auth.replace('Bearer ', '');
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch{
        return res.status(403).json({ error: 'Invalid authorization token' });
    };  
};

// check request body
function checkBody(fields){
    return function(req, res, next){
        const body = req.body;
        for (let field of fields)
            if (!body[field]) return res.status(401).json({error: `Request Body Imcomplete: ${field} not found`});
        next();
    };
};
 

module.exports = {
    checkContentType: checkContentType,
    checkAuthorization: checkAuthorization,
    checkBody: checkBody
};
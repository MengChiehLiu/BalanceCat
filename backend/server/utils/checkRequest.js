const jwt = require('jsonwebtoken');
require('dotenv').config();


// check content type
function checkContentType(type='application/json') {
    return function(req, res, next){
        const content_type = req.header('content-type');
        if (!content_type || content_type.slice(0, type.length) !== type) 
            return res.status(400).json({error: `Only accept ${type}`})
        return next();
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
        req.user = jwt.verify(token, process.env.secretKey);
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
            if (body[field] === undefined) return res.status(401).json({error: `Request Body Imcomplete: ${field} not found`});
        return next();
    };
};
 
// 檢查 timestamp 格式
// function checkTimestampFormat(req, res, next) {
//     const timestamp = req.query.timestamp;

//     // 檢查 timestamp 是否存在
//     if (!timestamp) return next();  // 若不存在則進入下一 middleware，您也可以選擇返回錯誤
    
//     // 使用正則表達式檢查日期格式是否為 YYYY-MM-DD
//     const pattern = /^\d{4}-\d{2}-\d{2}$/;

//     if (!pattern.test(timestamp) || isNaN(new Date(timestamp))) {
//         return res.status(400).json({error: "Invalid timestamp format. Expected format: YYYY-MM-DD."});
//     }

//     next();  // 若格式正確，進入下一 middleware
// };


function checkTimestampFormat(req, res, next) {
    const timestamp = req.body.timestamp;
    const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (!pattern.test(timestamp)) 
        return res.status(400).json({error: "Invalid timestamp format. Expected format: YYYY-MM-DD hh:mm:ss."});
    if (isNaN(new Date(timestamp)))
        return res.status(400).json({error: "Invalid date."});

    next();
};

function checkDateFormat(checks=['timestamp']){
    const pattern = /^\d{4}-\d{2}-\d{2}$/;

    return function(req, res, next){
        for (const check of checks){
            if (check=='timestamp' && !req.query[check])
                return next();
            if (!pattern.test(req.query[check])) 
                return res.status(400).json({error: `Invalid ${check} format. Expected format: YYYY-MM-DD.`});
            if (isNaN(new Date(req.query[check])))
                return res.status(400).json({error: 'Invalid date.'})
        }
        return next();
    }
}

module.exports = {
    checkContentType: checkContentType,
    checkAuthorization: checkAuthorization,
    checkBody: checkBody,
    checkTimestampFormat: checkTimestampFormat,
    checkDateFormat: checkDateFormat
};
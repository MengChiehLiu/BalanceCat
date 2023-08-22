// const Redis = require("ioredis");
// require('dotenv').config();
// const client = new Redis(6379, process.env.REDIS_HOST)

// async function rateLimiter(req, res, next) {
//     const ip = (req.header('x-forwarded-for') || '').split(',').pop().trim() || req.socket.remoteAddress;

//     try{
//         // 黑名單?
//         if (await client.get(`blocked-${ip}`)) return res.status(429).json({ error: 'Too Many Requests' }); 
//         const [[_, count], __] = await client.multi().incr(`count-${ip}`).expire(`count-${ip}`, 1).exec();
//         if (count >= 20) await client.multi().set(`blocked-${ip}`, 1).expire(`blocked-${ip}`, 60*10).exec();
//         next();
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({ error: 'Rate Limiter Server Error' });
//     }
// };

async function rateLimiter(req, res, next){
    next();
}

module.exports = rateLimiter;

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      const { userId } = jwt.verify(token, process.env.APP_SECRET);
      // put the userId onto the req for future requests to access
      req.userId = userId;
    }
    next();
  });  


server.start({
    cors: {
        credentials:true,
        origin:process.env.FRONTEND_URL,
    },
},deets =>{
    console.log(`Server running on http:/localhost:${deets.port}`);
});
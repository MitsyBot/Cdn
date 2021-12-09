const express = require('express')
const cors = require('cors')
const http = require('http')
const rateLimit = require('express-rate-limit')

const NotFound = require('./middlewares/NotFound')
const ErrorHandler = require('./middlewares/ErrorHandler')

const MitsyCDNRoutes = require('./routes')

const app = express()
const server = http.createServer(app)

app.use('/', MitsyCDNRoutes);

app.use(NotFound);
app.use(ErrorHandler);

server.listen(process.env.PORT, () => {
  console.info(`[Mitsy CDN] Servidor iniciado na porta ${process.env.PORT}`);
});

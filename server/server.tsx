const express = require('express')
const route = require("./api-routes/index")
const app = express();
const port = process.env.PORT || 4000;

app.use('/api', route);

app.listen(port, () => console.log(`App server listening on port ${port}!`));
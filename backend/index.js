const express = require('express');
const cors = require('cors');
require('dotenv').config();

const installDB = require('./service/install-service');


const app = express();

app.use(express.json(), cors());

app.use("/user", require('./controller/user-controller'));

app.listen(3000, () => {
    installDB.install()
        .then(() => console.log('Database sucefully installed'))
        .catch((err) => console.error(err))
    console.log("Server running on http://localhost:3000");
})
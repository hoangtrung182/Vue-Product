const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(morgan());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello world!')
})


app.use("/v1/users", authMiddleware.verifyToken, userRoute);
app.use("/v1/auth", authRoute);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})
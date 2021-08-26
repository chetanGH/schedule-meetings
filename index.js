const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
const indexRouter = require('./routes/index.route');
const mongoose = require('mongoose');
let db_url = 'mongodb://localhost:27017';

mongoose.connect(db_url,{dbName:'meetings'});
mongoose.connection.on('connected', function() {
    console.log("Mongoose is now Connected at: " + db_url);
});
mongoose.set('debug',true)
mongoose.connection.on('error', (err) => {
    console.log("db error",err.message)
});

const allowedOrigins = [
    'http://localhost',
    'http://localhost:4200',
    'http://localhost:3000'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed'));
        }
    }
}

app.use(cors(corsOptions))
app.use('/api/', indexRouter);


app.listen(3000,()=>{
    console.log("Server has been started at",3000)
    console.log(new Date())
})
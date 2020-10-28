const dotenv = require("dotenv");
let express = require('express');
const app = express();
let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
// Create port
const port = process.env.PORT || 3000;
dotenv.config();
// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, { useNewUrlParser: true}).then(()=>{ console.log('Database connected sucessfully ');}, error=> {
  console.log(`Could not connected to database : ${error}`);
});
// Set up express js port
const studentRoute = require('./routes/student.route');
//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/StudentMangamentSystem')));
app.use('/', express.static(path.join(__dirname, 'dist/StudentMangamentSystem')));
app.use('/api',studentRoute);
app.listen(port,()=>{
  console.log(`the server is running at ${port}`);
});

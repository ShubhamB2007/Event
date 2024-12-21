const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require("cors")
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const eventRoute = require('./routes/events')
const port = 3000
  
let url = "mongodb+srv://shubhambudhakar:2007shubham@cluster0.3ifwv.mongodb.net/Events?retryWrites=true&w=majority&appName=Cluster0"
 
mongoose.connect(url)
  .then(() => console.log('Connected to DB'))
  .catch(error => console.log('Database connection error:', error));
  
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.0.106:5173'],
  credentials: true,
}));


app.get('/', (req, res) => { 
  res.send('Hello World!')
}) 
 
app.use("/api", signupRoute)
app.use("/api",loginRoute)
app.use('/api/events', eventRoute) 

app.listen(port, "0.0.0.0", () => {
  console.log(`App is running on port ${port}`) 
}) 
const express = require('express')
const connectDb = require('./config/database')
const app = express();
const User = require('./model/user');
app.use(express.json())

app.post('/signup', async (req,res)=>{
    const user = new User(req.body)

    try {
        await user.save();
        res.send('user added successfully')
    } catch (error) {
        res.status(400).send('error saving the user')
    }
})

connectDb().then(()=>{
    console.log('database connection establised');
    app.listen(8088,()=>{
        console.log('server is running on port 8088');
        
    })
}).catch((err)=>{
    console.log('database cannot be connected');
    
})

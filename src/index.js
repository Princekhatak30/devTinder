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
app.get('/user', async (req,res)=>{
     let userEmail =  req.body.emailId

    try {
       const data =  await User.findOne({emailId:userEmail});
       
       if(data !== null){

           res.send(data)
        }else{
            res.status(400).send('nodata found')
        }
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

app.patch('/updateUser', async(req,res)=>{
    const userId = req.body.userId;
    const data = req.body;

    const ALLOWED_UPDATES =[
        "userId",
        "photoUrl",
        "gender",
        "age",
        "skills"
    ]
    const isUpdateAllowed = Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
    )
    if(!isUpdateAllowed){
        res.status(400).send("Update not allowed")
    }

    try {
        const user = await User.findByIdAndUpdate({_id: userId},data,{ returnDocument:"before",
            runValidators:true
        })
        console.log(user);
        res.send('user updated succesfully')
    } catch (error) {
        res.status(400).send("Update Failed:"+err.message)
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

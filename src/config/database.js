const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect(
        "mongodb+srv://princeNodejs:WfCgoNIqbTiYcEap@namastenodjs.8utqg.mongodb.net/devTinder"
    )
}
module.exports = connectDb
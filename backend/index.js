const express = require('express')
const port = 5000

const app = express()

const cors = require('cors')




app.use(cors())


app.post('/',(req,res)=>{
    console.log(req.body)
})


app.use(express.json())


 const routes= require('./route')

 app.use('/user',routes)


//  var password = "Educative@123";
 
 



app.listen(port,()=>{
    console.log(`${port} running successFull`)
})
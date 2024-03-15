const {getConnectionFromPool,getFormattedQuery}=require('./db')
const {getSingleData,executeData} =require('./generalOperators')
const {queries} = require('./query')
const bcrypt = require ('bcrypt');
const jwt =require('jsonwebtoken')
const tokenSecret = '5b8dc241e10ba48c40023bf544e40ac586af8e1efbfacf14ec53267272247e8ce58e90eaf84cc5763a05c62a777df53ce3202d51baf91d3f386297b0af7144af'
async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 8);
    // Store hash in the database
    return hash
}

const postUserData = async (req,res) =>{
    let connection,formatQuery
    try{
        connection= await getConnectionFromPool()

    }catch(err){
        console.log(err)
        res.status(500).send("database error")
    }
    
    try{
        let {gender,name,phone,email,password} = await req.body
        console.log(gender,name,phone)
        let data = await  hashPassword(password)
         console.log(data,"password")
        await executeData(connection,"START TRANSACTION")
        formatQuery = await getFormattedQuery(connection,queries.insert,[name,phone,gender])
        await executeData(connection,formatQuery)
        let{result} = await getSingleData(connection,queries.selectId)
        console.log(result.response[0].id)
        formatQuery = await getFormattedQuery(connection,queries.insertLogin,[result.response[0].id,email,data])
         await executeData(connection,formatQuery)
        let {resCode}= await executeData(connection,"COMMIT")
        res.status(resCode).send("successfull")

    }catch(err){
        console.log(err)
        await executeData(connection,"ROLL BACK")
    }
    finally{
        connection.release()
    }

   

}


const postUserDetails = (req,res) =>{
    console.log(req.body)

}


const postUserLogin = async (req,res) =>{
    let connection,formatQuery
    try{
        connection = await getConnectionFromPool()
    }
    catch(err){
        console.log(err)
        res.status(500).send("database error")
    }

    try{
        let {email} = await req.body
        formatQuery= await getFormattedQuery(connection,queries.postLogin,[email])
        let {result,rescode} = await getSingleData(connection,formatQuery)
        console.log(result)
        let accessToken= jwt.sign(result.response[0],tokenSecret,{expiresIn:'1d'})
        let refreshToken= jwt.sign(result.response[0],tokenSecret,{expiresIn:'3d'})
        
        res.status(rescode).send({accessToken:accessToken,refreshToken:refreshToken,userId:result.response[0].id})
    }
    catch(err){
        let {error,rescode}=err
        console.log(err)
        res.status(rescode).send(error)
    }
    finally{
        connection.release()
    }
}



const postRefreshToken = async (req,res)=>{
    let connection,formatQuery
    try{
        connection = await getConnectionFromPool()
    }catch(err){
        res.status(500).send("database connection  error")
    }


    try{
        const refreshToken = req.headers['refreshtoken']
        // console.log(refreshToken)
        if(!refreshToken){
            res.status(403).send('Access Denied,No refresh token provided')
        }
        const token = jwt.verify(refreshToken,tokenSecret)
        console.log(token,)
        const accessToken = jwt.sign(token,tokenSecret)
        console.log(accessToken)
        res.status(200).send({accessToken:accessToken})


    }catch(err){
        console.log(err)
    }
}


module.exports={postUserData,postUserLogin,postUserDetails,postRefreshToken}
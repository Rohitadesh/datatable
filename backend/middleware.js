const jwt = require('jsonwebtoken')


// let accessTokenSecret='0459b8bc0568b097541e21ef2b7d681a045020abe8a0f58fda55465b69bab9daafc5a2e89af117572df91ceb13c9426398fa381ca4d6e79a08a028d3e8bb037f'

const tokenSecret = '5b8dc241e10ba48c40023bf544e40ac586af8e1efbfacf14ec53267272247e8ce58e90eaf84cc5763a05c62a777df53ce3202d51baf91d3f386297b0af7144af'


const authentication = (req,res,next) =>{
    // console.log('$$$$$$$$$$$$$$$$')
    // console.table(req.headers)0
    const token = req.headers['authorization']
    // console.log('---Query---',req.query)
    const refreshToken = req.headers["refreshtoken"]
    console.log(token,"token")
    console.log('---BODY----',req.body) 
    console.log('token=',token)
    if(!token&& !refreshToken) return res.status(401).send('no token and refresh token is valid')
    try{
        const data =jwt.verify(token,tokenSecret)

        req.body= trimString(req.body)
        req.params=trimString(req.params)
        req.query= trimString(req.query)
        req.user=user
        console.log("param",req.params,"body",req.body,"query",req.query,"user",req.user)
        next()



    }
    catch(err){
        console.log(err)
        if(!refreshToken)
        return res.status(401).send('Access Denied. No refresh token provided.');
        try {
            const data= jwt.verify(refreshToken, tokenSecret);
            const accessToken = jwt.sign(data, tokenSecret);
            res.status(200).send({accessToken:accessToken,refreshToken:refreshToken})
          } catch (error) {
            return res.status(400).send('Invalid Token.');
          }
    }
    
  

   

}

function trimString(object){
    let keys = Object.keys(object)
    if(keys.length){
        for(let key of keys){
            if(typeof(object[key]!="string"))
                continue
                object[key]=object[key].trim()

        }
    }
    return object
}




module.exports={authentication}

const {singleSuccessResponse,multipleSuccessResponse,failureResponse} =require('./constants')



const getSingleData = (connection,query) =>{
  console.log(query)
  return new Promise((resolve ,reject)=>{
    connection.query(query,(error,result)=>{
      if(error){
        console.log(error)
        reject({error:{...failureResponse,message:error.sqlmessage},rescode:500})
      } 
      else{
        // result.length?
        // console.log(result)
        resolve({result:{...singleSuccessResponse,response:result},rescode:200})
        // reject ({result:[],rescode:204})
      }
    })
  })
}

const executeData = (connection,query) =>{
  
  return new Promise((resolve,reject) => {
    connection.query( query, (err,result) => {
        if(err){
            console.table({query})
            console.log( { error: err.sqlMessage, resCode: 500 } )
            // reject( { error: err.sqlMessage, resCode: 500 } )
            reject({error:{...failureResponse,message:err.sqlMessage},resCode: 200})
        }else{
            resolve( { result:{...singleSuccessResponse }, resCode: 200 } )
        }
    } )
})
}


module.exports={getSingleData,executeData}
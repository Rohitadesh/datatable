const queries ={

    "insert":"insert into user(name,phone,gender) values(?,?,?)",
    "selectId":"select id from user where id=last_insert_id()",
    "insertLogin":"insert into login (id,email,password) values(?,?,?)",
    "postLogin":"select * from login where email =?"
}

module.exports={queries}
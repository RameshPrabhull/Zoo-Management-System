const express=require('express');
const bodyparse=require('body-parser');
const app=express();
const cors=require('cors');
const sql=require('mysql');
const adminrouter=express.Router();
const create=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"ramesh",
    database:"zoo"
})
create.connect((err)=>{
 if(err) throw err;
 else
 console.log("Admin database connected");
})
app.use(cors());
app.use(bodyparse.json());
app.post('/customer',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const address=req.body.address;
    const phone=req.body.phone;
    const gid=req.body.gid;
    const time=req.body.time;
    const pass=req.body.password;
    const zid=req.body.zid;
    create.query('insert into customer(cname,email,address,phone,gid,time,password,zid) values (?,?,?,?,?,?,?,?)',[name,email,address,phone,gid,time,pass,zid],(err)=>{
        if (err) throw err;
        else{
            console.log("inserted one record into customer");
        }
    })
});
app.post('/zoo',(req,res)=>{
    const zname=req.body.zname;
    const contact=req.body.contact;
    const location=req.body.location;
    create.query('insert into zoo(zname,contact,location) values (?,?,?)',[zname,contact,location],(err)=>{
        if(err) throw err;
        else{
            console.log("inserted one record into zoo");
        }
    })
})
app.post('/animalguide',(req,res)=>{
    const gname=req.body.gname;
    const date=req.body.date;
    const gender=req.body.gender;
    const salary=req.body.salary;
    const phone=req.body.phone;
    const zid=req.body.zid;
    create.query('insert into animalguide(gname,joined_date,gender,salary,g_phone,zid) values(?,?,?,?,?,?)',[gname,date,gender,salary,phone,zid],(err,result)=>{
        if(err) throw err;
        else{
            console.log("inserted one record into animalguide");

        }
    })
})
app.post('/animal',(req,res)=>{
    const {animal,gender,time,cnum,type,gid,zid}=req.body;
    create.query('insert into animal(animal,gender,feed_time,cage_number,type,gid,zid) values (?,?,?,?,?,?,?)',[animal,gender,time,cnum,type,gid,zid],(err,result)=>{
        if(err) throw err;
        else{
            console.log("inserted one record into animal");
        }
    })
})
app.post('/employee',(req,res)=>{
    const {name,salary,phone,zid}=req.body;
    console.log(req.body);
    create.query('insert into employee(ename,salary,e_phone,zid) values(?,?,?,?)',[name,salary,phone,zid],(err,result)=>{
        if(err) throw err;
        else{
            console.log("inserted one record into employee");
        }
    })
})
app.get('/countcustomer',(req,res)=>{
    create.query('select * from customer',(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
            console.log(result);
        }
    })
})
app.post('/animalguideid',(req,res)=>{
    var {zid}=req.body;
    create.query('select gid from animalguide where zid=?',[zid],(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
            /* console.log("sent updated gid"); */
        }

        
    })
   /*  console.log("request accepted"); */
})
app.get('/zid',(req,res)=>{
    create.query('select zid from zoo',(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
        }
    })
})
app.get('/customerrec',(req,res)=>{
    create.query('select * from customer',(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
            console.log("customer Record sent");
        }
    })
})
app.get('/zoorec',(req,res)=>{
    create.query('select * from zoo',(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
            console.log("zoo Record sent");
        }
    })
})
app.get('/animalguiderec',(req,res)=>{
    create.query('select * from animalguide',(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
            console.log("Animal guide Record sent");
        }
    })
})
app.get('/animalrec',(req,res)=>{
    create.query('select * from animal',(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
            console.log("Animal Record sent");
        }
    })
})
app.get('/employeerec',(req,res)=>{
    create.query('select * from employee',(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
            console.log("Employee Record sent");
        }
    })
})
app.get('/hello',(req,res)=>{
    console.log("hello");
})
app.post('/fetchcustomer',(req,res)=>{
    var name=req.body.name;
    console.log(name);
    create.query('select * from customer where cname=?',[name],(err,result)=>{
        if (err) throw err;
        else{
            res.json(result);
            console.log(result);
            console.log("sent requested row with name")
        }
    })
})
app.post('/login',(req,res)=>{
    var {username,password}=req.body;
    /* var passs=req.body.password; */
    /* console.log(usern); */
   /*  console.log(passw); */
/*     var name='ramesh';
    var pass='12345'; */
    create.query('SELECT COUNT(c.cname) as count,email,phone,address,cid  FROM customer c WHERE c.cname=? AND c.password=?',[username,password],(err,result)=>{
        if (err) console.log(err);
        else{
            console.log(result);
            res.json(result);
            console.log(result);
        }
    })
})
app.post('/adminregister',(req,res)=>{
    var {name,loc,email,phone,pass}=req.body;
    create.query('insert into admin(aname,alocation,aemail,aphone,apassword) values (?,?,?,?,?)',[name,loc,email,phone,pass],(err,result)=>{
        if(err) 
        console.log(err);
        else{
            console.log("New Admin Registered");
            res.status(200).json(result)
        } 
    })
})
app.post('/adminlogin',(req,res)=>{
    var {name,pass}=req.body;
    create.query('select * from admin where aname=? and apassword=?',[name,pass],(err,result)=>{
        if(err) console.log(err);
        else{
            console.log(result);
            res.status(200).json(result);
        }
    })
})
app.get('/cid',(req,res)=>{
    create.query('select cid from ')
})
app.listen("2000",()=>{
    console.log("server listening on port 2000");
})
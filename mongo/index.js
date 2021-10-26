// -------------------------------(initialize)--------------------------
//npm init
//npm i express  mondodb cors
//change package.json file in script 
//install nodemon
//npm run start-dev
//url:https://docs.mongodb.com/drivers/node/current/usage-examples/
//express post: https://expressjs.com/en/guide/routing.html






//password:qN04QSYxKoR5bu2U

//user:Anis

// -------------------------------(initialize)--------------------------

var express = require('express')
var cors = require('cors')
var app = express()
const port=5000;
const ObjectId=require("mongodb").ObjectId;
app.use(cors());
app.use(express.json());





// ---------------------------------------mongodb----------------------------


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Anis:qN04QSYxKoR5bu2U@cluster0.saehn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("Hitting the database");
//   const user={name:"Apu Biswas",email:"apu@gmail.com",phone:"01999999"};
//   collection.insertOne(user)
//   .then(()=>
//   console.log("INSERT success "))


//   console.log(err);
// //   client.close();
// });

async function run() {
    try {
      await client.connect();
      const database = client.db("foodMaster");
      const usersCollection = database.collection("users");
      // create a document to insert
      // const doc = {
      //   name:"Record of a Shriveled Datum",
      //   email:"special@gmail.com",
      // }
      // const result = await usersCollection.insertOne(doc);
      // console.log(`A document was inserted with the _id: ${result.insertedId}`);



      // -------------------------------------get method------------------->


      app.get("/users",async(req,res)=>{
        const cursor =usersCollection.find({});
        const users=await cursor.toArray();
        res.send(users);
      })

      //------------------------------ post api---------------------------->
    // POST method route
    app.post('/users',async(req, res)=>{
      const newUser=req.body;
      const result = await usersCollection.insertOne(newUser);
      console.log("Hitting the post",req.body);
      console.log("Added users",result);
      console.log("Hitting the post",req.body);
      console.log("Added User",result);
      res.json(result);
      res.send('hit the post');
    })

    // ------------------------------delete----------------------

    app.delete("/users/:id",async(req,res)=>{
      const id=req.params.id;

      const query={_id:ObjectId(id)};
      const result =await usersCollection.deleteOne(query);
      console.log("deleting user with id",result);
      // res.json(1);
      res.json(result);
    })




    } 
    finally {
      // await client.close();
    }
  }
  run().catch(console.dir);


// 33:35-----------------------mongodb----------------------------












app.get('/', function (req, res) {
    // res.json({msg: 'This is CORS-enabled for all origins!'})
    res.send("Running my CRUD Server");
  })


  app.listen(port,() =>{
    console.log('CORS-enabled web server listening on port 80')
  })

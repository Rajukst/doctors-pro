const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser= require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// middleware
app.use(cors());
app.use(express.json());
// Nodemailer configuration


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yyhry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const doctorsCollection = client.db("doctors-professionals").collection("doctorsCollection");


// Creating User ----------------
app.post("/add-doctor", async (req, res) => {
  const addUser = req.body;
  const users = await doctorsCollection.insertOne(addUser);
  res.json(users);
  })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Fleetmart lifestyle server is running')
})

app.listen(port, () => {
  console.log(`Fleetmart lifestyle is Running on port ${port}`);
})
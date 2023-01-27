const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 2000;
const store_id = process.env.store_id
const store_passwd = process.env.store_passwd


app.use(cors());
app.use(express.json());

//db connect 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyj8wdj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })


const run = async () => {
    try {

         //db table 
         const ordersCollection = client.db('CodeInboundLLPJobTask').collection('items');
         const questionCollection = client.db('CodeInboundLLPJobTask').collection('questions');
         const customerSurveyCollection = client.db('CodeInboundLLPJobTask').collection('customerSurvey');


                 // add new Order
        app.post('/ItemsAdd', async(req, res)=>{
            console.log(req.body);
            const orderData = req.body;
            const result = await ordersCollection.insertOne(orderData);
            res.send(result);
        });

        //get items

        app.get('/items', async(req, res)=>{
            const query ={ };
            const items = await ordersCollection.find(query).toArray();
            res.send(items);
        });


         //delete items
         app.delete('/items/delete/:id', async (req, res) => {
            const id = req.params.id;
            const productQuery = {
                _id: ObjectId(id)
            }
            const result = await ordersCollection.deleteOne(productQuery);
            res.send(result);
        });


               // add new customer survey
               app.post('/customerSurvey', async(req, res)=>{
                console.log(req.body);
                const orderData = req.body;
                const result = await customerSurveyCollection.insertOne(orderData);
                res.send(result);
            });

            app.get('/allQuestions', async(req, res) =>{
                const query ={};
                const result = await questionCollection.find(query).toArray();
                res.send(result);
            })







    

    }
    finally {

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('simple server is running');
});



app.listen(port, () => {
    console.log(`simple server running on prot ${port}`);
});


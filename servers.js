// Setup
const RestaurantDB = require("./modules/restaurantDB.js");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require("cors");

const db = new RestaurantDB("mongodb+srv://tchen:tchen@cluster0.bdzxg.mongodb.net/sample_restaurants?retryWrites=true&w=majority");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
// Or use some other port number that you like better

// Add support for incoming JSON entities
app.use(express.json());
app.use(cors());
// Deliver the app's home page to browser clients


app.post("/api/restaurant", (req, res) => {
  db.addNewRestaurant(req.body)
  .then(msg=>res.json(msg))
  .catch(err=>res.json({message:err}));
})

  // Get all
  app.get("/api/restaurant", (req, res) => {
    db.getAllRestaurants(req.query.page,req.query.perPage)
        .then(msg=>res.json(msg))
        .catch(err=>res.json({message:err}));
  });

  // Get one
  app.get("/api/restaurant/:id", (req, res) => {
    db.getRestaurantById(req.params.id)
    .then(sale=>res.json(sale))
    .catch(err=>res.json({message:err}));
  });



  // Edit existing
  // This route expects a JSON object in the body, e.g. { "id": 123, "firstName": "Peter", "lastName": "McIntyre" }
  app.put("/api/restaurant/:id", (req, res) => {
    db.updateRestaurantById(req.body, req.params.id)
        .then(msg=>res.json(msg))
        .catch(err=>res.json({message:err}));
  });

  // Delete item
  app.delete("/api/restaurant/:id", (req, res) => {
    //   res.status(200).json({ "message": `deleted user with identifier: ${req.params.id}` });
    db.deleteRestaurantById(req.params.id)
    .then(msg=>res.json(msg))
    .catch(err=>res.json({message:err}));
    // res.status(204).end();
  });


  // Tell the app to start listening for requests
  db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });
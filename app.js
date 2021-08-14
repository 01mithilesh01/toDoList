const bodyParser = require("body-parser");

const express = require("express");

const mongoose = require("mongoose");

// const fetch = require("node-fetch");

const app = express();

// for using ejs and it will search list.ejs in views folder.
app.set("view engine", "ejs"); 


// connecting mongoose to mongodb
mongoose.connect("mongodb+srv://admin-mithilesh:HQhnqIq2mXB4TtN7@cluster0.054ls.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = { 
    name : String,
    date : String,
    ipAdd : String
};
const Item = mongoose.model("Item", itemsSchema);

// var ip;




// Item.insertMany(defaultItems, function(err){
//     if(err)
//     {
//         console.log("Error");
//     }
//     else
//     {
//         console.log("Successfully inserted!")
//     }
// });





// We will append the each element in this array which the user want to add.
var items = ["Buy food", "Cook Food", "Eat Food"];
var workItems = [];

// it is used to entertain the post request.
app.use(bodyParser.urlencoded({extended: true}));

// it used when we want to use CSS and JAVASRIPT folders which are stoed in public folder.
app.use(express.static("public"));

// it is used to showcase the list.ejs to the user .ie the home page.
var dateInFormat;
app.get("/", function(req, res){

    // below fews lines are used to print the day, data, month on the list.ejs
    var today = new Date();
    var currentDay = today.getDay();
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };
    dateInFormat = today.toLocaleDateString("en-US", options); 
//     fetch('http://api.ipify.org/?format=json')
//     .then(results => results.json())
//     .then(data => ip=data.ip);

    console.log(ip, typeof(ip));
    Item.find({}, function(err, foundItems){
        res.render("toDoList", {listTitle : dateInFormat, newListItem:foundItems});
    });


    // console.log(ip, typeof(ip));
    // console.log();

    // use to showcase the list.ejs page to the user. a dictionary is send to the list.ejs. So, the elements
    // of dictionary can be used in list.ejs
    


});

app.get("/work", function(req, res){
    res.render("toDoList", {listTitle:"Work List", newListItem : workItems});
});


// When the user fills the form of list.ejs 
app.post("/", function(req, res){
    // newItem contains the data which the user inputed and itemName is added to the array.
    var itemName = req.body.newItem;
    if(itemName!=="")
    {
        const item = new Item({
            name : itemName,
            date : dateInFormat,
            ipAdd : ip
        });
    item.save();
    }
    
    res.redirect("/");
});
app.post("/work", function(req, req){
    var item = req.body.newItem;
    if(item !=="")
        workItems.push(item);

    res.redirect("/work");
});




app.post("/delete", function(req, res){
    const itemID = req.body.itemWantToDelete;
    Item.findByIdAndRemove(itemID, function(err){
        if (!err)
        {
            console.log("Succesfully deleted");
        }
        // redirecting to "/" so that after the checkbox is cicked the webpage show refresh and show the existing items
        res.redirect("/");
    })
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function(){
    console.log("Server started successfully");
});










// YY3s9yzkfiUr7uC3

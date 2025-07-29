const express = require("express");
const app = express();


//This will only handle the GET call
app.get("/user", (req, res) => {
  res.send({ FirstName: "Anjali", LastName: "Kumari" });
});


//This will only handle the post call
app.post("/user", (req, res) => {
  res.send( "This is user page by POST method");
});


//This will only handle the delete call
app.delete("/user", (req, res) => {
    res.send("Deleted successfully");
  });


//it will match all the HTTP methods
app.use("/test", (req, res) => {
  res.send("This is test  Page");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

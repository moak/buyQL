const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const schema = require("./schema/schema");

// allow cross-origin requests
app.use(cors());

// connect to mlab db
mongoose.connect("mongodb://seyaa:test123!@ds063859.mlab.com:63859/buyql");
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server up on 4000");
});

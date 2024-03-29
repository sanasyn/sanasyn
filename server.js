const express = require("express");
const bodyParser = require("body-parser")
const path = require("path")
const Client = require("pg")
const app = express();
const PORT = process.env.PORT || 8080;
const match = require("./helpers/match.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post("/api/query", match.runQuery);
app.post("/api/resultDetails", require("./helpers/resultDetails"))
app.post("/api/userDemographics", require("./helpers/userDemographics"))
app.post("/api/emailUser", require('./email/emailStudy'))

app.use(express.static(path.resolve(__dirname, './src/dist')));

app.get('*', function(request, response) {
   response.sendFile(path.resolve(__dirname, './src/dist/index.html'));
 });

app.listen(PORT, function() {
   console.log("App listening on PORT " + PORT);
});
// Demo server
const path = require("path")
var jsonServer = require("json-server")
var demodata = require("../../demodata/db.json")
var routes = require("../../demodata/routes.json")
const express = require("express")
var router = jsonServer.router(demodata) // Express router
const app = express()

app.use("/static", express.static(path.join(__dirname, "../../demodata/public")))

app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use("/api", jsonServer.rewriter(routes))
app.use("/api", router)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`demo server started at localhost:${port}`)
})

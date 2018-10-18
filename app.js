const express = require("express")
const Tabletop = require("tabletop")

var app = express()
var port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("SEND ME YOUR CODES")
})

app.get('/:code', (req, res) => {
    Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1r0SBy6aZZ-Q3mPqCfgTuJ9WAHhVUa3xECY3_qcmEoRM/edit?usp=sharing',
                   callback: function(data, tabletop) {
                       var element = data.find((assassin) => {
                            return assassin.code === req.params.code
                       })
                       res.send(JSON.stringify(element))
                   },
                   simpleSheet: true } )
})

app.listen(port, () => {
    console.log("app running on port: ", port);
})
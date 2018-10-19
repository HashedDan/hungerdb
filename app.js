const express = require("express")
const Tabletop = require("tabletop")
const cors = require('cors')

var app = express()
var port = process.env.PORT || 5000

app.use(cors())

app.get('/', (req, res) => {
    res.send(JSON.stringify({"target": "Not Found", "code": "Not Found", "target_pic": "https://tenor.com/PByj.gif"}))
})

app.get('/:code', (req, res) => {
    Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1r0SBy6aZZ-Q3mPqCfgTuJ9WAHhVUa3xECY3_qcmEoRM/edit?usp=sharing',
                   callback: function(data, tabletop) {
                       var element = data.find((assassin) => {
                            return assassin.code === req.params.code
                       })
                       if (element != undefined) {
                        res.send(JSON.stringify(element))
                       } else {
                           res.send(JSON.stringify({"target": "Not Found", "code": "Not Found", "target_pic": "https://tenor.com/PByj.gif"}))
                       }
                   },
                   simpleSheet: true } )
})

app.listen(port, () => {
    console.log("app running on port: ", port);
})
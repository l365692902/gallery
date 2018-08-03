let http = require('http')
let fs = require('fs')
let url = require('url')

let debugLevel = 2

function debug(level, info) {
    if (level <= debugLevel) {
        console.log(info)
    }
}

debug(1, 'start')

http.createServer(function (req, res) {
    let pathName = url.parse(req.url, true).pathname
    let extensionName
    debug(2, url.parse(req.url, true))
    debug(2, extensionName)
    debug(2, pathName)
    if(pathName != "/"){
        extensionName = pathName.match(/\.\w+$/gm)[0].slice(1)
    }else{
        pathName = "/gallery.html"
        extensionName = "html"
    }
    fs.readFile('.' + pathName, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            return res.end("404 Not Found")
        }
        if (extensionName == 'html') {
            res.writeHead(200, { 'Content-Type': 'text/html' })
        } else if (extensionName == 'js') {
            res.writeHead(200, { 'Content-Type': 'text/javascript' })
        } else if (extensionName == 'css') {
            res.writeHead(200, { 'Content-Type': 'text/css' })
        } else if (extensionName == 'png') {
            res.writeHead(200, { 'Content-Type': 'image/png'})
        } else {
            res.writeHead(403, { 'Content-Type': 'text/html' })
            return res.end("403 Unsupported File Type")
        }
        res.write(data)
        res.end()
    })
}).listen(8765)

debug(1, 'done')

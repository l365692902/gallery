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

// fs.watch("./pic", function(event, filename){
//     debug(2,event)
//     debug(2,filename)
//     fs.
// })

// fs.readFile("./gallery.html", function(err, data){
//     if(err){
//         throw err
//     }
//     let file_content=data.toString()
//     let position=file_content.indexOf('<div id="insertAnchor"></div>')
//     file_content=file_content.substring(position)
//     let file=fs.openSync("./gallery.html", "r+")
//     let bufferedText=new Buffer("halo"+file_content)
//     fs.write(file, bufferedText,0,bufferedText.length,position)
//     fs.close(file)
// })

// debug(2, position)

debug(1, 'done')

// 未来的目标是实现监控文件夹，添加新图片和配套文字说明后自动添加到html文件中
// 可能要用的函数：
// fs.watch()，用来监控
// fs.writeFile() fs.write()，用来写html文件
// ？？，用来解析html文件
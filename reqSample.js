var http = require('http'), result = []
var needle = require('needle')
var cheerio = require('cheerio')
var fs = require('fs');
let params = //{
    //url: 
    "http://maxxmusic.org/?mp3=%E4%EB%FF+%E1%E5%E3%E0+%F2%F0%E5%ED%E8%F0%EE%E2%EA%E8"//, encoding: "windows-1251"
//}


needle.get(params, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html), right
        $('div.clearfix').each(function (i, element) {

            var a = $(this)
            right = a.children('.link').attr('href')
            if (!!right) {
                let link = 'http://maxxmusic.org' + right
                result.push(link)
            }

        })
        
    }
})

getFiles(result)

function getFiles(arr){
    arr.forEach((item, index, array) => {
        var file = fs.createWriteStream(index + ".mp3");
        let request = http.get(item, (response) => {
            response.pipe(file)
        })
    }
    )
}
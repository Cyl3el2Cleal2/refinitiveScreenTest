const https = require('https')
const options = {
  hostname: 'codequiz.azurewebsites.net',
  port: 443,
  path: '/',
  method: 'GET',
  headers: {
    Cookie: 'hasCookie=true'
  }
}

const filter = process.argv.slice(2)[0];

const req = https.request(options, res => {

  res.on('data', html => {
    // console.info(html)
    var rawHtml = Buffer.from(html).toString();
    // console.info(rawHtml)
    let slicer = rawHtml.split('<tr>')
    slicer = slicer.slice(2)

    let result = {}
    for(let i = 0; i<4; i++){
      // slice to get exactly item
      let processStr = replaceAll(slicer[i],'<td>','')
      processStr = processStr.split('</td>')
      // console.log(processStr)
      result[processStr[0].trim()] = processStr[1]
    }
    // console.info(result)
  
    console.log(result[filter])
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()

const replaceAll = function(target, search, replacement) {
  return target.split(search).join(replacement);
};
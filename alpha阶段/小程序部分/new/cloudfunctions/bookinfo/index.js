const cloud = require('wx-server-sdk')
cloud.init()
var rp = require('request-promise');
exports.main =async  (event, context) => {
  var options = {
    uri: 'https://jisuisbn.market.alicloudapi.com/isbn/query',
    qs: {
        isbn: event.isbn 
        // -> uri + '?isbn=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'APPCODE 823fbd610c0b460e91ecd0171714da0b'
    },
    json: true 
  };
  var res=rp(options).then(html=>{
      return html;
    }).catch(err=>{
      console.log(err);
    })
  return res;
}
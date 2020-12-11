const path = require('path');

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    var uri = request.uri;
    const parsed_path = path.parse(uri);
  
    // Extract version part
    const version = uri.match(/^\/[0-9]+\.[0-9]+\.[0-9]+/g);
    
    if (version && parsed_path.ext === ''){
        uri = version + '/index.html'
    }

    request.uri = uri
   
    callback(null, request);
  }
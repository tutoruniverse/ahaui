const path = require('path');

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  var uri = request.uri;

  console.log(uri)

  // Extract version part
  const version = uri.match(/^\/[0-9]+\.[0-9]+\.[0-9]+/g);
  const formattedUri = uri.replace(version, '');

  if (version) {
    const parsed_path = path.parse(formattedUri);
    if (parsed_path.ext === '') {
      if (uri.endsWith('/')) {
        uri = uri + 'index.html'
      } else {
        uri = uri + '/index.html'
      }
    }
  } else {
    uri = '/index.html'
  }

  request.uri = uri

  console.log('Redirect to', uri)

  callback(null, request);
}
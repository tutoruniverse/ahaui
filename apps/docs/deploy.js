const ghpages = require('gh-pages');
const ahaReactConfig = require('./config');

ghpages.publish('public', {
  dest: ahaReactConfig.version,
  add: true,
  user: {
    name: 'github-actions-bot',
    email: 'support+actions@github.com'
  }
}, (e) => {
  if (e) {
    console.error(e);
  } else {
    ghpages.publish('gh-pages-root', {
      add: true,
      user: {
        name: 'github-actions-bot',
        email: 'support+actions@github.com'
      }
    }, (e) => {
      if (e) {
        console.error(e);
      }
    })
  }
})
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<body></body>', {
  url: 'http://localhost:3000',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.HTMLDivElement = jsdom.window.HTMLDivElement;

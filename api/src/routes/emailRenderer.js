const React = require('react');
const ReactDOMServer = require('react-dom/server');
const babel = require('@babel/core');

function renderEmailTemplate(Component, props) {
    const jsx = React.createElement(Component, props);
    const html = ReactDOMServer.renderToStaticMarkup(jsx);
    return `<!DOCTYPE html>${html}`;
}

module.exports = renderEmailTemplate;
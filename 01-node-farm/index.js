const http = require('http');
const url = require('url');
const fs = require('fs');

// SERVER

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
    
    const pathName = req.url;

    // Overview page
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)

        res.end(output)

    // Product page
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT')

    // API
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data)
    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-custom-header': 'Hello people who watch this code. Have a nice day!'
        })
        res.end('<h1>Page not found!</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})
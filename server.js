const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');



app.use((request, response, next) => {
    let now = new Date().toString();
    let log = `${now}: ${request.method} ${request.url}`;

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write log.')
        }
    });
    next();
})

/* app.use((request, response, next) => {
    response.render('maintenance.hbs');
}) */

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {
    //response.send('<h1>Hello Express!</h1>')
    /* response.send({
        name: 'Bax',
        age: 19
    }) */
    response.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMassage: 'welcome to this fcking web, bitch'
    })
});

app.get('/about', (request, response) => {
    //response.send('<h1>Hello Express!</h1>')
    //response.send('about page')
    response.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (request, response) => {
    //response.send('<h1>Hello Express!</h1>')
    response.send({
        errorCode: 999,
        errorMassage: '\'cause I\'m too awesome!!!'
    })
});

app.get('/project', (request, response) => {
    response.render('project.hbs', {
        pageTitle: 'Project on Github'
    });
});



app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
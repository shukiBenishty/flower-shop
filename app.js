var http = require('http');
var express = require('express');
var session = require('express-session');
let logger = require('morgan');
var { users , roles, branches, flowers} =  require('./database');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
let debug = require('debug')('lab4:session')

let secret = 'lab4 session'

var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(logger('dev'))
app.use(cookieParser(secret));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended:true}) );
app.use( express.static('./static') );
app.use(session({secret: secret}));

app.all('/*', async (req, res, next) => {
    debug('headers');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});


app.get( '/', (req, res) => {
    console.log(flowers);
    res.render('index', 
        {
            users: users,
            roles: roles,
            flowers: flowers,
            branches: branches,
            items: null,
            user: req.signedCookies.user
        },    
        (err, html) => {   
            res.send(html);
        });
});

app.post( '/', (req, res) => {
    var query = req.body.qstr;
    db.findItems(query).then(function(items) {
        res.render('search', {
            user: req.signedCookies.user,
            items: items,
            query: query
        });
    }, function(err) {
        console.error(err);
        res.redirect('/');
    });
});



app.get('/loginadmin', function (req, res) {
    res.render('customers', 
        {
            items: null,
            user: req.signedCookies.user
        },    
        (err, html) => {   
            if (err) {
                console.error(err);
                
                res.send(html);                 
            }
            res.send(html);
        });
});

app.get('/customers', function (req, res) {
    res.send(users);
});

app.post('/customers', function (req, res) {
    users.push(req.body)
    res.send(users);
});

app.put('/customers', function (req, res) {
    res.send(users);
});

app.delete('/customers', function (req, res) {
    res.send(users);
});



app.get( '/login', (req, res) => {
    res.render('login', {user: req.signedCookies.user});
});

app.post( '/login', (req, res) => {
    var nick = req.body.nick;
    var pwd = req.body.pwd;
    db.findUser({nick: nick, pwd: pwd}).then(function() {
        res.cookie('user', nick, {signed: true});
        res.redirect('/');
    }, function() {
        console.log("(nick: ",nick,", pwd: ",pwd,") is not valid");
        //console.error(err);
        res.redirect('/login');
    });
});

app.get( '/logout', (req, res) => {
    res.cookie('user', '', { signed: true, maxAge: -1} );
    res.redirect('/');
});

app.get( '/register', (req, res) => {
    res.render('register',{user: req.signedCookies.user});
});

app.post( '/register', (req, res) => {
    var nick = req.body.nick;
    var pwd = req.body.pwd;
    db.addUser(nick, pwd).then(function() {
        res.cookie('user', nick, {signed: true});
        res.redirect('/');
    }, function() {
        res.redirect('/register');
    });
});

app.get( '/item', (req, res) => {
    var user = req.signedCookies.user;
    var id = req.query.id;
    db.getItem(id).then(function(item) {
        res.render('item', {
            item: item,
            user: user
        });
    }, function(err) {
        //console.error(err);
        res.redirect('/');
    });
});

app.get( '/modify_item', admin_authorize, (req, res) => {
    var id = req.query.id;
    var name = req.query.name;
    res.render('modify_item',{user: req.signedCookies.user, id: id, name: name});
});

app.post( '/modify_item', admin_authorize, (req, res) => {
    var id = req.query.id;
    var name = req.body.name;
    var price = req.body.price;
    var desc = req.body.desc;
    var img = req.body.img;
    db.modifyItem(id, name, price, desc, img).then(function(item) {
        res.redirect('/item?id='+id);
    }, function(err) {
        console.error(err);
        res.redirect('/item?id='+id);
    });
});

app.get( '/delete_item', admin_authorize, (req, res) => {
    var id = req.query.id;
    db.deleteItem(id).then(function(item) {
        res.redirect('/');
    }, function(err) {
        console.error(err);
        res.redirect('/');
    });
});

app.get( '/delete_order', admin_authorize, (req, res) => {
    var id = req.query.id;
    db.deleteOrder(id).then(function(order) {
        res.redirect('/orders');
    }, function(err) {
        console.error(err);
        res.redirect('/orders');
    });
});

app.get( '/show_order', admin_authorize, (req, res) => {
    var id = req.query.id;
    var user = req.query.user;
    db.getOrder(id).then(function(result) {
        res.render('order',{
            order: result.order,
            items: result.items,
            user: user
        });
    }, function(err) {
        console.error(err);
        res.redirect('/orders');
    });
});

app.get( '/payment', authorize, (req, res) => {
    res.render('payment', {user: req.signedCookies.user});
});

app.post( '/payment', authorize, (req, res) => {
    var user = req.user;
    var ccn = req.body.ccn;
    var addr = req.body.addr;
    db.finalizeOrder(user,ccn,addr);
    res.redirect('/cart');
});

app.get( '/buy_item', authorize, (req, res) => {
    var user = req.user;
    var id = req.query.id;
    db.buyItem(user,id);
    res.redirect('/');
});

app.get( '/account', authorize, (req, res) => {
    db.findUser({nick: req.user}).then(function(user) {
        res.render('account',{
            user: user
        });
    }, function(err) {
        console.error(err);
        res.redirect('/');
    });
});

app.get( '/cart', authorize, (req, res) => {
    var user = req.user;
    db.getUserOrderId(user).then(function(id) {
        db.getOrder(id).then(function(result) {
            res.render('cart', {
                items: result.items,
                user: user
            });
        }, function(err) {
            console.error(err);
            res.render('cart', {
                items: [],
                user: user
            });
        });
    }, function(err) {
        console.error(err);
        res.render('cart', {
            items: [],
            user: user
        });
    });
});

app.get( '/add_item', admin_authorize, (req, res) => {
    res.render('add_item',{user: req.signedCookies.user});
});

app.post( '/add_item', admin_authorize, (req, res) => {
    var name = req.body.name;
    var price = req.body.price;
    var desc = req.body.desc;
    var img = req.body.img;
    db.addItem(name,price,desc,img);
    res.redirect('/add_item');
});

app.get( '/delete_user', admin_authorize, (req, res) => {
    var nick = req.query.nick;
    db.deleteUser(nick).then(function(sth) {
        res.redirect('/users');
    }, function(err) {
        console.error(err);
        res.redirect('/users');
    });
});

app.get( '/users', admin_authorize, (req, res) => {
    db.getUsers().then(function(users) {
        res.render('users', {users: users, user: req.signedCookies.user});
    }, function(err) {
        console.error(err);
        res.redirect('/admin');
    });
});

app.get( '/orders', admin_authorize, (req, res) => {
    db.getOrders().then(function(orders) {
        res.render('orders', {orders: orders, user: req.signedCookies.user});
    }, function(err) {
        console.error(err);
        res.redirect('/admin');
    });
});

app.get( '/admin', admin_authorize, (req, res) => {
    res.render('admin',{user: req.signedCookies.user});
});

app.use((req,res,next) => {
    res.render('404', { url : req.url, user: req.signedCookies.user });
});

function authorize(req, res, next) {
    if ( req.signedCookies.user ) {
        req.user = req.signedCookies.user;
        next();
    } else {
        res.redirect('/login?returnUrl='+req.url);
    }
}

function admin_authorize(req, res, next) {
    if ( req.signedCookies.user == "admin" ) {
        req.user = req.signedCookies.user;
        next();
    } else {
        res.redirect('/login?returnUrl='+req.url, {user: req.signedCookies.user});
    }
}

// var db, dburl = 'mongodb://gql-adminq:shukishugi5@ds123753.mlab.com:23753/test-gql';
// database.connectDB(dburl).then(function(res) {
//     db = res;
//     console.log( 'Connected to database' );
// }, function(err) {
//     console.error(err);
//     console.log( 'Could not connect to database');
// });

http.createServer(app).listen( process.env.PORT || 3000 );
console.log( 'Server started' );

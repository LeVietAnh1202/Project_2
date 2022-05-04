var App = {};

var addRoutes = function () {
    $NB.addRoute('/books/:id', function (params) {
        console.log('Route is ', params.Title, params.id);
    }, 'books');
    console.log('123')
    $NB.addRoute('/services', function (params) {
        console.log('addRoute-services')
        console.log('Route is haha  ', params.Title, params.id);
    }, 'services');

    $NB.addRoute('/:category/:id', function (params) {
        console.log('Route is ', params.Title, params.category, params.id);
    }, 'category');

    $NB.addRoute('/:category/:id/:action', function (params) {
        console.log('Route is ', params.Title, params.category, params.id, params.action);
    }, 'category action');


    $NB.addRoute(['/', '/:pagename'], function (params) {
        console.log('Route is hihi', params.Title, params.pagename);
    }, 'page');
};



App.init = function () {
    addRoutes();
    $NB.loadController(location.pathname);
};

App.navigateTo = function (pageUrl) {
    console.log(`$NB`)
    console.log($NB)
    $NB.navigateTo(pageUrl);
};
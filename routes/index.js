var express = require('express');
var fortune = require('fortune');
var router = express.Router();
var db = fortune({db:'stack'}).adapter;

/* Sort By Property Shortcut Thanks to StackOverflow */
function sortBy(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  db.findMany('stack').then( function(list) {
    res.render('stacklist', { title: 'Stacks', stacks:list });
  });
});

router.get('/stacks/:id', function(req, res, next) {
  db.findMany('entry',{owner: req.param('id')}).then( function(list) {
    db.find('stack',req.param('id')).then( function(stack) {
      list.sort(sortBy('timestamp'));
      res.render('stackview', { title:stack.name, myself: stack, entries:list });
    });
  });
});

module.exports = router;

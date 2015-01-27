var fortune = require('fortune')
var app = fortune({db: 'stack'})
  .resource('stack',{
    entries: [{ref:'entry', inverse:'owner'}], // "has many" entries
    color: String, // Color scheme of statck
    name: String
  })
  .resource('entry',{
    title: String,
    owner: {ref:'stack', inverse:'entries'}, // "belongs to" a stack
    timestamp: Date,
    priority: Number,
    reminder: Date
  }).transform(
  // before storing in database
  function() {
    this.timestamp = new Date();
    return this;
  })

module.exports = app.router

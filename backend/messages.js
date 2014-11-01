exports.findAll = function(request, response) {
  response.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};
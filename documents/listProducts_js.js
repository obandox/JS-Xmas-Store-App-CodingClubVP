var log = console.log;
var stripe = require("stripe")("sk_test_DnSmb1KspaMi6NYySidEHlRu");

stripe.products.list(function(err, rsp){
  log(err);
  log(rsp);
});

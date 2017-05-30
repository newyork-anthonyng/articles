const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const array = Array(1000);
array.fill('foobar');

suite.add('for-loop#test', function() {
  for(let i = 0; i < array.length; i++) {}
})
.add('forEach#test', function() {
  array.forEach((i) => {});
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ async: true });

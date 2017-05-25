// # This function is going to blow your mind
// You pass in the name of a person, and it will greet that person!!
function greet(name) {
  // The %c allows you to pass in CSS to style your console output
  // This only works in the browser
  console.log(`%c Hi ${name}`, 'background-color: tomato; font-size: 18px; color: white;');
}

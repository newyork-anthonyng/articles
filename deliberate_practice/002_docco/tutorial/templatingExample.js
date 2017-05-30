const _ = require('underscore');

const templateSource = `
  <% for (var i = 1; i <= 5; i++) { %>
    <% var myText = "Number " + i; %>
    <h1 id="<%= i %>">
      <%= myText %>
    </h1>
  <% } %>
`;

const template = _.template(templateSource);
const html = template();

console.log(html);
/*
  <h1 id="1">
    Number 1
  </h1>


  <h1 id="2">
    Number 2
  </h1>


  <h1 id="3">
    Number 3
  </h1>


  <h1 id="4">
    Number 4
  </h1>


  <h1 id="5">
    Number 5
  </h1>
 */

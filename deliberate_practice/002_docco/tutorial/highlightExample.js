const highlightjs = require('highlightjs');

const codeSnippet = `
  function greet(name) {
    console.log('hello, ' + name);
  }
`;

const highlightedCode = highlightjs.highlight('js', codeSnippet).value;
/*
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">greet</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello, '</span> + name);
      }
*/

// Generated by CoffeeScript 1.9.1
(function() {
  var Docco, _, buildMatchers, commander, configure, defaults, document, format, fs, getLanguage, highlightjs, languages, marked, parse, path, run, version, write,
    slice = [].slice;

  document = function(options, callback) {
    // this is called from "run" command, when we have an argument
    // console.log(options);
    // options variable is the commander object. Weird?
    // TODO: What do we do with this?
    var config;
    if (options == null) {
      // default options to an empty object
      options = {};
    }
    // TODO: What does configure do?
    config = configure(options);
    // console.log('configurations');
    // console.log(config);
    /* config contains 
     * template (what the html will look like)
     * css, output, layout, sources, etc.
     */

    // make a folder...
    // fs-extra is pretty awesome
    // https://www.npmjs.com/package/fs-extra
    // fs.mkdirs('anthony_rocks', () => {
    //   // create new files in here
    //   fs.writeJson('anthony_rocks/rock.json', { name: 'Anthony' }, err => {
    //     if (err) return console.error(err);

    //     console.log('success!');
    //   });
    // });

    // this function creates the output folder
    // it goes through all of the source files you have
    // it parses them and creates the necessary html files
    // it copies over the CSS and public directories
    return fs.mkdirs(config.output, function() {
      var complete, copyAsset, files, nextFile;
      callback || (callback = function(error) {
        // console.log('callback was run!');
        if (error) {
          throw error;
        }
      });
      // default callback to an empty function that handles errors
      // It looks like we are not using callbacks anywhere else.
      // console.log('callback');
      // console.log(callback);

      // copy assets to OUTPUT directory
      copyAsset = function(file, callback) {
        // console.log('********************');
        // console.log('********************');
        // console.log('file name');
        // console.log(file);
        // console.log(path.basename(file));
        // basename returns the last piece of the path. In our case, this will be the file's name
        if (!fs.existsSync(file)) {
          return callback();
        }
        return fs.copy(file, path.join(config.output, path.basename(file)), callback);
        // return fs.copy(file, path.join('dodo', path.basename(file)), callback);
      };

      // another function
      // This copies over the CSS style sheet and public folder
      complete = function() {
        // config.css points to the CSS we will be using to create documentation
        // config.public points to all the resources that we will be using
        // TODO: What is public for?
        return copyAsset(config.css, function(error) {
          if (error) {
            return callback(error);
          }
          if (fs.existsSync(config["public"])) {
            return copyAsset(config["public"], callback);
          }
          return callback();
        });
      };
      // make a copy of the sources array
      // console.log('sources *************');
      // console.log(config.sources);
      files = config.sources.slice();

      // another function created
      nextFile = function() {
        var source;
        source = files.shift(); // get the next file on the list
        return fs.readFile(source, function(error, buffer) {
          var code, sections;
          if (error) {
            return callback(error);
          }
          code = buffer.toString();
          // buffers handle binary data
          // buffer corresponds to raw memory
          // buffer.toString() gives you a readable version of the buffer
          sections = parse(source, code, config);
          // console.log('************************ sections');
          // console.log(sections);
          // parse breaks down the source code into the actual code and comments
          // docsText, codeText
          // console.log('********************');
          // console.log('********************');
          // console.log(sections);
          // console.log('********************');
          // console.log('********************');
          // console.log('************** before');
          // console.log(sections);

          // format() adds the HTML for docs and code
          format(source, sections, config);
          // console.log('************ after');
          // console.log(sections);

          write(source, sections, config);
          if (files.length) {
            // recursion to go through all files
            return nextFile();
          } else {
            // when finished going through all files,
            // run "complete" command. This will copy over the CSS and public directory
            return complete();
          }
        });
      };
      return nextFile();
    });
  };

  // parse through the code and create sections
  // the section will have docsText and codeText
  parse = function(source, code, config) {
    // console.log('**********************');
    // console.log('sourceFilename', source);
    // console.log('code', code);
    // console.log('config', config);
    var codeText, docsText, hasCode, i, isText, j, k, lang, len, len1, line, lines, match, maybeCode, save, sections;
    if (config == null) {
      config = {};
    }
    lines = code.split('\n');
    sections = [];
    lang = getLanguage(source, config);
    // console.log('lang');
    // console.log(lang);
    /* 
    * lang contains RegExp to get JavaScript comments
    */
    hasCode = docsText = codeText = '';
    save = function() {
      // save docsText, codeText into sections array
      sections.push({
        docsText: docsText,
        codeText: codeText
      });
      return hasCode = docsText = codeText = '';
    };
    // if (lang.literate) {
    //   // if you are a literate program language
    //   isText = maybeCode = true;
    //   for (i = j = 0, len = lines.length; j < len; i = ++j) {
    //     line = lines[i];
    //     lines[i] = maybeCode && (match = /^([ ]{4}|[ ]{0,3}\t)/.exec(line)) ? (isText = false, line.slice(match[0].length)) : (maybeCode = /^\s*$/.test(line)) ? isText ? lang.symbol : '' : (isText = true, lang.symbol + ' ' + line);
    //   }
    // }
    for (k = 0, len1 = lines.length; k < len1; k++) {
      line = lines[k];
      // console.log('line', line);
      // console.log(lang);
      // is a comment?
      // console.log('line **************');
      // console.log(line);
      // console.log(!!line.match(lang.commentMatcher));
      // console.log('line **************');
      if (line.match(lang.commentMatcher) && !line.match(lang.commentFilter)) {
        if (hasCode) {
          save();
        }
        docsText += (line = line.replace(lang.commentMatcher, '')) + '\n';
        // if comment is of "// ---"
        // then include a line break
        if (/^(---+|===+)$/.test(line)) {
          save();
        }
      } else {
        // we have actual code
        hasCode = true;
        codeText += line + '\n';
      }
    }
    save();
    return sections;
  };

  // adds docsHTML and codeHTML to sections
  format = function(source, sections, config) {
    // console.log('************ format');
    // console.log(source, sections);
    var code, i, j, language, len, markedOptions, results, section;
    // we are calculating language in two different places
    language = getLanguage(source, config);
    // marked is markdown parser/compiler
    // https://www.npmjs.com/package/marked
    markedOptions = {
      smartypants: true
    };
    // console.log(config.marked);
    if (config.marked) {
      markedOptions = config.marked;
    }
    marked.setOptions(markedOptions);
    marked.setOptions({
      // highlight markdown text
      highlight: function(code, lang) {
        lang || (lang = language.name);
        if (highlightjs.getLanguage(lang)) {
          return highlightjs.highlight(lang, code).value;
        } else {
          console.warn("docco: couldn't highlight code block with unknown language '" + lang + "' in " + source);
          return code;
        }
      }
    });
    results = [];
    for (i = j = 0, len = sections.length; j < len; i = ++j) {
      section = sections[i];
      code = highlightjs.highlight(language.name, section.codeText).value;
      // console.log('before');
      // console.log(code);
      // remove whitespace characters
      code = code.replace(/\s+$/, '');
      section.codeHtml = "<div class='highlight'><pre>" + code + "</pre></div>";
      // add docs html
      results.push(section.docsHtml = marked(section.docsText));
    }
    // results contains all of the docsHTML
    // console.log(results);
    return results;
  };

  write = function(source, sections, config) {
    // source is the filename
    // sections contains the HTML we need
    var destination, first, firstSection, hasTitle, html, title;
    destination = function(file) {
      // console.log('************** destination');
      // console.log(path.extname(file));
      //return path.join(config.output, path.basename(file, path.extname(file)) + '.html');
      var _d = path.join(config.output, path.basename(file, path.extname(file)) + '.html');
      return _d;
    };
    // console.log('destination', destination(source));
    firstSection = _.find(sections, function(section) {
      return section.docsText.length > 0;
    });
    if (firstSection) {
      first = marked.lexer(firstSection.docsText)[0];
      // console.log('marked', marked.lexer(firstSection.docsText));
    }
    hasTitle = first && first.type === 'heading' && first.depth === 1;
    title = hasTitle ? first.text : path.basename(source);
    html = config.template({
      sources: config.sources,
      css: path.basename(config.css),
      title: title,
      hasTitle: hasTitle,
      sections: sections,
      path: path,
      destination: destination
    });
    // console.log(html);
    console.log("docco: " + source + " -> " + (destination(source)));
    return fs.writeFileSync(destination(source), html);
  };

  defaults = {
    layout: 'parallel',
    output: 'docs',
    template: null,
    css: null,
    extension: null,
    languages: {},
    marked: null
  };

  configure = function(options) {
    var config, dir;
    config = _.extend({}, defaults, _.pick.apply(_, [options].concat(slice.call(_.keys(defaults)))));
    config.languages = buildMatchers(config.languages);
    // console.log(options);
    // options are from the commander object
    if (options.template) {
      if (!options.css) {
        console.warn("docco: no stylesheet file specified");
      }
      config.layout = null;
    } else {
      // get directory of the layout we are using. parallel, classic, etc.
      dir = config.layout = path.join(__dirname, 'resources', config.layout);
      if (fs.existsSync(path.join(dir, 'public'))) {
        // our "complete" function will copy everyting from the public directory to output directory.
        config["public"] = path.join(dir, 'public');
      }
      // get the template and css files
      config.template = path.join(dir, 'docco.jst');
      config.css = options.css || path.join(dir, 'docco.css');
    }
    // convert the template to a usable template function
    config.template = _.template(fs.readFileSync(config.template).toString());
    if (options.marked) {
      config.marked = JSON.parse(fs.readFileSync(options.marked));
    }
    // only grab sources that are valid files
    config.sources = options.args.filter(function(source) {
      var lang;
      lang = getLanguage(source, config);
      if (!lang) {
        console.warn("docco: skipped unknown type (" + (path.basename(source)) + ")");
      }
      return lang;
    }).sort();
    // args contains all arguments that were passed to the function
    // console.log('args', options.args);
    // console.log('sources', config.sources);
    return config;
  };

  _ = require('underscore');

  fs = require('fs-extra');

  path = require('path');

  marked = require('marked');

  commander = require('commander');

  highlightjs = require('highlight.js');

  languages = JSON.parse(fs.readFileSync(path.join(__dirname, 'resources', 'languages.json')));
  // console.log('languages', languages);

  // create comments and comment filters
  buildMatchers = function(languages) {
    var ext, l;
    for (ext in languages) {
      l = languages[ext];
      l.commentMatcher = RegExp("^\\s*" + l.symbol + "\\s?");
      // # not really sure what this does
      l.commentFilter = /(^#![\/]|^\s*#\{)/;
    }
    return languages;
  };

  languages = buildMatchers(languages);

  getLanguage = function(source, config) {
    var codeExt, codeLang, ext, lang, ref;
    ext = config.extension || path.extname(source) || path.basename(source);
    // console.log('configuration languages');
    // console.log(config.languages);
    lang = ((ref = config.languages) != null ? ref[ext] : void 0) || languages[ext];
    if (lang && lang.name === 'markdown') {
      codeExt = path.extname(path.basename(source, ext));
      if (codeExt && (codeLang = languages[codeExt])) {
        lang = _.extend({}, codeLang, {
          literate: true
        });
      }
    }
    return lang;
  };

  version = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'))).version;

  run = function(args) {
    // args variable is undefined
    // process.argv contains an array of arguments passed in when running this command. See https://nodejs.org/docs/latest/api/process.html#process_process_argv
    // console.log(args);
    // console.log(process.argv);
    var c;
    if (args == null) {
      args = process.argv;
    }
    c = defaults;
    // c is a list of default parameters. It is defined earlier in the file
    // console.log(c);

    // commander prints out the console.output when you run docco without arguments
    commander
      .version(version)
      .usage('[options] files')
      .option('-L, --languages [file]', 'use a custom languages.json', _.compose(JSON.parse, fs.readFileSync))
      .option('-l, --layout [name]', 'choose a layout (parallel, linear or classic)', c.layout)
      .option('-o, --output [path]', 'output to a given folder', c.output)
      .option('-c, --css [file]', 'use a custom css file', c.css)
      .option('-t, --template [file]', 'use a custom .jst template', c.template)
      .option('-e, --extension [ext]', 'assume a file extension for all inputs', c.extension)
      .option('-m, --marked [file]', 'use custom marked options', c.marked)
      .parse(args).name = "docco";

    // console.log('do we have any arguments?');
    // console.log(commander.args);
    // if we have arguments, then run the "document" command.
    console.log(commander.args);
    console.log(args);
    if (commander.args.length) {
      return document(commander);
    } else {
    // if we don't have arguments, print out help information
      return console.log(commander.helpInformation());
    }
  };

  Docco = module.exports = {
    run: run,
    document: document,
    parse: parse,
    format: format,
    version: version
  };

}).call(this);
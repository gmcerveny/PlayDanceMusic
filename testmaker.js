var ejs = require('ejs'),
  fs = require('fs'),
  yamlFM = require('yaml-front-matter'),
  namp = require('namp');

var template_name = 'index';
var tests = ['no_price', 'premium', 'ultra'];
var template_path = path.resolve(template_name + '.ejs');

function renderTests() {   
    tests.forEach( function(test) {
        var options = new Object();
        options[test] = true;
        output_name = template_name + '_' + test + '.html';
        output_path = path.resolve('.', output_name);
        renderTest(template_path, options, output_path);
    });
}

function renderControl() {
    output_path = path.resolve('.', template_name + '.html');
    renderTemplate(template_path, {control: true}, output_path);
}

function renderTemplate(template_path, options, output_path) {
    ejs.renderFile(template_path, options, 
                   function(err, str) {
                       if (err) throw err;
                       fs.writeFile(output_path, str, 
                                    function(err) {
                                        if (err) throw err;
                                        console.log( path.basename(output_path) + ' written');
                                    });
                   });
}

function quickRender(quick_template, options) {
    var basename = path.basename(quick_template, '.ejs');
    var quick_template_path = path.resolve('.', basename + '.ejs');
    var quick_output_path = path.resolve('.', basename + '.html');
    options = options || {};
    renderTemplate(quick_template_path, options, quick_output_path);
}

function renderLanding(file_name) {
    var landing = yamlFM.loadFront(file_name);
    console.log(landing);
    landing.slug = landing.title.split(' ').join('_');
    landing.content = namp(landing.__content).html;
    delete landing.__content;
    template_path = path.resolve('landing.ejs');
    output_path = path.resolve('.', landing.slug + '.html');
    renderTemplate(template_path, landing, output_path);
}

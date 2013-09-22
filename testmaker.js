var ejs = require('ejs'),
  fs = require('fs');

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
    renderTest(template_path, {}, output_path);
}

function renderTest(template_path, options, output_path) {
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

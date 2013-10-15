var ejs = require('ejs'),
  fs = require('fs'),
  yamlFM = require('yaml-front-matter'),
  namp = require('namp');

function quickRender(template, options, out_name) {
    var basename = path.basename(template, '.ejs');
    var template_path = path.resolve('.', basename + '.ejs');
    out_name = out_name || basename;
    var out_path = path.resolve('.', output + '.html');
    options = options || {};
    renderTemplate(template_path, options, out_path);
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

function renderLanding(file_name) {
    var landing = yamlFM.loadFront(file_name);
    landing.slug = getSlug(landing.title);
    landing.content = namp(landing.__content).html;
    delete landing.__content;
    template_path = path.resolve('landing.ejs');
    output_path = path.resolve('.', landing.slug + '.html');
    renderTemplate(template_path, landing, output_path);
}

function getSlug(title, modifier) {
    var modifier = modifier || '';
    var slug = title;
    if (modifier.length > 0)
         slug += ' ' + modifier;
    slug = slug.split(' ').join('_');
    return slug
}

function generateOptions(base_name) {
    var options = ['legs-and-glitterball',
                   'rosy-booty',
                   'turntable-speakers',
                   'vinyl-stack'];

    var landing = yamlFM.loadFront(base_name);
    landing.content = namp(landing.__content).html;
    delete landing.__content;

    options.forEach( function(photo) {
        landing.slug = getSlug(landing.title, photo);
        landing.hero_image = photo + '.jpg';
        template_path = path.resolve('landing.ejs');
        output_path = path.resolve('.', landing.slug + '.html');
        renderTemplate(template_path, landing, output_path);
    });
}

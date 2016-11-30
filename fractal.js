'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Cotidia UI');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('default.preview', '@preview');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));
fractal.web.set('builder.dest', path.join(__dirname, 'build'));

/*
 * Custom theme
 */
 const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme module

 // create a new instance with custom config options
 const sixteenTheme = mandelbrot({
     static: {
         mount: "theme"
     }
     // any other theme configuration values here
 });

 fractal.web.theme(sixteenTheme); // tell Fractal to use the configured theme by default

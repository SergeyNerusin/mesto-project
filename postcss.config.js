/* jshint esversion:6 */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
}; 
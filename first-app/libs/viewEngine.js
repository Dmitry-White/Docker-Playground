const { create } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

const hbs = create({
  extname: '.hbs',
  defaultLayout: 'masterLayout',
  // https://www.npmjs.com/package/@handlebars/allow-prototype-access
  // Need to add due to security change in Handlebars 4.6+
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

module.exports = hbs;


const express = require( 'express' );
const cors = require( 'cors' );

const app = express();

app.use( cors( { origin: [ /localhost/, /nandenjin\.com$/ ] } ) );
app.use( require( './contents.js' ) );

module.exports = app;

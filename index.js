
const express = require( 'express' );
const app = express();

const { Nuxt, Builder } = require( 'nuxt' );

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

const nuxtConf = require( './nuxt.config.js' )
nuxtConf.dev = !( process.env.NODE_ENV === 'production' );

const nuxt = new Nuxt( nuxtConf );

if ( nuxtConf.dev ) {

  const builder = new Builder( nuxt );
  builder.build();

}

app.use( nuxt.render );

const server = app.listen( port, host, () => {

  console.log( 'Listening ' + server.address().address + ':' + server.address().port );

} );

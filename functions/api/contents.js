
const admin = require( 'firebase-admin' );

admin.initializeApp();
admin.initializeApp( {
  projectId: 'nd-schedule',
}, 'schedule' );

const firebaseExt = admin.app( 'schedule' );
const firestoreExt = firebaseExt.firestore();
firestoreExt.settings( { timestampsInSnapshots: true } );

const express = require( 'express' );

const app = express();

app.use( ( req, res, next ) => {

  res.json = ( a, b, c, status = 200 ) => {

    res.status( status ).type( 'json' ).send( JSON.stringify( a, b, 2 ) );

  };

  next();

} );

app.get( '/contents/:kind/:id.json', ( req, res ) => {


  const kind = req.params.kind.charAt(0).toUpperCase() + req.params.kind.slice(1);
  const id = req.params.id;

  if( ![ 'Works', 'Posts', ].includes( kind ) ) {

    res.json( { error: 'bad_request' }, null, null, 400 );
    return;

  }

  firestoreExt.collection( kind ).doc( id )
  .get()
  .then( snapshot => {

    const data = snapshot.data();

    if( snapshot.exists && data.published ) {

      res.json( data );

    }else {

      res.json( { error: 'not_found' }, null, null, 404 );

    }

  } );

} );

module.exports = app;

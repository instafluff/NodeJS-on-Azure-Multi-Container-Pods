import fetch from "node-fetch";
import * as Web from "webwebweb";
import * as Clock from "comfyclock";

let jobs = [];
async function getLatestJobs() {
    jobs = await fetch( "https://jobs.github.com/positions.json" )
                .then( r => r.json() );
}
getLatestJobs();

Clock.Every[ "15 minutes" ] = ( date ) => {
    getLatestJobs();
}

Web.APIs[ "/search" ] = ( qs, body, opts ) => {
    if( qs.text ) {
        let terms = qs.text.split( "," );
        return jobs.filter( x => terms.every( term => x.description.match( new RegExp( term, "i" ) ) ) );
    }
    else {
        return jobs;
    }
};
Web.Run( 8081 );

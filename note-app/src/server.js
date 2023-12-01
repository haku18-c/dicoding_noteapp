const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const init = async () => {

             const core = {
                            host   : 'localhost',
                            port   : 5000,
                            routes : {
                                       cors : {
                                                origin : ['*'],
                                              }
                                     }
             }

             const server = Hapi.server(core);
             server.route(routes)
             await server.start();
             console.log(`server berjalan pada ${server.info.uri}`);
}

init();

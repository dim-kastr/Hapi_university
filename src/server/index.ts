import * as Hapi from '@hapi/hapi';
import * as Qs from 'qs';
import config from './config/config';
import { handleValidationError } from './utils';
import * as HapiBearer from 'hapi-auth-bearer-token';
import routes from './routes';
import { tokenValidate } from "./utils/auth";
import { dbInit } from './models';


const init = async () => {
    const server = await new Hapi.Server({
        port: config.server.port,
        host: config.server.host,
        query: {
            parser: (query) => Qs.parse(query),
        },
        routes: {
            validate: {
                options: {
                    abortEarly: false,
                },
                failAction: handleValidationError,
            },
            response: {
                failAction: 'log',
            },
        },
    });
    server.realm.modifiers.route.prefix = '/api';
    await server.register([
        HapiBearer,
    ]);

    server.auth.strategy('jwt-access', 'bearer-access-token', {
        validate: tokenValidate('access'),
    });

    server.auth.default('jwt-access');

    await dbInit();

    server.route(routes);

    try {
        await server.start();
        server.log('info', `Server running at: ${server.info.uri}`);
    } catch (err) {
        server.log('error', JSON.stringify(err));
    }

    return server;
};

export { init };
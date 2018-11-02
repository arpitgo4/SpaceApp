
const API_SERVER_IP = NODE_ENV === 'production' ? 
                        `${SPACE_API_SERVER}:${SPACE_API_SERVER_PORT}` : '127.0.0.1:8080';

// abstract api factory class
class ApiFactory {

    get(api, params) {
        let url = api.url;

        if(params) {
            Object.keys(params)
            .forEach(key => {
                const value = params[key];
                url = api.url.replace(`:${key}`, value);
            });
        }

        return Object.assign({}, api, { url: `${this.API_SERVER}${url}` });
    }

}


class UserApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/users`;

    API_TABLE = {
        GET_ALL_USERS: { url: `/`, type: 'GET' },
        GET_USER_BY_ID: { url: `/:userId`, type: 'GET' },
    }
}

class SpaceApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/space`;

    API_TABLE = {
        GET_ALL_SPACES: { url: `/`, type: 'GET' },
        GET_SPACE_BY_ID: { url: `/:spaceId`, type: 'GET' },
        GET_ALL_ENTRIES_BY_SPACE_ID: { url: `/:spaceId/entries`, type: 'GET' },
        GET_ENTRY_BY_ID_FOR_SPACE_BY_ID: { url: `/:spaceId/entries/:entryId`, type: 'GET' },
        GET_ALL_ASSETS_BY_SPACE_ID: { url: `/:spaceId/assets`, type: 'GET' },
        GET_ASSET_BY_ID_FOR_SPACE_BY_ID: { url: `/:spaceId/assets/:assetId`, type: 'GET' },
    }
}

class MiscApiFactory extends ApiFactory {
    API_SERVER = `http://${API_SERVER_IP}/misc`;

    API_TABLE = {
        GET_HEALTH_STATUS: { url: '/health', type: 'GET' },
    };
}



export const spaceApiFactory = new SpaceApiFactory();
export const userApiFactory = new UserApiFactory();
export const miscApiFactory = new MiscApiFactory();
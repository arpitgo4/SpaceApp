
import { miscApiFactory } from '../config/api-factory';

export const errorHandler = response => {
    if (!response.ok) {
        return response.json()
        .then(jsonErr => {
            const { message } = jsonErr;

            if (message === 'Failed to fetch') {
                // const { renderApiServerDown } = require('../index');
                // renderApiServerDown();
                return Promise.reject({ message: 'API Server Internal Error. Support Notified' });
            }

            return Promise.reject({ message });
        });
    }

    return response.json();
};


export const string_sorter = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};


export const getApiServerHealthStatus = () => {
    const api = miscApiFactory.get(miscApiFactory.API_TABLE.GET_HEALTH_STATUS);

    return fetch(api.url, { 
        method: api.type,
    })
    .then(response => {
        if (!response.ok)
            return Promise.reject();
        
        return Promise.resolve();
    });
};
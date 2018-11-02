
import fetchIntercept from 'fetch-intercept';

import { reduxStore } from '../layouts/App.Router';
import { errorActionCreators } from '../action-creators';


const { dispatch, getState } = reduxStore;

const unregister = fetchIntercept.register({
    request: function (url, config) {
        if (!config.headers) 
            config.headers = {};

        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occurred during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        return response;
    },

    responseError: function (error) {
        if (error.message = 'Failed to fetch')
            return Promise.reject({ message: 'API Server Internal Error. Support Notified' });

        return Promise.reject(error);
    }
});

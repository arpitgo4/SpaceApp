
import { userApiFactory } from '../config/api-factory';

import { showErrorNotification } from './error';
import * as utils from '../config/utils';


export const getUsers = () => {
    return dispatch => {
        const api = userApiFactory.get(userApiFactory.API_TABLE.GET_ALL_USERS);

        return fetch(api.url, { 
            method: api.type,
        })
        .then(utils.errorHandler)
        .then(data => {
            const { items } = data;

            dispatch({
                type: `SAVE_USERS`,
                payload: { 
                    users: items
                }
            });
        });
    };
};

export const getUserById = userId => {
    return dispatch => {
        const api = userApiFactory.get(userApiFactory.API_TABLE.GET_USER_BY_ID, { userId });

        return fetch(api.url, { 
            method: api.type
        })
        .then(utils.errorHandler)
        .then(data => {
            const user = data;

            dispatch({
                type: `SAVE_USER`,
                payload: { 
                    user
                }
            });
        });
    };
};
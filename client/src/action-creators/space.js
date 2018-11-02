

import { spaceApiFactory } from '../config/api-factory';

import { showErrorNotification } from './error';
import * as utils from '../config/utils';


export const getSpaces = () => {
    return dispatch => {
        const api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_ALL_SPACES);

        return fetch(api.url, { 
            method: api.type,
        })
        .then(utils.errorHandler)
        .then(data => {
            const { items } = data;

            dispatch({
                type: `SAVE_SPACES`,
                payload: { 
                    spaces: items
                }
            });
        });
    };
};

export const getSpaceById = spaceId => {
    return dispatch => {
        const api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_SPACE_BY_ID, { spaceId });

        return fetch(api.url, { 
            method: api.type,
        })
        .then(utils.errorHandler)
        .then(data => {
            const space = data;

            dispatch({
                type: `SAVE_SPACE`,
                payload: { 
                    space
                }
            });
        });
    };
};

export const getAssetsAndEntriesBySpaceId = spaceId => {
    return dispatch => {
        const asset_api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_ALL_ASSETS_BY_SPACE_ID, { spaceId });
        const entry_api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_ALL_ENTRIES_BY_SPACE_ID, { spaceId });

        const asset_promise = fetch(asset_api.url, { method: asset_api.type })
        .then(utils.errorHandler);

        const entry_promise = fetch(entry_api.url, { method: entry_api.type })
        .then(utils.errorHandler);

        return Promise.all([ asset_promise, entry_promise ])
        .then(data_arr => {
            const [ assets_data, entries_data ] = data_arr;
            const { items: assets } = assets_data;
            const { items: entries } = entries_data;

            dispatch({
                type: 'SAVE_ASSETS_AND_ENTRIES',
                payload: {
                    spaceId,
                    assets,
                    entries,
                }
            });
        });
    };
};

/**
 * action creators not being used.
 */
// export const getAssetBySpaceId = (spaceId, assetId) => {
//     return dispatch => {
//         const api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_ASSET_BY_ID_FOR_SPACE_BY_ID, { spaceId, assetId });

//         return fetch(api.url, { 
//             method: api.type,
//         })
//         .then(utils.errorHandler)
//         .then(data => {
//             const asset = data;

//             dispatch({
//                 type: `SAVE_ASSET_FOR_SPACE`,
//                 payload: { 
//                     spaceId, 
//                     asset,
//                 }
//             });
//         })
//         .catch(err => dispatch(showErrorNotification(err.message)));
//     };
// };

// export const getEntryBySpaceId = (spaceId, entryId) => {
//     return dispatch => {
//         const api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_ENTRY_BY_ID_FOR_SPACE_BY_ID, { spaceId, entryId });

//         return fetch(api.url, { 
//             method: api.type,
//         })
//         .then(utils.errorHandler)
//         .then(data => {
//             const entry = data;

//             dispatch({
//                 type: `SAVE_ENTRY_FOR_SPACE`,
//                 payload: { 
//                     spaceId, 
//                     entry,
//                 }
//             });
//         })
//         .catch(err => dispatch(showErrorNotification(err.message)));
//     };
// };

// webpack defined globals
global.NODE_ENV = 'development';
global.SPACE_API_SERVER = '127.0.0.1';
global.SPACE_API_SERVER_PORT = '8080';

const actions = require('../../action-creators/space');
const { spaceApiFactory, miscApiFactory, } = require('../../config/api-factory');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('space action creators', () => {

    beforeEach(() => {
        const api = miscApiFactory.get(miscApiFactory.API_TABLE.GET_HEALTH_STATUS);

        fetchMock
        .getOnce(api.url, 200, { body: {} });
    });

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should create SAVE_SPACES when fetching spaces is done', () => {
        const store = mockStore({ spaces: [] });
        const api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_ALL_SPACES);

        const test_spaces = [
            { name: 'space1' },
            { name: 'space2' },
        ];

        const expected_actions = [
            { type: 'SAVE_SPACES', payload: { spaces: test_spaces } }
        ];

        fetchMock
        .getOnce(api.url, { body: { items: test_spaces } });

        return store.dispatch(actions.getSpaces())
        .then(() => {
            expect(store.getActions())
            .toEqual(expected_actions);
        });
    });

    it('should create SAVE_SPACE when fetching a space by id is done', () => {
        const store = mockStore({ spaces: [] });

        const test_space_id = 'test_space_id';

        const api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_SPACE_BY_ID, { spaceId: test_space_id });

        const test_space = { name: 'space1' };

        fetchMock
        .getOnce(api.url, { body: test_space });

        const expected_actions = [
            { type: 'SAVE_SPACE', payload: { space: test_space } }
        ];

        return store.dispatch(actions.getSpaceById(test_space_id))
        .then(() => {
            expect(store.getActions()).toEqual(expected_actions);
        });
    });

    it('should create SAVE_ASSETS_AND_ENTRIES when fetching assets and entries for space by id is done', () => {
        const store = mockStore({ spaces: [] });

        const test_space_id = 'test_space_id';
        const test_assets = [{ name: 'test_asset' }];
        const test_entries = [{ name: 'test_entry'}];

        const asset_api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_ALL_ASSETS_BY_SPACE_ID, { spaceId: test_space_id });
        const entry_api = spaceApiFactory.get(spaceApiFactory.API_TABLE.GET_ALL_ENTRIES_BY_SPACE_ID, { spaceId: test_space_id });

        const test_space = { name: 'space1' };

        fetchMock
        .getOnce(asset_api.url, { body: { items: test_assets } });

        fetchMock
        .getOnce(entry_api.url, { body: { items: test_entries } });

        const expected_actions = [
            { 
                type: 'SAVE_ASSETS_AND_ENTRIES', 
                payload: {
                    spaceId: test_space_id,
                    assets: test_assets,
                    entries: test_entries,
                } 
            }
        ];

        return store.dispatch(actions.getAssetsAndEntriesBySpaceId(test_space_id))
        .then(() => {
            expect(store.getActions()).toEqual(expected_actions);
        });
    });

});
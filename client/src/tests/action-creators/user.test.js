
// webpack defined globals
global.NODE_ENV = 'development';
global.SPACE_API_SERVER = '127.0.0.1';
global.SPACE_API_SERVER_PORT = '8080';

const actions = require('../../action-creators/user');
const { userApiFactory } = require('../../config/api-factory');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user action creators', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should create SAVE_USERS when fetching users is done', () => {
        const test_users = [
            { name: 'user1' },
            { name: 'user2' },
        ];

        const api = userApiFactory.get(userApiFactory.API_TABLE.GET_ALL_USERS);

        fetchMock
        .getOnce(api.url, { body: { items: test_users } });

        const store = mockStore({ users: [] });

        const expected_actions = [
            { type: 'SAVE_USERS', payload: { users: test_users } }
        ];

        return store.dispatch(actions.getUsers())
        .then(() => {
            expect(store.getActions()).toEqual(expected_actions);
        });
    });

    it('should create SAVE_USER when fetching a user by id is done', () => {
        const test_user_id = 'test_id';
        const test_user = { name: 'user1' };

        const api = userApiFactory.get(userApiFactory.API_TABLE.GET_USER_BY_ID, { userId: test_user_id });

        fetchMock
        .getOnce(api.url, { body: test_user });

        const store = mockStore({ users: [] });

        const expected_actions = [
            { type: 'SAVE_USER', payload:{ user: test_user } }
        ]; 

        return store.dispatch(actions.getUserById(test_user_id))
        .then(() => {
            expect(store.getActions()).toEqual(expected_actions);
        });
    });

});
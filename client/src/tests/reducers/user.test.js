
const { userReducer } = require('../../reducers/user'); 


describe('user reducer', () => {

    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual([]);
    });

    it('should save users in state', () => {
        const users = [
            { name: 'user1' },
            { name: 'user2' },
        ];

        const action = {
            type: 'SAVE_USERS',
            payload: { users }
        };

        expect(userReducer([], action)).toEqual(users);
    });

    it('should save user in state', () => {
        const user = { name: 'user1' };

        const action = {
            type: 'SAVE_USER',
            payload: { user }
        };

        expect(userReducer([], action)).toEqual([ user ]);
    });

});
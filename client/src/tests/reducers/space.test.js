
const { spaceReducer } = require('../../reducers/space'); 


describe('space reducer', () => {

    it('should return the initial state', () => {
        expect(spaceReducer(undefined, {})).toEqual([]);
    });

    it('should save spaces', () => {
        const test_spaces = [
            { name: 'test_space_1' }, 
            { name: 'test_space_2' }, 
        ];

        const action = {
            type: 'SAVE_SPACES',
            payload: { spaces: test_spaces }
        };

        expect(spaceReducer([], action)).toEqual(test_spaces);
    });

    it('should save space', () => {
        const test_space = { name: 'test_space_1' }; 

        const action = {
            type: 'SAVE_SPACE',
            payload: { space: test_space }
        };

        expect(spaceReducer([], action)).toEqual([ test_space ]);
    });

    it('should save assets and entries for space', () => {
        const spaceId = 'test_space_id';
        const space = { sys: { id: 'test_space_id' } };
        const assets = [ { name: 'test_asset' } ];
        const entries = [ { name: 'test_entry' } ];

        const action = {
            type: 'SAVE_ASSETS_AND_ENTRIES',
            payload: { spaceId, assets, entries }
        };

        const expected_result = Object.assign({}, space, { assets, entries });

        expect(spaceReducer([ space ], action)).toEqual([ expected_result ]);
    });

    it('should save asset for a space', () => {
        const spaceId = 'test_space_id';
        const space = { sys: { id: 'test_space_id' } };
        const asset = { name: 'test_asset' };

        const action = {
            type: 'SAVE_ASSET_FOR_SPACE',
            payload: { spaceId, asset }
        };

        const expected_result = Object.assign({}, space, { assets: [ asset ] });

        expect(spaceReducer([ space ], action)).toEqual([ expected_result ]);
    });

    it('should save entry for a space', () => {
        const spaceId = 'test_space_id';
        const space = { sys: { id: 'test_space_id' } };
        const entry = { name: 'test_entry' };

        const action = {
            type: 'SAVE_ENTRY_FOR_SPACE',
            payload: { spaceId, entry }
        };

        const expected_result = Object.assign({}, space, { entries: [ entry ] });

        expect(spaceReducer([ space ], action)).toEqual([ expected_result ]);
    });

});

const { 
    showErrorNotification,
} = require('../../action-creators/error');


describe('error action creator', () => {

    it('should return an error action with message', () => {
        const message = 'something went wrong!';

        const action = showErrorNotification(message);

        const expected_action = { 
            type: 'RNS_SHOW_NOTIFICATION',
            title: 'Error',
            message: 'something went wrong!',
            position: 'tr',
            autoDismiss: 0,
            level: 'error' 
        };

        expect(action).toHaveProperty('type', expected_action.type);
        expect(action).toHaveProperty('title', expected_action.title);
        expect(action).toHaveProperty('position', expected_action.position);
        expect(action).toHaveProperty('message', expected_action.message);
        expect(action).toHaveProperty('level', expected_action.level);
        expect(action).toHaveProperty('autoDismiss', expected_action.autoDismiss);
    });

});
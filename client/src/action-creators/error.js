

import { error, success } from 'react-notification-system-redux';

export const showErrorNotification = message => {
    const notification = {
        // to avoid duplicate error messages from multiple async calls
        uid: require('uuid').v4(),
        title: 'Error',
        message: message,
        position: 'tr',
        autoDismiss: 0
    };

    return error(notification);
};
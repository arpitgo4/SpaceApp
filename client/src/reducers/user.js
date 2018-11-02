
export const userReducer = (state = [], action) => {

    switch (action.type) {

        case 'SAVE_USERS': {
            return [
                ...action.payload.users
            ];
        }

        case 'SAVE_USER': {
            return [
                ...state,
                action.payload.user,
            ];
        }

        default: return state;
    }
};
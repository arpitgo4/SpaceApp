

export const spaceReducer = (state = [], action) => {

    switch (action.type) {

        case 'SAVE_SPACES': {
            return [
                ...action.payload.spaces,
            ];
        }

        case 'SAVE_SPACE': {
            return [
                ...state,
                action.payload.space,
            ];
        }

        case 'SAVE_ASSETS_AND_ENTRIES': {
            const { spaceId, assets, entries } = action.payload;
            const space = state.find(space => space.sys.id === spaceId);

            const updated_space = Object.assign({}, space, { assets, entries });

            return [
                ...state.filter(space => space.sys.id !== spaceId),
                updated_space,
            ];
        }

        case 'SAVE_ASSET_FOR_SPACE': {
            const { asset, spaceId } = action.payload;
            const space = state.find(space => space.sys.id === spaceId);

            space.assets = [
                ...(space.assets || []),
                asset,
            ];

            return [
                ...state.filter(space => space.sys.id !== spaceId),
                space,
            ];
        }

        case 'SAVE_ENTRY_FOR_SPACE': {
            const { entry, spaceId } = action.payload;
            const space = state.find(space => space.sys.id === spaceId);

            space.entries = [
                ...(space.entries || []),
                entry,
            ];

            return [
                ...state.filter(space => space.sys.id !== spaceId),
                space,
            ];
        }

        default: return state;
    }
};
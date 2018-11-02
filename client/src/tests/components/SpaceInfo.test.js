

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { SpaceInfo } from '../../components/SpaceInfo/SpaceInfo';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        space: {
            fields: {
                title: 'Space 1',
                description: 'Description 1',
            },
            sys: {
                id: 'space_1',
                createdBy: 'user_1',
            }
        },
        users: [
            {
                fields: {
                    name: 'user 1'
                },
                sys: {
                    id: 'user_1',
                },
            },
            {
                fields: {
                    name: 'user 2'
                },
                sys: {
                    id: 'user_2'
                }
            }
        ],
        selected_space_id: 'space_1',
    };

    const enzyme_wrapper = mount(<SpaceInfo {...props} />);

    return {
        props,
        enzyme_wrapper,
    };
}

describe('spaceinfo component', () => {
    it('should render correctly', () => {
        const { enzyme_wrapper, props: test_props } = setup();

        expect(enzyme_wrapper).not.toBe(null);
    });

    it('should render title and created By correctly', () => {
        const { enzyme_wrapper, props: test_props } = setup();
        const { selected_space_id, space, users } = test_props;

        const h1_text = enzyme_wrapper.find('h1').text();
        const h5_text = enzyme_wrapper.find('h5').text();

        const test_user = users.find(u => u.sys.id === space.sys.createdBy);

        expect(h1_text).toEqual(space.fields.title);
        expect(h5_text).toEqual(`created by ${test_user.fields.name}`);
    });

    it('should render description correctly', () => {
        const { enzyme_wrapper, props: test_props } = setup();
        const { selected_space_id, space, users } = test_props;

        const textarea_text = enzyme_wrapper.find('TextArea').text();

        expect(textarea_text).toEqual(space.fields.description);
    });
});
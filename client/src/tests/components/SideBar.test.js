
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { SideBar } from '../../components/SideBar/SideBar';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        spaces: [
            {
                fields: {
                    title: 'Space 1',
                },
                sys: {
                    id: 'space_1',
                }
            },
            {
                fields: {
                    title: 'Space 2',
                },
                sys: {
                    id: 'space_2',
                }
            },
        ], 
        selected_space_id: 'space_1',
    };

    const enzyme_wrapper = mount(<SideBar {...props} />);

    return {
        props,
        enzyme_wrapper,
    };
}

describe('sidebar component', () => {
    it('should render correctly', () => {
        const { enzyme_wrapper, props: test_props } = setup();

        expect(enzyme_wrapper).not.toBe(null);
    });

    it('should render Links correctly', () => {
        const { enzyme_wrapper, props: test_props } = setup();

        const links = enzyme_wrapper.find('Link');
        let idx = 0;
        links.forEach(link => {
            const { to } = link.props();
            expect(to).toEqual(`/space/${test_props.spaces[idx].sys.id}`);
            idx++;
        });
    });

    it('should render span text correctly', () => {
        const { enzyme_wrapper, props: test_props } = setup();

        const spans = enzyme_wrapper.find('span');
        let idx = 0;
        spans.forEach(span => {
            const text = span.text();
            expect(text).toEqual(test_props.spaces[idx].fields.title);
            idx++;
        });
    });
});


import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import DataTable from '../../components/containers/DataTable';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        columns: [
            { title: 'column_1', dataIndex: 'col_1' },
            { title: 'column_2', dataIndex: 'col_2' },
        ],
        rows: [
            { col_1: 'data_1' },
            { col_2: 'data_2' },
        ]
    };

    const enzyme_wrapper = mount(<DataTable {...props} />);

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

    it('should render props correctly', () => {
        const { enzyme_wrapper, props: test_props } = setup();
        const { rows, columns } = test_props;

        const table_props = enzyme_wrapper.props();
        expect(table_props).toEqual(test_props);
    });
});
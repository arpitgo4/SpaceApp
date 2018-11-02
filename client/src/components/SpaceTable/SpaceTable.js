
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, } from 'react-router';

import { Tabs } from 'antd';

import DataTable from '../containers/DataTable';


import {
    ASSET_COLUMNS,
    ENTRIES_COLUMNS,
} from '../../config/data-table-columns.js';


const { TabPane } = Tabs;

export class SpaceTable extends Component {

    render() {
        const { space, users, } = this.props;

        if (!space)
            return null;

        const { assets, entries, } = space;

        return (
            <Tabs
                type="card">

                <TabPane tab="Assets" key="assets">
                    <DataTable
                        rows={assets}
                        loading={false}
                        columns={ASSET_COLUMNS.call(this, { users })} />
                </TabPane>
                <TabPane tab="Entries" key="entries">
                    <DataTable 
                        rows={entries}
                        loading={false}
                        columns={ENTRIES_COLUMNS.call(this, { users })} />
                </TabPane>

            </Tabs>
        );
    }
}


const mapStateToProps = ({ spaces, users, }, ownProps) => {
    const { spaceId: selected_space_id } = ownProps.params;
    const space = spaces && spaces.find(space => space.sys.id === selected_space_id);

    return {
        selected_space_id,
        space,
        users,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        
    }, dispatch);
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpaceTable));

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect, browserHistory, } from 'react-router';

import { Layout } from 'antd';

import SideBar from '../components/SideBar/SideBar';
import SpaceInfo from '../components/SpaceInfo/SpaceInfo';
import SpaceTable from '../components/SpaceTable/SpaceTable';

import { 
    userActionCreators,
    spaceActionCreators,
    errorActionCreators,
} from '../action-creators';

const { Content, Sider } = Layout;

class SpaceLayout extends React.Component {

	render(){
		return (
            <Layout>
                <Sider>
                    <SideBar />
                </Sider>
                <Content style={{ padding: 24, background: '#fff' }}>
                    <SpaceInfo />

                    <div style={{ marginTop: 80 }}> 
                        <SpaceTable />
                    </div>

                </Content>
            </Layout>
		);
	}

    componentDidUpdate() {
        this._fetchSpace.call(this);
    }

    componentDidMount() {
        this._fetchSpace.call(this);
    }

    _fetchSpace() {
        const { getSpaces, getUsers, getAssetsAndEntriesBySpaceId, getSpaceById, showErrorNotification, } = this.props;
        const { spaces, selected_space_id, } = this.props; 

        const space = spaces.find(space => space.sys.id === selected_space_id);
        if (!space) {
            // if all spaces are fetched, `selected_space_id` is still not found
            if (spaces.length !== 0) {
                const [ first_space ] = spaces;
                browserHistory.replace(`/space/${first_space.sys.id}`);

                // if invalid spaceId, will show error notification
                // 'undefined' <- as spaceId is reserved for redirection
                if (selected_space_id !== 'undefined')
                    showErrorNotification(`Space Id: ${selected_space_id} is invalid`);
            }
            else {
                Promise.all([
                    getSpaces(),
                    getUsers(),
                ])
                .catch(err => showErrorNotification(err.message));
            }
        } 
        else {
            if (!space.assets && !space.entries) {
                getAssetsAndEntriesBySpaceId(selected_space_id)
                .catch(err => {
                    const { renderApiServerDown } = require('../index');
                    // renderApiServerDown();
                    showErrorNotification(err.message);
                });
            }
        }
    }
}

const mapStateToProps = ({ spaces, users, }, ownProps) => {
    const { spaceId: selected_space_id } = ownProps.params;
    
    return {
        selected_space_id,
        spaces,
        users,
    };
};

const mapDispatchToProps = dispatch => {
    const { getUsers, } = userActionCreators;
    const { getSpaces, getAssetsAndEntriesBySpaceId, getSpaceById, } = spaceActionCreators;
    const { showErrorNotification, } = errorActionCreators;

    return bindActionCreators({ 
        getUsers,
        getSpaces,
        getAssetsAndEntriesBySpaceId,
        getSpaceById,
        showErrorNotification,
    }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpaceLayout));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router';

import { Menu, } from 'antd';


export class SideBar extends Component {

    render() {

        const { spaces, selected_space_id } = this.props;

        return (
            <Menu
                style={{ width: 200, height: '100vh' }}
                defaultSelectedKeys={[ selected_space_id || '0' ]}
                mode="inline"
                theme="light"
                inlineCollapsed={true}>
            { 
                spaces.map(space => (
                    <Menu.Item key={space.sys.id}>
                        <Link to={`/space/${space.sys.id}`}>
                            <span style={{ color: 'black' }}>{space.fields.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }
            </Menu>
        );
    }

};

const mapStateToProps = ({ spaces, misc }, ownProps) => {
    const { spaceId: selected_space_id } = ownProps.params;

    return {
        spaces,
        selected_space_id,
    };
};

const mapDispatchToProps = dispatch => {

    return bindActionCreators({
    }, dispatch);
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, } from 'react-router';

import { Input, } from 'antd';


const { TextArea } = Input;

export class SpaceInfo extends Component {

    render() {
        const { selected_space_id, space, users, } = this.props;

        if (!space)
            return null;

        const userId = space.sys.createdBy;
        const user = users.find(user => user.sys.id === userId);

        if (!user)
            return null;

        return (
            <div>
                <div>
                    <h1 style={{ display: 'inline-block' }}>{space.fields.title}</h1>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <h5 style={{ display: 'inline-block' }}>created by {user.fields.name}</h5>
                </div>

                <TextArea 
                    value={space.fields.description}
                    rows={6} 
                    style={{ width: 500, marginLeft: 20 }}>
                </TextArea>
            </div>
        ) 
    }
}

const mapStateToProps = ({ spaces, users }, ownProps) => {
    const { spaceId: selected_space_id } = ownProps.params;
    const space = spaces.find(space => space.sys.id === selected_space_id);

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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpaceInfo));
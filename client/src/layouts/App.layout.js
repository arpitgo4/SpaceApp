
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter, browserHistory } from 'react-router';

import Notification from '../components/containers/Notifications';

class AppLayout extends Component {
	render(){
		const { spaceId } = this.props;

		if (!spaceId) {
			browserHistory.replace('/');
			return null;
		}

		return (
		    <div id="app-container" >
				<div>   
					<div>
						<Notification />
						{this.props.children}
					</div>           
				</div>
            </div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { spaceId } = ownProps.params;

	return {
		spaceId,
	};
};

export default withRouter(connect(mapStateToProps)(AppLayout));
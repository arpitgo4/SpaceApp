
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

import styles from './App.style.css';

import { getTickers, setSelectedTicker, getHotWallets } from '../../action-creators/index.action-creator';
import { deleteJWToken } from '../../action-creators/auth';

import { isAdminAuthorized } from '../../config/utils';
import { ADMIN_AUTHORITIES } from '../../config/constants';
import { removeTokenFromLS, removeUserFromLS } from '../../config/local-storage';
import { sideBarLinks as links } from '../../config/constants';

import { Layout, Menu, Icon, Select } from 'antd';

const { Header, Sider, Content } = Layout;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;


@CSSModules(styles)
class App extends Component {

    state = {
        collapsed: true,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    componentWillMount() {
        const { token } = this.props;

        console.log('user token', token);
        if (!token)
            browserHistory.replace('/');
    }

    render() {
        const { tickers, selectedTicker, children, logged_in_user } = this.props;
        const authorities = (logged_in_user && logged_in_user.authorities) || [];

        return (

            <Layout>
                <Sider
                    onCollapse={this.onCollapse.bind(this)}
                    collapsible
                    collapsed={this.state.collapsed}>
                    <div styleName="logo" style={{ marginBottom: 50 }} />
                    <Menu
                        mode="vertical-left"
                        theme="dark"
                        style={{ height: '100vh' }}
                        inlineCollapsed={this.state.collapsed}>
                        {
                            !logged_in_user ? null :
                                (links.map(link => {
                                
                                    if (authorities.some(a => a === link.authority)) {
                                        if (link.sub_menus) {
                                            return (
                                                this._renderSubMenu.call(this, link.name, link.icon, 
                                                    link.sub_menus.map(subMenu => 
                                                        this._renderMenu.call(this, subMenu))
                                                )
                                            )
                                        } else {
                                            return this._renderMenu.call(this, link)
                                        }
                                    }
                                    else return null 
                                })
                            )
                        }
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <div style={{ marginLeft: 20 }} className="pull-left" >
                            <img style={{ width: 200, height: 50, backgroundColor: 'white' }} src="http://stage.tradx.io/assets/images/logo-dark.png"></img>
                        </div>
                        <div style={{ marginRight: 20 }}
                            styleName="logout-wrapper"
                            onClick={this.logoutHandler.bind(this)}
                            className="pull-right" >
                            <Icon type="logout" />
                            <span>
                                {'  '} Logout
                            </span>
                        </div>
                        <Select defaultValue={selectedTicker || 'BTC-BITCOIN'}
                            style={{ margin: '15px 25px', width: 180 }} className="pull-right"
                            onChange={this.changeSelectedTickerHandler.bind(this)}>
                            {tickers.map(ticker => (
                                <Option value={ticker}>{ticker.toUpperCase()}</Option>
                            ))}
                        </Select>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );
    }

    _renderMenu(link) {
        return (
            <Menu.Item key={link.name} style={{ margin: '30px 0' }}>
                <Link key={`link-${link.to}`} to={link.to}>
                    { link.icon ? <Icon type={link.icon} /> : null }
                    <span style={{ fontSize: '1.4rem', color: 'white' }}>{link.name}</span>
                </Link>
            </Menu.Item>
        );
    }

    _renderSubMenu(title, icon, menus) {
        return (
            <SubMenu key={`sub-${title}`} title={(
                <span><Icon type={icon} /><span>{title}</span></span>
            )}>
                {menus}
            </SubMenu>
        );
    }

    logoutHandler() {
        const { deleteJWToken } = this.props;

        deleteJWToken();
        removeTokenFromLS();
        removeUserFromLS();
        browserHistory.replace('/');
    }

    changeSelectedTickerHandler(ticker) {
        const { setSelectedTicker, getHotWallets } = this.props;

        setSelectedTicker(ticker);
        getHotWallets();
    }

    componentDidMount() {
        const { logged_in_user, selectedTicker } = this.props;
        const { getTickers, getHotWallets } = this.props;

        getTickers()
            .then(() => {
                if (isAdminAuthorized(logged_in_user, ADMIN_AUTHORITIES.HM))
                    return getHotWallets();
                else return Promise.resolve();
            });
    }

};

const mapStateToProps = (state, ownProps) => {
    const { tickers, misc } = state.hot_wallets;
    const { logged_in_user, token } = state.auth;

    return {
        tickers,
        selectedTicker: misc.selected_ticker,
        logged_in_user,
        token
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTickers,
        getHotWallets,
        setSelectedTicker,
        deleteJWToken
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
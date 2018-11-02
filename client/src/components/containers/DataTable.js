
import React, { Component } from 'react';
import { Table, Button, Select, Icon, Input } from 'antd';

const { Option } = Select;


export default class DataTable extends Component {

    state = {
        filter_key: '',
        filter_value: '',
        filtered_data: [],
    };

    render() {
        const { headerJSX, loading } = this.props;
        const { columns, rows, rowSelection } = this.props;
        const { table_name, scrollX, scrollY, search_visible, search_keys } = this.props;

        return (
            <div>
                {/* <p className="h1"><u>{table_name}</u></p> */}

                <div className="row">
                    <div className="col-md-6">

                        {/* Search Field */}
                        {
                            search_visible ? (
                                <div className="pull-left" style={styles.search}>
                                    <Select 
                                        style={{ width: 150, marginRight: 5 }}
                                        defaultValue="select_filter"
                                        onChange={this._searchKeyChangeHandler.bind(this)}>
                                        <Option disabled value="select_filter">Select Filter</Option>
                                        { search_keys.map(k => ( <Option value={k.key}>{k.text}</Option> )) }
                                    </Select>
                                    <Input
                                        style={{ width: 400, margin: '0 5px' }} 
                                        ref="search_input"
                                        placeholder="Enter Search Value"
                                        onChange={this._filterValueChangeHandler.bind(this)}></Input>
                                    {/* <Button type="primary" onClick={this._search.bind(this)}>Search</Button>   */}
                                </div>
                            ) : null
                        }

                    </div>

                    
                    {
                       headerJSX ? headerJSX : null    
                    }
                        
            </div>


                {/* Data Table */}
                <div className="row">
                    <div className="col-md-12">
                            <Table style={styles.table}
                                rowSelection={rowSelection} 
                                columns={columns} 
                                dataSource={this._filterData.call(this)}
                                bordered
                                pagination={{ pageSize: 5 }}
                                align="center"
                                loading={loading || false}
                                scroll={
                                    { x: scrollX, y: scrollY }
                                }
                                // title={() => table_name}
                            />
                    </div>
                </div>

            </div>
        );
    }

    _filterValueChangeHandler(e) {
        this.setState({ filter_value: e.target.value });
    }

    _searchKeyChangeHandler(key) {
        this.setState({ filter_key: key });
    }

    _search() {
        this.setState({ filtered_data: this._filterData.call(this) });
    }

    _filterData() {
        const { rows } = this.props;
        const { filter_key, filter_value } = this.state;

        if (filter_key && filter_value) {
            return rows.filter(r => {
                if (!r[filter_key])
                    return false;

                return r[filter_key] === filter_value;
            });
        } else return rows;
    }
    
}

const styles={
    table: {
        margin: '10px 0'
    }
};
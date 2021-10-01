import React, { Component } from 'react';
import {BootstrapTable,
    TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'


class Table1 extends Component {
    render() {
        return (
            <div>
                <BootstrapTable data={this.props.data}>
                    <TableHeaderColumn isKey dataField='id'>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>
                        Title
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='description'>
                        Description
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Table1;
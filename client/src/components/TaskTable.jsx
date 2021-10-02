import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    bgColor: 'gold'
};

const columns = [{
    dataField: 'title',
    text: 'Title',
    headerStyle: { width: '20%'}
}, {
    dataField: 'description',
    text: 'Description'
}, {
    dataField: 'createdAt',
    text: 'Created At'
}];

class TaskTable extends Component {
    render() {
        if (!this.props.data) {
            return (<div>
                No tasks
            </div>)
        }
        return (
            <div>
                <BootstrapTable bootstrap4 noDataIndication="There is no data" keyField="title" data={ this.props.data } columns={ columns } hover selectRow={selectRowProp}>
                </BootstrapTable>
            </div>
        );
    }
}

export default TaskTable;
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Link} from "react-router-dom";


export default class TaskTable extends Component {

    render() {
        function dateFormatter(cell, row) {
            let date = new Date(Date.parse(cell)).toLocaleDateString("nl",{year:"numeric",month:"2-digit", day:"2-digit"})
            return (
                <span>
                    { date }
                </span>
            );
        }
        function titleFormatter(cell, row) {
            return (
                <span>
                    <Link to={`/task/${row["id"]}`}> {cell}</Link>
                </span>
            )
        }

        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            bgColor: 'gold',
        };

        const columns = [{
            dataField: 'title',
            text: 'Title',
            style: { whiteSpace: 'nowrap',textOverflow: 'ellipsis', overflow: 'hidden'},
            headerStyle: { width: '20%'},
            formatter: titleFormatter,
        }, {
            dataField: 'description',
            text: 'Description',
            style: { whiteSpace: 'nowrap',textOverflow: 'ellipsis', overflow: 'hidden'},
        }, {
            dataField: 'createdAt',
            text: 'Created At',
            formatter: dateFormatter,
            headerStyle: { width: '10%'}
        }];

        if (!this.props.data) {
            return (<div>
                No tasks
            </div>)
        }
        return (
            <div>
                <BootstrapTable bootstrap4 noDataIndication="There is no data" keyField="id" data={ this.props.data } columns={ columns } hover selectRow={selectRowProp} >
                </BootstrapTable>
            </div>
        );
    }
}
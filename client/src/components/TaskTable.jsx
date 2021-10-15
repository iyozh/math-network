import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


class TaskTable extends Component {

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
        const { t } = this.props
        const columns = [{
            dataField: 'title',
            text: t('taskTable.title'),
            style: { whiteSpace: 'nowrap',textOverflow: 'ellipsis', overflow: 'hidden'},
            headerStyle: { width: '20%'},
            formatter: titleFormatter,
            filter: textFilter({
                placeholder: t('taskTable.title'),
            })
        }, {
            dataField: 'description',
            text: t('taskTable.description'),
            style: { whiteSpace: 'nowrap',textOverflow: 'ellipsis', overflow: 'hidden'},
            filter: textFilter({
                placeholder: t('taskTable.description'),
            })
        }, {
            dataField: 'createdAt',
            text: t('taskTable.createdAt'),
            formatter: dateFormatter,
            headerStyle: { width: '15%'},
            sort: true,
            filter: dateFilter()
        }];

        if (!this.props.data) {
            return (<div>
                No tasks
            </div>)
        }
        return (
            <div>
                <BootstrapTable bootstrap4 noDataIndication="There is no data" keyField="id" data={ this.props.data } columns={ columns } hover selectRow={selectRowProp} filter={ filterFactory() } >
                </BootstrapTable>
            </div>
        );
    }
}
export default withTranslation()(TaskTable);
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator'
import {Button} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";


class TaskTable extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: [] };
    }

    handleBtnClick = (event) => {
      if (this.state.selected) {
          fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/deleteSelectedTasks`, {
              method: "DELETE",
              credentials: "include",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Credentials": true
              },
              body:
                  JSON.stringify({
                      "taskIds": this.state.selected
                  })
          }).then(response => {
              if (response.status === 200)
                  window.location.reload();
          });
          event.preventDefault();
      }
    }

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row.id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row.id)
            }));
        }
    }

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: []
            }));
        }
    }

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
        function ratingFormatter(cell, row) {
            return (
                <span>
                     <ReactStars
                         value={row.TasksRatings?.length ? (row.TasksRatings.length > 1 ?
                             (row.TasksRatings
                                     .reduce((sum,nextMark) => sum + nextMark?.rating, 0) /
                                 row.TasksRatings.length) : row.TasksRatings[0].rating) : 0 }
                         count={5}
                         edit={false}
                         size={18}
                         activeColor="#ffd700"
                     />
                </span>
            )
        }

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            bgColor: 'gold',
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
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
        },{
            dataField: 'rating',
            text: t('taskTable.rating'),
            formatter: ratingFormatter,
            headerStyle: { verticalAlign: 'top'}
        },{
            dataField: 'solution',
            text: t('taskTable.solution'),
            headerStyle: { width: '15%'},
            style: { whiteSpace: 'nowrap',textOverflow: 'ellipsis', overflow: 'hidden'},
            filter: textFilter({
                placeholder: t('taskTable.solution'),
            })
        },{
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
                <Button onClick={this.handleBtnClick} variant="outline-danger">{t('taskTable.deleteSelected')}</Button>
                <BootstrapTable bootstrap4 pagination={ paginationFactory() } noDataIndication={t('taskTable.noTasks')} keyField="id" data={ this.props.data } columns={ columns } hover selectRow={selectRow} filter={ filterFactory() } >
                </BootstrapTable>
            </div>
        );
    }
}
export default withTranslation()(TaskTable);
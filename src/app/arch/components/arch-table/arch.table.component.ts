import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

export interface RowAction {
  text: string,
  action: any
}
export interface tableConfiguration {
  allowDelete?: boolean,
  allowEdit?: boolean,
  allowAdd?: boolean,
  rowActions?: Array<RowAction>
};

export interface tableColumns {
  key: string,
  text: string,
}


@Component({
  selector: 'arch-table',
  templateUrl: './arch.table.view.html',
})
export class ArchTable {
  sortedBy: any[string];
  @Input () tableData: any;
  @Input () tableColumns: Array<tableColumns>;
  isInEditing: boolean;
  savedRowOnEdit: any;
  finishEdit: any;
  @Input () tableConfiguration: tableConfiguration;
  constructor() {
    this.sortedBy = []
  }

  editRow(idx: number, row: any) {
    this.savedRowOnEdit = Object.assign({}, row);
    this.tableData[idx].isInEditing = true;
    this.isInEditing = true;
  }

  finishEditRow(idx: number, finishEdit: number ) {

    if (finishEdit === 1) {
      this.tableData[idx] = this.savedRowOnEdit;
    }
    this.tableData[idx].isInEditing = false;
    this.isInEditing = false;
  }

  sortBy(columnKey: string) {
    if (!this.sortedBy[0]) {
      this.sortedBy = ['-' + columnKey]
    } else if (this.sortedBy[0].endsWith(columnKey)) {
      this.sortedBy = [this.sortedBy[0].startsWith('+') ? '-' + columnKey : '+' + columnKey ]
    } else {
        this.sortedBy = ['-' + columnKey]
    }
  }
  deleteRow(idx: any) {
    this.tableData.splice(idx, 1);
  };

  addRow() {
    let tableObject: any = {};
    for (let c in this.tableColumns) {
      tableObject[this.tableColumns[c].key] = '';
    };
    this.tableData.unshift(tableObject);
    this.editRow(0, this.tableData[0]);
  };

}

import { Component } from '@angular/core';

import { tableConfiguration } from './../../arch/components/arch-table/arch.table.component';

import * as _ from 'lodash';

@Component({
  selector: 'test-table',
  templateUrl: './test.table.view.html',
})
export class TestTable  {
  mockTableData: any[];
  mockTableData1: any[];
  mockTableData2: any[];
  mockTableData3: any[];
  mockTableData4: any[];
  mockTableData5: any[];
  mockTableData6: any[];
  mockTableData7: any[];

  mockTableColumns: any[];
  tableConfigEdit: tableConfiguration;
  tableConfigDelete: tableConfiguration;
  tableConfigAdd: tableConfiguration;
  tableConfigActions: tableConfiguration;
  tableConfigCustomActions: tableConfiguration;
  tableConfigCustomAction: tableConfiguration;
  constructor() {
    this.mockTableData = [
      {character: 'Kaiser', age: '23', gender: 'Hombre', game: 'Anima'},
      {character: 'Monique', age: '72', gender: 'Mujer', game: 'Mago'},
      {character: 'Jerome', age: '82', gender: 'Hombre', game: 'C\'thulhu'},
      {character: 'Yotaka', age: '6', gender: 'Hombre', game: 'Hombre-Lobo'},
    ];
    this.mockTableData1 = _.clone(this.mockTableData);
    this.mockTableData2 = _.clone(this.mockTableData);
    this.mockTableData3 = _.clone(this.mockTableData);
    this.mockTableData4 = _.clone(this.mockTableData);
    this.mockTableData5 = _.clone(this.mockTableData);
    this.mockTableData6 = _.clone(this.mockTableData);
    this.mockTableData7 = _.clone(this.mockTableData);
    
    this.mockTableColumns = [
      {key: 'character', text: 'Personaje'},
      {key: 'age', text: 'Edad'},
      {key: 'gender', text: 'Genero'},
      {key: 'game', text: 'Juego'},
    ];
    this.tableConfigEdit = {allowEdit: true};
    this.tableConfigDelete = {allowDelete: true};
    this.tableConfigAdd = {allowAdd: true};
    this.tableConfigActions = { allowAdd: true, allowDelete: true, allowEdit: true};
    this.tableConfigCustomActions = {rowActions: [{text: 'Ejemplo Uno', action: this.exampleOne}, {text: 'Ejemplo Dos', action: this.exampleTwo}]}
    this.tableConfigCustomAction = {rowActions: [{text: 'Ejemplo Tres', action: this.exampleThree}]}
  };

  exampleOne(row: any) {
    console.info('Ejemplo Uno ' + JSON.stringify(row));
  }
  exampleTwo(row: any) {
    console.info('Ejemplo Dos ' + JSON.stringify(row));
  }
  exampleThree(row: any) {
    console.info('Ejemplo Tres ' + JSON.stringify(row));    
  }
}

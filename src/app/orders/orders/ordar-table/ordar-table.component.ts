import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from '../../iorder';

@Component({
  selector: 'app-ordar-table',
  templateUrl: './ordar-table.component.html',
  styleUrls: [],
  
})
export class OrdarTableComponent implements OnInit {
  @Input() orders:IOrder[];
  constructor() { }

  ngOnInit(): void {
  }

}

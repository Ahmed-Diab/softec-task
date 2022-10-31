import { Component, OnInit } from '@angular/core';
import { OrdarTableComponent } from '../ordar-table/ordar-table.component';

@Component({
  selector: 'softec-ordar-card',
  templateUrl: './ordar-card.component.html',
  styleUrls: ['./ordar-card.component.scss'],
})
export class OrdarCardComponent extends OrdarTableComponent implements OnInit {}

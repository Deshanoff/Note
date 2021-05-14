import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getuid',
  templateUrl: './getuid.component.html',
  styleUrls: ['./getuid.component.scss'],
})
export class GetuidComponent implements OnInit {
  static uid:string;
  constructor() { }

  ngOnInit() {}

}

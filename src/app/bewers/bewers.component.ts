import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bewers',
  templateUrl: './bewers.component.html',
  styleUrls: ['./bewers.component.css']
})
export class BewersComponent implements OnInit {

  bewers:any = [];
  constructor(
    public rest:RestService,
    private route: ActivatedRoute,
    private router: Router
) {

}

  ngOnInit() {
    this.getBewers();
  }

  getBewers() {
    this.bewers = [];
    this.rest.getBewers().subscribe((data: {}) => {
      console.log(data);
      this.bewers = data;
    });
  }
}

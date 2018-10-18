import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  beers:any = [];
  constructor(
      public rest:RestService,
      private route: ActivatedRoute,
      private router: Router
  ) {

  }

  ngOnInit() {
    this.getBeers();
  }

  getBeers() {
    this.beers = [];
    this.rest.getBeers().subscribe((data: {}) => {
      console.log(data);
      this.beers = data;
    });
  }

}

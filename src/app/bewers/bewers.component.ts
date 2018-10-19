import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { RestBewerFilter } from '../filter/rest.bewer';

@Component({
  selector: 'app-bewers',
  templateUrl: './bewers.component.html',
  styleUrls: ['./bewers.component.css']
})
export class BewersComponent implements OnInit {

  filter = new RestBewerFilter();
  bewers:any = [];
  length = 0;
  pageSize = 0;
  pageIndex: 0;
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    public rest:RestService,
    private route: ActivatedRoute,
    private router: Router
) {
  this.route.queryParams.subscribe(params => {
      let s  = params;
  });

}

  ngOnInit() {
    let filtersBewer = new RestBewerFilter();
    this.getBewers(filtersBewer);
  }

  pageChange(EventEmitter: PageEvent) {
    this.pageSize = this.filter['limit'] = EventEmitter.pageSize;
    this.length = this.filter['offset'] = EventEmitter.pageIndex;
    this.getBewers(this.filter);
    return EventEmitter;
  }


  getBewers(filter: RestBewerFilter) {
    this.bewers = [];
    this.rest.getBewers(filter).subscribe((data: Response) => {
      this.length = data['count_all'];
      this.pageSize = data['limit'];
      this.pageIndex = data['offset']
      this.bewers = data['bewers'];
    });
  }
}

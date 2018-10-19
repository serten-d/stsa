import { Component, OnInit } from '@angular/core';
// import { IRestBeerFilter, RestBeerFilter } from '../rest.service';
import { RestBeerFilter } from '../filter/rest.beer';
import { RestBewerFilter } from '../filter/rest.bewer';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, Event, ActivationEnd } from '@angular/router';
import { PageEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { interval } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  filter = new RestBeerFilter();
  beers: any = [];
  bewers: any = [];
  countrySelect: any = [];
  typeSelect: any = [];
  beer: any = [];
  length = 0;
  pageSize = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex: 0;
  profileForm: FormGroup;
  bewerId = '';
  name = new FormControl('');
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    let url = this.router.url;
    let routes = this.router;
    this.route.queryParams.subscribe(params => {
        let s  = params;
    });
    router.events.subscribe((event: Event) => {
      if (event instanceof ActivationEnd && 'undefined' !== typeof event.snapshot.params['id']) {
       this.bewerId = event.snapshot.params['id'];
      }
    });

  }

  ngOnInit() {
    let filtersBewer = new RestBewerFilter();
    filtersBewer['limit'] = 0;
    this.getBewersSelect(filtersBewer);
    this.getBeerTypeSelect();
    this.getCountrySelect();

    let filtersBeer = new RestBeerFilter();
    if('' !== this.bewerId)
    {
      filtersBeer['bwr'] = parseInt(this.bewerId);
    }
    this.getBeers(filtersBeer);

    this.profileForm = new FormGroup({
      bwr: new FormControl(),
      name__li:  new FormControl(),
      price__from:  new FormControl(),
      price__to:  new FormControl(),
      country_code:  new FormControl(),
      type:  new FormControl()
    });

  }


  pageChange(EventEmitter: PageEvent) {
    this.pageSize = this.filter['limit'] = EventEmitter.pageSize;
    this.length = this.filter['offset'] = EventEmitter.pageIndex;
    this.getBeers(this.filter);
  }

  onSubmit() {
    let filter = new RestBeerFilter(), 
        form = this.profileForm.value;
        
    this.filter['bwr'] = filter['bwr'] = form.bwr || this.bewerId,
    this.filter['name__li'] = filter['name__li'] = form.name__li,
    this.filter['price__from'] = filter['price__from'] = form.price__from,
    this.filter['price__to'] = filter['price__to'] = form.price__to,
    this.filter['country_code'] = filter['country_code'] = form.country_code,
    this.filter['type'] = filter['type'] = form.type;

    this.getBeers(this.filter);
  }

  getFilters(EventEmitter: PageEvent) {
    let filter = new RestBeerFilter();
    filter['limit'] = EventEmitter.pageSize;
    filter['offset'] = EventEmitter.pageSize;
    let b = this.getBeers(filter);
  }

  showDetails(id, content){
    this.rest.getBeer(id).subscribe((data: Response) => {
      this.beer = data;
      this.modalService.open(content, { size: 'lg' });
    });
  }

  getBeers(filter: RestBeerFilter) {
    this.beers = [];
    this.rest.getBeers(filter).subscribe((data: Response) => {
      this.length = data['count_all'];
      this.pageSize = data['limit'];
      this.pageIndex = data['offset']
      this.beers = data['beers'];
    });
  }

  getBewersSelect(filter: RestBewerFilter) {
    this.rest.getBewersSelect(filter).subscribe((res: Response) => {
      let data = res['bewers'] || [], bewers = [{
        id: '',
        name : 'wybierz',
      }];
      
      for(let key in data)
      {
        bewers.push({
          id: data[key]['id_bwr'],
          name: data[key]['bwr_name'] + '(' + data[key]['beer_count'] + ')',
        });
      }

      this.bewers = bewers;
      this.profileForm.controls['bwr'].patchValue(this.bewerId);
    });
  }

  getCountrySelect() {
    this.rest.getCountrySelect().subscribe((data: Response) => {
      let countrySelect = [{
        id: '',
        name : 'wybierz',
      }];
      
      for(let key in data)
      {
        countrySelect.push({
            id: key,
            name: data[key]
        });
      }

      this.countrySelect = countrySelect;
      this.profileForm.controls['country_code'].patchValue('');
    });
  }

  getBeerTypeSelect() {
    this.rest.getBeerTypeSelect().subscribe((data: Response) => {
      let typeSelect = [{
        id: '',
        name : 'wybierz',
      }];
      
      for(let key in data)
      {
        typeSelect.push({
          id: key,
          name: data[key]
        });
      }

      this.typeSelect = typeSelect;
      this.profileForm.controls['type'].patchValue('');
    });
  }

  getBeer(id) {
    this.beer = [];
    this.rest.getBeer(id).subscribe((data: Response) => {
      this.length = data['count_all'];
      this.pageSize = data['limit'];
      this.pageIndex = data['offset']
      this.beer = data['beers'];
    });
  }
}
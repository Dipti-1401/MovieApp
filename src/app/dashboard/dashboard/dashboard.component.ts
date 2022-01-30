import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChildren('theLastList', { read: ElementRef })
  
  theLastList!: QueryList<ElementRef>;

  latest: any =[];
  totalpage:number=0;
  observer: any;
  observer1: any;

  page : number =1;
  curpage: number  =1;
  data:any;
  list:boolean = false;
  list1:boolean = false;
  data1:any;
  latest1:any=[];

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }
    
  ngAfterViewInit(){
    this.theLastList.changes.subscribe((d) => {
      console.log(d);
      if (d.last) this.observer.observe(d.last.nativeElement);
    });

    this.theLastList.changes.subscribe((d) => {
      console.log(d);
      if (d.last) this.observer1.observe(d.last.nativeElement);
    });

  }

  refresh(){
    this.list=true
  }

  refreshUp(){
    this.list1 =true;
  }

  ngOnInit() {
   this.getPopular();
    this.getUpcoming();
    this.intersectionObserver();
    this.intersectionObserverPop();
  }

  getPopular(){
    this.spinner.show();
    this.apiService.getAllPopular(this.page)
    .subscribe((res) => {
      
      console.log(res);

      this.data = res;
      this.spinner.hide();
      //this.latest = this.data['results'];
      this.totalpage = this.data.total_pages;
      this.data['results'].forEach((element: any) => {
        this.latest.push(element)
      });
      console.log(this.totalpage)
    });
  }

  getUpcoming(){
    this.spinner.show();
    this.apiService.getAllUpcoming(this.curpage)
    .subscribe((res) => {
      
      console.log(res, "trending");

      this.data1 = res;
      this.spinner.hide();
      //this.latest = this.data['results'];
      this.totalpage = this.data1.total_pages;
      this.data1['results'].forEach((element: any) => {
        this.latest1.push(element)
      });
      console.log(this.totalpage)
    });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.curpage < this.totalpage) {
          this.curpage++;
          this.getUpcoming();
        }
      }
    }, options);
  }
 
  intersectionObserverPop() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer1 = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.page < this.totalpage) {
          this.page++;
          this.getPopular();
        }
      }
    }, options);
  }

}

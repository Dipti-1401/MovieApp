import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , AfterViewInit {


  @ViewChildren('theLastList', { read: ElementRef })
  theLastList!: QueryList<ElementRef>;

  latest: any =[];
  totalpage:number=0;
  observer: any;
  page : number =1;
  data:any;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }
    
  ngAfterViewInit(){
    this.theLastList.changes.subscribe((d) => {
      console.log(d);
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  ngOnInit() {
    this.getLatest();
    this.intersectionObserver();
  }

  getLatest(){
    this.spinner.show();
    this.apiService.getAllMovies(this.page)
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

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.page < this.totalpage) {
          this.page++;
          this.getLatest();
        }
      }
    }, options);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideBarOpen: boolean;
  showHeaderAndSidebar: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkRoute(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.urlAfterRedirects);
      });
  }

  checkRoute(url: string) {
    if (url === '/login' || url === '/') {
      this.showHeaderAndSidebar = false;
      this.sideBarOpen = false;
    } else {
      this.showHeaderAndSidebar = true;
      this.sideBarOpen = true;
    }
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

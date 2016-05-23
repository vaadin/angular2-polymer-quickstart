import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, RouteData } from '@angular/router-deprecated';
import { PolymerElement } from '@vaadin/angular2-polymer';

import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <paper-scroll-header-panel fixed>
      <paper-toolbar [class.raised]="isInChildView">
        <paper-icon-button icon="arrow-back" *ngIf="isInChildView" (click)="goBack()"></paper-icon-button>
        <div class="title">{{title}}</div>
      </paper-toolbar>
      <router-outlet></router-outlet>
    </paper-scroll-header-panel>
  `,
  styles: [`
    paper-scroll-header-panel {
      height: 100%;
    }

    paper-toolbar.raised {
      @apply(--shadow-elevation-4dp);
    }

    paper-toolbar paper-icon-button {
      margin-left: -8px;
      margin-right: 24px;
    }

    paper-toolbar .title {
      margin-left: 56px;
    }

    paper-toolbar paper-icon-button + .title {
      margin-left: 0;
    }
  `],
  directives: [
    ROUTER_DIRECTIVES,
    PolymerElement('paper-scroll-header-panel'),
    PolymerElement('paper-toolbar'),
    PolymerElement('paper-icon-button')
  ],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
})
@RouteConfig([
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent,
    useAsDefault: true,
    data: {
      title: 'All heroes',
      root: true
    }
  },
  {
    path: '/heroes/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent,
    data: {
      title: 'Hero detail'
    }
  }
])
export class AppComponent implements OnInit {
  title = '';
  isInChildView = false;

  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.subscribe(() => {
      let routeData: RouteData = this._router.currentInstruction.component.routeData;
      this.title = routeData.get('title');
      this.isInChildView = !routeData.get('root');
    });
  }

  goBack() {
    this._router.navigate(['Heroes']);
  }
}

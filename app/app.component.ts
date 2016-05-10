import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { PolymerElement } from 'vaadin-ng2-polymer/polymer-element';

import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <paper-scroll-header-panel fixed>
      <paper-toolbar>
        <div class="title">{{title}}</div>
      </paper-toolbar>
      <router-outlet></router-outlet>
    </paper-scroll-header-panel>
  `,
  styles: [`
    my-app {
      display: block;
    }

    my-app,
    paper-scroll-header-panel {
      height: 100%;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  directives: [
    ROUTER_DIRECTIVES,
    PolymerElement('paper-scroll-header-panel'),
    PolymerElement('paper-toolbar'),
    HeroesComponent
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
    useAsDefault: true
  },
  {
    path: '/heroes/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
])
export class AppComponent {
  title = 'All Heroes';
}

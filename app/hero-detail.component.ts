import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details</h2>
    </div>
  `
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private _routeParams: RouteParams,
    private _heroService: HeroService
  ) { }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._heroService.getHero(id).then(hero => this.hero = hero);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
      <paper-input label="Name" [(value)]="hero.name"></paper-input>
      <vaadin-date-picker label="Birthday" [(value)]="hero.birthday"></vaadin-date-picker>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
    }
  `]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  private _routeParamsSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _heroService: HeroService
  ) { }

  ngOnInit() {
    this._routeParamsSubscription = this._route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this._heroService.getHero(id).then(hero => this.hero = hero);
    });
  }

  ngOnDestroy() {
    this._routeParamsSubscription.unsubscribe();
  }
}

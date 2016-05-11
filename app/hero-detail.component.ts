import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { PolymerElement } from 'vaadin-ng2-polymer/polymer-element';

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
  directives: [
    PolymerElement('paper-input'),
    PolymerElement('vaadin-date-picker')
  ],
  styles: [`
    :host {
      display: block;
      padding: 16px;
    }
  `]
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

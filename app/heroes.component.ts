import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { PolymerElement } from '@vaadin/angular2-polymer/polymer-element';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  template: `
    <vaadin-grid [items]="heroes" (selected-items-changed)="onSelectedItemsChanged($event)">
      <table>
        <colgroup>
          <col name="id">
          <col name="name">
          <col name="birthday">
        </colgroup>
      </table>
    </vaadin-grid>
  `,
  styles: [`
    vaadin-grid {
      height: 100%;
    }
  `],
  directives: [
    PolymerElement('vaadin-grid')
  ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private _router: Router,
    private _heroService: HeroService
  ) { }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelectedItemsChanged(event: any) {
    let selectedIndex: number = event.target.selection.selected()[0];
    if (selectedIndex !== undefined) {
      let selectedHeroId: number = this.heroes[selectedIndex].id;
      this._router.navigate( ['HeroDetail', { id: selectedHeroId }] );
    }
  }
}


import { HeroesComponent } from './heroes.component';
import { Component, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('Heroes Shallow tests', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroesList;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    heroesList = [
      {id: 1, name: 'Laoise', strength: 30},
      {id: 2, name: 'Orla', strength: 5},
      {id: 3, name: 'Caoimhe', strength: 24}
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [{
         provide: HeroService, useValue: mockHeroService
      }],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('should correctly set the heroes from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroesList));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should create a li for each hero in the array', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroesList));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });

});

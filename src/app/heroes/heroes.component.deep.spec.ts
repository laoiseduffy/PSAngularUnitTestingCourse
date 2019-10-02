import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';

describe('Heroes Deep tests', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroesList;

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
        HeroComponent
      ],
      providers: [{
        provide: HeroService, useValue: mockHeroService
      }],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('should show each hero as a hero component', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponents.length).toEqual(3);
    expect(heroComponents[0].componentInstance.hero.name).toEqual('Laoise');

  });

  it('should delete a hero', () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', {stopPropagation: () => {}});

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroesList[0]);

  });

});

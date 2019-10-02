import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { of } from 'rxjs/internal/observable/of';

describe('Heroes Component', () => {

  let component: HeroesComponent;
  let heroesList: Hero[];
  let mockHeroService;

  beforeEach(() => {
    heroesList = [
      {id: 1, name: 'Laoise', strength: 30},
      {id: 2, name: 'Orla', strength: 5},
      {id: 3, name: 'Caoimhe', strength: 24}
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);

  });

  describe('delete', () => {

    it('should remove the indicated hero from the heroesList', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.heroes = heroesList;

      component.delete(heroesList[2]);

      expect(component.heroes.length).toBe(2);
      expect(component.heroes).toContain(heroesList[0]);
      expect(component.heroes).toContain(heroesList[1]);
    });

    // interaction test (service and component) checking that the component calls to the service as its meant to
    it('should call deleteHero with the right value', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroesList;
      component.delete(heroesList[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroesList[2]);
    });

  });

});

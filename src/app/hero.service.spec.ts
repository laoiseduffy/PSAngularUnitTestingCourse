import { inject, TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Hero Service', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ],
      imports: [  HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);

  });

  it('should get the data from the service with the correct url',
    () => {

    service.getHero(4).subscribe();

    const req = httpTestingController.expectOne('api/heroes/4');
    req.flush({id: 4, name: 'super', strength: 100});




  });

});

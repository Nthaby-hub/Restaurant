import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestProfilePage } from './rest-profile.page';

describe('RestProfilePage', () => {
  let component: RestProfilePage;
  let fixture: ComponentFixture<RestProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

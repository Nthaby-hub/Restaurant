import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ALoginPage } from './a-login.page';

describe('ALoginPage', () => {
  let component: ALoginPage;
  let fixture: ComponentFixture<ALoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ALoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ALoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

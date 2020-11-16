import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserBookPage } from './user-book.page';

describe('UserBookPage', () => {
  let component: UserBookPage;
  let fixture: ComponentFixture<UserBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

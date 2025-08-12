import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginesListComponent } from './origines-list.component';

describe('OriginesListComponent', () => {
  let component: OriginesListComponent;
  let fixture: ComponentFixture<OriginesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
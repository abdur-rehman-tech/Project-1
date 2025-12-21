import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolDetail } from './tool-detail';

describe('ToolDetail', () => {
  let component: ToolDetail;
  let fixture: ComponentFixture<ToolDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

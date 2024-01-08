import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGrapheCirculaireComponent } from './page-graphe-circulaire.component';

describe('PageGrapheCirculaireComponent', () => {
  let component: PageGrapheCirculaireComponent;
  let fixture: ComponentFixture<PageGrapheCirculaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageGrapheCirculaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageGrapheCirculaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

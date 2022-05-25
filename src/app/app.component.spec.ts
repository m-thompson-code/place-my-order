import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { Location } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule
      ],
      declarations: [
        AppComponent, HomeComponent, RestaurantComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create the app', () => {
    
    expect(app).toBeTruthy();
  });

  it(`should have as title 'place-my-order'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('place-my-order');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'place-my-order.com'
    );
  });

  it('should render the HomeComponent with router navigates to "/" path', fakeAsync(() => {
    const location: Location = TestBed.inject(Location);
    const router: Router = TestBed.inject(Router);
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('');
      expect(compiled.querySelector('pmo-home')).not.toBe(null);
    });
  }));

  it('should render the RestaurantsComponent with router navigates to "/restaurants" path', fakeAsync(() => {
    const location: Location = TestBed.inject(Location);
    const router: Router = TestBed.inject(Router);
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['restaurants']).then(() => {
      expect(location.path()).toBe('/restaurants');
      expect(compiled.querySelector('pmo-restaurant')).not.toBe(null);
    });
  }));

  it('should have the home navigation link href set to ""', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('li a');
    const href = homeLink?.getAttribute('href');
    expect(href).toEqual('/');
  });

  it('should have the restaurants navigation link href set to ""', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const restaurantsLink = compiled.querySelector('li:nth-child(2) a');
    const href = restaurantsLink?.getAttribute('href');
    expect(href).toEqual('/restaurants');
  });

  it('should make the home navigation link class active when the router navigates to "/" path', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['']);
    fixture.detectChanges();
    tick();

    const homeLinkLi = compiled.querySelector('li');
    expect(homeLinkLi?.classList).toContain('active');
    expect(compiled.querySelectorAll('.active').length).toBe(1);
    flush();
  }));

  it('should make the restaurants navigation link class active when the router navigates to "/restaurants" path', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    router.navigate(['restaurants']);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/restaurants');
    const restaurantsLinkLi = compiled.querySelector('li:nth-child(2)');
    expect(restaurantsLinkLi?.classList).toContain('active');
    expect(compiled.querySelectorAll('.active').length).toBe(1);
    flush();
  }));
});

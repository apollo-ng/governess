import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { GovernessApp } from './app.component';
import { HomePage } from '../pages/home/home';

let comp: GovernessApp;
let fixture: ComponentFixture<GovernessApp>;

describe('Component: Root Component', () => {

	beforeEach(async(() => {

		TestBed.configureTestingModule({

			declarations: [GovernessApp],

			providers: [

			],

			imports: [
		        IonicModule.forRoot(GovernessApp)
			]

		}).compileComponents();

	}));

	beforeEach(() => {

		fixture = TestBed.createComponent(GovernessApp);
		comp 	= fixture.componentInstance;

	});

	afterEach(() => {
		fixture.destroy();
		comp = null;
	});

	it('is created', () => {

		expect(fixture).toBeTruthy();
		expect(comp).toBeTruthy();

	});

	it('initialises with a root page of HomePage', () => {
		expect(comp['rootPage']).toBe(HomePage);
	});

});

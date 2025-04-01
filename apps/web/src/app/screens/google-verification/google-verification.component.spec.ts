import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { GoogleVerificationComponent } from "./google-verification.component";

describe("GoogleVerificationComponent", () => {
	let component: GoogleVerificationComponent;
	let fixture: ComponentFixture<GoogleVerificationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GoogleVerificationComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(GoogleVerificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

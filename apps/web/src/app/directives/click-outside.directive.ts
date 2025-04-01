import { DOCUMENT } from "@angular/common";
import {
	type AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	Inject,
	type OnDestroy,
	Output,
	inject,
} from "@angular/core";
import { type Subscription, filter, fromEvent } from "rxjs";

@Directive({
	selector: "[clickOutside]",
	standalone: true,
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
	@Output() clickOutside = new EventEmitter<void>();
	private element = inject(ElementRef);
	documentClickSubscription: Subscription | undefined;
	private document = inject(Document);

	ngAfterViewInit(): void {
		this.documentClickSubscription = fromEvent(this.document, "click")
			.pipe(
				filter((event) => {
					return !this.isInside(event.target as HTMLElement);
				}),
			)
			.subscribe(() => {
				this.clickOutside.emit();
			});
	}

	ngOnDestroy(): void {
		this.documentClickSubscription?.unsubscribe();
	}

	isInside(elementToCheck: HTMLElement): boolean {
		return (
			elementToCheck === this.element.nativeElement ||
			this.element.nativeElement.contains(elementToCheck)
		);
	}
}

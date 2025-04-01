import { Component } from "@angular/core";

import {
	type CellContext,
	type HeaderContext,
	injectFlexRenderContext,
} from "@tanstack/angular-table";

@Component({
	template: `
        <input
            aria-label="Select all"
            class="checkbox checkbox-sm"
            type="checkbox"
            [indeterminate]="
                (!context.table.getIsAllRowsSelected && context.table.getIsAllPageRowsSelected()) ||
                context.table.getIsSomePageRowsSelected()
            "
            (checkedChange)="onCheckedChange($any($event).target.checked)"
        >
    `,
	host: {
		class: "px-1 block",
	},
	standalone: true,
})
export class ViewTableHeadSelectionComponent<T> {
	context = injectFlexRenderContext<HeaderContext<T, unknown>>();

	onCheckedChange(checked: boolean) {
		this.context.table.toggleAllRowsSelected(checked);
	}
}

@Component({
	template: `
        <input
            aria-label="Select row"
            class="checkbox checkbox-sm"
            type="checkbox"
            data-datatable-check="true"
            (checkedChange)="onCheckedChange($any($event).target.checked)"
            [checked]="context.row.getIsSelected()"
        />
    `,
	host: {
		class: "px-1 block",
	},
	standalone: true,
	imports: [],
})
export class ViewTableRowSelectionComponent<T> {
	context = injectFlexRenderContext<CellContext<T, unknown>>();

	onCheckedChange(checked: boolean) {
		this.context.row.toggleSelected(checked);
	}
}

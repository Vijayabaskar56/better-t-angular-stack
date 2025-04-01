import { Component, type OnInit } from "@angular/core";

import {
	type CellContext,
	injectFlexRenderContext,
} from "@tanstack/angular-table";

@Component({
	standalone: true,
	imports: [],
	template: `
        <div class="flex space-x-2">
            <div class="badge badge-ghost">{{ label }}</div>
            <span class="max-w-[31.25rem] truncate font-medium">
                {{ context.getValue() }}
            </span>
        </div>
    `,
})
export class ViewTitleRowComponent<T extends { label: string }>
	implements OnInit
{
	context = injectFlexRenderContext<CellContext<T, unknown>>();

	label = "";

	ngOnInit() {
		this.label = this.context.row.original?.label;
	}
}

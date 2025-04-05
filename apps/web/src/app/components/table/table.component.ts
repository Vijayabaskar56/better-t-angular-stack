import { CommonModule } from "@angular/common";
import {
	HttpClient,
	HttpClientModule,
	type HttpErrorResponse,
} from "@angular/common/http";
import {
	Component,
	type OnInit,
	computed,
	inject,
	signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
	type Column,
	type ColumnDef,
	type ColumnFiltersState,
	FlexRenderComponent,
	FlexRenderDirective,
	type SortingState,
	createAngularTable,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/angular-table";
import { toast } from "ngx-sonner";
import { dummyData } from "../../../../shared/dummy/user.dummy";
import { TableFilterService } from "../../services/table-filter.service";
import {
	ViewTableHeadSelectionComponent,
	ViewTableRowSelectionComponent,
} from "../select/selection-column.component";
import { ViewTitleRowComponent } from "./components/title-row.component";
export interface User {
	id: number;
	name: string;
	age: number;
	username: string;
	email: string;
	phone: string;
	badge: string;
	occupation: string;
	hobbies: string[];
	selected: boolean;
	status: number;
	created_at: string;
}

@Component({
	selector: "app-table",
	standalone: true,
	imports: [FormsModule, CommonModule, HttpClientModule, FlexRenderDirective],
	templateUrl: "./table.component.html",
	styleUrl: "./table.component.scss",
})
export class TableComponent implements OnInit {
	users = signal<User[]>([]);
	private http = inject(HttpClient);
	private filterService = inject(TableFilterService);
	readonly columnFilters = signal<ColumnFiltersState>([]);
	readonly columnSorting = signal<SortingState>([]);

	constructor() {
		this.http
			.get<User[]>(
				"https://cors-anywhere.herokuapp.com/https://freetestapi.com/api/v1/users?limit=8",
			)
			.subscribe({
				next: (data) => this.users.set(data),
				error: (error) => {
					this.users.set(dummyData);
					this.handleRequestError(error);
				},
			});
	}

	public toggleUsers(checked: boolean) {
		this.users.update((users) => {
			return users.map((user) => {
				return { ...user, selected: checked };
			});
		});
	}
	readonly columns: ColumnDef<User>[] = [
		{
			id: "selected",
			accessorKey: "selected",
			header: () => {
				return new FlexRenderComponent(ViewTableHeadSelectionComponent);
			},
			cell: () => {
				return new FlexRenderComponent(ViewTableRowSelectionComponent);
			},
			enableHiding: false,
		},
		{
			accessorKey: "username",
			header: () => "Username",
			cell: (info) => {
				return new FlexRenderComponent(ViewTitleRowComponent);
			},
			enableSorting: true,
		},
		{
			accessorKey: "hobbies",
			header: () => "Hobbies",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "occupation",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "phone",
			cell: (info) => info.getValue(),
		},
	];
	private handleRequestError(error: HttpErrorResponse) {
		const msg =
			"An error occurred while fetching users. Loading dummy data as fallback.";
		toast.error(msg, {
			position: "bottom-right",
			description: error.message,
			action: {
				label: "Undo",
				onClick: () => console.log("Action!"),
			},
			actionButtonStyle: "background-color:#DC2626; color:white;",
		});
	}

	filteredUsers = computed(() => {
		const search = this.filterService.searchField().toLowerCase();
		const status = this.filterService.statusField();
		const order = this.filterService.orderField();

		return this.users()
			.filter(
				(user) =>
					user.name.toLowerCase().includes(search) ||
					user.username.toLowerCase().includes(search) ||
					user.email.toLowerCase().includes(search) ||
					user.phone.includes(search),
			)
			.filter((user) => {
				if (!status) return true;
				switch (status) {
					case "1":
						return user.status === 1;
					case "2":
						return user.status === 2;
					case "3":
						return user.status === 3;
					default:
						return true;
				}
			})
			.sort((a, b) => {
				const defaultNewest = !order || order === "1";
				if (defaultNewest) {
					return (
						new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
					);
				}
				if (order === "2") {
					return (
						new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
					);
				}
				return 0;
			});
	});
	table = createAngularTable<User>(() => {
		return {
			columns: this.columns,
			data: this.users(),
			rowCount: 5,
			state: {
				sorting: this.columnSorting(),
				columnFilters: this.columnFilters(),
			},
			onColumnFiltersChange: (updater) => {
				updater instanceof Function
					? this.columnFilters.update(updater)
					: this.columnFilters.set(updater);
			},
			onSortingChange: (updater) => {
				updater instanceof Function
					? this.columnSorting.update(updater)
					: this.columnSorting.set(updater);
			},
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(), //client-side filtering
			getSortedRowModel: getSortedRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			getFacetedRowModel: getFacetedRowModel(), // client-side faceting
			getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
			getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
			debugTable: true,
			debugHeaders: true,
			debugColumns: false,
		};
	});

	onPageSizeChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		console.log(
			"🚀 ~ :214 ~ TableComponent ~ onPageSizeChange ~ target?.value:",
			target?.value,
		);
		this.table.setPageSize(Number(target?.value));
	}

	onFilterTasksChange(data: string): void {
		console.log(
			"🚀 ~ :220 ~ TableComponent ~ onFilterTasksChange ~ data:",
			data,
		);
		this.table.getColumn("username")?.setFilterValue(data);
	}

	onColumnVisibilityChange($event: Event, column: Column<User, unknown>): void {
		column.toggleVisibility(!!$event);
	}

	filterHideColumns(): Column<User, unknown>[] {
		return this.table.getAllColumns().filter((column) => column.getCanHide());
	}
	ngOnInit() {}
}

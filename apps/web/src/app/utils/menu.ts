import {
	Bell,
	Box,
	ChartPie,
	Cog,
	Download,
	Folder,
	Gift,
	Lock,
	TriangleAlert,
	User,
	type icons,
} from "lucide-angular";
export interface MenuItem {
	group: string;
	separator?: boolean;
	selected?: boolean;
	active?: boolean;
	items: Array<SubMenuItem>;
}

export interface SubMenuItem {
	icon?: (typeof icons)[keyof typeof icons] | string;
	label?: string;
	route?: string | null;
	expanded?: boolean;
	active?: boolean;
	children?: Array<SubMenuItem>;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Menu {
	public static pages: MenuItem[] = [
		{
			group: "Base",
			separator: false,
			items: [
				{
					icon: ChartPie,
					label: "Dashboard",
					route: "/dashboard",
					children: [
						{ label: "Nfts", route: "/dashboard/nfts" },
						// { label: 'Podcast', route: '/dashboard/podcast' },
					],
				},
				{
					icon: Lock,
					label: "Auth",
					route: "/auth",
					children: [
						{ label: "Sign up", route: "/auth/sign-up" },
						{ label: "Sign in", route: "/auth/sign-in" },
						{ label: "Forgot Password", route: "/auth/forgot-password" },
						{ label: "New Password", route: "/auth/new-password" },
						{ label: "Two Steps", route: "/auth/two-steps" },
					],
				},
				{
					icon: TriangleAlert,
					label: "Errors",
					route: "/errors",
					children: [
						{ label: "404", route: "/errors/404" },
						{ label: "500", route: "/errors/500" },
					],
				},
				{
					icon: Box,
					label: "Components",
					route: "/components",
					children: [{ label: "Table", route: "/account/table" }],
				},
			],
		},
		{
			group: "Collaboration",
			separator: true,
			items: [
				{
					icon: Download,
					label: "Download",
					route: "/download",
				},
				{
					icon: Gift,
					label: "Gift Card",
					route: "/gift",
				},
				{
					icon: User,
					label: "Users",
					route: "/users",
				},
			],
		},
		{
			group: "Config",
			separator: false,
			items: [
				{
					icon: Cog,
					label: "Settings",
					route: "/settings",
				},
				{
					icon: Bell,
					label: "Notifications",
					route: "/gift",
				},
				{
					icon: Folder,
					label: "Folders",
					route: "/folders",
					children: [
						{ label: "Current Files", route: "/folders/current-files" },
						{ label: "Downloads", route: "/folders/download" },
						{ label: "Trash", route: "/folders/trash" },
					],
				},
			],
		},
	];
}

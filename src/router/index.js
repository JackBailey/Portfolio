import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			title: "Home",
		},
	},
	// redirect contact to home
	{
		meta: {
			title: "Contact",
		},
		path: "/contact",
		component: () => import("../components/index/contact.vue"),
	},
	{
		meta: {
			title: "Credits",
		},
		path: "/credits",
		component: () => import("../views/Credits.vue"),
	},
	// 404
	{
		meta: {
			title: "404",
		},
		path: "/:catchAll(.*)",
		component: () => import("../views/NotFound.vue"),
	},
	// discord
	{
		meta: {
			title: "Discord",
		},
		path: "/discord",
		component: () => import("../views/Discord.vue"),
	},
	{
		meta: {
			title: "Terms of Service",
		},
		path: "/tos",
		component: () => import("../views/TOS.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;

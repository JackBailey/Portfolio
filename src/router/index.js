import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		component: () => import("../pages/Index.vue"),
	},
	{
		path: "/contact",
		component: () => import("../components/Contact.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		component: () => import("../pages/NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

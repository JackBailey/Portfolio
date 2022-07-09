<template>
	<div class="home">
		<div class="section hero">
			<div class="content">
				<sub>Hi there!</sub>
				<h1>I'm <span>Jack Bailey</span></h1>
				<h2>I design & develop attractive, functional websites.</h2>
				<a button href="#contact"><button>Hire Me</button></a>
			</div>
		</div>
		<div class="section about">
			<div class="content">
				<h2>I’m a fullstack website developer from the UK.</h2>
				<p
					>I’ve been developing various projects in a variety of languages such as Python, JavaScript and C# for many years but over the
					past year I’ve discovered my passion for website development and have quickly built up my skillset and developed websites for a
					variety of individual people and businesses.
				</p>
				<p class="status" v-if="status"
					>I'm currently <span :status="status">{{ status }}</span> - <a href="#contact">send me a message</a></p
				>
			</div>
			<img src="https://cdn.jackbailey.dev/logos/jb/blue.svg" alt="" />
		</div>
		<div class="scrollSections">
			<div
				class="section"
				v-for="(project, index) in projects.filter((project) => project.data.featured)"
				:key="index"
				:style="`--height: ${project.height}vh; --position: ${project.position};
				}`"
				:projectID="index"
			>
				<div class="content">
					<h2
						>{{ project.data.name }}
						<a :href="project.data.source" target="_blank" v-if="project.data.source"><font-awesome-icon icon="fa-brands fa-github" /></a
					></h2>
					<h3>{{ project.data.role }}</h3>
					<p class="details" v-html="project.data.details" />
					<div class="moreDetails">
						<div class="date"
							>{{ project.data.started
							}}{{
								!project.data.ended ? " - Present" : project.data.ended != project.data.started ? " - " + project.data.ended : ""
							}}</div
						>
					</div>
					<div class="technologies">
						<a target="_blank" :href="project.data.screenshot.link" class="viewWebsite">Go to Website</a>
						<a
							:href="technology.link"
							target="_blank"
							class="technology"
							v-for="technology in project.data.technologies"
							:key="technology"
						>
							<img :src="technology.logo" />
							<p>{{ technology.name }}</p>
						</a>
					</div>
				</div>

				<a :href="project.data.screenshot.link" target="_blank" class="image">
					<img
						:style="project.data.screenshot.position ? `object-position: ${project.data.screenshot.position}` : ''"
						:src="project.data.screenshot.image"
						alt=""
					/>
				</a>
			</div>
		</div>
		<div class="projects">
			<h2>My other projects</h2>
			<div class="projectsInner">
				<div class="project" v-for="(project, index) in projects.filter((project) => !project.data.featured)" :key="index">
					<div class="header">
						<h3
							>{{ project.data.name
							}}<a :href="project.data.source" target="_blank" v-if="project.data.source"
								><font-awesome-icon icon="fa-brands fa-github" /></a
						></h3>
						<div class="date">
							{{ project.data.started
							}}{{ !project.data.ended ? " - Present" : project.data.ended != project.data.started ? " - " + project.data.ended : "" }}
						</div>
					</div>
					<p v-html="project.data.details"></p>
					<div class="technologies">
						<a
							target="_blank"
							class="technology"
							v-for="technology in project.data.technologies"
							:href="technology.link"
							:key="technology"
						>
							<img :src="technology.logo" />
							<p>{{ technology.name }}</p>
						</a>
					</div>
				</div>
			</div>
		</div>
		<Contact />
	</div>
</template>

<script>
import Contact from "../components/Contact.vue";
export default {
	components: {
		Contact,
	},
	methods: {
		getstatus() {
			var connection = new WebSocket("wss://api.lanyard.rest/socket");
			var int;
			connection.onmessage = (event) => {
				var data = JSON.parse(event.data);
				var op = data.op;
				if (op == 1) {
					connection.send(
						JSON.stringify({
							op: 2,
							d: {
								subscribe_to_ids: ["154608413412818944"],
							},
						})
					);
					int = setInterval(() => {
						connection.send(
							JSON.stringify({
								op: 2,
								d: {
									subscribe_to_ids: ["154608413412818944"],
								},
							})
						);
					}, 30000);
				} else {
					var user = false;
					if (data.d.hasOwnProperty("154608413412818944")) {
						var user = data.d["154608413412818944"];
					} else if (data.t == "PRESENCE_UPDATE" && data.d != undefined) {
						var user = data.d;
					}
					if (user) {
						this.status = user.discord_status == "offline" ? "offline" : "online";
					}
				}
			};
		},
		getImage(img) {
			return new URL(`../assets/sites/${img}`, import.meta.url).href;
		},
		handleScroll() {
			var scrollSections = document.querySelectorAll(".scrollSections > .section");
			var focusedItem = Array.from(scrollSections).indexOf(
				Array.from(scrollSections).filter((el) => el.querySelector(".content").getBoundingClientRect().top > 0)[0]
			);

			scrollSections.forEach((el, i) => {
				var percentage = 100 - (el.getBoundingClientRect().top / window.innerHeight) * 100;

				if (focusedItem == 1) {
					this.projects.filter((project) => project.data.featured)[0].position = "fixed";
				} else {
					this.projects.filter((project) => project.data.featured)[0].position = "absolute";
				}

				if (focusedItem == -1) {
					this.projects.filter((project) => project.data.featured)[i].position = "absolute";
				} else {
					this.projects.filter((project) => project.data.featured)[i].position = "fixed";
				}

				this.projects.filter((project) => project.data.featured)[el.attributes.projectID.value].height = percentage < 0 ? 0 : percentage;
			});
		},
		async getProjects() {
			function convertDate(date) {
				if (!date) {
					return date;
				} else {
					var date = new Date(date);
					var year = date.getFullYear();
					var month = date.toLocaleString("default", { month: "long" }, { year: "long" });
					return `${month} ${year}`;
				}
			}

			try {
				const response = await fetch("https://api.jackbailey.dev/projects");

				const data = await response.json();

				this.projects = data
					.sort((a, b) => {
						if (!a.ended) {
							return false;
						} else if (a.ended > b.ended) {
							return false;
						} else {
							return true;
						}
					})
					.map((project, index) => {
						if (project.details) {
							var links = project.details.match(/\[.*?\)/g);
							if (links != null && links.length > 0) {
								for (let link of links) {
									let txt = link.match(/\[(.*?)\]/)[1];
									let url = link.match(/\((.*?)\)/)[1];
									project.details = project.details.replace(link, '<a href="' + url + '" target="_blank">' + txt + "</a>");
								}
							}
						}
						project.started = convertDate(project.started);
						project.ended = convertDate(project.ended);

						return {
							data: project,
							height: 0,
							position: data.filter((project) => project.featured)[0].name == project.name ? "absolute" : "fixed",
						};
					});
			} catch (err) {
				console.log("Error loading projects");
				console.log(err);
			}
		},
	},
	data() {
		return {
			status: null,
			projects: [],
		};
	},
	mounted() {
		this.getProjects();
		document.addEventListener("scroll", this.handleScroll);
		this.handleScroll();
		this.getstatus();
	},
	beforeUnmount() {
		document.removeEventListener("scroll", this.handleScroll);
	},
};
</script>

<style lang="scss" scoped>
.home {
	overflow-y: auto;

	.section {
		padding: 8rem 10rem;
		sub {
			font-size: 2rem;
			font-weight: 600;
			color: $color-foreground-3;
		}
		h1 {
			font-size: 4rem;
			span {
				color: $color-accent;
			}
		}

		a[button] {
			text-decoration: none;
			cursor: inherit;
			display: block;
			button {
				margin-top: 1rem;
				background: $color-accent;
				border: none;
				cursor: pointer;
				color: $color-foreground-1;
				padding: 0.2rem 2rem;
				font-size: 1.5rem;
				border-radius: 5px;
				display: grid;
				place-items: center;
				font-size: 1.5rem;
			}
		}

		p {
			font-size: 1.2rem;
		}
		&.hero {
			padding: 10% 10%;
			min-height: 100vh;
			display: grid;
			grid-template-columns: 2fr 1fr;
			align-content: center;
			position: relative;
			overflow: hidden;

			h2 {
				color: $color-foreground-3;
				font-size: 3rem;
			}

			&::after {
				background: url("@/assets/languages-pattern.png");
				width: 30vw;
				height: 191.31vw;
				content: "";
				position: absolute;
				top: 50%;
				right: 0;
				background-size: 20rem;
				transform: translateY(-50%);
				animation: animate 8s infinite linear;
				opacity: 0.3;

				@keyframes animate {
					from {
						background-position: 0rem 0rem;
					}
					to {
						background-position: 0rem 20rem;
					}
				}
			}
			&::before {
				position: absolute;
				bottom: 0;
				right: 0;
				background: linear-gradient(to bottom, transparent 50%, $color-background-1);
				width: 30vw;
				height: 100%;
				content: "";
				z-index: 2;
			}

			a {
				width: max-content;
				button {
					position: relative;
					&::after {
						position: absolute;
						background: white;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
						display: grid;
						place-items: center;
						font-size: 1.5rem;
						padding: 0rem;
						border-radius: 5px;
						content: "";
						transition: 250ms ease-in-out;
						overflow: hidden;
						content: "Hire Me";
						color: black;
						clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
					}
					&:hover {
						&::after {
							height: 100%;
							padding: 0.2rem 2rem;
							clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
						}
					}
				}
			}
		}

		&.about {
			h2 {
				font-size: 2rem;
			}
			p {
				font-weight: 500;
				font-size: 1.5rem;

				&:first-of-type {
					margin-top: 1rem;
				}
				&.status {
					font-weight: 600;
					margin-top: 0.5rem;

					span {
						font-weight: 600;
						&[status="online"] {
							color: #38c768;
						}
						&[status="offline"] {
							color: $color-foreground-3;
						}
					}
					a {
						cursor: pointer;
						color: $color-accent;
						position: relative;
						text-decoration: none;
						&::after {
							bottom: 0;
							height: 1px;
							width: 0%;
							background: currentColor;
							content: "";
							position: absolute;
							transition: 250ms ease-in-out;
						}
						&:not(:hover) {
							&::after {
								right: 0;
							}
						}
						&:hover {
							&::after {
								left: 0;
								width: 100%;
							}
						}
					}
				}
			}
			display: grid;
			grid-template-columns: 1fr 12rem;
			gap: 10rem;
			place-items: center;
		}
	}

	.technologies {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		.technology {
			color: inherit;
			text-decoration: none;
			padding: 0.5rem;
			box-sizing: border-box;
			gap: 1rem;
			background: #233266;
			display: grid;
			grid-template-columns: 2rem 1fr;
			border-radius: 5px;
			place-items: center;
			p {
				font-size: 0.8rem;
				width: 100%;
				display: block;
			}
			img {
				width: 1.5rem;
			}
			transition: 150ms ease-in-out;
			&:hover {
				transform: scale(1.05);
			}
		}
	}
	.scrollSections {
		overflow: hidden;
		position: relative;
		.section {
			padding: 0;
			display: grid;
			grid-template-columns: 1fr 1fr;
			height: 100vh;
			position: relative;
			.content {
				padding: 10rem;
				display: flex;
				flex-direction: column;
				align-content: center;
				justify-content: center;
				h2 {
					font-size: 3rem;
					display: flex;
					align-items: center;
					gap: 1rem;

					a {
						font-size: 0.6em;
						text-decoration: none;
						color: inherit;
						&::after {
							display: none;
						}
					}
				}
				h3 {
					color: $color-foreground-2;
					font-size: 2rem;
				}
				p.details {
					font-weight: 500;
					font-size: 1.5rem;
					:deep(a) {
						color: $color-accent;
						text-decoration: none;
					}
				}
				.moreDetails {
					margin-top: 1rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.date {
						font-weight: 500;
					}
				}

				.viewWebsite {
					display: none;
				}
			}
			.image {
				position: var(--position);
				top: 0;
				right: 0;
				height: var(--height);
				overflow: hidden;
				cursor: pointer;

				img {
					object-fit: cover;
					width: 50vw;
					height: 100vh;
					transition: 150ms linear;
				}
			}
		}
	}

	.projects {
		padding: 10rem 10rem;
		.projectsInner {
			display: grid;
			grid-template-columns: repeat(auto-fill, 30rem);
			gap: 3rem;
			place-content: center;
		}
		> h2 {
			text-align: center;
			font-size: 2rem;
			margin-bottom: 2rem;
		}
		.project {
			padding: 1rem 1rem;
			border-radius: 10px;
			border: 1px solid #b0afae;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 1.5rem;
			box-sizing: border-box;
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 2rem;
				position: relative;
				h3 {
					font-size: 1.5rem;
					display: block;

					a {
						color: white;
						text-decoration: none;
						font-size: 1.5rem;
						display: inline-grid;
						place-content: center;
						padding-left: 0.5rem;
						padding-top: 0.2rem;
						height: 1.8em;
						position: absolute;
						bottom: 0;
					}
				}
				.date {
					text-align: right;
					color: $color-foreground-3;
					font-weight: 500;
				}
			}
			> :deep(p) {
				font-weight: 500;
				a {
					text-decoration: none;
					color: $color-accent;
					font-weight: 600;
				}
			}
			.technologies {
				margin-top: 0;
			}
		}
	}

	@media screen and (max-width: 800px) {
		.section {
			padding: 5%;
			&.hero {
				grid-template-columns: 1fr;
				&::after,
				&::before {
					width: 100%;
					top: 0;
					height: 100vh;
					transform: none;
				}
				&::after {
					opacity: 0.1;
				}
				.content {
					z-index: 2;
					h1 {
						font-size: 3rem;
					}
					h2 {
						font-size: 1.8rem;
					}
				}
			}
			&.about {
				grid-template-columns: 1fr;
				.content {
					h2 {
						font-size: 1.8rem;
					}
					p {
						font-size: 1.2rem;
					}
				}
				img {
					display: none;
				}
			}
		}
		.scrollSections {
			z-index: 1;

			.section {
				.content {
					background: rgba(black, 0.6);
					padding: 2rem;
					width: 100vw;

					.viewWebsite {
						display: block;
						text-decoration: none;
						color: inherit;
						text-decoration: none;
						padding: 0.5rem;
						box-sizing: border-box;
						gap: 1rem;
						background: #233266;
						border-radius: 5px;
						transition: 150ms ease-in-out;
						&:hover {
							transform: scale(1.05);
						}
					}
				}
				.image {
					filter: blur(3px);
					overflow: hidden;
					z-index: -1;
					img {
						width: 100vw;
					}
				}
			}
		}

		.projects {
			padding: 2rem 1rem;
			width: 100vw;
			.projectsInner {
				grid-template-columns: 1fr;
				gap: 1rem;
				.project {
					box-sizing: border-box;
					text-align: center;
					.header {
						flex-direction: column;
						gap: 0;
						h3 {
							a {
								position: static;
							}
						}
					}
				}
			}
		}
	}
}
</style>

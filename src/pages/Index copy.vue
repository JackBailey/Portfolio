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
					>I'm currently <span :status="status">{{ status }}</span> - <a>send me a message</a></p
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
			.project
			{{ projects.filter((project) => !project.data.featured) }}
		</div>
		<div class="contact" id="contact">
			<h2>Interested? </h2>
			<h3>Lets get in touch!</h3>
			<div :class="['input', email.error.name ? 'error' : '']">
				<input v-model="email.data.name" name="name" @input="email.error.name = null" type="text" ref="usernameInput" />
				<p @click="$refs.usernameInput.focus()">Name</p>
			</div>
			<p>{{ email.error.name }}</p>
			<div :class="['input', email.error.email ? 'error' : '']">
				<input v-model="email.data.email" name="email" @input="email.error.email = null" type="email" ref="emailInput" />
				<p @click="$refs.emailInput.focus()">Email</p>
			</div>
			<p>{{ email.error.email }}</p>
			<div :class="['input textarea', email.error.message ? 'error' : '']">
				<textarea
					v-model="email.data.message"
					@input="email.error.message = null"
					ref="messageInput"
					name=""
					id=""
					cols="30"
					rows="10"
				></textarea>
				<p @click="$refs.messageInput.focus()">Message</p>
			</div>
			<p>{{ email.error.message }}</p>
			<button @click="sendEmail" :class="[email.sending ? 'sending' : '']"><span>Send</span><img src="@/assets/bars.svg" alt="" /></button>
		</div>
		<div :class="['emailResponse', email.sent ? 'active' : '']">
			<font-awesome-icon icon="times" @click="email.sent = false" />
			<h2>{{ email.success ? "Your email has been sent!" : "Your email could not be sent" }}</h2>
			<p>{{ email.success ? "Thanks for getting in touch!" : email.message }}</p>
			<p>{{
				email.success
					? "I've received your message and will get back to you as soon as possible"
					: "Please try again and contact me at Jck#5160 on discord if this issue persists"
			}}</p>
			<!-- <button>Close</button> -->
		</div>
	</div>
</template>

<script>
import Projects from "../assets/projects.json";
export default {
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
		getProjects() {
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

			this.projects = Projects.sort((a, b) => {
				if (!a.ended) {
					return false;
				} else if (a.ended > b.ended) {
					return false;
				} else {
					return true;
				}
			}).map((project, index) => {
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
					position: Projects.filter((project) => project.featured)[0].name == project.name ? "absolute" : "fixed",
				};
			});
		},
		async sendEmail() {
			this.email.message = "";
			if (this.email.data.name == "") this.email.error.name = "Name cannot be empty";
			if (this.email.data.email == "") this.email.error.email = "Email cannot be empty";
			if (this.email.data.message == "") this.email.error.message = "Message cannot be empty";
			if (Object.values(this.email.error).filter((item) => item != null).length) return;
			this.email.sending = true;
			this.email.sent = false;

			var response = await fetch("https://api.jackbailey.dev/contact?user=balls", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: this.email.data.name,
					email: this.email.data.email,
					emailBody: this.email.data.message,
				}),
			});

			this.email.sent = true;
			this.email.sending = false;

			if (response.status == 200) {
				var data = await response.json();

				if (data.success) {
					this.email.success = true;
				} else {
					this.email.success = false;
					this.email.message = data.message;
				}
			} else {
				var data = await response.text();
				this.email.success = false;
				this.email.message = data;
			}
		},
	},
	data() {
		return {
			status: null,
			projects: [],
			email: {
				sent: false,
				success: true,
				message: "",
				sending: false,
				error: {
					name: null,
					email: null,
					message: null,
				},
				data: {
					name: "Jack Bailey",
					email: "jnbailey@gmail.com",
					message: "this is a test",
				},
			},
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

	.contact {
		padding: 5% 10%;
		box-sizing: border-box;
		h2 {
			font-size: 3rem;
			font-weight: 500;
		}
		h3 {
			font-size: 2rem;
			margin-bottom: 4rem;
		}

		input,
		textarea {
			display: block;
			font-size: 1.2rem;
			color: white;
		}

		.input {
			&:not(.textarea) {
				width: 30rem;
				max-width: 100%;
			}
			position: relative;
			p {
				position: absolute;
				top: -1rem;
				left: 0.5rem;
				transition: 150ms ease-in-out;
				padding: 0 5px;
				background: $color-background-1;
			}

			input {
				width: 100%;

				border: 1px solid white;
				background: none;
				color: white;
				padding: 2px 1rem;
				position: relative;
				transition: 150ms ease-in-out;
			}

			textarea {
				width: 100%;
				background: none;
				color: white;
				border: 1px solid white;
				padding: 0.5rem;
				box-sizing: border-box;
				resize: none;
				transition: 150ms ease-in-out;
			}

			&.error {
				textarea,
				input {
					border-color: tomato;
				}
			}

			textarea,
			input {
				&:focus {
					outline: none;
					border-color: $color-accent;
				}
			}
		}
		> p {
			margin-bottom: 1.4rem;
			margin-top: 0.2rem;
		}
		button {
			padding: 0.4rem 1rem;
			background: none;
			border: 1px solid white;
			color: white;
			font-size: 1.5rem;
			cursor: pointer;
			transition: 250ms ease-in-out;
			width: 10rem;
			position: relative;
			display: grid;
			place-items: center;
			img {
				height: 2.2rem;
				margin: 0 auto;
				position: absolute;
			}
			span {
				opacity: 1;
				transition: 250ms ease-in-out;
			}
			img {
				opacity: 0;
				transition: 250ms ease-in-out;
			}
			&.sending {
				span {
					opacity: 0;
				}
				img {
					opacity: 1;
				}
			}
			&:hover {
				background: $color-accent;
				border-color: $color-accent;
			}
		}
	}

	.emailResponse {
		position: fixed;
		bottom: 0;
		right: 4rem;
		z-index: 2;
		background: $color-background-1;
		box-shadow: 0 0 10px rgba(black, 0.8);
		padding: 1rem;
		box-sizing: border-box;
		border-radius: 10px 10px 0 0;

		width: 20rem;

		svg {
			font-size: 1.5rem;
			position: absolute;
			top: 1rem;
			right: 1rem;
			cursor: pointer;
			transition: 150ms ease-in-out;
			&:hover {
				color: tomato;
			}
		}
		h2 {
			font-size: 1.5rem;
			padding-right: 2rem;
			margin-bottom: 1rem;
			margin-top: 0;
		}
		p {
			padding-right: 2rem;
			grid-column: 1/3;
			line-height: 1.5;
			margin-bottom: 1rem;
			&:last-of-type {
				margin-bottom: 3rem;
			}
		}

		transition: 250ms ease-in-out;

		transform: translateY(-50%);
		bottom: -60%;

		&.active {
			bottom: 0;
			transform: none;
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
				width: 100vw;
				.content {
					width: 100vw;
					background: rgba(black, 0.8);
				}
				.image {
					z-index: -1;
					img {
						width: 100vw;
					}
				}
			}
		}
		.contact {
			button {
				width: 100%;
			}
		}
		.emailResponse {
			width: 90%;
			left: 5%;
		}
	}
}
</style>

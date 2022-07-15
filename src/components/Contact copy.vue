<template>
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
</template>

<script>
export default {
	methods: {
		async sendEmail() {
			this.email.message = "";
			if (this.email.data.name == "") this.email.error.name = "Name cannot be empty";
			if (this.email.data.email == "") this.email.error.email = "Email cannot be empty";
			if (this.email.data.message == "") this.email.error.message = "Message cannot be empty";
			if (Object.values(this.email.error).filter((item) => item != null).length > 0) return;
			this.email.sending = true;
			this.email.sent = false;

			var response = await fetch("https://api.jackbailey.dev/contact", {
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
					this.email.data = {
						name: "",
						email: "",
						emailBody: "",
					};
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
					name: "",
					email: "",
					message: "",
				},
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.contact {
	padding: 5% 10%;
	box-sizing: border-box;
	min-height: 100vh;
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
		color: $color-foreground-1;
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

			border: 1px solid #b0afae;
			background: none;
			color: $color-foreground-1;
			padding: 2px 1rem;
			position: relative;
			transition: 150ms ease-in-out;
		}

		textarea {
			width: 100%;
			background: none;
			color: $color-foreground-1;
			border: 1px solid #b0afae;
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
			border-radius: 5px;
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
		border-radius: 5px;
		padding: 0.4rem 1rem;
		background: none;
		border: 1px solid #b0afae;
		color: $color-foreground-1;
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

	@media screen and (max-width: 800px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		h2,
		h3 {
			text-align: center;
		}
		button {
			width: 100%;
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

	@media screen and (max-width: 800px) {
		width: 90%;
		left: 5%;
	}
}
</style>

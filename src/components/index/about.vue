<template>
	<div class="about" id="about">
		<div class="left">
			<h1>Hi! I’m Jack Bailey - Welcome to my portfolio</h1>
			<p>I’m a fullstack website developer from the UK.</p>
			<p>
				I’ve been developing various projects in a variety of languages such as Python, JavaScript and C# for many years but over the past year I’ve discovered my passion for website
				development and have quickly built up my skillset and developed websites for a variety of individual people and businesses.
			</p>
			<div class="status" v-if="status != ''">
				<p>
					I'm currently
					<span>{{ status != "offline" ? "online" : "offline" }}</span>
				</p>
				<div class="blobContainer">
					<span
						:title="
							{
								dnd: 'Do Not Disturb',
								online: 'Online',
								offline: 'Offline',
								idle: 'Idle',
							}[status]
						"
						:class="'blob ' + status"
					></span>
				</div>
			</div>
			<a v-if="spotify.playing || activity.active" class="audioPlayer" :href="'https://open.spotify.com/track/' + spotify.info.id">
				<div class="audioHeader">
					<div :class="activity.active && spotify.playing ? 'image split' : 'image'">
						<img class="albumCover" v-if="spotify.playing" :src="spotify.info.art" />
						<span class="activityImage" :title="'Editing a ' + activity.assets.large_text + ' file in project ' + activity.state">
							<img v-if="activity.active" :src="activity.image" />
						</span>
					</div>
					<div class="artistInfo">
						<h1>{{ spotify.playing ? spotify.info.name : "Editing a " + activity.assets.large_text + " file" }}</h1>
						<p>{{ spotify.playing ? spotify.info.artist : "In project " + activity.state }}</p>
					</div>
				</div>
				<div class="progress" v-if="spotify.playing">
					<span>{{ spotify.time.current }}</span>
					<div class="progressContainer">
						<div class="progressBar" :style="'width:' + spotify.time.progress"></div>
					</div>
					<span>{{ spotify.time.end }}</span>
				</div>
			</a>
		</div>
		<div class="right">
			<img src="https://cdn.jackbailey.dev/logos/jb/blue.svg" alt="" />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			status: "",
			connection: null,
			activity: {
				active: false,
				image: "",
				assets: {},
			},
			spotify: {
				playing: false,
				info: {},
				time: {
					start: 0,
					end: 0,
					current: 0,
					progress: 0,
					endstamp: 0,
				},
			},
		};
	},
	mounted() {
		// this.loop()

		this.getstatus();
		this.setTimes();
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
						this.status = user.discord_status;
						if (user.spotify) {
							function prettyTime(duration) {
								var minutes = Math.floor(duration / 60);
								var seconds = Math.floor(duration % 60).toLocaleString("en-US", {
									minimumIntegerDigits: 2,
									useGrouping: false,
								});
								return `${minutes}:${seconds}`;
							}

							this.spotify.info = {
								name: user.spotify.song,
								artist: user.spotify.artist,
								art: user.spotify.album_art_url,
								id: user.spotify.track_id,
							};

							var start = user.spotify.timestamps.start;
							var end = user.spotify.timestamps.end;

							var duration = (end - start) / 1000;

							this.spotify.time.start = start;
							this.spotify.time.end = prettyTime(duration);
							this.spotify.time.endstamp = end;

							var now = new Date().getTime();
							var progress = (now - start) / (end - start);
							this.spotify.time.progress = progress * 100 + "%";
							this.spotify.time.current = prettyTime((now - start) / 1000);

							this.spotify.playing = true;
						} else {
							this.spotify = {
								playing: false,
								info: {},
								time: {
									start: 0,
									end: 0,
									current: 0,
									progress: 0,
									endstamp: 0,
								},
							};
						}
						var vscode = user.activities.find((x) => x.application_id == 383226320970055681);
						if (vscode) {
							this.activity.active = true;
							console.log(vscode);
							this.activity = vscode;
							this.activity.image = `https://cdn.discordapp.com/app-assets/${vscode.application_id}/${vscode.assets.large_image}.png`;
							this.activity.active = true;
						} else {
							this.activity = {
								active: false,
								image: "",
								assets: {},
							};
						}
					}
				}
			};
		},
		setTimes() {
			setTimeout(() => {
				if (this.spotify.playing) {
					function prettyTime(duration) {
						var minutes = Math.floor(duration / 60);
						var seconds = Math.floor(duration % 60).toLocaleString("en-US", {
							minimumIntegerDigits: 2,
							useGrouping: false,
						});
						return `${minutes}:${seconds}`;
					}
					var now = new Date().getTime();
					var start = this.spotify.time.start;
					var end = this.spotify.time.endstamp;
					if (now < end) {
						var progress = (now - start) / (end - start);
						this.spotify.time.progress = progress * 100 + "%";
						this.spotify.time.current = prettyTime((now - start) / 1000);
					}
				}
				this.setTimes();
			}, 1000);
		},
	},
};
</script>

<style lang="scss" scoped>
.about {
	background: var(--background);
	display: grid;
	padding: 5% 10%;
	grid-template-columns: 1fr 1fr;
	.left {
		h1 {
			color: var(--foreground);
		}
		p {
			color: var(--foreground-light);
		}
		.status {
			display: flex;
			.blobContainer {
				display: inline-grid;
				place-items: center;
				height: max-content;
			}
			.blob {
				display: inline-block;
				border-radius: 50%;
				box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
				margin: 0;
				margin-left: 15px;
				height: 20px;
				width: 20px;
				transform: scale(1);
				animation: pulse-black 2s infinite;
				--statusColor: 0, 255, 0;

				&.dnd {
					--statusColor: 255, 0, 0;
				}
				&.online {
					--statusColor: 0, 255, 0;
				}
				&.offline {
					--statusColor: 100, 100, 100;
				}
				&.idle {
					--statusColor: 255, 180, 0;
				}

				background: rgb(var(--statusColor));
			}
			p {
				margin: 0;
			}

			@keyframes pulse-black {
				0% {
					transform: scale(0.95);
					box-shadow: 0 0 0 0 rgba(var(--statusColor), 0.7);
				}
				70% {
					transform: scale(1);
					box-shadow: 0 0 0 10px rgba(var(--statusColor), 0);
				}

				100% {
					transform: scale(0.95);
					box-shadow: 0 0 0 0 rgba(var(--statusColor), 0);
				}
			}
		}
		.audioPlayer {
			margin-top: 20px;
			display: block;
			text-decoration: none;
			color: white;
			height: max-content;
			width: 400px;
			border-radius: 10px;
			box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.5);
			padding: 10px;
			box-sizing: border-box;
			transition: all 0.2s ease-in-out;
			&:hover {
				transform: scale(1.05);
			}
			.audioHeader {
				display: flex;
				align-items: flex-start;
				.image {
					overflow: hidden;
					position: relative;
					width: 80px;
					height: 80px;
					img {
						width: 100%;
						height: 100%;
					}
					&.split {
						.activityImage {
							position: absolute;
							bottom: 0px;
							right: 0px;
							width: 42px;
							height: 42px;
							z-index: 2;
						}
					}
				}
				.artistInfo {
					display: inline-block;
					padding-left: 10px;
					h1 {
						margin: 0;
						font-size: 20px;
					}
					p {
						margin: 0;
					}
				}
			}
			.progress {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: var(--foreground);
				width: 100%;
				margin-top: 5px;
				.progressContainer {
					margin: 0 10px;
					width: 100%;
					border-radius: 5px;
					height: 5px;
					background: gray;
					flex-grow: 1;
					position: relative;
					.progressBar {
						border-radius: 5px;
						position: absolute;
						top: 0;
						left: 0;
						background: var(--accent);
						width: 0;
						height: 5px;
					}
				}
			}
		}
	}
	.right {
		display: grid;
		place-items: center;
		img {
			height: 256px;
		}
	}
}
@media screen and (max-width: 800px) {
	.about {
		padding: 5% 5%;
		display: block;
		.left {
			h1 {
				font-size: 25px;
			}
			p {
				font-size: 16px;
			}
			.audioPlayer {
				width: 100%;
			}
		}
		.right {
			display: none;
		}
	}
}
</style>

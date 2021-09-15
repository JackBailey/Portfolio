from flask import Flask, render_template, jsonify, request, redirect, send_from_directory,send_file
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
import os, requests, json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
import threading, time
import sys 

app = Flask('app')

app.url_map.strict_slashes = False


CORS(app)

def pretty(jsonIn):
	return json.dumps(jsonIn, indent=1, sort_keys=True)

def flaskApp():
	@app.route("/")
	def index():
		return render_template("index.html")

	@app.route("/favicon.ico")
	def favicon():
		return send_from_directory(os.path.join(app.root_path, 'static'),
								'favicon.ico', mimetype='image/vnd.microsoft.icon')

	@app.route("/images/<path:path>")
	def images(path):
		directory = app.root_path +"/static/images/" + path
		return send_file(directory)

	@app.route("/contact")
	def contact():
		return render_template("contact.html")

	@app.route("/emailform", methods = ["POST"])
	def emailform():
		try:
			name = request.form.get("firstName") + " " + request.form.get("lastName")

			sender = name +  " <"+request.form.get("email")+">"
			body = request.form.get("emailBody")

			reciever = "contact@jackbailey.uk"

			subject = "New Email from " + name

			server = smtplib.SMTP("mail.jackbailey.uk",587)
			server.ehlo()
			server.starttls()
			server.login(reciever, "Ecreeper2013L!")

			msg = MIMEMultipart()
			msg["From"] =  name + "<"+reciever+">"
			msg["To"] = reciever
			msg["Subject"] = subject
			msg['reply-to'] = sender

			msg.attach(MIMEText(body, "plain"))

			text = msg.as_string()

			server.sendmail(reciever, reciever, text)
			server.close()

			return redirect("/contact?sent=true")
		except:
			return redirect("/contact?sent=false")

	@app.route("/api")
	def apiHome():
		data = """
		<p>Whoa, it's a basic API I made - Crazy</p>
		<ul>
			<li>
				<a href = "/api/github/repos">Repos</a>
			</li>
			<li>
				<a href = "/api/steam/76561198363384787">Top Games</a>
			</li> 
		"""
		return data

	@app.route("/api/github/<path:path>")
	def githubAPI(path):
		if path == "repos":
			projects = json.load(open("cache/repos.json","r"))
			return jsonify(projects)
		elif path == "rate_limit":
			url = "https://api.github.com/rate_limit"
			response = requests.get(url, headers={'Authorization': 'token '+os.environ['githubAuth']})
			response = response.json()
			return jsonify(response)

	@app.route("/api/steam/<path:account>")
	def steam(account):
		cacheFile = "cache/steam/"+account+"/cache.json"
		cache = json.load(open(cacheFile))
		return jsonify(cache)

	@app.route("/api/steam/<path:account>x<path:count>")
	def steamAmount(account, count):
		cacheFile = "cache/steam/"+account+"/cache.json"
		cache = json.load(open(cacheFile))[:int(count)]
		return jsonify(cache)

	@app.route("/github/<path:path>")
	def github(path):
		return redirect("https://github.com/Jack-Bailey/"+path)

	@app.route("/github")
	def githubHome():
		return redirect("https://github.com/Jack-Bailey/")

	http_server = WSGIServer(('', 5000), app)
	http_server.serve_forever()

def updater():
	def updateRepos():
		url = "https://api.github.com/users/jack-bailey/repos"
		projects = requests.get(url, headers={'Authorization': 'token '+os.environ['githubAuth']})
		projects = projects.json()
		for project in range(len(projects)):

			url = "https://api.github.com/repos/Jack-Bailey/"+str(projects[project]["name"])+"/languages"

			langResponse = requests.get(url, headers={'Authorization': 'token '+os.environ['githubAuth']})
			langResponse = langResponse.json()

			languages = []

			for key, value in langResponse.items():
				languages.append(key)

			projects[project]["languages"] = languages

		json.dump(projects, open("cache/repos.json", "w"))

	def updateSteam(accounts):
		gamesToList = 80

		path = "cache/steam"
		if not os.path.isdir(path):
			os.mkdir(path)

		file = "cache/steam/store-cache.json"
		if not os.path.isfile(file):
			file = open(file, 'w')
			file.write("{}")
			file.close()

		file = "cache/steam/cache.json"
		if not os.path.isfile(file):
			file = open(file, 'w')
			file.write("[]")
			file.close()

		for account in accounts:
			
			path = "cache/steam/"+str(account)
			if not os.path.isdir(path):
				os.mkdir(path)

			cacheFile = path + "/cache.json"
			manualGames = path + "/manual.json"

			if not os.path.isfile(cacheFile):
				file = open(cacheFile, 'w')
				file.write("[]")
				file.close()

			if not os.path.isfile(manualGames):
				file = open(manualGames, 'w')
				file.write("[]")
				file.close()
			
			url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + os.environ['Steam.ApiKey'] + f"&steamid={account}&format=json"
			r = requests.get(url)
			try:
				games = json.loads(r.text)["response"]["games"]
			except:
				print("Could not fetch for " + str(account))
				print(r.text)

			manualGames = json.load(open(manualGames))

			for game in manualGames:
				games.append(game)

			sort = sorted(games, key=lambda k: k['playtime_forever'])
			gameData = []
			gameList = sort[:gamesToList*-1:-1]

			for item in range(len(gameList)):
				currentGame = gameList[item]
				try:
					platform = currentGame["platform"]
				except:
					platform = "steam"
				error = False
				if platform == "steam":
					
					with open('cache/steam/store-cache.json') as json_file:
						storeCache = json.load(json_file)
					try:
						gameInfo = storeCache[str(currentGame["appid"])]

					except Exception as e:

						time.sleep(.05)

						url = "https://store.steampowered.com/api/appdetails?appids=" + str(currentGame["appid"])
						
						headers = {"Accept-Language": "en-US,en;q=0.5"}
						r = requests.get(url,headers=headers)
						print(r.status_code)
						try:
							
							gameInfo = r.json()[str(currentGame["appid"])]["data"]
							print("New Game, adding to database: " + str(gameInfo["name"]))
							storeCache[int(currentGame["appid"])] = gameInfo

							json.dump(storeCache,open('cache/steam/store-cache.json',"w"))
						except:
							error = True
							print("Error")

						
					if not error:
						newGame = {
							"name":gameInfo["name"],
							"image":gameInfo["header_image"],
							"playtime_forever": currentGame["playtime_forever"],
							"platform": "Steam",
							"link":"https://store.steampowered.com/app/"+ str(currentGame["appid"])
						}
				else:
					newGame = {
						"name": currentGame["name"],
						"image": currentGame["image"],
						"playtime_forever": currentGame["playtime_forever"],
						"platform": currentGame["platform"],
						"link":currentGame["link"]
					}
				if not error:
					gameData.append(newGame)

			json.dump(gameData,open(cacheFile,"w"))


	while True:
		updateSteam([76561198363384787,76561198450981972])
		updateRepos()
		print("Updated")
		time.sleep(600)

f = threading.Thread(name='flaskBG', target=flaskApp)
u = threading.Thread(name='flaskBG', target=updater)

f.start()
u.start()
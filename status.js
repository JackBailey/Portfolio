lastResult = null

// Credit to https://stackoverflow.com/a/18278346/16367360

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function statusUpdater(){
    loadJSON('https://api.lanyard.rest/v1/users/386175804742303754', function(data) {
        if (data != lastResult) {
            statusText = document.getElementById('status');
            statusIcon = document.getElementById('status-icon');
            activitiesBox = document.getElementById('activityBox');
    
            activitiesList = [];
            if (data.data.discord_status == "online")
            {
                statusType = "Online";
                if (data.data.listening_to_spotify){
                    activitiesList.push("Listening to Spotify");
                }
                statusIcon.className = "blob green";
                activitiesBox.style.display = "block";
    
            }
            else if (data.data.discord_status == "idle"){
                statusType = "Idle";
                statusIcon.className = "blob orange";
                activitiesBox.style.display = "none";
            }
            else if (data.data.discord_status == "dnd"){
                statusType = "Online";
                statusIcon.className = "blob red";
                activitiesBox.style.display = "block";
            }
            else if (data.data.discord_status == "offline"){
                statusType = "Offline";
                statusIcon.className = "blob gray";
                activitiesBox.style.display = "none";
            }
    
            // Check for activities
            if (data.data.activities.length != 0 && (data.data.discord_status == "online" || data.data.discord_status == "dnd")){
                for (let i = 0; i < data.data.activities.length; i++) {
                    currentActivity = data.data.activities[i]
                    if (currentActivity.name != "Spotify" && currentActivity.name != "Custom Status"){
                        if (currentActivity.name == "Stadia"){
                            if (currentActivity.state != null){
                                activitiesList.push(currentActivity.details + " " + currentActivity.state + " on Stadia")
                            }else{
                                activitiesList.push(currentActivity.details + " on Stadia")
                            }
                        }else{
                            if (currentActivity.details != null){
                                activityname = currentActivity.name
                                if (activityname == "Visual Studio Code"){
                                    activitiesList.push(currentActivity.details + " in VSCode")
                                }else if (["Disney+","YouTube"].includes(activityname)){
                                    activitiesList.push(currentActivity.details + " on " + activityname)
                                }
                                else{
                                    activitiesList.push(activityname + " • " + currentActivity.details)
                                }
                            }else{
                                activitiesList.push(currentActivity.name)
                            }            
                        }
                    }
                }
                
                activitiesList = activitiesList.join('<br><hr>')
            }
        }
        lastResult = data;
        statusText.innerHTML = statusType;
		if (activitiesList.length > 0){
			activitiesBox.style.display = "block";
        	activitiesBox.innerHTML = activitiesList;
		}else{
			activitiesBox.style.display = "none";
		}
        
    }
        
);}   


statusUpdater()
// Fetch discord
setInterval(statusUpdater, 5000);


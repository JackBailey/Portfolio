lastResult = null
function statusUpdater(){
    $.getJSON('https://api.lanyard.rest/v1/users/386175804742303754', function(data) {
        if (data != lastResult) {
            statusText = document.getElementById('status');
            statusIcon = document.getElementById('status-icon');
            tooltiptext = document.getElementById('activities');
    
            activitiesList = [];
            if (data.data.discord_status == "online")
            {
                statusType = "Online";
                if (data.data.listening_to_spotify){
                    activitiesList.push("Listening to Spotify");
                }
                statusIcon.className = "blob green";
    
            }
            else if (data.data.discord_status == "idle"){
                statusText.innerHTML = "Idle";
                statusIcon.className = "blob orange";
                tooltiptext.innerHTML = ""
            }
            else if (data.data.discord_status == "dnd"){
                statusType = "Online - Do Not Disturb";
                statusIcon.className = "blob red";
            }
            else if (data.data.discord_status == "offline"){
                statusText.innerHTML = "Offline";
                statusIcon.className = "blob gray";
                tooltiptext.innerHTML = ""
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
                
                activitiesList = ' - ' + activitiesList.join('<br> - ')
                newTooltiptext = "<p>"+activitiesList+"</p>"
                newStatus = statusType
                if (tooltiptext.innerHTML != newTooltiptext){
                    tooltiptext.innerHTML = newTooltiptext;
                }
                if (statusText.innerHTML != newStatus){
                    statusText.innerHTML = newStatus;
                }
                onlinebox = document.getElementById('nav-status')
                onlinebox.style.display= "block";

            }
    
            // get discord status
        }
        lastResult = data;
        
    }
        
);}   


statusUpdater()
// Fetch discord
setInterval(statusUpdater, 2000);
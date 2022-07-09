langs = {
    "JavaScript":{
        "logo":"javascript.svg",
        "url":"https://www.javascript.com/"
    },
    "CSS":{
        "logo":"css3.svg",
        "url":"http://css3.com"
    },
    "Batchfile":{
        "logo":"windows.svg",
        "url":"https://wikipedia.org/wiki/Batch_file"
    },
    "PHP":{
        "logo":"php.svg",
        "url":"https://www.php.net/"
    },
    "C#":{
        "logo":"csharp.svg",
        "url":"https://docs.microsoft.com/en-us/dotnet/csharp/"
    },
    "Python":{
        "logo":"python.svg",
        "url":"https://www.python.org/"
    },
    "HTML":{
        "logo":"html.svg",
        "url":"https://html.com/"
    },
    "VBScript":{
        "logo":"vba.svg",
        "url":"https://docs.microsoft.com/en-us/office/vba/library-reference/concepts/getting-started-with-vba-in-office"
    }
}

ignore = [
    "jack-bailey"
]
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





function updateProjects(sort,ascending){
   
    fetch('/api/github/repos')
        .then(response => response.json())
        .then(results => {
            projects = results

            if (sort == "updated"){
                projects.sort(function(a,b) {
                    return a.updated_at < b.updated_at;
                })
                ascending = !ascending
            }else if (sort == "created"){
                projects.sort(function(a,b) {
                    return a.created_at < b.created_at;
                })
                ascending = !ascending
            }else if (sort == "alphabetical"){
                projects.sort(function(a,b) {
                    return a.name < b.name;
                })
            }else if(sort == "id"){
                projects.sort(function(a,b) {
                    return a.id < b.id;
                })
            }else if(sort == "lang"){
                projects.sort(function(a,b) {
                    return a.language < b.language;
                }) 
            }

            if (ascending){
                projects.reverse()
            }
            document.getElementById("projectsDiv").innerHTML = "";
            projects.forEach(function(project,index){
                if (!project.fork && !ignore.includes(project.name)){
                    if (!project.description){
                        project.description = ""
                    }


                    if (project.homepage){
                        projectURL =    `<a class = "titleIcon" href = ${project.homepage}>
                                            <i class="fas fa-link"></i>
                                        </a>`
                    }else{
                        projectURL = "";
                    }

                    document.getElementById("projectsDiv").innerHTML += `
                        <div class = "project">
                            <div class = "projectInner">
                                <div class = "title">
                                    <a href = ${project.html_url}>${project.name}</a>
                                    <div class = "titleIcons" id = "projectIcon${index}">
                                        ${projectURL}                                
                                    </div>
                                </div>
                                <p>${project.description}</p>
                            </div>
                        </div>`

                    project.languages.forEach(function(language){
                        if (langs[language] !== null){
                            icons = document.getElementById("projectIcon"+index)
                            icons.innerHTML += `
                            <a href = "${langs[language]["url"]}">
                                <img class = "titleIcon" src = "/images/languages/${langs[language]["logo"]}"/>
                            </a>`
                        }
                    })            
                } 
            })
        });
}

function sortValues(){
    sort = document.getElementById("sort").value
    type = document.getElementById("type").value

    if (!["newest","oldest"].includes(type) && ["updated","created"].includes(sort)){
        document.getElementById("type").innerHTML = `
            <option value = "newest">Newest</option>
            <option value = "oldest">Oldest</option>
        `
    }else if(!["a-z","z-a"].includes(type) && ["alphabetical","lang"].includes(sort)){
        document.getElementById("type").innerHTML = `
        <option value = "a-z">A - Z</option>
        <option value = "z-a">Z - A</option>
        `
    }else if(!["highest","lowest"].includes(type) && ["id"].includes(sort)){
        document.getElementById("type").innerHTML = `
        <option value = "lowest">Low - High</option>
        <option value = "highest">High - Low</option>
        `
    }
    else if(["newest","oldest"].includes(type) && !["updated","created"].includes(sort)){
        document.getElementById("type").innerHTML = `
        <option value = "ascending">Ascending</option>
        <option value = "descending">Descending</option>
        `
    }
    // 

    console.log(document.getElementById("type").value)

    type = (type == "ascending" || type == "newest" ||type == "z-a")

    updateProjects(sort,type)
}


function toggleNav(){
    nav = document.getElementById("nav");
    nav.classList.toggle("active");

    hamburger = document.getElementById("hamburger");
    hamburger.classList.toggle("active");
}

sortValues();

let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.getElementById("darktoggle");
var elements = document.getElementsByClassName("themed");

const enableDarkMode = () => {
    localStorage.setItem("darkMode", "enabled");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add("dark");
    }
};
const disableDarkMode = () => {
    localStorage.setItem("darkMode", "disabled");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("dark");
    }
};
if (darkMode === "enabled") {
    enableDarkMode();
} else if (darkMode === "disabled") {
    disableDarkMode();
} else {
    let systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log("Fell back to system settings");
    if (systemDarkMode) {
        enableDarkMode();
    }
}

function toggleDark(){
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        enableDarkMode();
        console.log("Enabled")
    } else {
        disableDarkMode();
        console.log("Disabled")
    }
}
    


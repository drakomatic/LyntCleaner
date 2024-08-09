const preflocation = browser.runtime.getURL("Shared/UserPrefs.json");

var Checkboxes = {}

function apply(){
    location.reload()
}

async function LoadPrefs() {
    var fet = await fetch(preflocation)
    var Prefs = await fet.json()
    for(var pref in Prefs){
        Checkboxes[pref] = document.getElementById(pref)
        Checkboxes[pref].checked = Prefs[pref]
    }
    document.getElementById("apply").addEventListener("click", apply);
}

LoadPrefs()
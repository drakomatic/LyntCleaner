const preflocation = browser.runtime.getURL("Shared/UserPrefs.json");

var UserPreferences = {}

//specific fix for profile page
var elements = document.getElementsByClassName("flex flex-col gap-3 max-w-[600px]")
function waitForElement(){
    if(typeof elements[0] !== "undefined"){
        elements[0].style.maxWidth = "100%"
    }
    else{
        setTimeout(waitForElement, 250);
    }
}

function compileSettings(UserPrefs){
    var compiled = ``

    if(UserPrefs.fontclean){
        compiled += `
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

            html{
                font-family: 'Noto Sans', sans-serif;
            }

            button{
                font-size: 14px;
            }
            
            .text-lg {
                font-size: 1rem;
                line-height: normal;
            }

            .text-xl {
                font-size: 1.1rem;
                line-height: 1.75rem;
            }
        `
    }

    if(UserPrefs.enlargefeed){
        compiled += `
        .max-w-\\[600px\\] {
            max-width: 75%;
        }

        .max-w-\\[530px\\] {
            max-width: calc(100% - 1.5rem);
        }
        `
        waitForElement()
    }

    if(UserPrefs.bgclean){
        compiled += `
        .bg-lynt-foreground {
            --tw-bg-opacity: 0;
            background-color: hsl(var(--lynt-focus) / var(--tw-bg-opacity));
        }

        .border-2 {
            border-width: 1px;
        }

        .border-primary {
            --tw-border-opacity: .3;
            border-color: hsl(var(--primary) / var(--tw-border-opacity));
        }
        `
    }

    if(UserPrefs.sidebarclean){
        compiled += `
        .md\\:min-w-\\[250px\\] {
            min-width: 250px;
            --tw-bg-opacity: 0;
            background-color: hsl(var(--border) / var(--tw-bg-opacity));
        }
        `
    }

    return compiled
}

async function GetPreferences() {
    var grab = await fetch(preflocation)
    var json = await grab.json()
    UserPreferences = json

    console.log(UserPreferences)

    var style = document.createElement("style")
    style.textContent = compileSettings(UserPreferences)
    document.head.appendChild(style)
}

GetPreferences()

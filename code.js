"use strict";

/* Global constants */
const inputSearch = document.querySelector(".nav__search");
const closeSearchBtn = document.querySelector(".nav__search-close");
const usernameInput = document.getElementById("username");
const nameSaved = document.getElementById("saved-name");
const usernameSaved = localStorage.getItem("username");

const settingsBtn = document.querySelector(".nav-settings__icon");
const settingsMenu = document.querySelector(".settings-menu");
const fontsBtn = document.querySelector(".dropdown-menu__chevron");
const fontsOptions = document.querySelector(".font-styles");
const userBtn = document.querySelector(".nav-profile__icon");
const userMenu = document.querySelector(".profile-menu");
const boardBtns = document.querySelectorAll(".board-settings__icon");
const boardMenus = document.querySelectorAll(".board-settings__menu");

const menus = document.querySelectorAll(".menu-styles");

/* const usernameValue = localStorage.getItem("username"); */

/* Hidden and visible state of an element */
const hiddenState = (e)=> {
    if (e.classList.contains("visible")) {
        e.classList.remove("visible");
        e.classList.add("hidden");
    } else if (e.classList.contains("visible-flex")) {
        e.classList.remove("visible-flex");
        e.classList.add("hidden");
    }
}

const visibleState = (e)=> {
    if (e.classList.contains("hidden")) {
        e.classList.remove("hidden");
        e.classList.add("visible");
    } 
}

const visibleStateFlex = (e)=> {
    if (e.classList.contains("hidden")) {
        e.classList.remove("hidden");
        e.classList.add("visible-flex");
    } 
}

//Function to show or hide menu when they are clicked
const clickVisibility = (e)=> {
    if (e.classList.contains("visible-flex") || e.classList.contains("visible")) {
        hiddenState(e);
    } else {
        visibleStateFlex(e);
    }
}

//function to hide the menu when clicking outside it
const clickOutside = (e, menu)=> {
    e.stopPropagation();
    if (!menu.contains(e.target)) {
        hiddenState(menu);
    }
}

//function to hide the fonts styles when settings menu is hide
const hideFonts = ()=> {
    if (settingsMenu.classList.contains("hidden")) {
        fontsBtn.classList.remove("icon-rotation");
        hiddenState(fontsOptions);
       }
}


/* Function that detects whether the user already has the name saved to display or not the page that contains the projects */
document.addEventListener("DOMContentLoaded", ()=> {

    const nameWindow = document.querySelector(".name-window");
    const projectsWindow = document.querySelector(".projects");
    const continueBtn = document.querySelector(".continue");

    if (usernameSaved) {
        nameWindow.classList.remove("visible-flex");
        visibleState(projectsWindow);
        nameSaved.textContent = usernameSaved;
    } else {
        nameWindow.classList.add("visible-flex");

        /* Function to detect if the name entered by the user is valid as it has 4 or more letters */
        const functionName = ()=> {
            const labelLine = document.querySelector(".input__label-line");
            const username = usernameInput.value.trim();
            const nameValidation = (username.match(/[a-zA-Z]/g) || []).length;
            const invalidName = document.querySelector(".name-container__text-error");

            if (nameValidation < 4) {
                usernameInput.classList.add("error");
                labelLine.classList.add("error");
                visibleState(invalidName);
                return;
            }
        
            localStorage.setItem("username", username);
        
            nameWindow.classList.remove("visible-flex");
            visibleState(projectsWindow);
            nameSaved.textContent = username; //In this part, username is entered since with the usernameSaved constant it loads from the beginning and if we use this constant the name stored in localStorage would not be seen since the information would be taken from localstorage when the DOM was loaded as soon as the page started and it was empty.
        
            console.log("El nombre del usuario es " + username);
        } 

        /* Event that detects that we press the continue button and activates the function that validates the name to be able to continue */
        continueBtn.addEventListener("click", (e)=> {
            e.preventDefault();
            functionName();
        })

        /* Event that detects that we press the enter key to continue and activates the function that validates the name just like the function of the previous button */
        usernameInput.addEventListener("keydown", (e)=> {
            if (e.key === "Enter") {
                e.preventDefault();
                functionName();
            }
        })
    }
})

/* Event that displays the button that removes the text from the search input */
inputSearch.addEventListener("input", (e)=> {
    e.preventDefault();
    const value = inputSearch.value;

    if (value) {
        visibleState(closeSearchBtn);
    } else {
        hiddenState(closeSearchBtn);
    }
})

/* Event that causes the closeSearchBtn button delete the text that is in the search input */
closeSearchBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    inputSearch.value = "";
    hiddenState(closeSearchBtn);
    inputSearch.focus();
})


//event that detects and displays the options when clicked on settings
settingsBtn.addEventListener ("click", (e)=> {
    e.stopPropagation();
    clickVisibility(settingsMenu);
    clickOutside(e, userMenu);
    boardMenus.forEach(menu => hiddenState(menu));
});

//event that displays fonts and rotates the chevron icon
fontsBtn.addEventListener("click", ()=> {

    if (fontsBtn.classList.contains("icon-rotation")){
        fontsBtn.classList.remove("icon-rotation");
    } else {
        fontsBtn.classList.add("icon-rotation");
    }
    clickVisibility(fontsOptions);
})

//event that displays the user profile menu
userBtn.addEventListener ("click", (e)=> {
    e.stopPropagation();
    clickVisibility(userMenu);
    clickOutside(e, settingsMenu);
    boardMenus.forEach(menu => hiddenState(menu));
    hideFonts();
});

//Foreach and event that show board menus
boardBtns.forEach((boardBtn, index) => {
    boardBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        boardMenus.forEach(menu => hiddenState(menu));
        clickVisibility(boardMenus[index]);
        clickOutside(e, userMenu);
        clickOutside(e, settingsMenu);
        hideFonts();

    });
});

//event that detects that when we click outside some menu it is hidden
document.addEventListener("click", (e)=> {
    e.stopPropagation();
    
    menus.forEach(menu => {
        clickOutside(e, menu);
        hideFonts();
    })
});

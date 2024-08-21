"use strict";

/* Global constants */
const inputSearch = document.querySelector(".nav__search");
const closeSearchBtn = document.querySelector(".nav__search-close");
const usernameInput = document.getElementById("username");

/* Hidden and visible state of an element */
const hiddenState = (e)=> {
    if (e.classList.contains("visible")) {
        e.classList.remove("visible");
        e.classList.add("hidden");
    }
}

const visibleState = (e)=> {
    if (e.classList.contains("hidden")) {
        e.classList.remove("hidden");
        e.classList.add("visible");
    }
}

/* Function that detects whether the user already has the name saved to display or not the page that contains the projects */
document.addEventListener("DOMContentLoaded", ()=> {

    const nameWindow = document.querySelector(".name-window");
    const projectsWindow = document.querySelector(".projects");
    const continueBtn = document.querySelector(".continue");
    const usernameSaved = localStorage.getItem("username");

    if (usernameSaved) {
        nameWindow.classList.remove("visible-flex");
        visibleState(projectsWindow);
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
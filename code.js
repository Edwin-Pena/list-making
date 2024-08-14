"use strict";

const inputSearch = document.querySelector(".nav__search");
const closeBtn = document.querySelector(".nav__search-close");

const usernameInput = document.getElementById("username");

document.addEventListener("DOMContentLoaded", ()=> {

    const nameWindow = document.querySelector(".name-window");
    const projectsWindow = document.querySelector(".projects");
    const continueBtn = document.querySelector(".continue");
    const usernameSaved = localStorage.getItem("username");

    if (usernameSaved) {
        nameWindow.style.display = "none";
        projectsWindow.style.display = "block";
    } else {
        nameWindow.style.display = "flex";

        const functionName = ()=> {
            const labelLine = document.querySelector(".input__label-line");
            const username = usernameInput.value.trim();
            const nameValidation = (username.match(/[a-zA-Z]/g) || []).length;
            const invalidName = document.querySelector(".name-container__text-error");

            if (nameValidation < 4) {
                usernameInput.classList.add("error");
                labelLine.style.color = "#e62a2a";
                invalidName.style.display = "block";
                return;
            }
        
            localStorage.setItem("username", username);
        
            nameWindow.style.display = "none";
            projectsWindow.style.display = "block";
        
            console.log("El nombre del usuario es " + username);
        }


        continueBtn.addEventListener("click", (e)=> {
            e.preventDefault();
            functionName();
        })

        usernameInput.addEventListener("keydown", (e)=> {
            if (e.key === "Enter") {
                e.preventDefault();
                functionName();
            }
        })
    }
})


inputSearch.addEventListener("input", (e)=> {
    e.preventDefault();
    const value = inputSearch.value.trim()

    if (value) {
        closeBtn.style.display = "block";
    } else {
        closeBtn.style.display = "none";
    }
})

closeBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    inputSearch.value = "";
    closeBtn.style.display = "none";
    inputSearch.focus();
})
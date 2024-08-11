"use strict";

const inputSearch = document.querySelector(".projects__search");
const closeBtn = document.querySelector(".projects__close");

document.addEventListener("DOMContentLoaded", ()=> {

    const nameWindow = document.querySelector(".name-window");
    const projectsWindow = document.querySelector(".projects");
    const continueBtn = document.querySelector(".name-window__boton");
    const usernameSaved = localStorage.getItem("username");

    if (usernameSaved) {
        nameWindow.style.display = "none";
        projectsWindow.style.display = "block";
    } else {
        continueBtn.addEventListener("click", (e)=> {
            e.preventDefault();

            const usernameInput = document.getElementById("username");
            const username = usernameInput.value;
        
            localStorage.setItem("username", username);
        
            nameWindow.style.display = "none";
            projectsWindow.style.display = "block";
        
            console.log("El nombre del usuario es " + username);
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
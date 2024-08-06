"use strict";

document.addEventListener("DOMContentLoaded", ()=> {

    const nameWindow = document.querySelector(".name-window");
    const projectsWindow = document.querySelector(".projects");
    const continueBtn = document.querySelector(".name-window__boton");

    /* const username = usernameInput.value; */
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

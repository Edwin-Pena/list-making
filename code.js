"use strict";

/* Global constants */
const projectsWindow = document.querySelector(".projects");

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
const menus = document.querySelectorAll(".menu-styles");

//Constants and functions to create new boards
const boardsContainer = document.querySelector(".boards-container");
const createBoardBtn = document.getElementById("add-board");
const addBoardBtn = document.getElementById("add");
const newboardVindow = document.querySelector(".newBoard-window");
const NewBoarderror = document.querySelector(".newBoard-floatWindow__restrictions");


//Hidden and visible state of an element
const hiddenState = (e)=> {
    if (e.classList.contains("visible")) {
        e.classList.remove("visible");
        e.classList.add("hidden");
    } else if (e.classList.contains("visible-flex")) {
        e.classList.remove("visible-flex");
        e.classList.add("hidden");
    } else {
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

//function that performs the transaction operation
const transactionOperation = (database, mode, msg) => {
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction(database, mode);
    const objectStore = IDBTransaction.objectStore(database);
    IDBTransaction.addEventListener("complete", () => {
        console.log(msg);
    });
    return objectStore;
};


/* Function that detects whether the user already has the name saved to display or not the page that contains the projects */
document.addEventListener("DOMContentLoaded", ()=> {

    const nameWindow = document.querySelector(".name-window");
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
    document.querySelectorAll(".board-settings__menu").forEach(menu => hiddenState(menu));
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
    document.querySelectorAll(".board-settings__menu").forEach(menu => hiddenState(menu));
    hideFonts();
});


//code for add new boards with Api

//The window to create new boards appears when we click on the newboard button
createBoardBtn.addEventListener("click", () => {
    newboardVindow.classList.add("active");
    inputBoardName.value = "";
})

// Detects mousedown on the div so that only when the click is initially on the div and not on one of its children, it is hidden
newboardVindow.addEventListener("mousedown", (e) => {
    if (e.target === newboardVindow) {
        newboardVindow.classList.remove("active");
        inputBoardName.value = "";
        inputBoardName.classList.remove("invalid");
        hiddenState(NewBoarderror);
    }
});


//------Code that creates the database to store the boards with indexdDB----
const IDBRequest = indexedDB.open("boardsBase", 1);

IDBRequest.addEventListener("upgradeneeded", () => {
    const db = IDBRequest.result;
    db.createObjectStore("boards", {
        autoIncrement: true
    });
});

IDBRequest.addEventListener("success", () => {
    console.log("Data loaded successfully");
    readObjects();
    
});

IDBRequest.addEventListener("error", () => {
    console.log("An error occurred while opening the database");
});

const BoardAddition = () => {
    let BoardNameValue = document.getElementById("board-title").value.trim();
    if (BoardNameValue.length >= 4) {
        addObject({board: BoardNameValue});
        readObjects();
        newboardVindow.classList.remove("active");
        inputBoardName.classList.remove("invalid");
        hiddenState(NewBoarderror);
    } else {
        inputBoardName.classList.add("invalid");
        visibleState(NewBoarderror);
        console.log("error");
        
    }
}

addBoardBtn.addEventListener("click", BoardAddition);

const inputBoardName = document.getElementById("board-title");

inputBoardName.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        BoardAddition();
    }
});

const addObject = object => {
    const IDBData = transactionOperation("boards", "readwrite", "object added successfully");
    IDBData.add(object);
}

const readObjects = () => {
    const IDBData = transactionOperation("boards", "readonly");
    const cursor = IDBData.openCursor();
    const fragment = document.createDocumentFragment();
    boardsContainer.replaceChildren();

    cursor.addEventListener("success", () => {
        if (cursor.result) {
            //Here I commented on the id since this data is not used in the creatingBoards function, I will do it temporarily and test to see if it works without it.
            let element = creatingBoards(/* cursor.result.key, */ cursor.result.value);
            fragment.appendChild(element);
            cursor.result.continue();
        } else {
            boardsContainer.appendChild(fragment);
        }
    });
};

const modifyObject = (key, objeto) => {
    const IDBData = transactionOperation("boards", "readwrite", "object modified successfully");
    IDBData.put(objeto, key);
};

const deleteObject = (key) => {
    const IDBData = transactionOperation("boards", "readwrite", "object removed successfully");
    IDBData.delete(key);
};


//function that creates boards and the elements that go inside them
//Here I commented on the id since this data is not used in the creatingBoards function
const creatingBoards = (/* id, */ boardName) => {
    const boardContainer = document.createElement("div");
    const boardTitle = document.createElement("div");
    const settingsContainer = document.createElement("div");
    const settingsIcon = document.createElement("i");
    const menuOptions = document.createElement("div");
    const editBtn = document.createElement("p");
    const deleteBtn = document.createElement("p");

    boardContainer.classList.add("board");
    boardTitle.classList.add("board__name");
    settingsContainer.classList.add("board-settings");
    settingsIcon.classList.add("fa-solid", "fa-ellipsis", "board-settings__icon");
    menuOptions.classList.add("board-settings__menu", "menu-styles", "hidden");
    editBtn.classList.add("Board-menu__option");
    deleteBtn.classList.add("Board-menu__option");

    editBtn.textContent = "Edit name";
    deleteBtn.textContent = "Delete";
    boardTitle.textContent = boardName.board;

    menuOptions.appendChild(editBtn);
    menuOptions.appendChild(deleteBtn);

    settingsContainer.appendChild(settingsIcon);
    settingsContainer.appendChild(menuOptions);

    boardContainer.appendChild(boardTitle);
    boardContainer.appendChild(settingsContainer);

    return boardContainer;
}
//-------------------------------------------------------------------

//Function that shows and hides board menus when clicking on them
boardsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("board-settings__icon")) {
            e.stopPropagation();

            const boardSettings = e.target.nextElementSibling;
            const isMenuOpen = boardSettings.classList.contains("visible-flex") || boardSettings.classList.contains("visible");

            document.querySelectorAll(".board-settings__menu").forEach(menu => hiddenState(menu));

            if (isMenuOpen) {
                hiddenState(boardSettings);
            } else {
                visibleStateFlex(boardSettings);
            }

            clickOutside(e, userMenu);
            clickOutside(e, settingsMenu);
            hideFonts();
        }
    });


//event that detects that when we click outside some menu it is hidden
document.addEventListener("click", (e)=> {
    menus.forEach(menu => {
        clickOutside(e, menu);
        hideFonts();
    });

    document.querySelectorAll(".board-settings__menu").forEach(menu => {
        clickOutside(e, menu);
        hideFonts();
    });;
});

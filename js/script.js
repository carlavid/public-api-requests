/**
 * Treehouse FSJS Techdegree 
 * Project 5 - Public API Requests
 */ 


/**
 * Global constants
 */
let users;
const gallery = document.querySelector(".gallery");


/**
 * Function to fetch data for 12 random users
 */
async function getUsers() {
    const response = await fetch("https://randomuser.me/api/?results=12&nat=us&inc=name,email,picture,location,dob,cell");

    const data = await response.json();
    users = data.results;
    displayUsers(users);

}


/**
 * Function to display users
 * @param {array} users - The array of user objects
 */
function displayUsers(users) {
    users.forEach(user => {
        userHtml = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${user.picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>`;

        gallery.insertAdjacentHTML("beforeend", userHtml);
    })
}
// Call function
getUsers();


/**
 * Function to display modal window w/ user info
 * @param {object} user - The user object
 */
function displayUserModal(user) {
    if (user === undefined) {
        return;
    } else {
        const dob = new Date(user.dob.date);
        const formattedDob = dob.toLocaleDateString().replace("-", "/");

        const modalHtml = `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${user.picture.large} alt="profile picture">
                        <h3 id="${user.name.first}${user.name.last}" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${user.cell}</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formattedDob}</p>
                    </div>
                </div>
            </div>
            `; 
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        addModalToggle();
    }
    
}


/**
 * Event listener to handle displaying user modal window
 * when any part of an employee item is clicked
 */
gallery.addEventListener("click", (e) => {
    const userCard = e.target.closest(".card");
    if (!userCard) return;
    
    const userName = userCard.querySelector(".card-info-container .card-name").innerHTML;
    const user = users.find(
        (user) => `${user.name.first} ${user.name.last}` === userName
    );
    displayUserModal(user);
});


/**
 * Event listener to handle closing modal window when user
 * clicks close button
 */
document.body.addEventListener("click", (e) => {
    const closeBtn = document.querySelector(".modal-close-btn");
    const modalContainer = document.querySelector(".modal-container");
    if (e.target === closeBtn || e.target.textContent === "X") {
        modalContainer.remove();
    }
})


/**
 * Function to add search bar 
 */
const searchContainer = document.querySelector(".search-container");
function addSearchBar() {
    const searchHtml = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form> 
    `;
    searchContainer.insertAdjacentHTML('beforeend', searchHtml);
}
addSearchBar()


/**
 * Event listener to add search functionality and filter
 * employees in real-time based on user input
 */
const employeeSearch = document.getElementById("search-input");

employeeSearch.addEventListener("keyup", () => {
    const employees = gallery.children

    for (let i = 0; i < employees.length; i++) {
        const userInput = employeeSearch.value.toLowerCase();
        const employee = employees[i];
        const employeeName = employee.querySelector(".card-info-container").querySelector(".card-name").innerHTML;

        if (!employeeName.toLowerCase().includes(userInput)) {
            employee.style.display = "none";
        } else if (employeeName.toLowerCase().includes(userInput)) {
            employee.style.display = "flex";
        }
    }
    
 });


/**
 * Function to add modal toggle 
 */
function addModalToggle() {
    const modalContainer = document.querySelector(".modal-container");
    const modalToggleHtml = `
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        `;
    modalContainer.insertAdjacentHTML("beforeend", modalToggleHtml);
}


/**
 * Event listener to handle toggle functionality
 */
document.body.addEventListener("click", (e) => {
    const nextModalBtn = document.getElementById("modal-next");
    const prevModalBtn = document.getElementById("modal-prev");
    const modalContainer = document.querySelector(".modal-container");
    const modalInfo = document.querySelector(".modal-info-container"); 

    for (let i = 0; i < users.length; i++) {
        let employeeID = `${users[i].name.first}${users[i].name.last}`
        let employeeElement = document.querySelector(`#${employeeID}`);

        if (e.target === nextModalBtn && modalInfo.contains(employeeElement)) {
            modalContainer.remove();
            displayUserModal(users[i+1]);
        } else if (e.target === prevModalBtn && modalInfo.contains(employeeElement)) {
            modalContainer.remove();
            displayUserModal(users[i-1]);
        }
    }
})
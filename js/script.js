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
    const dob = new Date(user.dob.date);
    const formattedDob = dob.toLocaleDateString().replace("-", "/");

    const modalHtml = `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${user.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${formattedDob}</p>
            </div>
        </div>
        `; 
    document.body.insertAdjacentHTML('beforeend', modalHtml);
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
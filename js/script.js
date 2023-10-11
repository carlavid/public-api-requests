/**
 * Treehouse FSJS Techdegree 
 * Project 5 - Public API Requests
 */ 


/**
 * Global constants
 */
const gallery = document.querySelector("#gallery");

/**
 * Function to fetch data for 12 random users
 */
async function getUsers() {
    const response = await fetch("https://randomuser.me/api/?results=12&inc=name,email,picture,location");

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
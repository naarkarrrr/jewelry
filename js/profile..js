// profile.js
document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem('access_token');
    const decodedToken = jwt_decode(accessToken);
    // Make an AJAX request to get the user's data
    fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
            "Authorization": `"Bearer " + ${accessToken}`,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        // Populate the profile page with user-specific data
        document.getElementById("username").textContent = data.username;
        document.getElementById("profile-picture").src = data.profilePicture;
        document.getElementById("email").textContent = data.email;
        // Update other profile information as needed
    })
    .catch((error) => {
        console.error("Error fetching user data: " + error);
    });
});

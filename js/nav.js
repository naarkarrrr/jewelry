// what to show in login and what to shwo on logout 

document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in
    const accessToken = localStorage.getItem('access_token');
    const userDropdown = document.getElementById('userDropdown');
    const loginLink = document.getElementById('loginLink');
    const logoutButton = document.getElementById('logoutButton');
    const profileLink = document.getElementById('profileLink');
    const registerLink = document.getElementById('registerLink');

    if (accessToken) {
        // User is logged in
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        profileLink.style.display = 'inline-block';
    } else {
        // User is not logged in
        loginLink.style.display = 'inline-block';
        registerLink.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        profileLink.style.display = 'none';
    }

    // Logout button click event
    logoutButton.addEventListener('click', async function () {
        try {
            // Get the access token from localStorage
            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            // Make a POST request to your logout endpoint
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Remove the access token from localStorage
                localStorage.removeItem('access_token');

                // Update the UI to show login and register links, hide logout and profile links
                loginLink.style.display = 'inline-block';
                registerLink.style.display = 'inline-block';
                logoutButton.style.display = 'none';
                profileLink.style.display = 'none';

                alert('Logout successful');
                // Redirect to the login page or any other desired location
                window.location.href = '/login.html';
            } else {
                const errorData = await response.json();
                console.log('Logout failed:', errorData);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});  


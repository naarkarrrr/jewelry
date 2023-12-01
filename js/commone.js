// External JS code with jwt-decode library

// Function to fetch user's cart data
async function getUserCart() {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('User not authenticated');
      }
  
      const decodedToken = window.jwt_decode(token); // Use window.jwt_decode
      const userId = decodedToken.userId;
  
      const response = await fetch(`/api/cart/find/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user cart');
      }
  
      const cartData = await response.json();
      return cartData.products; // Assuming products is an array in your cartData
    } catch (error) {
      console.error('Error fetching user cart:', error);
      return [];
    }
  }
  
  // Function to update the cart items in the HTML
  async function updateCartInHTML() {
    const cartItems = await getUserCart();
  
    const cartPopup = document.getElementById('cart-popup');
  
    // Clear existing content
    cartPopup.innerHTML = '';
  
    // Iterate through cart items and append HTML elements
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="image">
          <a href="#"><img alt="Image Description" src="${item.imageUrl}"></a>
        </div>
        <div class="description">
          <span class="product-name"><a href="#">${item.productName}</a></span>
          <span class="price">₹${item.price}</span>
        </div>
        <a class="icon-close" href="#"></a>
      `;
  
      cartPopup.appendChild(li);
    });
  }
  
  // Call the updateCartInHTML function on page load
  document.addEventListener('DOMContentLoaded', updateCartInHTML);
  
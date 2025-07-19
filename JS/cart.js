// Cart logic for eCommerce site with URL parameter support

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add item to cart via URL parameters
function addToCartFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const name = urlParams.get('name');
    const price = parseFloat(urlParams.get('price'));
    let image = urlParams.get('image');
    
    if (id && name && price && image) {
        // Fix image path if it's a relative path
        if (image && !image.startsWith('http') && !image.startsWith('/')) {
            if (image.startsWith('Images/')) {
                // Path is already correct
                image = image;
            } else if (image.includes('Images/')) {
                // Extract just the Images/ part if it's a longer path
                const imagesIndex = image.indexOf('Images/');
                image = image.substring(imagesIndex);
            }
        }
        
        addToCart(id, name, price, image);
        
        // Clear URL parameters after adding to cart
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
        
        return true;
    }
    return false;
}

function addToCart(id, name, price, image) {
    let cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    setCart(cart);
    alert(`${name} added to cart!`);
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function loadCart() {
    const cart = getCart();
    const container = document.getElementById('cartItems');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    
    console.log('Loading cart with items:', cart);
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        
        // Fix image path - convert relative paths to work from cart.html location
        let imagePath = item.image;
        console.log('Processing item:', item.name, 'with original image path:', imagePath);
        
        if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
            // If the path doesn't start with http or /, it's a relative path
            // Product pages in subdirectories pass paths like '../../Images/filename.jpg'
            // We need to convert them to 'Images/filename.jpg' for cart.html
            if (imagePath.startsWith('Images/')) {
                // Path is already correct for cart.html
                imagePath = imagePath;
                console.log('Path already correct:', imagePath);
            } else if (imagePath.includes('Images/')) {
                // Extract just the Images/ part if it's a longer path (e.g., '../../Images/filename.jpg' -> 'Images/filename.jpg')
                const imagesIndex = imagePath.indexOf('Images/');
                imagePath = imagePath.substring(imagesIndex);
                console.log('Extracted Images/ path:', imagePath);
            } else {
                // Fallback to default image
                imagePath = 'Images/default-product.jpg';
                console.log('Using fallback image:', imagePath);
            }
        }
        
        console.log('Final image path for', item.name, ':', imagePath);
        
        div.innerHTML = `
            <img src="${imagePath}" alt="${item.name}" 
                 onerror="console.error('Failed to load image for ${item.name}:', this.src); this.src='Images/default-product.jpg';"
                 onload="console.log('Successfully loaded image for ${item.name}:', this.src)">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div class="price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-qty">
                <input type="number" min="1" max="99" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
        `;
        container.appendChild(div);
    });
}

function updateQuantity(id, qty) {
    let cart = getCart();
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity = Math.max(1, parseInt(qty));
        setCart(cart);
        loadCart();
        updateCartCount();
        updateSummary();
    }
}

function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(p => p.id !== id);
    setCart(cart);
    loadCart();
    updateCartCount();
    updateSummary();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
    updateCartCount();
    updateSummary();
}

function checkout() {
    window.location.href = "checkout.html";
}

// Calculate and update subtotal and total
function updateSummary() {
    const cart = getCart();
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const subtotalElement = document.getElementById('cartSubtotal');
    const totalElement = document.getElementById('cartTotal');
    
    if (subtotalElement) subtotalElement.textContent = subtotal.toFixed(2);
    if (totalElement) totalElement.textContent = subtotal.toFixed(2);
}

// Test function to add a sample item to cart for debugging
function addTestItem() {
    const testItem = {
        id: 'test-item',
        name: 'Test Product',
        price: 29.99,
        image: 'Images/1631670206487203840.jpg',
        quantity: 1
    };
    
    let cart = getCart();
    cart.push(testItem);
    setCart(cart);
    loadCart();
    updateCartCount();
    updateSummary();
    console.log('Test item added to cart');
}

// Function to test cart with fresh data
function testCartWithFreshData() {
    // Clear existing cart
    clearCart();
    
    // Add test item
    addTestItem();
    
    console.log('Cart cleared and test item added');
}

// Mobile menu functionality for cart page
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
});
# Cart System Setup

## How It Works

1. **Product Page**: When user clicks "Add to Cart", it redirects to `cart.html` with product data as URL parameters
2. **Cart Page**: `cart.js` reads the URL parameters and stores the data in localStorage
3. **Display**: Cart items are displayed dynamically from localStorage data

## Product Page Setup

For each product page, update the "Add to Cart" button like this:

```html
<button class="btn btn-primary" onclick="window.location.href='../../cart.html?id=PRODUCT_ID&name=' + encodeURIComponent('PRODUCT_NAME') + '&price=PRICE&image=' + encodeURIComponent('IMAGE_PATH')">Add to Cart</button>
```

### Example:
```html
<button class="btn btn-primary" onclick="window.location.href='../../cart.html?id=casual-sweater-hoodie&name=' + encodeURIComponent('Casual Sweater Hoodie Printed Sweatshirt') + '&price=54.99&image=' + encodeURIComponent('../../Images/9d41edee-7be5-42c8-9387-85152a1dfe60.jpg')">Add to Cart</button>
```

## Parameters

- `id`: Unique product identifier
- `name`: Product name (use `encodeURIComponent()` for special characters)
- `price`: Product price (number)
- `image`: Image path (use `encodeURIComponent()` for special characters)

## Files Used

- `cart.html`: Cart page that displays items
- `cart.js`: Handles URL parameters and localStorage operations
- Product pages: Send data via URL parameters

## Testing

1. Open any product page
2. Click "Add to Cart"
3. You'll be redirected to cart.html with the item added
4. The URL parameters will be cleared automatically
5. Cart data persists in localStorage for the session 
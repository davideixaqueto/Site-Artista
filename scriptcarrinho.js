document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const TotalElement = document.querySelector('.Total p');
    const addToCartButton = document.getElementById('add-to-cart');

    let cart = [];
    let Total = 0;

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Nenhum item no carrinho</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                <p>${item.name} <span class="cart-item-quantity">${item.quantity} x </span> - $${(item.price * item.quantity).toFixed(2)}</p>
                <button data-index="${index}" class="remove-item">Remover</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        TotalElement.textContent = `Total: R$${Total.toFixed(2)}`;

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeItemFromCart);
        });
    }

    function addItemToCart() {
        const productName = document.querySelector('.product-name').textContent;
        const productPrice = parseFloat(document.querySelector('.product-price').textContent.replace('$', ''));
        const quantity = parseInt(document.getElementById('quantity').value);

        const existingItemIndex = cart.findIndex(item => item.name === productName);
        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: quantity });
        }

        Total += productPrice * quantity;
        updateCartUI();
    }

    function removeItemFromCart(event) {
        const itemIndex = event.target.dataset.index;
        const item = cart[itemIndex];

        Total -= item.price * item.quantity;
        cart.splice(itemIndex, 1);
        updateCartUI();
    }

    addToCartButton.addEventListener('click', addItemToCart);
    updateCartUI();
});

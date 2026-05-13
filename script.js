const products = [
    { id: 1, name: "Lápiz Grafito HB x12", price: 2990, cat: "Escritura", img: "https://images.unsplash.com/photo-1565359184520-fcff70f99c24?w=300" },
    { id: 2, name: "Cuaderno Universitario", price: 3500, cat: "Papelería", img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300" },
    { id: 3, name: "Set Acuarelas Pro", price: 15990, cat: "Arte", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300" },
    { id: 4, name: "Calculadora Científica", price: 22000, cat: "Tecnología", img: "https://images.unsplash.com/photo-1648201637025-1c77b9be3013?w=300" },
    { id: 5, name: "Mouse Inalámbrico", price: 12900, cat: "Tecnología", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300" },
    { id: 6, name: "Agenda Premium 2026", price: 8900, cat: "Papelería", img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=300" }
];

let cart = [];

const productGrid = document.getElementById('product-grid');
const cartContent = document.getElementById('cart-content');
const cartCounter = document.getElementById('cart-counter');
const cartTotal = document.getElementById('cart-total');
const checkoutForm = document.getElementById('checkoutForm');
const formMessage = document.getElementById('form-message');
const searchInput = document.getElementById('searchInput');

const sanitizeInput = (value) => {
    return value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .trim();
};

const validateName = (name) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{5,60}$/;
    return regex.test(name);
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const renderProducts = (category = 'Todos', search = '') => {

    productGrid.textContent = '';

    let filtered = products;

    if (category !== 'Todos') {
        filtered = filtered.filter(product => product.cat === category);
    }

    if (search.trim() !== '') {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    filtered.forEach(product => {

        const card = document.createElement('article');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = product.img;
        image.alt = product.name;

        const title = document.createElement('h4');
        title.textContent = product.name;

        const categoryText = document.createElement('p');
        categoryText.textContent = `Categoría: ${product.cat}`;

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = `$${product.price.toLocaleString('es-CL')}`;

        const button = document.createElement('button');
        button.classList.add('btn-add');
        button.textContent = 'Agregar al carrito';

        button.addEventListener('click', () => {
            addItem(product.id);
        });

        card.append(image, title, categoryText, price, button);
        productGrid.appendChild(card);
    });
};

const addItem = (id) => {

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    renderCart();
};

const removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    renderCart();
};

const renderCart = () => {

    cartContent.textContent = '';

    if (cart.length === 0) {

        const empty = document.createElement('p');
        empty.textContent = 'El carrito está vacío';
        cartContent.appendChild(empty);

        cartCounter.textContent = '0';
        cartTotal.textContent = '$0';
        return;
    }

    let total = 0;
    let quantity = 0;

    cart.forEach(item => {

        total += item.price * item.qty;
        quantity += item.qty;

        const container = document.createElement('div');
        container.classList.add('cart-item');

        const name = document.createElement('span');
        name.textContent = `${item.name} x${item.qty}`;

        const price = document.createElement('span');
        price.textContent = `$${(item.price * item.qty).toLocaleString('es-CL')}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Eliminar';

        deleteButton.addEventListener('click', () => {
            removeItem(item.id);
        });

        container.append(name, price, deleteButton);
        cartContent.appendChild(container);
    });

    cartCounter.textContent = quantity;
    cartTotal.textContent = `$${total.toLocaleString('es-CL')}`;
};

checkoutForm.addEventListener('submit', (event) => {

    event.preventDefault();

    if (cart.length === 0) {
        showMessage('Debes agregar productos al carrito.', true);
        return;
    }

    const name = sanitizeInput(document.getElementById('custName').value);
    const email = sanitizeInput(document.getElementById('custEmail').value);
    const payment = sanitizeInput(document.getElementById('paymentMethod').value);

    if (!validateName(name)) {
        showMessage('Nombre inválido.', true);
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Correo inválido.', true);
        return;
    }

    if (payment === '') {
        showMessage('Selecciona un método de pago.', true);
        return;
    }

    showMessage(`Gracias ${name}. Tu pedido fue realizado con éxito 🎉`);

    cart = [];
    renderCart();
    checkoutForm.reset();
});

const showMessage = (message, error = false) => {

    formMessage.textContent = message;

    formMessage.className = error
        ? 'message error'
        : 'message success';
};

document.querySelectorAll('[data-category]').forEach(button => {

    button.addEventListener('click', () => {
        renderProducts(button.dataset.category, searchInput.value);
    });
});

searchInput.addEventListener('input', () => {
    renderProducts('Todos', searchInput.value);
});

window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
});

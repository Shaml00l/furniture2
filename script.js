// Product data (using your images)
const products = [
  {
    title: 'Stylish Grey Chair',
    desc: 'A modern, comfortable chair perfect for any room.',
    price: 120,
    image: 'beautiful-shot-stylish-grey-chair-isolated-white-background.jpg',
  },
  {
    title: 'Mid-Century Modern Living Room',
    desc: 'Complete living room set with velvet couch and blue rug.',
    price: 950,
    image: 'chic-mid-century-modern-luxury-aesthetics-living-room-with-gray-velvet-couch-blue-rug.jpg',
  },
  {
    title: 'Scandinavian Living Room',
    desc: 'Minimalist design with cozy textures and natural light.',
    price: 800,
    image: 'living-room-scandinavian-interior-design.jpg',
  },
  {
    title: 'Mid-Century Living Room with Monstera',
    desc: 'Elegant mid-century set with a touch of greenery.',
    price: 870,
    image: 'mid-century-modern-living-room-interior-design-with-monstera-tree.jpg',
  },
  {
    title: 'Luxury Dining Room',
    desc: 'Modern dining set for stylish gatherings.',
    price: 1100,
    image: 'modern-luxury-authentic-dining-room-interior-design.jpg',
  },
  {
    title: 'Wooden Sideboard with Rubber Plant',
    desc: 'Natural wood sideboard with a fresh plant accent.',
    price: 340,
    image: 'rubber-plant-wooden-sideboard-table.jpg',
  },
  {
    title: 'Wooden Sideboard with Books & Vase',
    desc: 'Classic sideboard, perfect for books and decor.',
    price: 320,
    image: 'wooden-sideboard-table-with-books-vase.jpg',
  },
];

// Render products
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('productsGrid');
  if (grid) {
    grid.innerHTML = products.map((p, i) => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.title}" class="product-image">
        <div class="product-info">
          <div>
            <div class="product-title">${p.title}</div>
            <div class="product-desc">${p.desc}</div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div class="product-price">$${p.price}</div>
            <button class="add-to-cart" data-index="${i}">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  hamburger && hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Cart modal logic
  const cartModal = document.getElementById('cartModal');
  const cartBtn = document.querySelector('.nav-cart');
  const closeCart = document.querySelector('.close-cart');
  cartBtn && cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
  });
  closeCart && closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
  });

  // Cart functionality
  let cart = [];
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartItems) {
      if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center;color:#888;">Your cart is empty.</p>';
      } else {
        cartItems.innerHTML = cart.map((item, idx) => `
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <span>${item.title} x${item.qty}</span>
            <span>$${item.price * item.qty}</span>
            <button style="background:none;border:none;color:#b88e2f;cursor:pointer;font-size:1.1rem;" data-remove="${idx}">&times;</button>
          </div>
        `).join('');
      }
    }
    if (cartTotal) {
      cartTotal.textContent = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    }
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const idx = +e.target.getAttribute('data-index');
      const prod = products[idx];
      const found = cart.find(item => item.title === prod.title);
      if (found) {
        found.qty++;
      } else {
        cart.push({ ...prod, qty: 1 });
      }
      updateCart();
    }
    if (e.target.hasAttribute('data-remove')) {
      const idx = +e.target.getAttribute('data-remove');
      cart.splice(idx, 1);
      updateCart();
    }
  });

  // Scroll to products
  window.scrollToProducts = function() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  };

  updateCart();
});

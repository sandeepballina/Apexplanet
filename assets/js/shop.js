/**
 * Kiln & Co. — E-Commerce Shop & Cart Module
 * Task 5 — Final Capstone & Performance Optimization
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Ceramic Product Catalog Data
  // --------------------------------------------------------------------------
  const PRODUCTS = [
    {
      id: 'prod-1',
      title: 'Artisan Speckled Espresso Mug',
      category: 'drinkware',
      price: 28.00,
      rating: 4.9,
      reviews: 34,
      badge: 'Bestseller',
      badgeClass: 'badge--bestseller',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      description: 'Hand-thrown stoneware mug featuring a matte white glaze with natural iron flecks. Wheel-thrown by studio founder Elena Vance.',
      specs: {
        dimensions: '3.5" H x 3.0" W (8 oz)',
        clayBody: 'High-fire Speckled Stoneware',
        glaze: 'Satin White Matte',
        firing: 'Cone 6 Electric Kiln',
        care: 'Dishwasher & Microwave Safe'
      }
    },
    {
      id: 'prod-2',
      title: 'Terracotta Fluted Botanical Planter',
      category: 'vases',
      price: 45.00,
      rating: 4.8,
      reviews: 22,
      badge: 'New Arrival',
      badgeClass: 'badge--new',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
      description: 'Hand-built porous terracotta pot with tactile vertical fluting, designed to encourage healthy root aeration.',
      specs: {
        dimensions: '5.5" H x 6.0" W',
        clayBody: 'Earthenware Terracotta',
        glaze: 'Raw Exterior / Unglazed',
        firing: 'Cone 04 Low Fire',
        care: 'Hand Wash / Indoor Plant Use'
      }
    },
    {
      id: 'prod-3',
      title: 'Ember Rustic Dinner Plate Set (4x)',
      category: 'dinnerware',
      price: 110.00,
      rating: 5.0,
      reviews: 18,
      badge: 'Limited',
      badgeClass: 'badge--limited',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80',
      description: 'Set of four hand-slabbed dinner plates with organic live-edge rims and rich terracotta slip brushwork.',
      specs: {
        dimensions: '10.5" Diameter each',
        clayBody: 'Dark Basalt Stoneware',
        glaze: 'Ember Rust & Semi-Gloss Matte',
        firing: 'Cone 6 Gas Reduction',
        care: 'Food Safe & Dishwasher Safe'
      }
    },
    {
      id: 'prod-4',
      title: 'Minimalist Studio Pour-Over Dripper',
      category: 'supplies',
      price: 36.00,
      rating: 4.7,
      reviews: 29,
      badge: 'Bestseller',
      badgeClass: 'badge--bestseller',
      image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
      description: 'Precision ribbed interior cone designed for optimal coffee flow rate. Fits standard V60 paper filters.',
      specs: {
        dimensions: '4.0" H x 4.5" W',
        clayBody: 'Smooth White Stoneware',
        glaze: 'Oatmeal Gloss',
        firing: 'Cone 6 Electric',
        care: 'Dishwasher Safe'
      }
    },
    {
      id: 'prod-5',
      title: 'Japanese-Inspired Kyusu Teapot',
      category: 'drinkware',
      price: 85.00,
      rating: 4.9,
      reviews: 41,
      badge: 'Limited',
      badgeClass: 'badge--limited',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
      description: 'Hand-thrown side-handled teapot equipped with built-in clay filter screen and bamboo lid accent.',
      specs: {
        dimensions: '4.5" H x 7.0" W (16 oz)',
        clayBody: 'Iron-Rich Clay',
        glaze: 'Tenmoku Black Metallic',
        firing: 'Cone 10 Reduction',
        care: 'Hand Wash Recommended'
      }
    },
    {
      id: 'prod-6',
      title: 'Speckled Ceramic Salad Bowl',
      category: 'dinnerware',
      price: 52.00,
      rating: 4.8,
      reviews: 15,
      badge: 'New Arrival',
      badgeClass: 'badge--new',
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
      description: 'Wide, shallow serving bowl thrown on the wheel with a gentle flare rim and soft satin glaze finish.',
      specs: {
        dimensions: '3.0" H x 9.5" W',
        clayBody: 'Buff Stoneware',
        glaze: 'Speckled Sage Green',
        firing: 'Cone 6 Electric',
        care: 'Dishwasher & Microwave Safe'
      }
    },
    {
      id: 'prod-7',
      title: 'Sculptural Moon Vase (Tall)',
      category: 'vases',
      price: 95.00,
      rating: 5.0,
      reviews: 12,
      badge: 'Limited Edition',
      badgeClass: 'badge--limited',
      image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80',
      description: 'Coil-built centerpiece vase featuring a textured lunar surface finish and asymmetrical lip contour.',
      specs: {
        dimensions: '11.0" H x 5.0" W',
        clayBody: 'Grogged Sculpture Clay',
        glaze: 'Chalk White Matte',
        firing: 'Cone 6 Electric',
        care: 'Hand Wash / Water-tight'
      }
    },
    {
      id: 'prod-8',
      title: 'Studio Clay Trimming & Modeling Toolset',
      category: 'supplies',
      price: 32.00,
      rating: 4.9,
      reviews: 50,
      badge: 'Bestseller',
      badgeClass: 'badge--bestseller',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      description: 'Essential set of 8 stainless steel loop tools, wooden ribs, and cutting wires used daily in our studio.',
      specs: {
        dimensions: 'Standard 8-piece Set',
        clayBody: 'Hardwood & Steel',
        glaze: 'N/A',
        firing: 'N/A',
        care: 'Wipe dry after use'
      }
    }
  ];

  // --------------------------------------------------------------------------
  // 2. State & Storage Helpers
  // --------------------------------------------------------------------------
  let cart = Utils ? Utils.getStorage('kiln_co_cart_items', []) : [];
  let appliedPromo = Utils ? Utils.getStorage('kiln_co_promo', null) : null;

  function saveCart() {
    if (Utils) {
      Utils.setStorage('kiln_co_cart_items', cart);
      Utils.setStorage('kiln_co_promo', appliedPromo);
    } else {
      localStorage.setItem('kiln_co_cart_items', JSON.stringify(cart));
    }
    updateCartUI();
  }

  // --------------------------------------------------------------------------
  // 3. UI Injections (Cart Drawer & Modals)
  // --------------------------------------------------------------------------
  function injectCartDrawerDOM() {
    if (document.getElementById('cart-drawer')) return;

    const drawerHTML = `
      <div class="cart-drawer-overlay" id="cart-drawer-overlay" aria-hidden="true"></div>
      <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div class="cart-drawer__header">
          <h3 id="cart-title">Your Studio Cart</h3>
          <button class="cart-drawer__close" id="cart-drawer-close" aria-label="Close cart drawer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="cart-drawer__shipping-bar">
          <span id="shipping-bar-text">Add $75.00 more for Free Local Shipping</span>
          <div class="shipping-progress-track">
            <div class="shipping-progress-fill" id="shipping-progress-fill"></div>
          </div>
        </div>
        <div class="cart-drawer__body" id="cart-drawer-items">
          <!-- Rendered via JS -->
        </div>
        <div class="cart-drawer__footer">
          <div class="promo-code-box">
            <input type="text" id="promo-input" placeholder="Promo code (APEX10)" aria-label="Promo code">
            <button type="button" id="promo-apply-btn">Apply</button>
          </div>
          <div id="promo-status" style="font-size: 0.8rem; margin-bottom: 0.5rem; display: none;"></div>
          <div class="cart-summary-line">
            <span>Subtotal</span>
            <span id="cart-subtotal">$0.00</span>
          </div>
          <div class="cart-summary-line" id="cart-discount-line" style="display: none; color: #2e7d32;">
            <span>Discount</span>
            <span id="cart-discount">-$0.00</span>
          </div>
          <div class="cart-summary-line">
            <span>Estimated Tax (8%)</span>
            <span id="cart-tax">$0.00</span>
          </div>
          <div class="cart-summary-line total">
            <span>Total</span>
            <span id="cart-total">$0.00</span>
          </div>
          <button class="checkout-btn" id="cart-checkout-btn">Proceed to Checkout</button>
        </div>
      </aside>

      <!-- Quick View Modal Container -->
      <div class="shop-modal-overlay" id="quickview-overlay" aria-hidden="true">
        <div class="shop-modal-card" id="quickview-card">
          <button class="shop-modal-close" id="quickview-close" aria-label="Close modal">&times;</button>
          <div id="quickview-content"></div>
        </div>
      </div>

      <!-- Checkout & Receipt Modal -->
      <div class="shop-modal-overlay" id="checkout-overlay" aria-hidden="true">
        <div class="shop-modal-card" style="max-width: 520px;">
          <button class="shop-modal-close" id="checkout-close" aria-label="Close modal">&times;</button>
          <div id="checkout-content"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHTML);
  }

  // --------------------------------------------------------------------------
  // 4. Cart UI Update & Drawer Control
  // --------------------------------------------------------------------------
  function updateCartUI() {
    // 1. Badge counters across header
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badgeEls = document.querySelectorAll('.cart-badge');
    badgeEls.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'flex';
    });

    // 2. Render Drawer Items
    const drawerItemsContainer = document.getElementById('cart-drawer-items');
    if (!drawerItemsContainer) return;

    if (cart.length === 0) {
      drawerItemsContainer.innerHTML = `
        <div class="cart-empty-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p>Your studio cart is currently empty.</p>
          <a href="shop.html" class="btn btn--secondary" style="margin-top: 1rem; font-size: 0.85rem;" onclick="window.KilnShop.closeCartDrawer()">Browse Collection</a>
        </div>
      `;
    } else {
      drawerItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${Utils ? Utils.escapeHTML(item.title) : item.title}" class="cart-item__img" loading="lazy">
          <div class="cart-item__details">
            <h4 class="cart-item__title">${Utils ? Utils.escapeHTML(item.title) : item.title}</h4>
            <div class="cart-item__price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-item__controls">
              <div class="qty-controls">
                <button type="button" class="qty-btn" onclick="window.KilnShop.changeQty('${item.id}', -1)" aria-label="Decrease quantity">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button type="button" class="qty-btn" onclick="window.KilnShop.changeQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="cart-item__remove" onclick="window.KilnShop.removeItem('${item.id}')">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // 3. Financial calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (appliedPromo === 'APEX10') discount = subtotal * 0.10;
    if (appliedPromo === 'KILN15') discount = subtotal * 0.15;

    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.08;
    const total = taxableAmount + tax;

    // Free shipping threshold ($75)
    const shippingThreshold = 75;
    const shippingBarText = document.getElementById('shipping-bar-text');
    const shippingProgressFill = document.getElementById('shipping-progress-fill');
    if (shippingBarText && shippingProgressFill) {
      if (subtotal >= shippingThreshold || subtotal === 0) {
        shippingBarText.textContent = subtotal >= shippingThreshold 
          ? '🎉 You unlocked Free Local Shipping!' 
          : 'Add $75.00 more for Free Local Shipping';
        shippingProgressFill.style.width = subtotal >= shippingThreshold ? '100%' : '0%';
      } else {
        const remaining = (shippingThreshold - subtotal).toFixed(2);
        shippingBarText.textContent = `Add $${remaining} more for Free Local Shipping`;
        shippingProgressFill.style.width = `${Math.min(100, (subtotal / shippingThreshold) * 100)}%`;
      }
    }

    // Subtotal & Total Labels
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountLineEl = document.getElementById('cart-discount-line');
    const discountEl = document.getElementById('cart-discount');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountLineEl && discountEl) {
      if (discount > 0) {
        discountLineEl.style.display = 'flex';
        discountEl.textContent = `-$${discount.toFixed(2)} (${appliedPromo})`;
      } else {
        discountLineEl.style.display = 'none';
      }
    }
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }

  function openCartDrawer() {
    injectCartDrawerDOM();
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (overlay && drawer) {
      overlay.classList.add('is-open');
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (overlay && drawer) {
      overlay.classList.remove('is-open');
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // --------------------------------------------------------------------------
  // 5. Cart Logic Actions
  // --------------------------------------------------------------------------
  function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    saveCart();
    openCartDrawer();
  }

  function changeQty(productId, delta) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      saveCart();
    }
  }

  function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
  }

  function applyPromoCode() {
    const input = document.getElementById('promo-input');
    const status = document.getElementById('promo-status');
    if (!input || !status) return;

    const code = input.value.trim().toUpperCase();
    if (code === 'APEX10' || code === 'KILN15') {
      appliedPromo = code;
      status.style.display = 'block';
      status.style.color = '#2e7d32';
      status.textContent = `Coupon ${code} applied successfully!`;
      saveCart();
    } else {
      status.style.display = 'block';
      status.style.color = '#d9534f';
      status.textContent = 'Invalid promo code. Try APEX10 or KILN15.';
    }
  }

  // --------------------------------------------------------------------------
  // 6. Shop Product Grid Rendering & Filtering
  // --------------------------------------------------------------------------
  let currentCategory = 'all';
  let searchQuery = '';
  let currentSort = 'featured';

  function renderShopGrid() {
    const grid = document.getElementById('shop-product-grid');
    if (!grid) return;

    let filtered = PRODUCTS.filter(p => {
      const matchCat = currentCategory === 'all' || p.category === currentCategory;
      const matchSearch = searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding-block: 4rem; color: var(--text-muted);">
          <h3>No matching ceramics found</h3>
          <p>Try adjusting your search criteria or selecting a different category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => `
      <article class="product-card">
        <div class="product-card__image-wrap">
          <span class="product-card__badge ${p.badgeClass}">${p.badge}</span>
          <img src="${p.image}" alt="${Utils ? Utils.escapeHTML(p.title) : p.title}" class="product-card__image" loading="lazy">
          <button type="button" class="product-card__quickview" onclick="window.KilnShop.openQuickView('${p.id}')">Quick Specs</button>
        </div>
        <div class="product-card__body">
          <div class="product-card__meta">
            <span style="text-transform: capitalize;">${p.category}</span>
            <span class="product-card__rating">★ ${p.rating} (${p.reviews})</span>
          </div>
          <h3 class="product-card__title">${Utils ? Utils.escapeHTML(p.title) : p.title}</h3>
          <p class="product-card__spec">${p.specs.glaze} — ${p.specs.clayBody}</p>
          <div class="product-card__footer">
            <span class="product-card__price">$${p.price.toFixed(2)}</span>
            <button type="button" class="product-card__add-btn" onclick="window.KilnShop.addToCart('${p.id}')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const overlay = document.getElementById('quickview-overlay');
    const content = document.getElementById('quickview-content');
    if (!overlay || !content) return;

    content.innerHTML = `
      <div class="quickview-grid">
        <div>
          <img src="${product.image}" alt="${Utils ? Utils.escapeHTML(product.title) : product.title}" class="quickview-img" loading="lazy">
        </div>
        <div class="quickview-details">
          <h2>${Utils ? Utils.escapeHTML(product.title) : product.title}</h2>
          <div class="quickview-price">$${product.price.toFixed(2)}</div>
          <p class="quickview-desc">${Utils ? Utils.escapeHTML(product.description) : product.description}</p>
          <ul class="quickview-specs">
            <li><span>Dimensions:</span> <strong>${product.specs.dimensions}</strong></li>
            <li><span>Clay Body:</span> <strong>${product.specs.clayBody}</strong></li>
            <li><span>Glaze Finish:</span> <strong>${product.specs.glaze}</strong></li>
            <li><span>Firing Temp:</span> <strong>${product.specs.firing}</strong></li>
            <li><span>Care Instructions:</span> <strong>${product.specs.care}</strong></li>
          </ul>
          <button type="button" class="btn btn--primary" style="width: 100%;" onclick="window.KilnShop.addToCart('${product.id}'); window.KilnShop.closeQuickView();">Add to Cart ($${product.price.toFixed(2)})</button>
        </div>
      </div>
    `;

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    const overlay = document.getElementById('quickview-overlay');
    if (overlay) {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // --------------------------------------------------------------------------
  // 7. Checkout Flow Modal & Receipt Generation
  // --------------------------------------------------------------------------
  function openCheckout() {
    if (cart.length === 0) {
      alert('Your cart is empty! Add items to proceed.');
      return;
    }

    closeCartDrawer();
    const overlay = document.getElementById('checkout-overlay');
    const content = document.getElementById('checkout-content');
    if (!overlay || !content) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (appliedPromo === 'APEX10') discount = subtotal * 0.10;
    if (appliedPromo === 'KILN15') discount = subtotal * 0.15;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.08;
    const total = taxableAmount + tax;

    content.innerHTML = `
      <h3 style="font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 1rem;">Complete Studio Order</h3>
      <form id="checkout-form" onsubmit="window.KilnShop.submitOrder(event)">
        <div style="margin-bottom: 1rem;">
          <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Full Name</label>
          <input type="text" id="chk-name" required placeholder="Jane Doe" style="width:100%; padding:0.6rem; border:1px solid var(--border-color); border-radius:var(--radius);">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Email Address</label>
          <input type="email" id="chk-email" required placeholder="jane@example.com" style="width:100%; padding:0.6rem; border:1px solid var(--border-color); border-radius:var(--radius);">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Shipping Address</label>
          <input type="text" id="chk-address" required placeholder="124 Ceramic Way, Portland, OR" style="width:100%; padding:0.6rem; border:1px solid var(--border-color); border-radius:var(--radius);">
        </div>
        <div style="background:var(--bg-surface); padding:1rem; border-radius:var(--radius); margin-bottom:1.2rem; font-size:0.9rem;">
          <div style="display:flex; justify-space-between; margin-bottom:0.3rem;"><span>Items Total (${cart.length}):</span> <strong>$${subtotal.toFixed(2)}</strong></div>
          ${discount > 0 ? `<div style="display:flex; justify-space-between; color:#2e7d32; margin-bottom:0.3rem;"><span>Discount (${appliedPromo}):</span> <strong>-$${discount.toFixed(2)}</strong></div>` : ''}
          <div style="display:flex; justify-space-between; margin-bottom:0.3rem;"><span>Tax &amp; Handling:</span> <strong>$${tax.toFixed(2)}</strong></div>
          <div style="display:flex; justify-space-between; font-size:1.1rem; font-weight:700; border-top:1px solid var(--border-color); padding-top:0.5rem; margin-top:0.5rem;"><span>Order Total:</span> <strong>$${total.toFixed(2)}</strong></div>
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%;">Place Studio Order ($${total.toFixed(2)})</button>
      </form>
    `;

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function submitOrder(e) {
    e.preventDefault();
    const name = document.getElementById('chk-name').value;
    const email = document.getElementById('chk-email').value;
    const orderId = 'KC-' + Math.floor(100000 + Math.random() * 900000);

    const content = document.getElementById('checkout-content');
    if (!content) return;

    content.innerHTML = `
      <div class="order-success-content">
        <div class="order-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style="font-family: var(--font-display); margin-bottom: 0.5rem;">Thank You, ${Utils ? Utils.escapeHTML(name) : name}!</h2>
        <p style="color: var(--text-muted); font-size: 0.92rem;">Your handcrafted ceramic pieces are being prepared for dispatch.</p>
        <div class="order-receipt">
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Confirmation sent to:</strong> ${Utils ? Utils.escapeHTML(email) : email}</p>
          <p><strong>Status:</strong> Processing (Kiln Packed &amp; Padded)</p>
        </div>
        <button type="button" class="btn btn--primary" style="width:100%;" onclick="window.KilnShop.closeCheckout()">Continue Shopping</button>
      </div>
    `;

    // Clear cart state
    cart = [];
    appliedPromo = null;
    saveCart();
  }

  function closeCheckout() {
    const overlay = document.getElementById('checkout-overlay');
    if (overlay) {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // --------------------------------------------------------------------------
  // 8. Event Listener Setup
  // --------------------------------------------------------------------------
  function initEvents() {
    injectCartDrawerDOM();
    updateCartUI();

    // Attach Header Cart Toggle Listeners across all pages
    document.body.addEventListener('click', function (e) {
      const cartToggle = e.target.closest('#cart-toggle-btn') || e.target.closest('.cart-toggle-btn');
      if (cartToggle) {
        e.preventDefault();
        openCartDrawer();
      }

      if (e.target.id === 'cart-drawer-overlay' || e.target.closest('#cart-drawer-close')) {
        closeCartDrawer();
      }

      if (e.target.id === 'promo-apply-btn') {
        applyPromoCode();
      }

      if (e.target.id === 'cart-checkout-btn') {
        openCheckout();
      }

      if (e.target.id === 'quickview-overlay' || e.target.id === 'quickview-close') {
        closeQuickView();
      }

      if (e.target.id === 'checkout-overlay' || e.target.id === 'checkout-close') {
        closeCheckout();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeQuickView();
        closeCheckout();
      }
    });

    // Toolbar Listeners (Only on shop.html)
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        renderShopGrid();
      });
    }

    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', function (e) {
        currentSort = e.target.value;
        renderShopGrid();
      });
    }

    const catBtnsContainer = document.getElementById('shop-categories');
    if (catBtnsContainer) {
      catBtnsContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('.cat-btn');
        if (btn) {
          catBtnsContainer.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          currentCategory = btn.dataset.category;
          renderShopGrid();
        }
      });
    }

    renderShopGrid();
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvents);
  } else {
    initEvents();
  }

  // Export Global API
  window.KilnShop = {
    PRODUCTS,
    addToCart,
    changeQty,
    removeItem,
    openCartDrawer,
    closeCartDrawer,
    openQuickView,
    closeQuickView,
    openCheckout,
    closeCheckout,
    submitOrder
  };
})();

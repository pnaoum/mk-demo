// Memory Keeper - Shared base layout helpers

// ── Auth credentials (hardcoded) ─────────────────────────────────────────────
window.STUDENTS = {
  'ANDRE1357': {
    id: 'ANDRE1357',
    full_name: 'Andre',
    student_number: 'ANDRE1357',
    class_letter: 'A',
    school: 'Memory Keeper School',
    individual_image: '',
    class_image: '',
    school_image: ''
  }
  // Add more: 'CODE': { id, full_name, student_number, class_letter, school, individual_image, class_image, school_image }
};

// ── Cart (localStorage) ───────────────────────────────────────────────────────
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('mk_cart') || '[]'); } catch { return []; } },
  save(items) { localStorage.setItem('mk_cart', JSON.stringify(items)); },
  add(product, qty = 1) {
    const items = this.get();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) items[idx].quantity += qty;
    else items.push({ ...product, quantity: qty });
    this.save(items); this.updateBadge();
  },
  remove(productId) { this.save(this.get().filter(i => i.id !== productId)); this.updateBadge(); },
  updateQty(productId, qty) {
    const items = this.get();
    const idx = items.findIndex(i => i.id === productId);
    if (idx > -1) { items[idx].quantity = qty; this.save(items); }
    this.updateBadge();
  },
  count() { return this.get().reduce((s, i) => s + i.quantity, 0); },
  total() { return this.get().reduce((s, i) => s + i.price * i.quantity, 0); },
  clear() { localStorage.removeItem('mk_cart'); this.updateBadge(); },
  updateBadge() {
    const badge = document.getElementById('cart-count-badge');
    const count = this.count();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// ── Auth (sessionStorage) ─────────────────────────────────────────────────────
const Auth = {
  getStudent() { try { return JSON.parse(sessionStorage.getItem('mk_student') || 'null'); } catch { return null; } },
  setStudent(data) { sessionStorage.setItem('mk_student', JSON.stringify(data)); },
  logout() { sessionStorage.removeItem('mk_student'); Cart.clear(); window.location.href = 'index.html'; },
  isLoggedIn() { return !!this.getStudent(); }
};

// ── Header ────────────────────────────────────────────────────────────────────
function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  const student = Auth.getStudent();
  const cartCount = Cart.count();
  el.innerHTML = `
    <header class="sticky-header">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="logo-container">
            <div class="logo-image mr-4">
              <img src="logo.JPG" alt="Memory Keeper Logo" loading="lazy" class="w-16 h-16 object-contain">
            </div>
            <div class="logo-text">
              <a href="index.html" class="no-underline hover:opacity-90 transition-opacity">
                <div class="text-3xl font-bold" style="color:var(--color-lime-primary);font-family:'Fredoka',sans-serif;">Memory Keeper</div>
              </a>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <a href="cart.html" class="cart-icon hover:scale-110 transition-all relative">
              <i class="fas fa-shopping-cart text-3xl"></i>
              <span class="cart-badge" id="cart-count-badge" style="display:${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
            </a>
            ${student ? `
            <button onclick="Auth.logout()" class="hover:scale-110 transition-all relative group">
              <i class="fas fa-sign-out-alt text-3xl text-gray-800"></i>
              <span class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Logout</span>
            </button>` : ''}
          </div>
        </div>
      </div>
    </header>`;
}

// ── Footer ────────────────────────────────────────────────────────────────────
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <footer class="max-w-6xl mx-auto mt-16 text-center px-4">
      <div class="section-card p-10 relative overflow-hidden">
        <div class="footer-dots">
          <div class="footer-dot"></div><div class="footer-dot"></div>
          <div class="footer-dot"></div><div class="footer-dot"></div><div class="footer-dot"></div>
        </div>
        <div class="relative z-10">
          <h3 class="text-3xl font-bold mb-8 colorful-text" style="font-family:'Fredoka',sans-serif;">Contact Us</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <a href="mailto:info.memorykeeper@gmail.com" class="p-6 bg-lime-50 rounded-2xl hover:bg-lime-100 transition-colors cursor-pointer group">
              <i class="fas fa-envelope text-4xl mb-4 text-lime-600 group-hover:scale-110 transition-transform"></i>
              <h4 class="font-bold mb-3 text-lg text-gray-800">Email</h4>
              <p class="text-gray-600 group-hover:text-lime-700">info.memorykeeper@gmail.com</p>
            </a>
            <a href="tel:+201557052200" class="p-6 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-colors cursor-pointer group">
              <i class="fas fa-phone text-4xl mb-4 text-pink-600 group-hover:scale-110 transition-transform"></i>
              <h4 class="font-bold mb-3 text-lg text-gray-800">Phone</h4>
              <p class="text-gray-600 group-hover:text-pink-700">+201557052200</p>
            </a>
            <a href="https://www.linkedin.com/company/out-productions/" target="_blank" rel="noopener noreferrer" class="p-6 bg-cyan-50 rounded-2xl hover:bg-cyan-100 transition-colors cursor-pointer group">
              <i class="fab fa-linkedin text-4xl mb-4 text-cyan-600 group-hover:scale-110 transition-transform"></i>
              <h4 class="font-bold mb-3 text-lg text-gray-800">LinkedIn</h4>
              <p class="text-gray-600 group-hover:text-cyan-700">@out-productions</p>
            </a>
            <a href="https://maps.app.goo.gl/9SCfWqVDuhz1zBHH6" target="_blank" rel="noopener noreferrer" class="p-6 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors cursor-pointer group">
              <i class="fas fa-map-marker-alt text-4xl mb-4 text-orange-600 group-hover:scale-110 transition-transform"></i>
              <h4 class="font-bold mb-3 text-lg text-gray-800">Studio</h4>
              <p class="text-gray-600 group-hover:text-orange-700">Heliopolis, Cairo, Egypt</p>
            </a>
          </div>
          <div class="pt-8 border-t border-gray-200">
            <p class="text-lg font-semibold text-gray-800">&copy; 2025 Memory Keeper by OUT Productions. All rights reserved.</p>
            <p class="mt-3 text-gray-600 font-medium">Every memory deserves to be preserved ✨</p>
          </div>
        </div>
      </div>
    </footer>`;
}

// ── Init — safe for both defer and inline loading ─────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { renderHeader(); renderFooter(); });
} else {
  renderHeader();
  renderFooter();
}

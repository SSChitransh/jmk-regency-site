(() => {
  const form = document.getElementById('booking-form');
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  const roomType = document.getElementById('room-type');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const year = document.getElementById('year');
  const today = new Date();
  const localISO = (date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  checkin.min = localISO(today);
  checkin.value = localISO(today);
  checkout.min = localISO(addDays(today, 1));
  checkout.value = localISO(addDays(today, 1));
  if (year) year.textContent = String(new Date().getFullYear());

  checkin.addEventListener('change', () => {
    const earliestCheckout = localISO(addDays(new Date(`${checkin.value}T12:00:00`), 1));
    checkout.min = earliestCheckout;
    if (!checkout.value || checkout.value <= checkin.value) checkout.value = earliestCheckout;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (checkout.value <= checkin.value) {
      checkout.setCustomValidity('Check-out must be after check-in.');
      checkout.reportValidity();
      checkout.setCustomValidity('');
      return;
    }
    const guests = document.getElementById('guests').value;
    const room = roomType.value;
    const message = [
      'Hello Hotel JMK Regency, I would like to enquire about a stay.',
      `Check-in: ${checkin.value}`,
      `Check-out: ${checkout.value}`,
      `Guests: ${guests}`,
      `Room preference: ${room}`,
      'Please confirm availability, total price including taxes, meal plan and booking terms.'
    ].join('\n');
    const whatsappURL = `https://wa.me/919793616550?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
  });

  document.querySelectorAll('[data-room]').forEach((link) => {
    link.addEventListener('click', () => {
      const room = link.getAttribute('data-room');
      if (room) roomType.value = room;
    });
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }));
})();

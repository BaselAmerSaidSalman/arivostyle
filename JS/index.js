const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
header.addEventListener("mouseenter", () => {
    header.classList.add('scrolled');
});
header.addEventListener("mouseleave", () => {
    if (window.scrollY === 0) {
        header.classList.remove('scrolled');
    }
});

const headerHome = document.querySelector('.header_home');
const headerCatalog = document.querySelector('.header_catalog');
const headerContact = document.querySelector('.header_contact');

headerHome.addEventListener("mouseenter", () => {
    headerHome.classList.add('link_active');
});
headerHome.addEventListener("mouseleave", () => {
    headerHome.classList.remove('link_active');
});

headerCatalog.addEventListener("mouseenter", () => {
    headerCatalog.classList.add('link_active');
});
headerCatalog.addEventListener("mouseleave", () => {
    headerCatalog.classList.remove('link_active');
});

headerContact.addEventListener("mouseenter", () => {
    headerContact.classList.add('link_active');
});
headerContact.addEventListener("mouseleave", () => {
    headerContact.classList.remove('link_active');
});
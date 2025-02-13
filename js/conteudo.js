document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");

  // Menu mobile
  burgerMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Responsividade
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
    }
  });
});

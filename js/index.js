document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Remove a classe 'active' ao redimensionar para desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navLinks.classList.remove("active");
      }
    });
  }

   // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

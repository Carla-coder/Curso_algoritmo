document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");
  const container = document.querySelector(".exercicios-container");

  // Inicialize o EmailJS
  type =
    "text/javascript" >
    (function () {
      emailjs.init({
        publicKey: "5DZ17pBowyT2XDfYj",
      });
    })();

  // Menu mobile
  burgerMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Remove a classe 'active' ao redimensionar para desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
    }
  });

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

  // Responsividade
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      navLinks.style.display = "flex";
    } else {
      if (!navLinks.classList.contains("active")) {
        navLinks.style.display = "none";
      }
    }
  });

  // Busca o arquivo JSON com os exercícios
  fetch("../data/exercicios.json")
    .then((response) => response.json())
    .then((exercicios) => {
      // Para cada exercício no JSON, cria um elemento HTML
      exercicios.forEach((exercicio) => {
        const div = document.createElement("div");
        div.classList.add("exercicio");
        div.innerHTML = `
            <h2>${exercicio.titulo}</h2>
            <p>${exercicio.descricao}</p>
             <pre class="codigo-exemplo">${exercicio.codigo}</pre>
            <textarea class="resposta-area" placeholder="Digite sua resposta aqui..."></textarea>
            <button class="botao-submeter">Enviar Resposta</button>
          `;
        container.appendChild(div);

        // Após adicionar o exercício à página, configurar o evento de envio para o botão criado
        const botaoSubmeter = div.querySelector(".botao-submeter");
        botaoSubmeter.addEventListener("click", function () {
          const respostaArea = this.previousElementSibling; // Pega a área de resposta (textarea)
          const resposta = respostaArea.value.trim(); // Captura a resposta digitada
          console.log("Resposta capturada:", resposta); // Verifique se a resposta está sendo capturada corretamente
          const instrutorEmail = "carlacoder2023@gmail.com"; // E-mail do instrutor

          if (resposta) {
            // Dados para enviar o e-mail
            const emailParams = {
              from_name: "Carla",
              to_name: "Carla coder",
              to_email: instrutorEmail,
              titulo: exercicio.titulo,
              resposta: resposta,
            };

            console.log("Parâmetros do e-mail:", emailParams); // Adicionando o log para ver os parâmetros

            emailjs
              .send("service_zoa4ppa", "template_86iv2uf", emailParams)
              .then(() => {
                alert("Sua resposta foi enviada com sucesso!");
                respostaArea.value = ""; // Limpa o textarea
              })
              .catch((error) => {
                console.error("Erro ao enviar o e-mail:", error);
                alert("Ocorreu um erro ao enviar a resposta. Tente novamente.");
              });
          } else {
            alert("Por favor, digite uma resposta antes de enviar.");
          }
        });
      });
    })
    .catch((error) => console.error("Erro ao carregar os exercícios:", error));
});
    
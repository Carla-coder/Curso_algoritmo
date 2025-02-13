document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");
    const btnGerarCertificado = document.querySelector(
      ".btn-gerar-certificado"
    );
    const certificadoPreview = document.querySelector(
      ".certificado-preview"
    );
    const nomeInput = document.querySelector("#nome");
    const cpfInput = document.querySelector("#cpf");

    burgerMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    function formatarCPF(cpf) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    function formatarData(data) {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return data.toLocaleDateString("pt-BR", options);
    }

    cpfInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length <= 11) {
        value = formatarCPF(value); // Aplica a formatação do CPF
        e.target.value = value;
      }
    });

    btnGerarCertificado.addEventListener("click", function () {
      if (!nomeInput.value || !cpfInput.value) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      if (cpfInput.value.length !== 14) {
        // Considerando a formatação, o CPF terá 14 caracteres
        alert("Por favor, insira um CPF válido.");
        return;
      }

      document.getElementById("nome-aluno").textContent = nomeInput.value;
      document.getElementById(
        "data-certificado"
      ).textContent = `São Paulo, ${formatarData(new Date())}`;

      certificadoPreview.classList.add("show");

      setTimeout(() => {
        window.print();
      }, 500);
    });
  });
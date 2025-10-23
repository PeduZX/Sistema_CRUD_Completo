// Carregar dados da planta
// fetch(`/plantas/editar/${id}`)
//   .then(res => res.json())
//   .then(planta => {
//     document.getElementById("nome_popular").value = planta.nomePopular;
//     document.getElementById("nome_cientifico").value = planta.nomeCientifico;
//     document.getElementById("familia_botanica").value = planta.familiaBotanica;
//     document.getElementById("origem").value = planta.origem;
//     document.getElementById("usos_medicinais").value = planta.usosMedicinais;
//     document.getElementById("principios_ativos").value = planta.principioAtivos;
//     document.getElementById("parte_utilizada").value = planta.parteUtilizada;
//     document.getElementById("modo_preparo").value = planta.modoPreparo;
//     document.getElementById("contraindicacoes").value = planta.contraindicacoes;
//     document.getElementById("imagem").value = planta.imagem;
//   });




// Pegar ID da URL
const paramsURL = new URLSearchParams(window.location.search);
const id = paramsURL.get("id");

// Atualizar ao enviar formulário
const formEditar = document.getElementById("formEditar");
formEditar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nomePopular: document.getElementById("nome_popular").value,
    nomeCientifico: document.getElementById("nome_cientifico").value,
    familiaBotanica: document.getElementById("familia_botanica").value,
    origem: document.getElementById("origem").value,
    usosMedicinais: document.getElementById("usos_medicinais").value,
    principioAtivos: document.getElementById("principios_ativos").value,
    parteUtilizada: document.getElementById("parte_utilizada").value,
    modoPreparo: document.getElementById("modo_preparo").value,
    contraindicacoes: document.getElementById("contraindicacoes").value,
    imagem: document.getElementById("imagem").value,
  };

  try {
    const res = await fetch(`http://localhost:3000/plantas/editar/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      alert(result.message);
      window.location.href = "/html/plantasRegistradas.html"; // voltar para a lista
    } else {
      alert("Erro: " + result.message);
    }
  } catch (err) {
    console.error("Erro ao atualizar planta:", err);
    alert("Ocorreu um erro ao atualizar a planta.");
  }
});
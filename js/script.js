const form = document.getElementById("formCadastro");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
 
      const nomeInput = document.getElementById('nomeInput');
      const emailInput = document.getElementById('emailInput');
      const senhaInput = document.getElementById('senhaInput');
      const arquivo = document.getElementById('arquivo')
 
    const resp = await fetch("http://localhost:3000/plantas/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nomeInput,
        emailInput,
        senhaInput,
        arquivo
      }),
    });
 
    const data = await resp.json();
    alert("Planta cadastrada: " + nomePopular);
  });
}
 
async function deletarPlantas(id) {
  try {
    if (confirm("Tem certeza que deseja deletar essa planta?") === true) {
      const response = await fetch(
        `http://localhost:3000/deletar/${id}`,
        {
          method: "DELETE",
        }
      );
    } else {
      return;
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro ao deletar planta:", error);
  }
  alert(`Planta deletada com sucesso!`);
  carregarPlantas();
}

 
// --- LISTAR PLANTAS ---
async function carregarPlantas() {
  const lista = document.getElementById("main");
  if (!lista) return; // impede erro se não existir o elemento
 
  const resp = await fetch("http://localhost:3000/listar");
  const plantas = await resp.json();
 
  lista.innerHTML = "";
 
  (plantas.data || plantas).forEach((p) => {
    const div = document.createElement("div");
    const btnDel = document.createElement("button");
    div.innerHTML = `
      <div class="card1">
        <img src="${p.imagem}" alt="${p.nome_popular}">
        <p id="p-nome">Nome Popular: ${p.nome_popular}</p>
        <p id="p-nome-cientifico">Nome Científico: ${p.nome_cientifico}</p>
        <p id="p-familia">Família Botânica: ${p.familia_botanica}</p>
        <p id="p-origem">Origem / Distribuição: ${p.origem}</p>
        <p id="p-usos">Usos Medicinais: ${p.usos_medicinais}</p>
        <p id="p-principios">Princípios Ativos: ${p.principios_ativos}</p>
        <p id="p-parte">Parte Utilizada: ${p.parte_utilizada}</p>
        <p id="p-modo">Modo de Preparo: ${p.modo_preparo}</p>
        <p id="p-contraindicacoes">Contraindicações: ${p.contraindicacoes}</p>
        <button id= "btn-delete" onclick="deletarPlantas(${p.id})">DELETAR</button>
        <a id= "a-editar" href="editarPlantas.html?id=${p.id}">Editar</a>
      </div>`;
    lista.appendChild(div);
  });
}
 
carregarPlantas();


// Carrega as imagens do servidor
// async function carregarImagens() {
//   const galeria = document.getElementById("galeria");
//   galeria.innerHTML = "";

//   const resposta = await fetch("http://localhost:3000/imagens");
//   const imagens = await resposta.json();

//   imagens.forEach(img => {
//     const imgTag = document.createElement("img");
//     imgTag.src = `/uploads/${img.nome_arquivo}`;
//     imgTag.width = 400;
//     imgTag.height = 250;
//     galeria.appendChild(imgTag);
//   });
// }

// // Envia o arquivo para o servidor
// document.getElementById("uploadForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const formData = new FormData(); // mega variavel para armazenar as coisas
//   formData.append("arquivo", document.getElementById("arquivo").files[0]);
  
//   const resposta = await fetch("http://localhost:3000/uploads", {
//     method: "POST",
//     body: formData,
//   });

//   console.log(resposta);

//   if (resposta.ok) {
//     alert("Upload feito com sucesso!");
//     carregarImagens();
//   } else {
//     alert("Erro ao enviar arquivo.");
//   }
// });

// // Carrega as imagens assim que a página abre
// carregarImagens();
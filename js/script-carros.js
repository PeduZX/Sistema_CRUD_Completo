// --- CADASTRAR CARRO ---
const modelo = document.getElementById("modelo").value;
const marca = document.getElementById("marca").value;
const origem = document.getElementById("origem").value;
const carroceria = document.getElementById("carroceria").value;
const imagem = document.getElementById("arquivo").value;

async function cadastrarCarro() {

  const resp = await fetch("http://localhost:3000/registerCarros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      modelo : modelo,
      marca: marca,
      origem_fabricante: origem,
      tipo_carroceria: carroceria
    })
  });

  const data = await resp.json();
  alert("Carro cadastrado: " + modelo);
}

// --- LISTAR CARROS ---
async function carregarCarros() {
  const lista = document.getElementById("div-cards");
  const resp = await fetch("http://localhost:3000/listarCarros");
  const carros = await resp.json();

  console.log("Carros recebidos:", carros);

  lista.innerHTML = "";

  carros.data.forEach((c) => {
    const div = document.createElement("div");
    div.className = "InfoCard";
    div.innerHTML = `
      <img class="img-carros-card" src="${carregarImagens()}" alt="${c.modelo}" />
      <p>Modelo: ${c.modelo}</p>
      <p>Marca: ${c.marca}</p>
      <p>Origem fabricante: ${c.origem_fabricante}</p>
      <p>Tipo da carroceria: ${c.tipo_carroceria}</p>
      <a id="a-editar" href="editar.html">editar</a>
      <button id="btn-deletar" onclick="deletarCarros(${c.id})">Deletar</button>
    `;
    lista.appendChild(div);
  });
}

 
carregarCarros();


async function deletarCarros(id) {
  try {
      const response = await fetch(
        `http://localhost:3000/delete/${id}`,
        {
          method: "DELETE",
        }
      );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro ao deletar carro:", error);
  }
  alert(`Carro deletada com sucesso!`);
 carregarCarros();
}


// Carrega as imagens do servidor
async function carregarImagens() {
  const infoCard = document.getElementById("InfoCard");
  infoCard.innerHTML = "";

  const resposta = await fetch("http://localhost:3000/imagens");
  const imagens = await resposta.json();

  imagens.forEach(img => {
    const imgTag = document.createElement("img");
    imgTag.src = `/uploads/${img.nome_arquivo}`;
    imgTag.width = 400;
    imgTag.height = 250;
    infoCard.appendChild(imgTag);
  });
}

// Envia o arquivo para o servidor
document.getElementById("form-info-cars").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(); // mega variavel para armazenar as coisas
  formData.append("arquivo", document.getElementById("arquivo").files[0]);
  
  const resposta = await fetch("http://localhost:3000/uploads", {
    method: "POST",
    body: formData,
  });

  console.log(resposta);

  if (resposta.ok) {
    alert("Upload feito com sucesso!");
    carregarImagens();
  } else {
    alert("Erro ao enviar arquivo.");
  }
});

// Carrega as imagens assim que a página abre
carregarImagens();


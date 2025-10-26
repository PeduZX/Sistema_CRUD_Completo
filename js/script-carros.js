async function cadastrarCarro() {
  const modelo = document.getElementById("modelo").value;
  const marca = document.getElementById("marca").value;
  const origem = document.getElementById("origem").value;
  const carroceria = document.getElementById("carroceria").value;

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

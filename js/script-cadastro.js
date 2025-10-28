async function cadastrar() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const msg = document.getElementById('msg');


  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      msg.textContent = data.message;
      msg.style.color = 'green';
      document.querySelector('form').reset();
    } else {
      msg.textContent = data.error || 'Erro ao cadastrar usuário.';
      msg.style.color = 'red';
    }
  } catch (error) {
    msg.textContent = 'Erro de conexão com o servidor.';
    msg.style.color = 'red';
  }
}


async function login() {
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const msg = document.getElementById('msg');

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok && email === "Admin@teste.com" && senha === "1234") { 
      // Exemplo: armazenar email e id no sessionStorage
      const usuario = {
        email: email,
       
        nome: data.nome || "Administrador"
      };

      sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      msg.textContent = data.message || "Login bem-sucedido!";
      msg.style.color = 'green';
      document.querySelector('form').reset();

      // exemplo: redirecionar para outra página
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 5000)

    } else {
      msg.textContent = data.error || 'Erro ao Logar usuário.';
      msg.style.color = 'red';
    }
  } catch (error) {
    msg.textContent = 'Erro de conexão com o servidor.';
    msg.style.color = 'red';
  }
}

const USUARIOS = "usuarios";

const registroUsuario = (nombre) => {
  const usuarios = localStorage.getItem(USUARIOS);

  if (usuarios === null) {
    return null;
  }

  const usuariosJSON = JSON.parse(usuarios);

  for (const usuario of usuariosJSON) {
    if (usuario.nombre === nombre) {
      return usuario;
    }
  }

  return null;
};

const guardarUsuario = (nombreUsuario, apellidoUsuario) => {
  const usuarios = localStorage.getItem(USUARIOS);

  if (usuarios === null) {
    const nuevosUsuarios = [{ nombre: nombreUsuario, apellido: apellidoUsuario }];
    localStorage.setItem(USUARIOS, JSON.stringify(nuevosUsuarios));
  } else {
    const usuariosJSON = JSON.parse(usuarios);
    usuariosJSON.push({ nombre: nombreUsuario, apellido: apellidoUsuario });
    localStorage.setItem(USUARIOS, JSON.stringify(usuariosJSON));
  }
};

const render = async () => {
  const form = document.querySelector("#registro");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = event.target.nombre.value;
    const apellido = event.target.apellido.value;

    const usuarioExistente = registroUsuario(nombre);
    if (usuarioExistente === null) {
      guardarUsuario(nombre, apellido);
    } else {
      alert("El usuario ya se encuentra registrado");
    }
  });
};

window.onload = render;

const form = document.getElementById("registro");
const seccionUsuarios = document.getElementById("usuarioExistente");

const obtenerUsers = () => {
  const usuarios = localStorage.getItem(USUARIOS);
  return usuarios === null ? [] : JSON.parse(usuarios);
};

const guardarUsers = (nombre, apellido) => {
  const usuarios = obtenerUsers();
  usuarios.push({ nombre, apellido });
  localStorage.setItem(USUARIOS, JSON.stringify(usuarios));
};

const renderizarUsuarios = () => {
  const usuarios = obtenerUsers();

  if (usuarios) {
    seccionUsuarios.innerHTML = "";
    usuarios.forEach((usuario) => {
      const seccionUsuario = document.createElement("div");
      seccionUsuario.textContent = `${usuario.nombre} ${usuario.apellido}`;
      seccionUsuarios.appendChild(seccionUsuario);
    });
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  guardarUsers(nombre, apellido);
  renderizarUsuarios();
  form.reset();
});


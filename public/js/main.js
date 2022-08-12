const socket = io.connect();

// Chat

socket.on("mensajes", (data) => {
  renderMensajes(data);
});

function renderMensajes(data) {
  const html = data
    .map((mensaje) => {
      return `<div>
        <span class="email">${mensaje.email}</span> <span class="fecha">[${mensaje.fecha}]</span> : 
        <em class="mensaje">${mensaje.text}</em></div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

function agregarMensaje(e) {
  const date = new Date().toLocaleString();

  const mensaje = {
    email: document.getElementById("email").value,
    tipo: document.getElementById("tipo").value,
    text: document.getElementById("text").value,
    fecha: date,
  };

  socket.emit("mensajes", mensaje);
  return false;
}

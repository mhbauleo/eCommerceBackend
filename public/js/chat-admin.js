const socket = io.connect();

// Chat

socket.on("mensajes", (data) => {
  renderMensajes(data);
});

function renderMensajes(data) {
  const html = data
    .map((mensaje) => {
      if(mensaje.tipo === 'sistema') {
        return `<div>
        <span class="email">To ${mensaje.email}</span> <span class="fecha">[${mensaje.fecha}]</span> : 
        <em class="mensaje">${mensaje.text}</em></div>`;
      }
      return `<div>
        <span class="email">From ${mensaje.email}</span> <span class="fecha">[${mensaje.fecha}]</span> : 
        <em class="mensaje">${mensaje.text}</em></div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

function agregarMensaje(e) {
  const date = new Date().toLocaleString();

  const mensaje = {
    email: document.getElementById("email").value,
    tipo: 'sistema',
    text: document.getElementById("text").value,
    fecha: date,
  };

  socket.emit("mensajes", mensaje);
  return false;
}

const socket = io.connect();

// Chat

socket.on("mensajes", (data) => {
  renderMensajes(data);
});

function renderMensajes(data) {
  const email = getCookie("messagesEmail").split("%40").join("@");
  const html = data
    .map((mensaje) => {
      if (email !== mensaje.email) return "";
      if (mensaje.tipo === "sistema") {
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
    tipo: 'usuario',
    text: document.getElementById("text").value,
    fecha: date,
  };

  socket.emit("mensajes", mensaje);
  return false;
}

function getCookie(cookie_name) {
  let c_name = cookie_name + "=";
  let cookie_decoded = decodeURIComponent(document.cookie);
  let cookie_parts = cookie_decoded.split(";");

  for (let i = 0; i < cookie_parts.length; i++) {
    let c = cookie_parts[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(c_name) == 0) {
      return c.substring(c_name.length, c.length);
    }
  }
  return "";
}

const ENDPOINT = "http://localhost:3000/casas";


export function obtenerTodos(clave) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        }
        else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });

    xhr.open("GET", `${ENDPOINT}`);
    xhr.send();
  });
}

export function crearCasa(casa) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });

    xhr.open("POST", `${ENDPOINT}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(casa));
  });
}

export function actualizarCasa(id, casa) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });

    xhr.open("PUT", `${ENDPOINT}/${id}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(casa));
  });
}

export function eliminarCasa(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });

    xhr.open("DELETE", `${ENDPOINT}/${id}`);
    xhr.send();
  });
}
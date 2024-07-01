const ENDPOINT = "http://localhost:3000";


export function obtenerTodos() {
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

      xhr.open("GET", "http://localhost:3000/planetas");
      xhr.send();
  });
}

export function obtenerUno(id) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${BASE_URL}/planetas/${id}`);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
          if (xhr.status === 200) {
              const planeta = JSON.parse(xhr.responseText);
              resolve(planeta);
          } else {
              reject(`Error al obtener el planeta con ID ${id}: ${xhr.statusText}`);
          }
      };
      xhr.onerror = () => reject(`Error de red al intentar obtener el planeta con ID ${id}`);
      xhr.send();
  });
}

export function crearPlaneta(planeta) {
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

      xhr.open("POST", "http://localhost:3000/planetas");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(planeta));
  });
}

export function actualizarPlaneta(id, planeta) {
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

      xhr.open("PUT", `http://localhost:3000/planetas/${id}`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(planeta));
  });
}


export function eliminarPlaneta(id) {
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

      xhr.open("DELETE", `http://localhost:3000/planetas/${id}`);
      xhr.send();
  });
}

export function eliminarTodos() {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `${BASE_URL}/planetas`);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
          if (xhr.status === 204) {
              resolve('Eliminacion exitosa de todos los planetas.');
          } else {
              reject(`Error al eliminar todos los planetas: ${xhr.statusText}`);
          }
      };
      xhr.onerror = () => reject('Error de red al intentar eliminar todos los planetas.');
      xhr.send();
  });
}
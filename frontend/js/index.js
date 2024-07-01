import { Planeta } from "./planeta.js";
import { mostrarSpinner, ocultarSpinner } from "./spinner.js";
import { PlanetaBase } from "./planeta-base.js";
import { obtenerTodos, obtenerUno, crearPlaneta, actualizarPlaneta, eliminarPlaneta, eliminarTodos } from "./api.js";


let items = [];
const formulario = document.getElementById("form-item");
let editIndex = null; 
const btnEliminar = document.getElementById("btn-eliminar");
const btnCancelar = document.getElementById("btn-cancelar");
let originalItem = null;

document.addEventListener("DOMContentLoaded", onInit);

function onInit() {
    actualizarAño();
    loadItems();
    escuchandoFormulario();E
    escuchandoBtnDeleteAll();
    escuchandBtnCancelar();
    escuchandoBtnFiltrar();
    escuchandoSelectTipo();
}

function escuchandoSelectTipo() {
    const selectTipo = document.getElementById('tipo-planeta');
    selectTipo.addEventListener('change', function() {
        const tipoSeleccionado = this.value;
        console.log("Tipo seleccionado:", tipoSeleccionado);
        console.log("Items:", items);
        const promedio = calcularPromedioTamanoPorTipo(items, tipoSeleccionado);
        console.log("Promedio calculado:", promedio);
        document.getElementById('promedio').textContent = `Promedio: ${promedio}`;
    });
}


function calcularPromedioTamanoPorTipo(items, tipo) {
    console.log("Calculando promedio para el tipo:", tipo);
    const planetasFiltrados = items.filter(planeta => planeta.tipo.toLowerCase() === tipo.toLowerCase());
    console.log("Planetas filtrados:", planetasFiltrados);

    if (planetasFiltrados.length > 0) {
        const tamanosNumeros = planetasFiltrados.map(planeta => parseFloat(planeta.tamano));
        console.log("Tamaños convertidos:", tamanosNumeros);

        const totalTamano = tamanosNumeros.reduce((acc, tamano) => acc + tamano, 0);
        const promedio = totalTamano / planetasFiltrados.length;
        return promedio.toFixed(2);
    } else {
        return 'n/a';
    }
}


function escuchandoBtnFiltrar() {
    const btnFiltrar = document.getElementById("btn-filtrar");
    btnFiltrar.addEventListener("click", filtrarTabla);
}

function filtrarTabla() {
    const filtroNombre = document.getElementById("filtroNombre").value.toLowerCase();
    const filtroTipo = document.getElementById("filtroTipo").value.toLowerCase();
    const checkAnillo = document.getElementById("checkAnillo").checked;
    const checkVida = document.getElementById("checkVida").checked;
    const checkAtmosfera = document.getElementById("checkAtmosfera").checked;

    const tabla = document.getElementById("table-items");
    let tbody = tabla.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    const celdas = ["id", "nombre", "tamano", "masa", "tipo", "distanciaAlSol", "poseeAnillo", "presenciaVida", "composicionAtmosferica"];

    const itemsFiltrados = items.filter(item => {
        return (filtroNombre === "" || item.nombre.toLowerCase().includes(filtroNombre)) &&
               (filtroTipo === "" || item.tipo.toLowerCase().includes(filtroTipo)) &&
               (!checkAnillo || item.poseeAnillo) &&
               (!checkVida || item.presenciaVida) &&
               (!checkAtmosfera || item.composicionAtmosferica);
    });

    if (itemsFiltrados.length === 0) {
        let nuevaFila = document.createElement("tr");
        celdas.forEach((celda) => {
            let nuevaCelda = document.createElement("td");
            if (celda === "poseeAnillo" || celda === "presenciaVida") {
                nuevaCelda.textContent = "n/a";
            } else if (celda === "composicionAtmosferica") {
                nuevaCelda.textContent = "n/a";
            } else {
                nuevaCelda.textContent = "n/a";
            }
            nuevaFila.appendChild(nuevaCelda);
        });
        tbody.appendChild(nuevaFila);
    } else {
        itemsFiltrados.forEach((item, index) => {
            let nuevaFila = document.createElement("tr");

            celdas.forEach((celda) => {
                let nuevaCelda = document.createElement("td");
                if (celda === "poseeAnillo" || celda === "presenciaVida") {
                    nuevaCelda.textContent = item[celda] ? "Sí" : "No";
                } else if (celda === "composicionAtmosferica") {
                    nuevaCelda.textContent = item[celda] || "n/a";
                } else {
                    nuevaCelda.textContent = item[celda] || "n/a";
                }
                nuevaFila.appendChild(nuevaCelda);
            });

            let celdaBotones = document.createElement("td");
            celdaBotones.className = "flex td-action";

            let botonEditar = document.createElement("button");
            botonEditar.textContent = "Editar";
            botonEditar.className = "btn btn-success";
            botonEditar.setAttribute("data-id", item.id);
            botonEditar.onclick = function () { onUpdate(items.findIndex(i => i.id === item.id)) };

            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "btn btn-danger";
            botonEliminar.setAttribute("data-id", item.id);
            botonEliminar.onclick = function () { onDelete(items.findIndex(i => i.id === item.id)) };

            celdaBotones.appendChild(botonEditar);
            celdaBotones.appendChild(botonEliminar);

            nuevaFila.appendChild(celdaBotones);
            tbody.appendChild(nuevaFila);
        });
    }
}


function escuchandBtnCancelar(){
    btnCancelar.addEventListener("click", cancelarEdicion);
}

function cancelarEdicion(){
    if (editIndex !== null && originalItem){
        items[editIndex] = originalItem;
    }
    actualizarFormulario();
    editIndex = null;
    originalItem = null;
}

async function loadItems() {
    mostrarSpinner();
    try {
        items = await obtenerTodos();
        ocultarSpinner();

        if (Array.isArray(items)) {
            rellenarTabla();
        } else {
            console.error("Los datos recibidos no son un array.");
        }
    } catch (error) {
        console.error("Error al cargar los items:", error);
        ocultarSpinner();
    }
}


function rellenarTabla() {
    const tabla = document.getElementById("table-items");
    let tbody = tabla.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    const celdas = ["id", "nombre", "tamano", "masa", "tipo", "distanciaAlSol", "presentaAnillo", "presentaVida", "composicionAtmosferica"];

    items.forEach((item, index) => {
        let nuevaFila = document.createElement("tr");

        celdas.forEach((celda) => {
            let nuevaCelda = document.createElement("td");
            if (celda === "presentaAnillo" || celda === "presentaVida") {
                nuevaCelda.textContent = item[celda] ? "Sí" : "No";
            } else if (celda === "composicionAtmosferica") {
                nuevaCelda.textContent = item[celda] || "n/a";
            } else {
                nuevaCelda.textContent = item[celda] || "n/a";
            }
            nuevaFila.appendChild(nuevaCelda);
        });

        let celdaBotones = document.createElement("td");
        celdaBotones.className = "flex td-action";

        let botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.className = "btn btn-success";
        botonEditar.setAttribute("data-id", item.id);
        botonEditar.onclick = function () { onUpdate(items.findIndex(i => i.id === item.id)) };

        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "btn btn-danger";
        botonEliminar.setAttribute("data-id", item.id);
        botonEliminar.onclick = function () { onDelete(items.findIndex(i => i.id === item.id)) };

        celdaBotones.appendChild(botonEditar);
        celdaBotones.appendChild(botonEliminar);

        nuevaFila.appendChild(celdaBotones);
        tbody.appendChild(nuevaFila);
    });
}


async function escuchandoFormulario() {
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const model = capturarDatosFormulario();

        const validacion = model.verify();
        if (!validacion.success) {
            mostrarErrores(validacion.errores);
            return;
        }

        mostrarSpinner();

        if (editIndex !== null) {
            model.id = items[editIndex].id;
            try {
                await actualizarPlaneta(model.id, model); 
                items[editIndex] = model;
                editIndex = null;
                originalItem = null;
                btnEliminar.style.display = "none";
            } catch (error) {
                console.error("Error al actualizar el planeta:", error);
                mostrarErrores(["Error al actualizar el planeta. Intentelo de nuevo mas tarde."]);
                return;
            }
        } else {
            try {
                const nuevoPlaneta = await crearPlaneta(model); 
                items.push(nuevoPlaneta);
            } catch (error) {
                console.error("Error al crear el nuevo planeta:", error);
                mostrarErrores(["Error al crear el nuevo planeta. Intentelo de nuevo mas tarde."]);
                return;
            }
        }

        rellenarTabla();
        actualizarFormulario();
        ocultarSpinner();
    });
}


function capturarDatosFormulario() {
    return new Planeta(
        formulario.querySelector("#nombre").value,
        parseFloat(formulario.querySelector("#tamano").value),
        formulario.querySelector("#masa").value,
        formulario.querySelector("#tipo").value,
        parseFloat(formulario.querySelector("#distancia").value),
        formulario.querySelector("#vida").checked,
        formulario.querySelector("#anillo").checked,
        formulario.querySelector("#composicion").value
    );
}

function mostrarErrores(errores) {
    alert(errores.join("\n"));
}

function actualizarFormulario() {
    formulario.reset();
    editIndex = null;
    originalItem = null;
    btnEliminar.style.display ="none";
}

async function escuchandoBtnDeleteAll() {
    const btn = document.getElementById("btn-delete-all");

    btn.addEventListener("click", async () => {
        const rta = confirm("¿Desea eliminar todos los items?");
        mostrarSpinner();
        if (rta) {
            mostrarSpinner();
            try {
                await eliminarTodos();
                items = [];
                rellenarTabla();
            } catch (error) {
                console.error("Error al eliminar todos los planetas:", error);
                mostrarErrores(["Error al eliminar todos los items. Intentelo de nuevo mas tarde."]);
                return;
            }
            ocultarSpinner();
        }
    });
}

function actualizarAño() {
    const yearElement = document.getElementById("year");
    const año = new Date().getFullYear();
    yearElement.textContent = año;
}

async function onDelete(index) {
    const rta = confirm('¿Desea eliminar el item?');
    if (rta) {
        mostrarSpinner();
        try {
            await eliminarPlaneta(items[index].id);
            items.splice(index, 1);
            rellenarTabla();
            actualizarFormulario();
            btnEliminar.style.display = "none";
        } catch (error) {
            console.error("Error al eliminar el planeta:", error);
            mostrarErrores(["Error al eliminar el planeta. Intentelo de nuevo mas tarde."]);
            return;
        }
        ocultarSpinner();
    }
}

function onUpdate(index) {
    const item = items[index];
    originalItem = {...item};

    formulario.querySelector("#nombre").value = item.nombre;
    formulario.querySelector("#tamano").value = item.tamano;
    formulario.querySelector("#masa").value = item.masa;
    formulario.querySelector("#tipo").value = item.tipo;
    formulario.querySelector("#distancia").value = item.distanciaAlSol;
    formulario.querySelector("#vida").checked = item.presentaVida;
    formulario.querySelector("#anillo").checked = item.presentaAnillo;
    formulario.querySelector("#composicion").value = item.composicionAtmosferica;

    editIndex = index;

    btnEliminar.style.display = "inline-block";

    btnEliminar.onclick = function() { onDelete(index);};
}
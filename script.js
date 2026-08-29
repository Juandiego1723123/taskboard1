let tareas = [];
let contadorId = 0;

function crearTarea(titulo, prioridad){
    contadorId++;
    return {
        id: contadorId,
        titulo: titulo,
        prioridad: prioridad,
        estado: "pendiente"
    };
}

function renderizarTablero(){
    document.querySelector("#lista-pendiente").innerHTML = "";
    document.querySelector("#lista-progreso").innerHTML = "";
    document.querySelector("#lista-hecho").innerHTML = "";

    tareas.forEach((tarea) => {
        const columna = document.querySelector(`#lista-${tarea.estado}`);
        columna.appendChild(crearTarjetaHTML(tarea))

    });

    actualizarContador()
}

function actualizarContador(){
    const pendientes = tareas.filter((t)=>{return t.estado !== "hecho"})
    const n = pendientes.length;
    document.querySelector("#contador-pendientes").textContent = `${n} tarea${n === 1 ? "" : "s"} pendiente${n === 1 ? "" : "s"}`
}

function crearTarjetaHTML(tarea){
   const tarjeta = document.createElement("div")
   tarjeta.classList.add("tarjeta");
   tarjeta.dataset.prioridad = tarea.prioridad;
   tarjeta.dataset.id = tarea.id;

   const parrafo = document.createElement("p");
   parrafo.textContent = tarea.titulo;

   const acciones = document.createElement("div");
   acciones.classList.add("acciones");

   const btnAvanzar = document.createElement("button");
   btnAvanzar.textContent= "Avanzar ->"
   btnAvanzar.classList.add("btn-avanzar")
   btnAvanzar.addEventListener("click", () => {
       if (tarea.estado === "pendiente") tarea.estado = "progreso";
       else if (tarea.estado === "progreso") tarea.estado = "hecho";
       renderizarTablero();
   });

   const btnEliminar = document.createElement("button")
   btnEliminar.textContent = "Eliminar X"
   btnEliminar.classList.add("btn-eliminar")
   btnEliminar.addEventListener("click", () => {
       tareas = tareas.filter((t) => t.id !== tarea.id);
       renderizarTablero();
   });

   acciones.appendChild(btnAvanzar)
   acciones.appendChild(btnEliminar)
   tarjeta.appendChild(parrafo)
   tarjeta.appendChild(acciones)

   return tarjeta
}

document.getElementById("anio").textContent = new Date().getFullYear();

const form = document.getElementById("form-nueva-tarea");
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const titulo = document.getElementById("titulo-tarea").value.trim();
    const prioridad = document.getElementById("prioridad-tarea").value;
    if (!titulo) return;

    tareas.push(crearTarea(titulo, prioridad));
    renderizarTablero();

    form.reset();
});

renderizarTablero();

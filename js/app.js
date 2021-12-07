const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

const registrosPorPagina = 40; 

let totalPaginas;
let iterador;

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector("#termino").value;

  //Validar formulario, no aceptar campos vacios
  if (terminoBusqueda === "") {
    mostrarAlerta("Debe ingresar datos que sean correctos");
    return;
  }

  buscarImagenes();
}

function mostrarAlerta(mensaje) {

  const alertaExiste = document.querySelector('.bg-red-100');

  if (!alertaExiste) { // Si existe que solamente se vea una vez y no cada vez que apretamos el boton
    const alerta = document.createElement("p");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
    `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes() {
 
    const termino = document.querySelector('#termino').value;
 
 
    const key = '24646168-2a770a2ec9aa619292b395e35';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=100`;
 
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
           
             totalPaginas = calcularPaginas(resultado.totalHits);
             console.log(totalPaginas);
             mostrarImagenes(resultado.hits);
        })
}

function *crearPaginador(total){
  console.log(total);
  for (let i = 1; i <= total; i++) {
    yield i;
  } 
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total / registrosPorPagina));
}

function mostrarImagenes(imagenes){
    console.log(imagenes);
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    //Iterar sobre el arreglo de imagenes
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen; 

        resultado.innerHTML +=`
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class= "w-full" src="${previewURL}">

                    <div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light">Me gusta </span></p>
                        <p class="font-bold">${views} <span class="font-light">Veces vistas</span></p>

                        <a
                        class="block w-full bg-blue-800 hover:bg-blue-500 text-white upperCase font-bold text-center rounded mt-5 p-1"
                        href="${largeImageURL}" target="_blank">Ver imagen</a>

                    </div>
                </div>
            <div/>    
            `
    });

    imprimirPaginador();
}

function imprimirPaginador(){
  iterador = crearPaginador(totalPaginas);
}
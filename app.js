//  // Obtener el elemento input CANTIDAD DE CARACTERES
const txtTexto = document.getElementById('txtTexto');
const contador = document.getElementById('cantidad__caractares');
const mensaje = document.querySelector(".mensaje");
const limiteCaracteres = 500;
const div__Desencriptar = document.querySelector('.sub__desencriptar-container-right');
const texto__Respuesta = document.getElementById('texto__Respuesta');

const mensaje__alerta = document.getElementById('modal');
const modal__mensaje = document.getElementById('modal__mensaje');


txtTexto.addEventListener('input', function() {
    const convertirenMinusculas = this.value.toLowerCase();

const specialCaracter = /[^a-z0-9\sñÑ]/g.exec(convertirenMinusculas);
if(specialCaracter){
    const specialChar = specialCaracter[0];
       setTimeout(() => {

        const cleanedText = convertirenMinusculas.replace(/[^a-z0-9\sñÑ]/g, '');
        this.value = cleanedText;
    }, 100); 
    modal__mensaje.textContent="No debe utilizar Letras con Acentos, Caracteres Especiales y Tampoco Mayusculas.";
    mensaje__alerta.style.display='flex';
} else {

    this.value = convertirenMinusculas;
}

  
    let contadorCaracteres = limiteCaracteres - txtTexto.value.length;
    if (contadorCaracteres < 0) {
        contadorCaracteres = 0;
    }
    contador.textContent = `Caracteres restantes: ${contadorCaracteres}`;
    if (txtTexto.value.length > limiteCaracteres) {
        txtTexto.value = txtTexto.value.slice(0, limiteCaracteres);
    }
});






///SCRIPT PARA DESENCRIPTAR------------------------------------------

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"



// console.table(matrizCodigo);
function encriptar(StringTexto,key){
    let matrizCodigo = [["e","enter"],
                        ["i","imes"],
                        ["a","ai"],
                        ["o","ober"],
                        ["u","ufat"]];
 console.table(matrizCodigo);

    StringTexto = StringTexto.toLowerCase();

    for(let i = 0; i < matrizCodigo.length; i++){
        if(StringTexto.includes(matrizCodigo[i][0])){
            // StringTexto = StringTexto.replace(new RegExp(matrizCodigo[i][0], 'g'),key + matrizCodigo[i][1]);
           StringTexto = StringTexto.replaceAll(matrizCodigo[i][0],matrizCodigo[i][1]);
        }
    }
    return StringTexto;
}

function desencriptar(StringTexto,key){
    let matrizCodigo = [["e","enter"],
                        ["i","imes"],
                        ["a","ai"],
                        ["o","ober"],
                        ["u","ufat"]];
    StringTexto = StringTexto.toLowerCase();

    for(let i = 0; i < matrizCodigo.length; i++){
        if(StringTexto.includes(matrizCodigo[i][1])){
            // StringTexto = StringTexto.replace(new RegExp(matrizCodigo[i][0], 'g'),key + matrizCodigo[i][1]);
           StringTexto = StringTexto.replaceAll(matrizCodigo[i][1],matrizCodigo[i][0]);
        }
    }
    return StringTexto;
}


// const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~` ';
//OTRO METODO DE INCRIPTACION

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~` ÁáÉéÍíÓóÚúÑñÜü';






function encriptarTexto(text,key){    
    let encriptarTexto = "";
    for(let i = 0; i < text.length; i++){
        const textChar = text[i];
        const keyChar = key[i % key.length];

        const textIndex = alphabet.indexOf(textChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if(textIndex === -1){
            encriptarTexto += textChar;
        }else{
            const newIndex = (textIndex + keyIndex) %
            alphabet.length;
            encriptarTexto += alphabet[newIndex];
        }
    }
    return encriptarTexto;
}

function desencriptarTexto(encriptarTexto, key){
    let desencriptarTexto = "";
    
    for(let i = 0; i < encriptarTexto.length; i++){
        const encriptarChar = encriptarTexto[i];
        const keyChar = key[i % key.length];

        const encriptarIndex = alphabet.indexOf(encriptarChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if(encriptarTexto === -1){
            desencriptarTexto += encriptarChar;
        }else{
            let newIndex = encriptarIndex - keyIndex;
            if(newIndex < 0) newIndex += alphabet.length;
            desencriptarTexto += alphabet[newIndex];
        }
    }
    return desencriptarTexto;
}

//ACTUALIZANDO EL RESULTADO SEGUN LA OPERACION DE ENCRIPTAR + DESCENCRIPTAR

function actualizarResultado(isEncrypting) {
    const texto = document.getElementById('txtTexto').value;
    const key = document.getElementById('key').value;

    let resultado = "";
    if(isEncrypting){
        resultado = encriptar(texto,key);
        // resultado = encriptarTexto(texto,key);

    }else{

        resultado = desencriptar(texto,key);
        // resultado = desencriptarTexto(texto,key);
    }
 //document.getElementById('resultado').textContent = resultado;
    mensaje.value = resultado;
}


function ajustarAlturaTextarea(textarea) {
    textarea.style.height = 'auto'; 
    textarea.style.height = (textarea.scrollHeight) + 'px'; 
}





document.getElementById("btn__encriptar").addEventListener('click',
    function manejarClick() {        
            if(txtTexto.value===""){
                mensaje__alerta.style.display='flex';
            }else{
                mensaje__alerta.style.display = 'none';
                // div__Desencriptar.style.display='flex';
                actualizarResultado(true);
                eliminarElemento();
                txtTexto.value="";
            }     
    }      
);

  // Función para cerrar el modal
  document.getElementById("cerrarModal").addEventListener('click', function() {
    var modal = document.getElementById("modal");
    modal.style.display = 'none';
});


document.getElementById("btn__desencriptar").addEventListener('click',
    function(){
        if(txtTexto.value===""){
            mensaje__alerta.style.display='flex';
            
        }else{
            eliminarElemento();
            mensaje__alerta.style.display = 'none';
            actualizarResultado(false);
            ajustarAlturaTextarea(mensaje);
            // div__Desencriptar.style.display='block';
            txtTexto.value="";
        }
    }
)





//INICIALIZA EL RESULTADO CON TEXTO CIFRADO CUANDO CARGA LA PÁGINA
document.addEventListener('DOMContentLoaded',() => {
    actualizarResultado(true);
});



//Borrar el contenido
function eliminarElemento() {    
    const elemento = document.querySelector('.presentacion');
    if (elemento) {
        elemento.style.display='none';
    } else {
        console.error('No se encontró el elemento con la clase "presentacion".');
    }
}

function copiarTexto(){
    mensaje.select();
    document.execCommand('copy');


}

document.getElementById("btn__copiar").addEventListener('click',
    function(){
        copiarTexto();       
        texto__Respuesta.textContent = "Texto Copiado..."

        setTimeout(() => {
             texto__Respuesta.textContent = '';
        }, 3000);
        // texto__Respuesta.style.display='block';
    }
)


document.getElementById("btn__limpiar").addEventListener('click',
    function(){
        mensaje.value="";
     
    }
)



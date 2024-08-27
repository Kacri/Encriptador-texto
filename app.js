//  // Obtener el elemento input CANTIDAD DE CARACTERES
const txtTexto = document.getElementById('txtTexto');
const contador = document.getElementById('cantidad__caractares');
const mensaje = document.querySelector(".mensaje");
const limiteCaracteres = 500;
const div__Desencriptar = document.querySelector('.sub__desencriptar-container-right');
const texto__Respuesta = document.getElementById('texto__Respuesta');

const mensaje__alerta = document.getElementById('modal');


// document.addEventListener('click',function(event){
//     if (!textoRespuesta.contains(event.target)) {
//         texto__Respuesta.style.display = 'none'; // Oculta el elemento
//     }
// })

txtTexto.addEventListener('input', function() {
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
// const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~` ';

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
        resultado = encriptarTexto(texto,key);
    }else{
        resultado = desencriptarTexto(texto,key);
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
                div__Desencriptar.style.display='block';
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
            div__Desencriptar.style.display='block';
        }

        
       
       
        
       
    }
)
//INICIALIZA EL RESULTADO CON TEXTO CIFRADO CUANDO CARGA LA PÁGINA
document.addEventListener('DOMContentLoaded',() => {
    actualizarResultado(true);
});



//Borrar el contenido
function eliminarElemento() {    
    var elemento = document.querySelector('.presentacion');
    if (elemento) {
        elemento.remove(); // Elimina el elemento del DOM
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
        txtTexto.value="";
    }
)





// txtTexto.addEventListener('input', function() {
//     const contadorCaracteres = limiteCaracteres - txtTexto.value.length;
//     contador.textContent = `Caracteres restantes: ${contadorCaracteres}`;
//     if (contadorCaracteres <= 0) {
//         txtTexto.value = txtTexto.value.slice(0, limiteCaracteres);
//     }
// });
// ==UserScript==
// @name LAB_4
// @namespace tampermonkey-example
// @version 1.0
// @description lab_4
// @match https://cripto.tiiny.site/
// @match https://jairo.tiiny.site/
// @require https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// @author JAIRO_MATATAN
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    // Función para decodificar cadenas Base64 cifradas en 3DES a texto plano
    function decrypt3DES(encodedString, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var decrypted = CryptoJS.TripleDES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(encodedString)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    // Obtiene el primer párrafo
    var primerParrafo = document.querySelector('p');
    if (!primerParrafo) {
        console.log("No se encontró un párrafo.");
        return;
    }

    // Obtiene el texto del primer párrafo
    var primerParrafoTexto = primerParrafo.textContent;

    // Filtra las mayúsculas del texto del primer párrafo
    var key = primerParrafoTexto.match(/[A-Z]/g);
    if (!key) {
        console.log("No se encontraron mayúsculas en el primer párrafo.");
        return;
    }

    // Clave 3DES se deriva de las mayúsculas en el primer párrafo
    var tresDESKey = key.join('');

    console.log("La llave es: " + tresDESKey);

    // Obtiene todos los divs con clases que comienzan con "M"
    var divs = document.querySelectorAll('div[class^="M"]');

    // Obtiene la cantidad de divs encontrados
    var divCount = divs.length;

    console.log("Los mensajes cifrados son: " + divCount);

    // Recorre los divs, decodifica sus contenidos e imprime en la consola
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        var encodedId = div.getAttribute('id');
        var decodedText = decrypt3DES(encodedId, tresDESKey);
        console.log(encodedId + " " + decodedText);
        // Reemplaza el contenido del div con el texto decodificado
        div.textContent = decodedText;
    }
})();

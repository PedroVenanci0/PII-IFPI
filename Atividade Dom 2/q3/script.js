var contarParagrafos = document.getElementById("contarParagrafos");
var resposta = document.getElementById('resposta');
contarParagrafos.addEventListener("click", function () {
    var paragrafos = document.getElementsByClassName('paragrafo');
    var contador = 0;
    for (var i = 0; i < paragrafos.length; i++) {
        contador++;
    }
    resposta.innerText = "N\u00FAmero de par\u00E1grafos: ".concat(contador);
});

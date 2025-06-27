// a) Exemplo com getElementById
var botaoTitulo = document.getElementById("mudarTitulo");
var titulo = document.getElementById("titulo");
botaoTitulo.addEventListener("click", function () {
    titulo.textContent = "!!!!";
});
// b) Exemplo com getElementsByTagName
var botaoParagrafos = document.getElementById("destacarParagrafos");
botaoParagrafos.addEventListener("click", function () {
    var paragrafos = document.getElementsByTagName("p");
    for (var i = 0; i < paragrafos.length; i++) {
        paragrafos[i].style.color = "red";
    }
});

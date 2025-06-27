var botao = document.getElementById("botao");
var botaoLimpar = document.getElementById("botaoLimpar");
botao.addEventListener("click", function () {
    var paragrafo = document.getElementById("paragrafo");
    paragrafo.textContent = "O texto deste parágrafo foi alterado!";
});
botaoLimpar.addEventListener("click", function () {
    var paragrafo = document.getElementById("paragrafo");
    paragrafo.textContent = "";
});

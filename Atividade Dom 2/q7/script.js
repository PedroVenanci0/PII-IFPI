var botao = document.getElementById("botao");
var origem = document.getElementById("origem");
var resposta = document.getElementById("resposta");
botao.addEventListener("click", function () {
    var conteudo = origem.textContent || '';
    resposta.textContent = conteudo.toUpperCase();
});

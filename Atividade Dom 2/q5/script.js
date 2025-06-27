var botao = document.getElementById("botao");
botao.addEventListener("click", function () {
    var exemplo = document.getElementById("exemplo");
    console.log("textContent:", exemplo.textContent);
    console.log("innerText:", exemplo.innerText);
    console.log("innerHTML:", exemplo.innerHTML);
});

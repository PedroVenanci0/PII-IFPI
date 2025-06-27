document.addEventListener("DOMContentLoaded", () => {

const descricaoInput = document.getElementById("descricaoTarefa");
const prioridadeSelect = document.getElementById("prioridadeTarefa");
const adicionarBtn = document.getElementById("adicionarBtn");
const tabelaBody = document.querySelector("#tabelaTarefas tbody");

let tarefas = [];
let idCounter = 1;

function renderizarTabela() {
    tabelaBody.innerHTML = ""; 

    if (tarefas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 5;
        td.textContent = "Nenhuma tarefa cadastrada.";
        td.style.textAlign = "center";
        tr.appendChild(td);
        tabelaBody.appendChild(tr);
        return;
    }

    tarefas.forEach((tarefa) => {
        const tr = document.createElement("tr");

        if (tarefa.dataConclusao) {
        tr.classList.add("tarefa-concluida");
        }
        tr.classList.add(`prioridade-${tarefa.prioridade}`);

        const tdId = document.createElement("td");
        tdId.textContent = tarefa.id;
        tr.appendChild(tdId);

        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = tarefa.descricao;
        tr.appendChild(tdDescricao);

        const tdDataInicio = document.createElement("td");
        tdDataInicio.textContent = formatarData(tarefa.dataInicio);
        tr.appendChild(tdDataInicio);

        const tdDataConclusao = document.createElement("td");
        tdDataConclusao.textContent = tarefa.dataConclusao
        ? formatarData(tarefa.dataConclusao)
        : "Pendente";
        tr.appendChild(tdDataConclusao);

        const tdAcoes = document.createElement("td");

        if (tarefa.dataConclusao) {
            const reabrirBtn = document.createElement("button");
            reabrirBtn.textContent = "Reabrir";
            reabrirBtn.className = "action-button reabrirBtn";
            reabrirBtn.onclick = () => reabrirTarefa(tarefa.id);
            tdAcoes.appendChild(reabrirBtn);
        } else {
            const concluirBtn = document.createElement("button");
            concluirBtn.textContent = "Concluir";
            concluirBtn.className = "action-button concluirBtn";
            concluirBtn.onclick = () => concluirTarefa(tarefa.id);
            tdAcoes.appendChild(concluirBtn);
        }

        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.className = "action-button editarBtn";
        editarBtn.disabled = !!tarefa.dataConclusao; 
        editarBtn.onclick = () => editarTarefa(tarefa.id);
        tdAcoes.appendChild(editarBtn);

        const excluirBtn = document.createElement("button");
        excluirBtn.textContent = "Excluir";
        excluirBtn.className = "action-button excluirBtn";
        excluirBtn.disabled = !!tarefa.dataConclusao;
        excluirBtn.onclick = () => excluirTarefa(tarefa.id);
        tdAcoes.appendChild(excluirBtn);

        tr.appendChild(tdAcoes);
        tabelaBody.appendChild(tr);
    });
    }

    function adicionarTarefa() {
    const descricao = descricaoInput.value.trim();
    const prioridade = prioridadeSelect.value;

    if (!descricao) {
        alert("Por favor, insira a descrição da tarefa.");
        return;
    }

    const novaTarefa = {
        id: idCounter++,
        descricao: descricao,
        dataInicio: new Date(),
        dataConclusao: null,
        prioridade: prioridade,
    };

    tarefas.push(novaTarefa);

    descricaoInput.value = ""; 
    salvarNoLocalStorage();
    renderizarTabela();
}

/**
 * Marca uma tarefa como concluída.
 * @param {number} id - O ID da tarefa a ser concluída.
 */

function concluirTarefa(id) {
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa) {
        tarefa.dataConclusao = new Date();
        salvarNoLocalStorage();
        renderizarTabela();
    }
}

/**
 * Reabre uma tarefa que estava concluída.
 * @param {number} id - O ID da tarefa a ser reaberta.
 */
function reabrirTarefa(id) {
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa) {
        tarefa.dataConclusao = null;
        salvarNoLocalStorage();
        renderizarTabela();
    }
}

/**
 * Edita a descrição de uma tarefa existente.
 * @param {number} id - O ID da tarefa a ser editada.
 */
function editarTarefa(id) {
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa) {
        const novaDescricao = prompt(
        "Digite a nova descrição da tarefa:",
        tarefa.descricao
        );
        if (novaDescricao && novaDescricao.trim() !== "") {
        tarefa.descricao = novaDescricao.trim();
        salvarNoLocalStorage();
        renderizarTabela();
        }
    }
}

/**
 * Exclui uma tarefa do array.
 * @param {number} id - O ID da tarefa a ser excluída.
 */
function excluirTarefa(id) {
    const confirmou = confirm("Tem certeza que deseja excluir esta tarefa?");
    if (confirmou) {
        const tarefa = tarefas.find((t) => t.id === id);
        if (tarefa && tarefa.dataConclusao) {
        alert("Não é permitido excluir tarefas finalizadas.");
        return;
        }

        tarefas = tarefas.filter((t) => t.id !== id);
        salvarNoLocalStorage();
        renderizarTabela();
    }
}

/**
 * Formata um objeto Date para o formato "dd/mm/aaaa hh:mm:ss".
 * @param {Date} data - O objeto Date a ser formatado.
 */
function formatarData(data) {
    if (!(data instanceof Date)) {
        data = new Date(data);
    }
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    return new Intl.DateTimeFormat("pt-BR", options).format(data);
}

/**
 * Salva o array de tarefas no Local Storage do navegador.
 */
function salvarNoLocalStorage() {
    localStorage.setItem("tarefas_app", JSON.stringify(tarefas));
}

/**
 * Carrega as tarefas salvas do Local Storage.
 */
function carregarDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem("tarefas_app");
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        if (tarefas.length > 0) {
        idCounter = Math.max(...tarefas.map((t) => t.id)) + 1;
        }
    }
}

adicionarBtn.addEventListener("click", adicionarTarefa);

descricaoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        adicionarTarefa();
    }
});

carregarDoLocalStorage(); 
renderizarTabela(); 
});
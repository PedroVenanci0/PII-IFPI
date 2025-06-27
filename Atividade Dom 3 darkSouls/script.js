document.addEventListener("DOMContentLoaded", () => {
    // --- MAPEAMENTO DE ELEMENTOS DO DOM ---
    const descricaoInput = document.getElementById("descricaoTarefa");
    const prioridadeSelect = document.getElementById("prioridadeTarefa");
    const adicionarBtn = document.getElementById("adicionarBtn");
    const tabelaBody = document.querySelector("#tabelaTarefas tbody");
    const filtroInput = document.getElementById("filtro-tarefas");

    // Estatísticas
    const totalTarefasSpan = document.getElementById("total-tarefas");
    const tarefasPendentesSpan = document.getElementById("tarefas-pendentes");
    const tarefasConcluidasSpan = document.getElementById("tarefas-concluidas");

    // Modal
    const editModal = document.getElementById("edit-modal");
    const editIdInput = document.getElementById("edit-tarefa-id");
    const editDescricaoInput = document.getElementById("edit-descricao");
    const editPrioridadeSelect = document.getElementById("edit-prioridade");
    const salvarEditBtn = document.getElementById("salvar-edit-btn");
    const cancelarEditBtn = document.getElementById("cancelar-edit-btn");

    // --- ESTADO DA APLICAÇÃO ---
    let tarefas = [];
    let idCounter = 1;

    function renderizarTabela() {
        tabelaBody.innerHTML = "";
        const termoFiltro = filtroInput.value.toLowerCase();
        
        const tarefasFiltradas = tarefas.filter(tarefa =>
            tarefa.descricao.toLowerCase().includes(termoFiltro)
        );

        if (tarefasFiltradas.length === 0) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = 6;
            td.textContent = "A fogueira está apagada. Nenhuma missão por aqui.";
            td.style.textAlign = "center";
            td.style.fontStyle = "italic";
            tr.appendChild(td);
            tabelaBody.appendChild(tr);
        } else {
            tarefasFiltradas.forEach(tarefa => {
                const tr = document.createElement("tr");
                tr.className = `prioridade-${tarefa.prioridade}`;
                if (tarefa.dataConclusao) {
                    tr.classList.add("tarefa-concluida");
                }

                const prioridadeTexto = {
                    baixa: "Comum",
                    media: "Formidável",
                    alta: "Lorde"
                };

                tr.innerHTML = `
                    <td>${String(tarefa.id).padStart(3, '0')}</td>
                    <td>${tarefa.descricao}</td>
                    <td>${prioridadeTexto[tarefa.prioridade]}</td>
                    <td>${formatarData(tarefa.dataInicio)}</td>
                    <td>${tarefa.dataConclusao ? formatarData(tarefa.dataConclusao) : "Errante"}</td>
                `;

                const tdAcoes = document.createElement("td");
                
                if (tarefa.dataConclusao) {
                    const reabrirBtn = document.createElement("button");
                    reabrirBtn.textContent = "🔄";
                    reabrirBtn.title = "Reacender a Alma";
                    reabrirBtn.className = "action-button";
                    reabrirBtn.onclick = () => reabrirTarefa(tarefa.id);
                    tdAcoes.appendChild(reabrirBtn);
                } else {
                    const concluirBtn = document.createElement("button");
                    concluirBtn.textContent = "💀";
                    concluirBtn.title = "Coletar Alma";
                    concluirBtn.className = "action-button";
                    concluirBtn.onclick = () => concluirTarefa(tarefa.id);
                    tdAcoes.appendChild(concluirBtn);
                }
                
                const editarBtn = document.createElement("button");
                editarBtn.textContent = "✍️";
                editarBtn.title = "Alterar Destino";
                editarBtn.className = "action-button";
                editarBtn.disabled = !!tarefa.dataConclusao;
                editarBtn.onclick = () => abrirModalEdicao(tarefa.id);
                tdAcoes.appendChild(editarBtn);

                const excluirBtn = document.createElement("button");
                excluirBtn.textContent = "🔥";
                excluirBtn.title = "Banir Missão";
                excluirBtn.className = "action-button";
                excluirBtn.disabled = !!tarefa.dataConclusao;
                excluirBtn.onclick = () => excluirTarefa(tarefa.id);
                tdAcoes.appendChild(excluirBtn);
                
                tr.appendChild(tdAcoes);
                tabelaBody.appendChild(tr);
            });
        }
        atualizarEstatisticas();
    }

    function adicionarTarefa() {
        const descricao = descricaoInput.value.trim();
        if (!descricao) {
            alert("Um guerreiro não parte sem um propósito. Descreva sua missão.");
            return;
        }

        const novaTarefa = {
            id: idCounter++,
            descricao: descricao,
            dataInicio: new Date(),
            dataConclusao: null,
            prioridade: prioridadeSelect.value,
        };

        tarefas.push(novaTarefa);
        descricaoInput.value = "";
        salvarNoLocalStorage();
        renderizarTabela();
    }

    function concluirTarefa(id) {
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.dataConclusao = new Date();
            salvarNoLocalStorage();
            renderizarTabela();
        }
    }

    function reabrirTarefa(id) {
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.dataConclusao = null;
            salvarNoLocalStorage();
            renderizarTabela();
        }
    }
    
    function excluirTarefa(id) {
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa && tarefa.dataConclusao) {
            alert("Almas coletadas não podem ser banidas. O destino já foi selado.");
            return;
        }

        const confirmou = confirm("A jornada é perigosa. Deseja mesmo abandonar esta missão e baní-la para o abismo?");
        if (confirmou) {
            tarefas = tarefas.filter(t => t.id !== id);
            salvarNoLocalStorage();
            renderizarTabela();
        }
    }

    function abrirModalEdicao(id) {
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa) {
            editIdInput.value = tarefa.id;
            editDescricaoInput.value = tarefa.descricao;
            editPrioridadeSelect.value = tarefa.prioridade;
            editModal.style.display = "flex";
        }
    }

    function fecharModalEdicao() {
        editModal.style.display = "none";
    }

    function salvarEdicao() {
        const id = parseInt(editIdInput.value);
        const tarefa = tarefas.find(t => t.id === id);
        const novaDescricao = editDescricaoInput.value.trim();

        if (!novaDescricao) {
            alert("O pergaminho não pode estar em branco.");
            return;
        }

        if (tarefa) {
            tarefa.descricao = novaDescricao;
            tarefa.prioridade = editPrioridadeSelect.value;
            salvarNoLocalStorage();
            renderizarTabela();
            fecharModalEdicao();
        }
    }

    function atualizarEstatisticas() {
        const concluidas = tarefas.filter(t => t.dataConclusao).length;
        const pendentes = tarefas.length - concluidas;
        totalTarefasSpan.textContent = tarefas.length;
        tarefasPendentesSpan.textContent = pendentes;
        tarefasConcluidasSpan.textContent = concluidas;
    }

    function formatarData(data) {
        if (!data) return "N/A";
        const dataObj = new Date(data);
        return new Intl.DateTimeFormat("pt-BR").format(dataObj);
    }

    function salvarNoLocalStorage() {
        // Mudei a chave para não conflitar com a versão anterior
        localStorage.setItem("darksouls_tasks", JSON.stringify(tarefas));
    }

    function carregarDoLocalStorage() {
        const tarefasSalvas = localStorage.getItem("darksouls_tasks");
        if (tarefasSalvas) {
            tarefas = JSON.parse(tarefasSalvas);
            if (tarefas.length > 0) {
                idCounter = Math.max(...tarefas.map(t => t.id)) + 1;
            }
        }
    }

    // --- EVENT LISTENERS ---
    adicionarBtn.addEventListener("click", adicionarTarefa);
    descricaoInput.addEventListener("keypress", (e) => { if (e.key === "Enter") adicionarTarefa(); });
    filtroInput.addEventListener("input", renderizarTabela);
    salvarEditBtn.addEventListener("click", salvarEdicao);
    cancelarEditBtn.addEventListener("click", fecharModalEdicao);

    // --- INICIALIZAÇÃO ---
    carregarDoLocalStorage();
    renderizarTabela();
});
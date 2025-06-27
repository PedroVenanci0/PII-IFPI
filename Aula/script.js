function getById(id){
    return document.getElementById(id)
}

let botaoSolicitar = getById("botaoSolicitar");

botaoSolicitar.addEventListener("click", SolicitarConselho)

async function SolicitarConselho() {
    let url = "https://api.adviceslip.com/advice"

    try {
        let response = await fetch(url)

        if(!response.ok){
            throw new Error(`Response: ${response.status}`)
        }

    let json = await response.json();
    getById("conselho").innerText = json.slip.advice;
    } catch (e){
        getById("erroConcelho").innerText = "Erro ao solicitar conselho"
        console.log(e.message)
    }
}
const areaTexto = document.querySelector("textarea"),
    listaVozes = document.querySelector("select"),
    botaoFala = document.querySelector("button");

let sintese = speechSynthesis,
    falando = true;

vozes();

function vozes() {
    for (let voice of sintese.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        listaVozes.insertAdjacentHTML("beforeend", option);
    }
}

sintese.addEventListener("voiceschanged", vozes);

function textoParaFala(text) {
    let locucao = new SpeechSynthesisUtterance(text);
    for (let voice of sintese.getVoices()) {
        if (voice.name === listaVozes.value) {
            locucao.voice = voice;
        }
    }
    sintese.speak(locucao);
}

botaoFala.addEventListener("click", e => {
    e.preventDefault();
    if (areaTexto.value !== "") {
        if (!sintese.speaking) {
            textoParaFala(areaTexto.value);
        }
        if (areaTexto.value.length > 80) {
            setInterval(() => {
                if (!sintese.speaking && !falando) {
                    falando = true;
                    botaoFala.innerText = "Converta para fala";
                } else { }
            }, 500);
            if (falando) {
                sintese.resume();
                falando = false;
                botaoFala.innerText = "Pause fala";
            } else {
                sintese.pause();
                falando = true;
                botaoFala.innerText = "Continuar fala";
            }
        } else {
            botaoFala.innerText = "Converta para fala";
        }
    }
});
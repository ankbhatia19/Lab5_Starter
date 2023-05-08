// explore.js

window.addEventListener('DOMContentLoaded', init);

// Load all SpeechSynthesisVoice objects into the dropdown list
function populateVoiceList() {
    const synth = window.speechSynthesis;

    console.log(synth.getVoices());

    synth.getVoices().forEach(function(voice) {
        const option = document.createElement('option');

        option.textContent = `${voice.name} (${voice.lang})`;
        if (voice.default) {
            option.textContent += " — DEFAULT";
        }

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        document.getElementById("voice-select").appendChild(option);
    });
}
function init() {
    populateVoiceList();


}
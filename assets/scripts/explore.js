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

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    // When the user clicks the "speak" button, speak the text in the textarea
    document.querySelector('button').addEventListener('click', function() {
        const text = document.getElementById("text-to-speak").value;
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedOption = document.getElementById("voice-select").selectedOptions[0].getAttribute('data-name');
        const voices = speechSynthesis.getVoices();

        for (let i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedOption) {
                utterance.voice = voices[i];
            }
        }

        // Update the image to the open smile
        const img = document.querySelector('img');
        img.src = "assets/images/smiling-open.png";

        // When the speech ends, change the image back to the closed smile
        utterance.addEventListener('end', function() {
            img.src = "assets/images/smiling.png";
        });

        speechSynthesis.speak(utterance);

    });
}
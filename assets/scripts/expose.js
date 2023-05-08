// expose.js

window.addEventListener('DOMContentLoaded', init);

// Change image depending on what is selected in the drop down
function setHornImage() {
    const hornImage = document.querySelector('img');
    const hornSelect = document.getElementById('horn-select');
    const hornSelectValue = hornSelect.value;

    // Ensure images are the same size
    hornImage.width = 500;
    hornImage.height = 500;

    // Change image depending on what is selected in the drop down
    if (hornSelectValue === 'air-horn') {
        hornImage.src = 'assets/images/air-horn.svg';
    } else if (hornSelectValue === 'car-horn') {
        hornImage.src = 'assets/images/car-horn.svg';
    } else if (hornSelectValue === 'party-horn') {
        hornImage.src = 'assets/images/party-horn.svg';
    }
}

// Change horn audio file depending on what is selected in the drop down
function setHornOutput() {
    const hornAudio = document.querySelector('audio');
    const hornSelect = document.getElementById('horn-select');
    const hornSelectValue = hornSelect.value;

    if (hornSelectValue === 'air-horn') {
        hornAudio.src = 'assets/audio/air-horn.mp3';
    } else if (hornSelectValue === 'car-horn') {
        hornAudio.src = 'assets/audio/car-horn.mp3';
    } else if (hornSelectValue === 'party-horn') {
        hornAudio.src = 'assets/audio/party-horn.mp3';
    }
}

// Change output volume image depending on the slider
function setVolumeImage() {
    // Get volume image via the div id
    const volumeImage = document.querySelector('#volume-controls > img');
    const volumeSlider = document.getElementById('volume');

    // Ensure images are the same size
    volumeImage.width = 50;
    volumeImage.height = 50;

    // Change image depending on what is selected in the drop down
    if (volumeSlider.value == 0) {
        volumeImage.src = 'assets/icons/volume-level-0.svg';
    } else if (volumeSlider.value >= 1 && volumeSlider.value < 33) {
        volumeImage.src = 'assets/icons/volume-level-1.svg';
    } else if (volumeSlider.value >= 33 && volumeSlider.value < 67) {
        volumeImage.src = 'assets/icons/volume-level-2.svg';
    } else if (volumeSlider.value >= 67) {
        volumeImage.src = 'assets/icons/volume-level-3.svg';
    }
}

// Change output volume depending on the slider
function setVolumeOutput() {
    const volumeSlider = document.getElementById('volume');
    const hornAudio = document.querySelector('audio');
    hornAudio.volume = volumeSlider.value / 100;
}


function init() {

    // Run all functions once to set initial values
    setHornImage();
    setHornOutput();
    setVolumeImage();
    setVolumeOutput();

    // Create confetti object so it is only created once
    const jsConfetti = new JSConfetti();

    // Add a listener to change horn image whenever drop down is changed
    const hornSelect = document.getElementById('horn-select');
    hornSelect.addEventListener('input', setHornImage);

    // Add a listener to change horn audio whenever drop down is changed
    hornSelect.addEventListener('input', setHornOutput);

    // Add a listener to change volume image whenever slider is changed
    const volumeSlider = document.getElementById('volume');
    volumeSlider.addEventListener('input', setVolumeImage);

    // Add a listener to change volume output whenever slider is changed
    volumeSlider.addEventListener('input', setVolumeOutput);

    // Add a listener to play audio whenever button is clicked
    const playButton = document.querySelector('button');
    playButton.addEventListener('click', () => {
        const hornAudio = document.querySelector('audio');
        hornAudio.play();

        // If the party horn is selected, then add confetti
        if (hornSelect.value === 'party-horn') {
            // Wait a small amount of time to line up with the audio
            setTimeout(() => {
                jsConfetti.addConfetti();
            }, 500);
        }
    });
}
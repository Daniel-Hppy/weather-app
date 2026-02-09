import { getWeatherIcon } from "./icons.js";

function createLoadingScreen() {
    const container = document.querySelector('.container');
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    const loadingIcon = document.createElement('img');
    const loadingText =document.createElement('p');
    loadingText.textContent = "Loading"

    loadingIcon.src = getWeatherIcon("Sunny");
    container.appendChild(loadingScreen);
    loadingScreen.append(loadingIcon, loadingText);
    return loadingScreen;
}

function showLoading(loadingScreen) {
    loadingScreen.style.display = "flex";
}

function hideLoading(loadingScreen) {
    loadingScreen.style.display = "none";
}

export {createLoadingScreen, showLoading, hideLoading}
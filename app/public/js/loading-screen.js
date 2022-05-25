function closeLoadingScreen() {
    let loadingScreen = $('.loading-screen');
    loadingScreen.css({
        "transitionDuration": "0.5s",
        "transitionTimingFunction": "cubic-bezier(0,.75,.25,1)",
        "opacity": "0",
        "borderRadius": "40px",
        "transform": "scale(0.75)",
        "cursor": "initial"
    });
    setTimeout(() => { loadingScreen.remove(); }, 500);
}

export default () => {
    closeLoadingScreen();
}
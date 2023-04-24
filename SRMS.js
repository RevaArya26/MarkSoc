let valueDisplays = document.querySelectorAll(".num");
let interval = 1000;

valueDisplays.forEach((valueDisplay) => {
    let start = 0
    let end = parseInt(valueDisplay.getAttribute("data-val"));

    let duration = Math.floor(interval / end);
    let counter = setInterval(function () {
        start += 5;
        valueDisplay.textContent = start;
        if (start == end) {
            clearInterval(counter)
        }
    }, duration);
});
const themeBtn =
document.getElementById("themeBtn");

function loadTheme() {

    const theme =
    localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    }
}

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );

    const dark =
    document.body.classList.contains(
        "dark"
    );

    localStorage.setItem(
        "theme",
        dark ? "dark" : "light"
    );

    themeBtn.textContent =
        dark ? "☀️" : "🌙";
}

themeBtn.addEventListener(
    "click",
    toggleTheme
);

loadTheme();
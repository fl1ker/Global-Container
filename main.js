const counters = document.querySelectorAll(".stat-number");

function startCounter(counter) {

    const target = +counter.dataset.target;
    const duration = 2000;

    let start = 0;
    const increment = target / (duration / 16);

    function update() {

        start += increment;

        if (start < target) {
            counter.innerText = Math.floor(start).toLocaleString("ru-RU") + "+";
            requestAnimationFrame(update);
        } else {
            counter.innerText = target.toLocaleString("ru-RU") + "+";
        }

    }

    update();
}

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter(entry.target);
            observer.unobserve(entry.target);

        }

    });

});

counters.forEach(counter => {
    observer.observe(counter);
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 150){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

});

let translations = {};

async function loadLanguage(lang){

    const response = await fetch(`lang/${lang}.json`);
    translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {

        const key = el.dataset.i18n;

        if(translations[key]){
            el.textContent = translations[key];
        }

    });

}

const switcher = document.querySelector(".language-switch");
const buttons = document.querySelectorAll(".lang-option");

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        const lang = btn.dataset.lang;

        loadLanguage(lang);

        switcher.classList.toggle("en", lang === "en");

        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        localStorage.setItem("lang", lang);

    });

});

const savedLang = localStorage.getItem("lang") || "ru";

loadLanguage(savedLang);

if(savedLang === "en"){
    document.querySelector(".language-switch").classList.add("en");
}

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    if(menuBtn && nav){

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

            const icon = menuBtn.querySelector("span");

            if(nav.classList.contains("active")){
                icon.textContent = "close";
            }else{
                icon.textContent = "menu";
            }

        });

    }

});

const messenger = document.querySelector(".messenger");
const toggle = document.querySelector(".messenger-toggle");

toggle.addEventListener("click", () => {
    messenger.classList.toggle("active");
});

/* emailjs*/
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_fuzfvyf",
        "template_xdmxpm7",
        this
    )
        .then(() => {
            form.innerHTML = "<p>Спасибо! Мы свяжемся с вами 🚀</p>";
        })
        .catch((error) => {
            console.error(error);
            alert("Ошибка отправки ❌");
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("nav button");
    const sections = document.querySelectorAll(".content-section");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    const kontaktLink = document.getElementById("kontakt-link");
    const kontaktButton = document.querySelector('nav button[data-section="kontakt"]');

    if (kontaktLink && kontaktButton) {
        kontaktLink.addEventListener("click", (e) => {
            e.preventDefault();
            kontaktButton.click(); // Simuliere echten Button-Klick
        });
    }

    document.querySelector(".close-icon").addEventListener("click", () => {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
    });
    let images = []; // wird in setupLightbox gesetzt
    let currentIndex = 0;

    function showImage(index) {
        const total = images.length;
        currentIndex = (index + total) % total; // wrap-around
        lightboxImg.src = images[currentIndex].src;
        counter.textContent = `${currentIndex + 1} / ${total}`;
        lightbox.classList.remove("hidden");
    }

    function setupLightbox() {
        const images = document.querySelectorAll(".clickable-image");
        images.forEach((img) => {
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightbox.classList.remove("hidden");
            });
        });
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-section");
            sections.forEach((section) => {
                section.classList.add("hidden");
            });
            document.getElementById(target).classList.remove("hidden");

            if (target === "galerie") {
                setupLightbox(); // falls nötig
            }
        });
    });

    // Lightbox schließen
    function closeLightbox() {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
    }

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (
            e.target === lightbox ||
            e.target.classList.contains("close-btn")
        ) {
            closeLightbox();
        }
    });

    // Tastatursteuerung
    document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("hidden")) return;

        if (e.key === "ArrowLeft") showImage(currentIndex - 1);
        else if (e.key === "ArrowRight") showImage(currentIndex + 1);
        else if (e.key === "Escape") closeLightbox();
    });
    // Lightbox beim initial sichtbaren Galerie-Tab vorbereiten
    if (!document.getElementById("galerie").classList.contains("hidden")) {
        setupLightbox();
    }
});

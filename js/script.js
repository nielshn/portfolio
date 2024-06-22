document.addEventListener('DOMContentLoaded', () => {
    let menuIcon = document.querySelector("#menu-icon");
    let navbar = document.querySelector(".navbar");

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle("fa-xmark");
            navbar.classList.toggle("active");
        };
    }

    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("header nav a");

    window.onscroll = () => {
        sections.forEach((sec) => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute("id");

            if (top >= offset && top < offset + height) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (document.querySelector("header nav a[href*=" + id + "]")) {
                        document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
                    }
                });
            }
        });

        let header = document.querySelector("header");
        if (header) {
            header.classList.toggle("sticky", window.scrollY > 100);
        }

        if (menuIcon && navbar) {
            menuIcon.classList.remove("fa-xmark");
            navbar.classList.remove("active");
        }
    };

    ScrollReveal({
        distance: "80px",
        duration: 2000,
        delay: 200,
    });

    ScrollReveal().reveal(".home-content, heading", { origin: "top" });
    ScrollReveal().reveal(".home-img, .services-container, portfolio-box, contact form", { origin: "bottom" });
    ScrollReveal().reveal(".home-contact h1, .about-img", { origin: "left" });
    ScrollReveal().reveal(".home-contact p, .about-content", { origin: "right" });

    const typed = new Typed(".multiple-text", {
        strings: ["Full Stack Engineer", "Web Developer", "Mobile Developer"],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true,
    });

    const mobileNumberInput = document.getElementById("mobileNumber");

    if (mobileNumberInput) {
        mobileNumberInput.addEventListener("input", function (event) {
            let value = this.value.replace(/\D/g, "");

            if (value.length > 12) {
                value = value.substr(0, 12);
            }

            let formattedValue = "";
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += "_";
                }
                formattedValue += value[i];
            }

            this.value = formattedValue;
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('more-link')) {
            e.preventDefault();
            const desc = e.target.closest('.work-desc');
            const fullText = desc.getAttribute('data-full-text');
            desc.innerHTML = `${fullText} <a href="#" class="less-link">less</a>`;
        } else if (e.target.classList.contains('less-link')) {
            e.preventDefault();
            const desc = e.target.closest('.work-desc');
            const truncatedText = desc.getAttribute('data-truncated-text');
            desc.innerHTML = `${truncatedText}... <a href="#" class="more-link">more</a>`;
        }
    });

    const buttons = document.querySelectorAll('.experience-buttons .btn');
    const columns = document.querySelectorAll('.experience-column');
    const loadMoreBtn = document.querySelector('.load-more');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            columns.forEach(column => {
                if (filter === 'all' || column.classList.contains(filter)) {
                    column.style.display = 'block';
                } else {
                    column.style.display = 'none';
                }

                const experienceBoxes = column.querySelectorAll('.experience-box');
                experienceBoxes.forEach((box, index) => {
                    if (filter === 'all' || filter === 'project') {
                        box.style.display = index < 3 ? 'block' : 'none';
                    } else {
                        box.style.display = 'block';
                    }
                });
            });

            if (filter === 'all' || filter === 'project') {
                const experienceBoxes = document.querySelectorAll(`.experience-column.${filter} .experience-box`);
                if (experienceBoxes.length > 3) {
                    loadMoreBtn.style.display = 'block';
                    loadMoreBtn.textContent = 'Load More';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            } else {
                loadMoreBtn.style.display = 'none';
            }
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        const activeButton = document.querySelector('.experience-buttons .btn.active');
        const filter = activeButton.getAttribute('data-filter');
        const experienceBoxes = document.querySelectorAll(`.experience-column.${filter} .experience-box`);

        experienceBoxes.forEach(box => {
            box.style.display = 'block';
        });

        if (loadMoreBtn.textContent === 'Load More') {
            loadMoreBtn.textContent = 'Load Less';
        } else {
            experienceBoxes.forEach((box, index) => {
                if (index >= 3) {
                    box.style.display = 'none';
                }
            });
            loadMoreBtn.textContent = 'Load More';
        }
    });

    const workDescriptions = document.querySelectorAll('.work-desc');
    workDescriptions.forEach(desc => {
        const words = desc.textContent.split(' ');
        if (words.length > 30) {
            const truncatedWords = words.slice(0, 100).join(' ');
            const fullText = words.join(' ');
            desc.setAttribute('data-truncated-text', `${truncatedWords}...`);
            desc.setAttribute('data-full-text', `${fullText}`);
            desc.innerHTML = `${truncatedWords}... <a href="#" class="more-link">more</a>`;
        }
    });

});



/* =========================================================
   TU TEMPLO Y BUENA BARBA
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const loader = document.getElementById("loader");
    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    /* =====================================================
       LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("loaded");

                setTimeout(() => {
                    loader.style.display = "none";
                }, 800);
            }

            document.body.classList.add("page-loaded");

        }, 500);

    });


    /* =====================================================
       AÑO AUTOMÁTICO
    ===================================================== */

    const currentYear = new Date().getFullYear();

    document.querySelectorAll(".current-year").forEach(element => {
        element.textContent = currentYear;
    });


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen = menuButton.classList.toggle("active");

            mobileMenu.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle("menu-open", isOpen);

        });


        /* Cerrar menú al hacer click en un enlace */

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuButton.classList.remove("active");
                mobileMenu.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("menu-open");

            });

        });

    }


    /* =====================================================
       ESC PARA CERRAR MENÚ
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (menuButton) {
                menuButton.classList.remove("active");
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       NAVBAR AL HACER SCROLL
    ===================================================== */

    let lastScroll = 0;
    let ticking = false;

    function updateNavbar() {

        const currentScroll = window.scrollY;

        if (!navbar) {
            return;
        }

        /* Agregar estado scrolled */

        if (currentScroll > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }


        /* Ocultar navbar cuando baja */

        if (
            currentScroll > lastScroll &&
            currentScroll > 150
        ) {

            navbar.classList.add("nav-hidden");

        } else {

            navbar.classList.remove("nav-hidden");

        }


        lastScroll = currentScroll <= 0
            ? 0
            : currentScroll;

        ticking = false;

    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(updateNavbar);

            ticking = true;

        }

    }, { passive: true });


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       ANIMACIÓN DE FILAS DE SERVICIOS
    ===================================================== */

    const serviceRows = document.querySelectorAll(".service-row");

    if ("IntersectionObserver" in window) {

        const serviceObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry, index) => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {

                            entry.target.classList.add("visible");

                        }, index * 80);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


        serviceRows.forEach(row => {

            serviceObserver.observe(row);

        });

    }


    /* =====================================================
       EFECTO PARALLAX HERO
    ===================================================== */

    const heroImage = document.querySelector(".hero-image");

    if (heroImage && window.innerWidth > 768) {

        window.addEventListener("scroll", () => {

            const scrollY = window.scrollY;

            if (scrollY < window.innerHeight) {

                const movement = scrollY * 0.08;

                heroImage.style.transform =
                    `scale(1.03) translateY(${movement}px)`;

            }

        }, { passive: true });

    }


    /* =====================================================
       EFECTO DE MOVIMIENTO DEL HERO
    ===================================================== */

    const heroVisual = document.querySelector(".hero-visual");

    if (
        heroVisual &&
        window.innerWidth > 900
    ) {

        heroVisual.addEventListener("mousemove", event => {

            const rect = heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            const rotateX = y * -3;
            const rotateY = x * 3;

            heroVisual.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        heroVisual.addEventListener("mouseleave", () => {

            heroVisual.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        });

    }


    /* =====================================================
       HOVER DE SERVICIOS
    ===================================================== */

    serviceRows.forEach(row => {

        row.addEventListener("mouseenter", () => {

            row.classList.add("hovered");

        });

        row.addEventListener("mouseleave", () => {

            row.classList.remove("hovered");

        });

    });


    /* =====================================================
       WHATSAPP - TRACKING VISUAL
    ===================================================== */

    const whatsappLinks = document.querySelectorAll(
        'a[href*="wa.me"]'
    );

    whatsappLinks.forEach(link => {

        link.addEventListener("click", () => {

            link.classList.add("whatsapp-clicked");

            setTimeout(() => {

                link.classList.remove("whatsapp-clicked");

            }, 1000);

        });

    });


    /* =====================================================
       PREVENIR SCROLL AUTOMÁTICO AL RECARGAR
       La página siempre vuelve arriba.
    ===================================================== */

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }


    /* =====================================================
       VOLVER ARRIBA AL RECARGAR
    ===================================================== */

    window.addEventListener("beforeunload", () => {

        window.scrollTo(0, 0);

    });


    /* =====================================================
       CONTROL DE SCROLL AL CARGAR
    ===================================================== */

    window.setTimeout(() => {

        if (window.scrollY > 0) {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });

        }

    }, 50);


    /* =====================================================
       DETECTAR SECCIÓN ACTIVA
    ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".desktop-nav a[href^='#'], .mobile-menu a[href^='#']"
    );


    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const sectionId = entry.target.id;

                        navLinks.forEach(link => {

                            const href =
                                link.getAttribute("href");

                            if (href === `#${sectionId}`) {

                                link.classList.add("active");

                            } else {

                                link.classList.remove("active");

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       IMÁGENES - EVITAR EFECTOS BRUSCOS
    ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("load", () => {

            image.classList.add("image-loaded");

        });

    });


    /* =====================================================
       PROTECCIÓN BÁSICA DE IMÁGENES
       Evita arrastre accidental.
    ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("dragstart", event => {

            event.preventDefault();

        });

    });


    /* =====================================================
       AJUSTE AL CAMBIAR TAMAÑO
    ===================================================== */

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            /* Cerrar menú si vuelve a desktop */

            if (
                window.innerWidth > 900 &&
                mobileMenu &&
                menuButton
            ) {

                mobileMenu.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("menu-open");

            }

        }, 150);

    });


    /* =====================================================
       LOG INICIAL
    ===================================================== */

    console.log(
        "%cTU TEMPLO",
        "font-size:18px;font-weight:bold;color:#d4af37;"
    );

    console.log(
        "%cBarbería Premium · Paraguay",
        "font-size:12px;color:#968b7d;"
    );

});


document.addEventListener('DOMContentLoaded', () => {
  // Escuchamos los clics en todo el contenedor de opciones
  const optionsContainer = document.querySelector('.amount-options');
  const cardValueDisplay = document.querySelector('.card-value') || document.getElementById('card-value-display');

  if (optionsContainer) {
    optionsContainer.addEventListener('click', (e) => {
      // Verificamos si lo que se presionó fue un botón
      const button = e.target.closest('button');
      if (!button) return;

      e.preventDefault();

      // 1. Desmarcamos todos los botones dentro del contenedor
      const allButtons = optionsContainer.querySelectorAll('button');
      allButtons.forEach(btn => btn.classList.remove('active'));

      // 2. Marcamos el botón presionado
      button.classList.add('active');

      // 3. Obtenemos el texto a mostrar (del atributo data-value o del texto del botón)
      const textToShow = button.getAttribute('data-value') || button.textContent.trim().toUpperCase();

      // 4. Actualizamos el texto en la tarjeta
      if (cardValueDisplay) {
        cardValueDisplay.textContent = textToShow;
      }
    });
  }
});function seleccionarBarbero(card) {
  // 1. Quitar la clase 'active' de todas las tarjetas de barberos
  const todasLasCards = document.querySelectorAll('.barber-card');
  todasLasCards.forEach(item => item.classList.remove('active'));

  // 2. Marcar como activa la tarjeta clickeada
  card.classList.add('active');
}// Abrir el modal del sorteo al cargar la página
window.addEventListener('load', () => {
  const modal = document.getElementById('promo-modal');
  if (modal) {
    modal.classList.add('active');
  }
});

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById('promo-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Cerrar al hacer clic fuera del contenido del modal
document.addEventListener('click', (e) => {
  const modal = document.getElementById('promo-modal');
  if (modal && e.target === modal) {
    cerrarModal();
  }
});
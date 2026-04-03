/* 
    IAS ARTIFICIAL - ESTRATEGIA 2026-2027
    SCRIPT.JS: Interacciones de Élite y Lógica de Movimiento
*/

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById('main-nav');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    // 1. Scroll effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // 3. Hero Mouse Parallax (Efecto de Élite)
    if (hero && heroContent) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            // Calculamos el desplazamiento (-15px a 15px)
            const xPos = (clientX / innerWidth - 0.5) * 30;
            const yPos = (clientY / innerHeight - 0.5) * 30;

            heroContent.style.transform = `translate(${xPos}px, ${yPos}px)`;
            // El fondo se mueve en sentido opuesto para profundidad
            hero.style.backgroundPosition = `calc(50% + ${-xPos/2}px) calc(50% + ${-yPos/2}px)`;
        });
    }

    // 4. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Elite Scroll Reveal (Blur to Sharp / Focus-In)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.add('animate-in'); // Retro-compatibilidad
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos con revelación
    document.querySelectorAll('.scroll-reveal, .animate-in, .service-card, .stat-item').forEach(el => {
        if (!el.classList.contains('scroll-reveal')) el.classList.add('scroll-reveal');
        scrollObserver.observe(el);
    });

    // 6. Magnetic Buttons Impression (Sutil)
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) * 0.2;
            const y = (e.clientY - top - height / 2) * 0.2;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // 7. Elite Service Card Interactions (3D Tilt & Glow Follow)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            
            // Efecto de Luz (Glow)
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 243, 255, 0.4) 0%, transparent 70%)`;
            }
            
            // Efecto 3D Tilt (Inclinación)
            const xRotation = ((y - height / 2) / height) * -15; // Max 15deg
            const yRotation = ((x - width / 2) / width) * 15; // Max 15deg
            
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            if (glow) {
                glow.style.background = `radial-gradient(circle at center, rgba(0, 243, 255, 0.15) 0%, transparent 70%)`;
            }
        });
    });

    // 8. Cookie/Legal Banner Logic
    const legalBanner = document.getElementById('legal-banner');
    const acceptBtn = document.getElementById('accept-legal');

    if (legalBanner && acceptBtn) {
        if (!localStorage.getItem('ias_legal_accepted')) {
            setTimeout(() => {
                legalBanner.classList.add('show');
            }, 1500);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('ias_legal_accepted', 'true');
            legalBanner.classList.remove('show');
            legalBanner.style.opacity = '0';
            setTimeout(() => {
                legalBanner.style.display = 'none';
            }, 500);
        });
    }

    // 9. Contact Form to WhatsApp (Professional Flow)
    const contactForm = document.getElementById('ias-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            const whatsappNumber = "5493382480029";
            const text = `*Nueva Consulta - IAS Artificial*%0A%0A*Nombre:* ${name}%0A*Email:* ${email}%0A*Interés:* ${message}`;
            
            const wpUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
            
            // Efecto de feedback antes de redirigir
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "REDIRECCIONANDO...";
            btn.style.background = "#25d366";
            
            setTimeout(() => {
                window.open(wpUrl, '_blank');
                btn.innerText = originalText;
                btn.style.background = "";
                contactForm.reset();
            }, 800);
        });
    }

    console.log("Elite Motion Engine & Legal Shield IAS v2026.2 Habilitado.");
});

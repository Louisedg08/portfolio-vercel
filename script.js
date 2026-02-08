

document.addEventListener('DOMContentLoaded', () => {

    Loader.init();
    Navigation.init();
    Typewriter.init();
    ScrollAnimations.init();
    ContactForm.init();
    ProjectModal.init();

    EasterEgg.init();
});


const Loader = {
    init() {
        const loader = document.getElementById('loader');

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 800);
        });


        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 3000);
    }
};


const Navigation = {
    init() {
        this.nav = document.getElementById('nav');
        this.toggle = document.getElementById('navToggle');
        this.menu = document.getElementById('navMenu');
        this.links = document.querySelectorAll('.nav-link');

        this.lastScrollY = window.scrollY;
        this.isMenuOpen = false;

        this.bindEvents();
    },

    bindEvents() {

        this.toggle.addEventListener('click', () => this.toggleMenu());


        this.links.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
            });
        });


        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });


        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.toggleMenu();
            }
        });
    },

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },

    handleScroll() {
        const currentScrollY = window.scrollY;


        if (currentScrollY > 100) {
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                this.nav.classList.add('hidden');
            } else {
                this.nav.classList.remove('hidden');
            }
        } else {
            this.nav.classList.remove('hidden');
        }

        this.lastScrollY = currentScrollY;
    }
};


const Typewriter = {
    phrases: [
        'echo "Hello, World!"',
        'npm run build-something-cool',
        'git commit -m "made it work"',
        'sudo make me a sandwich',
        'ping reality.life',
        './start_adventure.sh',
    ],

    init() {
        this.element = document.getElementById('typewriter');
        if (!this.element) return;

        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;

        this.type();
    },

    type() {
        const currentPhrase = this.phrases[this.phraseIndex];

        if (this.isPaused) {
            setTimeout(() => {
                this.isPaused = false;
                this.type();
            }, 1500);
            return;
        }

        if (this.isDeleting) {

            this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
            this.charIndex--;

            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
            }
        } else {

            this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
            this.charIndex++;

            if (this.charIndex === currentPhrase.length) {
                this.isDeleting = true;
                this.isPaused = true;
            }
        }


        const speed = this.isDeleting ? 40 : 80;

        const randomDelay = Math.random() * 50;

        setTimeout(() => this.type(), speed + randomDelay);
    }
};


const ScrollAnimations = {
    init() {
        this.elements = document.querySelectorAll('[data-aos]');

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            this.elements.forEach(el => this.observer.observe(el));
        } else {

            this.elements.forEach(el => el.classList.add('aos-animate'));
        }


        this.animateOnScroll();
    },

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);


                this.observer.unobserve(entry.target);
            }
        });
    },

    animateOnScroll() {

        const orbs = document.querySelectorAll('.gradient-orb');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            orbs.forEach((orb, index) => {
                const speed = index === 0 ? 0.3 : 0.2;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }
};


const ContactForm = {
    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    async handleSubmit(e) {
        e.preventDefault();

        const button = this.form.querySelector('.btn-submit');
        const originalText = button.innerHTML;


        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;


        const formData = new FormData(this.form);

        try {
            const response = await fetch('send-email.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                button.innerHTML = '<span>Message Sent! ✓</span>';
                button.style.background = 'var(--success)';
                this.form.reset();
            } else {
                button.innerHTML = '<span>Failed to send ✗</span>';
                button.style.background = 'var(--danger)';
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            button.innerHTML = '<span>Error occurred ✗</span>';
            button.style.background = 'var(--danger)';
        }


        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 3000);
    }
};


const EasterEgg = {
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    currentIndex: 0,

    init() {
        document.addEventListener('keydown', (e) => this.checkCode(e));
    },

    checkCode(e) {
        if (e.key === this.konamiCode[this.currentIndex]) {
            this.currentIndex++;

            if (this.currentIndex === this.konamiCode.length) {
                this.activate();
                this.currentIndex = 0;
            }
        } else {
            this.currentIndex = 0;
        }
    },

    activate() {

        document.body.style.transition = 'filter 0.5s ease';
        document.body.style.filter = 'hue-rotate(180deg)';


        const emojis = ['🚀', '💻', '⚡', '🔥', '✨', '🎮'];

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    font-size: 2rem;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    z-index: 9999;
                    pointer-events: none;
                    animation: floatUp 3s ease-out forwards;
                `;
                document.body.appendChild(emoji);

                setTimeout(() => emoji.remove(), 3000);
            }, i * 100);
        }


        if (!document.getElementById('easter-egg-style')) {
            const style = document.createElement('style');
            style.id = 'easter-egg-style';
            style.textContent = `
                @keyframes floatUp {
                    to {
                        transform: translateY(-120vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }


        setTimeout(() => {
            document.body.style.filter = '';
        }, 5000);

        console.log('🎮 Achievement Unlocked: You found the easter egg!');
    }
};


const ProjectModal = {

    projects: {
        capstone: {
            label: 'Capstone Project',
            title: 'TUP-Manila Clinic Information System',
            image: 'images/capstone.png',
            description: 'A comprehensive clinic management system developed as our capstone project for the Technological University of the Philippines - Manila. The system streamlines clinic operations with modern web technologies.',
            features: [
                'Patient records management with medical history',
                'Appointment scheduling and calendar integration',
                'Medical examination tracking and analytics',
                'Data visualization with interactive dashboards',
                'Role-based access control for staff'
            ],
            tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Chart.js']
        },
        hydroponics: {
            label: 'IoT Project',
            title: 'IoT Hydroponics System',
            image: 'images/hydroponics.jpg',
            description: 'A smart farming solution that combines IoT technology with hydroponics. The system enables remote monitoring and automated control of growing conditions.',
            features: [
                'Real-time water level monitoring',
                'pH and nutrient level sensors',
                'Automated pump control',
                'Cloud-based data logging',
                'Mobile app notifications'
            ],
            tech: ['ESP32', 'Arduino Cloud', 'C++', 'IoT', 'Sensors']
        },
        voting: {
            label: 'Embedded Systems',
            title: 'ESP32 Voting System',
            image: 'images/votingsystem.jpg',
            description: 'A hardware-based secure voting terminal designed for transparent and tamper-proof elections. Features real-time vote tallying and audit capabilities.',
            features: [
                'Secure vote encryption',
                'Real-time vote tallying',
                'Tamper detection system',
                'Audit trail generation'
            ],
            tech: ['ESP32', 'C++', 'Embedded', 'Hardware']
        },
        ecommerce: {
            label: 'Web Application',
            title: 'E-Commerce Website',
            image: 'images/ecom.png',
            description: 'A full-featured online shopping platform with complete e-commerce functionality including product management, shopping cart, and secure checkout.',
            features: [
                'Product catalog with categories',
                'Shopping cart functionality',
                'User authentication system',
                'Order management',
                'Admin dashboard'
            ],
            tech: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL']
        },
        pos: {
            label: 'Desktop Application',
            title: 'Point of Sale System',
            image: 'images/pos.png',
            description: 'A comprehensive desktop POS application designed for retail businesses. Handles sales transactions, inventory management, and generates detailed reports.',
            features: [
                'Barcode scanning support',
                'Inventory tracking',
                'Sales reporting and analytics',
                'Receipt printing',
                'Multi-user support'
            ],
            tech: ['C#', 'Java', '.NET', 'SQL Server']
        },
        files: {
            label: 'Desktop Application',
            title: 'File Management System',
            image: 'images/filemanagement.jpg',
            description: 'A Python-based GUI application for efficient file organization. Allows batch operations, smart search, and automated file categorization.',
            features: [
                'Batch file operations',
                'Smart search functionality',
                'File categorization',
                'Duplicate file detection'
            ],
            tech: ['Python', 'Tkinter', 'GUI', 'OS Module']
        },
        automation: {
            label: 'Automation',
            title: 'Workflow Automation System',
            image: 'images/automation.png',
            description: 'An automated notification and workflow system built with n8n. Integrates with various services to automate repetitive tasks and notifications.',
            features: [
                'Telegram bot notifications',
                'Webhook integrations',
                'Scheduled task automation',
                'Multi-service connections',
                'Custom workflow triggers'
            ],
            tech: ['n8n', 'Telegram API', 'Webhooks', 'REST API']
        }
    },

    init() {
        this.modal = document.getElementById('projectModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalLabel = document.getElementById('modalLabel');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalFeatures = document.getElementById('modalFeatures');
        this.modalTech = document.getElementById('modalTech');
        this.modalClose = document.getElementById('modalClose');

        if (!this.modal) return;

        this.bindEvents();
    },

    bindEvents() {

        document.querySelectorAll('.project-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.project-card');
                const projectId = card.dataset.project;
                this.open(projectId);
            });
        });


        this.modalClose.addEventListener('click', () => this.close());
        this.modal.querySelector('.modal-backdrop').addEventListener('click', () => this.close());


        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    },

    open(projectId) {
        const project = this.projects[projectId];
        if (!project) return;


        this.modalImage.src = project.image;
        this.modalLabel.textContent = project.label;
        this.modalTitle.textContent = project.title;
        this.modalDescription.textContent = project.description;


        this.modalFeatures.innerHTML = project.features
            .map(f => `<li>${f}</li>`)
            .join('');


        this.modalTech.innerHTML = project.tech
            .map(t => `<span>${t}</span>`)
            .join('');


        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();

            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {

        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}


console.log('%c👋 Hey there, curious one!', 'font-size: 20px; font-weight: bold; color: #22d3ee;');
console.log('%cLooking for something interesting?', 'font-size: 14px; color: #94a3b8;');
console.log('%cTry the Konami Code 🎮', 'font-size: 12px; color: #64748b;');

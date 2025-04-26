document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Hide loading screen
    try {
        setTimeout(function() {
            console.log('Hiding loading screen');
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                loadingScreen.style.display = 'none';
            }
            initAnimations();
        }, 1500);
    } catch (error) {
        console.error('Error hiding loading screen:', error);
    }

    // Initialize other features
    try {
        initTypingEffect();
        init3DAvatar();
        initParticles();
        initNav();
        initThemeToggle();
        initScrollEffects();
        initProjectFilter();
        initFormValidation();
        initBackToTop();
    } catch (error) {
        console.error('Error initializing features:', error);
    }
});

function initAnimations() {
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-header, .project-card, .contact-card, .experience-card, .skill-category').forEach(el => {
            observer.observe(el);
        });
    } catch (error) {
        console.error('Error in initAnimations:', error);
    }
}

function initTypingEffect() {
    try {
        const words = ['Python Developer', 'ML Engineer', 'Problem Solver', 'Innovator'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;
        const typingText = document.querySelector('.typing-text');

        if (!typingText) return;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, typingSpeed);
                } else {
                    setTimeout(type, deletingSpeed);
                }
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, pauseTime);
                } else {
                    setTimeout(type, typingSpeed);
                }
            }
        }
        type();
    } catch (error) {
        console.error('Error in initTypingEffect:', error);
    }
}

function init3DAvatar() {
    try {
        if (!window.THREE || !document.getElementById('avatar-container')) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(400, 400);
        document.getElementById('avatar-container').appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x6c63ff, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(400, 400);
        });
    } catch (error) {
        console.error('Error in init3DAvatar:', error);
    }
}

function initParticles() {
    try {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(108, 99, 255, 0.5)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    } catch (error) {
        console.error('Error in initParticles:', error);
    }
}

function initNav() {
    try {
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-link');

        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        let lastScrollTop = 0;
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            let scrollTop = window.scrollY;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.top = `-${header.offsetHeight}px`;
            } else {
                header.style.top = '0';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            header.classList.toggle('scrolled', scrollTop > 50);
        });
    } catch (error) {
        console.error('Error in initNav:', error);
    }
}

function initThemeToggle() {
    try {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            document.documentElement.setAttribute(
                'data-theme',
                document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
            themeToggle.querySelector('i').classList.toggle('fa-moon');
            themeToggle.querySelector('i').classList.toggle('fa-sun');
        });
    } catch (error) {
        console.error('Error in initThemeToggle:', error);
    }
}

function initScrollEffects() {
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.about-content, .experience-content, .skills-content, .projects-grid, .contact-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    } catch (error) {
        console.error('Error in initScrollEffects:', error);
    }
}

function initProjectFilter() {
    try {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        if (!filterButtons.length || !projectCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');
                projectCards.forEach(card => {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 100);
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error in initProjectFilter:', error);
    }
}

function initFormValidation() {
    try {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const subject = form.querySelector('#subject').value.trim();
            const message = form.querySelector('#message').value.trim();

            if (name && email && subject && message) {
                alert('Form submitted successfully! (Note: This is a demo alert, actual form submission requires backend integration.)');
                form.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    } catch (error) {
        console.error('Error in initFormValidation:', error);
    }
}

function initBackToTop() {
    try {
        const backToTop = document.getElementById('back-to-top');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('active', window.scrollY > 300);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } catch (error) {
        console.error('Error in initBackToTop:', error);
    }
}
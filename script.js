document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.menu');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.conteudo_cabecalho ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            
            if (img && img.src && !img.src.includes('undefined')) {
                modal.style.display = 'block';
                modalImg.src = img.src;
                modalCaption.innerHTML = overlay ? overlay.innerHTML : '';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const precosModal = document.getElementById('precosModal');
    const precosBtns = document.querySelectorAll('#precos-btn, #precos-hero-btn');
    const closePrecosModal = document.querySelector('.close-precos');

    precosBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            precosModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        });
    });

    if (closePrecosModal) {
        closePrecosModal.addEventListener('click', function() {
            precosModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    precosModal.addEventListener('click', function(e) {
        if (e.target === precosModal) {
            precosModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const btnContatoPrecos = document.querySelector('.btn-contato-precos');
    if (btnContatoPrecos) {
        btnContatoPrecos.addEventListener('click', function(e) {
            e.preventDefault();
            precosModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            const contatoSection = document.querySelector('#contato');
            if (contatoSection) {
                contatoSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    const animatedElements = document.querySelectorAll('.gallery-item, .projeto-card, .contato-item, .cert-item, .timeline-item');
    
    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });

    const header = document.querySelector('.cabecalho');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(237, 239, 234, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(237, 239, 234, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    const contactForm = document.querySelector('.contato-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                submitBtn.style.background = '#A7F205';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const isPercentage = finalNumber.includes('%');
                const numericValue = parseInt(finalNumber);
                
                let currentNumber = 0;
                const increment = numericValue / 50;
                
                const updateCounter = () => {
                    if (currentNumber < numericValue) {
                        currentNumber += increment;
                        target.textContent = Math.ceil(currentNumber) + (isPercentage ? '%' : '+');
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalNumber;
                    }
                };
                
                updateCounter();
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.src && !img.src.includes('undefined')) {
                    
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    img.onerror = () => {
                        img.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'image-placeholder';
                        placeholder.style.cssText = `
                            width: 100%;
                            height: 250px;
                            background: #0554F2;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: 600;
                            border-radius: 15px;
                        `;
                        placeholder.textContent = 'Imagem em breve';
                        img.parentNode.insertBefore(placeholder, img);
                    };
                }
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
            if (precosModal.style.display === 'block') {
                precosModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});

function toggleMobileMenu() {
    const navMenu = document.querySelector('.conteudo_cabecalho ul');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        konamiCode = [];
    }
});

window.addEventListener('load', function() {
    const criticalImages = [
        'assets/foto_eu.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}


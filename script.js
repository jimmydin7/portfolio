document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ 
        duration: 400, 
        easing: "ease-in-out", 
        once: true 
    });

    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    initNavigation();
    
    initParallaxEffects();
    
    initTechStackEffect();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navList = document.getElementById('nav-list');
    const mobileNavBtn = document.getElementById('mobile-nav-btn');
    const navLinks = document.querySelectorAll('.nav--list-link');
    
    let openNav = false;
    let navBehavior = {
        scrollDown: false,
        scrollUp: false,
        noScroll: true
    };

    if (mobileNavBtn) {
        mobileNavBtn.addEventListener('click', handleMobileNav);
    }

    function handleMobileNav() {
        openNav = !openNav;
        const icon = mobileNavBtn.querySelector('ion-icon');
        
        if (openNav) {
            navList.classList.remove('hide-nav');
            navList.classList.add('show-nav');
            icon.setAttribute('name', 'close-outline');
        } else {
            navList.classList.remove('show-nav');
            navList.classList.add('hide-nav');
            icon.setAttribute('name', 'menu-outline');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            if (openNav) {
                handleMobileNav();
            }
        });
    });

    let oldScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (oldScroll > currentScroll) {
            navBehavior = {
                scrollDown: false,
                scrollUp: true,
                noScroll: false
            };
        } else if (oldScroll < currentScroll) {
            navBehavior = {
                scrollUp: false,
                scrollDown: true,
                noScroll: false
            };
        }
        
        if (currentScroll === 0) {
            navBehavior = {
                scrollDown: false,
                scrollUp: false,
                noScroll: true
            };
        }

        navbar.className = 'nav';
        
        if (!navBehavior.noScroll) {
            if (navBehavior.scrollDown) {
                navbar.classList.add('move-nav');
            } else if (navBehavior.scrollUp) {
                navbar.classList.add('secondary-nav');
            }
        }

        oldScroll = currentScroll;
    });
}

function initParallaxEffects() {
    const imgContainer = document.getElementById('img-container');
    const imgLayers = document.querySelectorAll('.img-layer');
    
    window.addEventListener('scroll', function() {
        const offsetY = window.pageYOffset;
        if (imgContainer) {
            imgContainer.style.transform = `translateY(${offsetY * 0.2}px)`;
        }
    });

    if (window.innerWidth > 1260) {
        document.body.addEventListener('mousemove', function(e) {
            const x = e.pageX;
            const y = e.pageY;

            if (imgLayers.length >= 8) {
                imgLayers[0].style.transform = 
                    `translate(${x / 100}px, ${y / 100}px)`;
                imgLayers[7].style.transform = 
                    `translate(${x / 100}px, ${y / 100}px) rotate(350deg)`;
                imgLayers[1].style.transform = 
                    `translate(${(x / 100) * 1.5}px, ${y / 70}px)`;
                imgLayers[2].style.transform = 
                    `translate(${(x / 100) * 3}px, ${y / 70}px)`;
                imgLayers[3].style.transform = 
                    `translate(${(x / 100) * 4.5}px, ${y / 70}px)`;
                imgLayers[4].style.transform = 
                    `translate(${(x / 100) * 6}px, ${y / 70}px)`;
                imgLayers[5].style.transform = 
                    `translate(${(x / 100) * 7.5}px, ${y / 70}px)`;
                imgLayers[6].style.transform = 
                    `translate(${(x / 100) * 9}px, ${y / 70}px)`;
            }
        });
    }
}

// Tech stack box shadow effect
function initTechStackEffect() {
    const techBox = document.getElementById('tech-stack');
    
    if (techBox) {
        document.body.addEventListener('mousemove', function(e) {
            const x = e.pageX / 70;
            const y = e.pageY / 70;

            techBox.style.boxShadow = 
                `${x}px ${y}px 10px #010110, -${x}px -${y}px 10px #01032a`;
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${id}"]`);
            
            if (navLink) {
                document.querySelectorAll('.nav--list-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section, div[id]').forEach(section => {
    if (section.id && section.id.startsWith('section-') || section.id === 'home') {
        observer.observe(section);
    }
});

function initBlogFunctionality() {
    const blogPostItems = document.querySelectorAll('.blog-post-item');
    
    blogPostItems.forEach(item => {
        const preview = item.querySelector('.blog-post-preview');
        const content = item.querySelector('.blog-post-content');
        
        if (preview && content) {
            preview.addEventListener('click', function() {
                const isExpanded = content.classList.contains('expanded');
                
                blogPostItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.blog-post-content');
                    if (otherContent) {
                        otherContent.classList.remove('expanded');
                    }
                });
                
                if (!isExpanded) {
                    content.classList.add('expanded');
                }
            });
        }
    });
}

if (window.location.pathname.includes('blog.html')) {
    initBlogFunctionality();
}

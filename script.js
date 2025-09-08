// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.business-card, .course-card, .community-card, .operation-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="제목"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('모든 필드를 입력해주세요.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            this.reset();
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Search functionality (if search input exists)
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('.course-card, .business-card, .community-card');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect for back to top button
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--primary-green)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--primary-blue)';
    });
    
    // Course card click handlers
    document.querySelectorAll('.course-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
            showNotification(`${courseTitle} 상세 정보는 준비 중입니다.`, 'info');
        });
    });
    
    // Community card click handlers
    document.querySelectorAll('.community-card').forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            showNotification(`${cardTitle} 페이지는 준비 중입니다.`, 'info');
        });
    });
    
    // Loading animation for page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add loaded class styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadedStyle);

    // Hero carousel: full-screen rotating background images
    const slides = document.querySelectorAll('.hero-carousel .carousel-slide');
    if (slides && slides.length > 0) {
        // Apply background images from data-bg
        slides.forEach(slide => {
            const bg = slide.getAttribute('data-bg');
            if (bg) {
                slide.style.backgroundImage = `url('${bg}')`;
                slide.style.backgroundSize = 'cover';
                slide.style.backgroundPosition = 'center';
                slide.style.backgroundRepeat = 'no-repeat';
            }
        });

        // Full-screen carousel styles with !important to override existing CSS
        const carouselStyle = document.createElement('style');
        carouselStyle.textContent = `
            .hero { 
                position: relative !important; 
                min-height: 100vh !important; 
                height: 100vh !important;
                overflow: hidden !important; 
                margin: 0 !important;
                padding: 0 !important;
            }
            .hero-carousel { 
                position: absolute !important; 
                top: 0 !important; 
                left: 0 !important; 
                width: 100% !important; 
                height: 100% !important; 
                z-index: 1 !important;
            }
            .carousel-slide { 
                position: absolute !important; 
                top: 0 !important; 
                left: 0 !important; 
                width: 100% !important; 
                height: 100% !important; 
                opacity: 0 !important; 
                transition: opacity 1.2s ease-in-out !important;
            }
            .carousel-slide.active { 
                opacity: 1 !important; 
            }
            .hero-overlay { 
                position: absolute !important; 
                top: 0 !important;
                left: 0 !important;
                width: 100% !important; 
                height: 100% !important; 
                z-index: 2 !important; 
                background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%) !important; 
                display: flex !important; 
                align-items: center !important; 
                justify-content: center !important;
            }
            .hero-container { 
                width: 100% !important; 
                max-width: 1200px !important;
                padding: 0 20px !important;
            }
            .hero-content { 
                text-align: center !important; 
                color: white !important; 
            }
            .hero-title { 
                font-size: 3.5rem !important; 
                font-weight: 700 !important; 
                margin-bottom: 1rem !important; 
                text-shadow: 2px 2px 4px rgba(0,0,0,0.7) !important;
                line-height: 1.2 !important;
            }
            .hero-subtitle { 
                font-size: 2rem !important; 
                font-weight: 500 !important; 
                margin-bottom: 1.5rem !important; 
                text-shadow: 1px 1px 3px rgba(0,0,0,0.7) !important;
            }
            .hero-description { 
                font-size: 1.2rem !important; 
                margin-bottom: 2rem !important; 
                line-height: 1.6 !important; 
                text-shadow: 1px 1px 2px rgba(0,0,0,0.7) !important;
                max-width: 800px !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }
            .hero-buttons { 
                display: flex !important; 
                gap: 1rem !important; 
                justify-content: center !important; 
                flex-wrap: wrap !important; 
            }
            .btn { 
                padding: 12px 30px !important; 
                border-radius: 50px !important; 
                text-decoration: none !important; 
                font-weight: 600 !important; 
                transition: all 0.3s ease !important;
                display: inline-block !important;
            }
            .btn-primary { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important; 
                color: white !important; 
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important;
                border: none !important;
            }
            .btn-primary:hover { 
                transform: translateY(-2px) !important; 
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6) !important; 
            }
            .btn-secondary { 
                background: rgba(255,255,255,0.2) !important; 
                color: white !important; 
                border: 2px solid rgba(255,255,255,0.3) !important; 
                backdrop-filter: blur(10px) !important;
            }
            .btn-secondary:hover { 
                background: rgba(255,255,255,0.3) !important; 
                transform: translateY(-2px) !important; 
            }
            @media (max-width: 768px) { 
                .hero-title { font-size: 2.5rem !important; }
                .hero-subtitle { font-size: 1.5rem !important; }
                .hero-description { font-size: 1rem !important; }
                .hero-buttons { flex-direction: column !important; align-items: center !important; }
                .hero-container { padding: 0 15px !important; }
            }
        `;
        document.head.appendChild(carouselStyle);

        let currentIndex = 0;
        const showSlide = (index) => {
            slides.forEach((s, i) => s.classList.toggle('active', i === index));
        };

        // Auto-rotate every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000);
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for potential use in other scripts
window.BizAiConsulting = {
    showNotification: function(message, type) {
        // This would be the showNotification function from above
        console.log('Notification:', message, type);
    }
};

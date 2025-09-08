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

    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background-color: #fff;
            margin: 2% auto;
            padding: 0;
            border-radius: 12px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: slideInUp 0.3s ease;
        }
        
        .modal-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px 12px 0 0;
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .modal-icon {
            font-size: 3rem;
            opacity: 0.9;
        }
        
        .modal-header h2 {
            margin: 0;
            font-size: 2rem;
            font-weight: 700;
        }
        
        .close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .close:hover {
            opacity: 1;
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .course-overview,
        .course-details,
        .course-info,
        .course-benefits {
            margin-bottom: 30px;
        }
        
        .course-overview h3,
        .course-details h3,
        .course-benefits h3 {
            color: #333;
            font-size: 1.3rem;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #667eea;
        }
        
        .course-overview p {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #666;
        }
        
        .course-details ul,
        .course-benefits ul {
            list-style: none;
            padding: 0;
        }
        
        .course-details li,
        .course-benefits li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
            color: #555;
            line-height: 1.5;
        }
        
        .course-details li:before,
        .course-benefits li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
        }
        
        .course-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 600;
            color: #333;
        }
        
        .info-row span:last-child {
            color: #667eea;
            font-weight: 500;
        }
        
        .modal-footer {
            padding: 20px 30px;
            background: #f8f9fa;
            border-radius: 0 0 12px 12px;
            display: flex;
            gap: 15px;
            justify-content: flex-end;
        }
        
        .modal-footer .btn {
            padding: 12px 25px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .modal-footer .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .modal-footer .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .modal-footer .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .modal-footer .btn-secondary:hover {
            background: #5a6268;
            transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 5% auto;
            }
            
            .modal-header {
                padding: 20px;
                flex-direction: column;
                text-align: center;
                gap: 15px;
            }
            
            .modal-header h2 {
                font-size: 1.5rem;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-footer {
                padding: 15px 20px;
                flex-direction: column;
            }
            
            .info-row {
                flex-direction: column;
                gap: 5px;
            }
        }
    `;
    document.head.appendChild(modalStyle);

    // Hero YouTube video: full-screen background iframe with fallback
    const heroYouTubeVideo = document.querySelector('.hero-youtube-video');
    const heroVideoContainer = document.querySelector('.hero-video-container');
    
    if (heroYouTubeVideo && heroVideoContainer) {
        // Full-screen video styles with !important to override existing CSS
        const videoStyle = document.createElement('style');
        videoStyle.textContent = `
            .hero { 
                position: relative !important; 
                min-height: 100vh !important; 
                height: 100vh !important;
                overflow: hidden !important; 
                margin: 0 !important;
                padding: 0 !important;
            }
            .hero-video-container { 
                position: absolute !important; 
                top: 0 !important; 
                left: 0 !important; 
                width: 100% !important; 
                height: 100% !important; 
                z-index: 1 !important;
                overflow: hidden !important;
            }
            .hero-youtube-video { 
                position: absolute !important; 
                top: 50% !important; 
                left: 50% !important; 
                min-width: 100% !important; 
                min-height: 100% !important; 
                width: 177.78vh !important; 
                height: 56.25vw !important; 
                min-width: 100% !important; 
                min-height: 100% !important; 
                transform: translate(-50%, -50%) !important;
                z-index: 1 !important;
                border: none !important;
            }
            .hero-overlay { 
                position: absolute !important; 
                top: 0 !important;
                left: 0 !important;
                width: 100% !important; 
                height: 100% !important; 
                z-index: 2 !important; 
                background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%) !important; 
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
                text-shadow: 2px 2px 8px rgba(0,0,0,0.8) !important;
                line-height: 1.2 !important;
                animation: fadeInUp 1s ease-out !important;
            }
            .hero-subtitle { 
                font-size: 2rem !important; 
                font-weight: 500 !important; 
                margin-bottom: 1.5rem !important; 
                text-shadow: 1px 1px 6px rgba(0,0,0,0.8) !important;
                animation: fadeInUp 1s ease-out 0.2s both !important;
            }
            .hero-description { 
                font-size: 1.2rem !important; 
                margin-bottom: 2rem !important; 
                line-height: 1.6 !important; 
                text-shadow: 1px 1px 4px rgba(0,0,0,0.8) !important;
                max-width: 800px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                animation: fadeInUp 1s ease-out 0.4s both !important;
            }
            .hero-buttons { 
                display: flex !important; 
                gap: 1rem !important; 
                justify-content: center !important; 
                flex-wrap: wrap !important; 
                animation: fadeInUp 1s ease-out 0.6s both !important;
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
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @media (max-width: 768px) { 
                .hero-title { font-size: 2.5rem !important; }
                .hero-subtitle { font-size: 1.5rem !important; }
                .hero-description { font-size: 1rem !important; }
                .hero-buttons { flex-direction: column !important; align-items: center !important; }
                .hero-container { padding: 0 15px !important; }
            }
        `;
        document.head.appendChild(videoStyle);

        // YouTube iframe event handlers & fallback
        let iframeReady = false;
        let fallbackActivated = false;

        const activateCarouselFallback = () => {
            if (fallbackActivated) return;
            fallbackActivated = true;
            // Fallback disabled - no image carousel
            console.log('YouTube iframe failed, no fallback images will be shown');
        };

        // YouTube iframe load event
        heroYouTubeVideo.addEventListener('load', function() {
            iframeReady = true;
            console.log('YouTube iframe loaded successfully');
        });

        // Fallback if iframe fails to load
        heroYouTubeVideo.addEventListener('error', function() {
            console.log('YouTube iframe failed to load, using fallback');
            activateCarouselFallback();
        });

        // If iframe not ready within 5 seconds, fallback
        setTimeout(() => {
            if (!iframeReady) {
                console.log('YouTube iframe timeout, using fallback');
                activateCarouselFallback();
            }
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

// Course detail modal functions
function showCourseDetail(courseId) {
    const modal = document.getElementById('courseModal');
    const courseData = getCourseData(courseId);
    
    // Populate modal content
    document.getElementById('modalIcon').innerHTML = courseData.icon;
    document.getElementById('modalTitle').textContent = courseData.title;
    document.getElementById('modalOverview').textContent = courseData.overview;
    document.getElementById('modalDuration').textContent = courseData.duration;
    document.getElementById('modalPrice').textContent = courseData.price;
    document.getElementById('modalMethod').textContent = courseData.method;
    document.getElementById('modalCertification').textContent = courseData.certification;
    
    // Populate details list
    const detailsList = document.getElementById('modalDetails');
    detailsList.innerHTML = '';
    courseData.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
    });
    
    // Populate benefits list
    const benefitsList = document.getElementById('modalBenefits');
    benefitsList.innerHTML = '';
    courseData.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCourseDetail() {
    const modal = document.getElementById('courseModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getCourseData(courseId) {
    const courses = {
        'smartphone': {
            title: '스마트폰활용지도사',
            icon: '<i class="fas fa-mobile-alt"></i>',
            overview: '스마트폰을 활용한 교육 및 지도 전문가 양성 과정으로, 디지털 시대에 필요한 스마트폰 활용 능력을 체계적으로 교육합니다.',
            duration: '총 20시간 (주 2회, 10주)',
            price: '150,000원',
            method: '온라인 + 오프라인 병행',
            certification: '민간자격증 발급 (한국직업능력개발원 등록)',
            details: [
                '스마트폰 기본 기능 및 설정 방법',
                '교육용 앱 활용법 및 교육 콘텐츠 제작',
                '스마트폰을 활용한 수업 설계 및 운영',
                '디지털 시민의식 및 정보보안 교육',
                '스마트폰 활용 교육 프로그램 개발',
                '실습 및 프로젝트 기반 학습'
            ],
            benefits: [
                '스마트폰 교육 전문 강사로 활동 가능',
                '교육기관 및 기업 연수 강사 기회',
                '디지털 교육 컨설팅 전문가로 성장',
                '자격증 취득 후 지속적인 교육 지원',
                '전문 강사 네트워크 참여 기회'
            ]
        },
        'ai-literacy': {
            title: 'AI리터러시전문지도사',
            icon: '<i class="fas fa-brain"></i>',
            overview: 'AI 활용 능력과 리터러시 교육 전문가 양성 과정으로, AI 시대에 필요한 기본 소양과 실무 능력을 기릅니다.',
            duration: '총 30시간 (주 2회, 15주)',
            price: '200,000원',
            method: '온라인 + 실습 중심',
            certification: '민간자격증 발급 (한국직업능력개발원 등록)',
            details: [
                'AI 기본 개념 및 원리 이해',
                'AI 도구 활용법 및 실무 적용',
                'AI 윤리 및 책임감 있는 AI 사용',
                'AI 리터러시 교육 방법론',
                'AI 기반 교육 콘텐츠 제작',
                'AI 트렌드 분석 및 미래 전망'
            ],
            benefits: [
                'AI 교육 전문 강사로 활동',
                '기업 AI 교육 컨설팅 기회',
                'AI 리터러시 교육 프로그램 개발',
                'AI 교육 분야 전문가 네트워크 참여',
                '지속적인 AI 기술 업데이트 지원'
            ]
        },
        'ai-video': {
            title: 'AI영상콘텐츠지도사',
            icon: '<i class="fas fa-video"></i>',
            overview: 'AI 기반 영상 콘텐츠 제작 및 교육 전문가 양성 과정으로, 최신 AI 기술을 활용한 영상 제작 능력을 기릅니다.',
            duration: '총 25시간 (주 2회, 12주)',
            price: '180,000원',
            method: '실습 중심 (오프라인)',
            certification: '민간자격증 발급 (한국직업능력개발원 등록)',
            details: [
                'AI 영상 편집 도구 활용법',
                'AI 기반 영상 자동 생성 기술',
                '영상 콘텐츠 기획 및 스토리텔링',
                'AI 음성 합성 및 더빙 기술',
                '영상 최적화 및 배포 전략',
                '실제 프로젝트 기반 영상 제작'
            ],
            benefits: [
                'AI 영상 제작 전문가로 활동',
                '영상 제작 업체 및 방송사 취업 기회',
                '유튜브 및 온라인 콘텐츠 크리에이터',
                '기업 홍보 영상 제작 전문가',
                '영상 교육 강사로 활동'
            ]
        },
        'digital-literacy': {
            title: '디지털리터러시지도사',
            icon: '<i class="fas fa-laptop"></i>',
            overview: '디지털 환경에서의 정보 활용 능력 교육 전문가 양성 과정으로, 디지털 시대 필수 소양을 체계적으로 교육합니다.',
            duration: '총 22시간 (주 2회, 11주)',
            price: '160,000원',
            method: '온라인 + 오프라인 병행',
            certification: '민간자격증 발급 (한국직업능력개발원 등록)',
            details: [
                '디지털 정보 검색 및 평가 능력',
                '디지털 콘텐츠 제작 및 편집',
                '온라인 소통 및 협업 도구 활용',
                '디지털 시민의식 및 윤리 교육',
                '사이버 보안 및 개인정보 보호',
                '디지털 격차 해소 교육 방법론'
            ],
            benefits: [
                '디지털 교육 전문 강사로 활동',
                '공공기관 디지털 교육 프로그램 운영',
                '기업 디지털 역량 강화 교육',
                '디지털 리터러시 교육 프로그램 개발',
                '디지털 포용 사회 구현에 기여'
            ]
        },
        'storybook': {
            title: '동화출판지도사',
            icon: '<i class="fas fa-book-open"></i>',
            overview: '동화책 기획, 제작 및 출판 교육 전문가 양성 과정으로, 창의적인 스토리텔링과 출판 기술을 학습합니다.',
            duration: '총 28시간 (주 2회, 14주)',
            price: '190,000원',
            method: '실습 중심 (오프라인)',
            certification: '민간자격증 발급 (한국직업능력개발원 등록)',
            details: [
                '동화 스토리 기획 및 구성법',
                '캐릭터 디자인 및 일러스트레이션',
                '디지털 출판 도구 활용법',
                '동화책 편집 및 디자인',
                '출판 프로세스 및 마케팅',
                '실제 동화책 제작 프로젝트'
            ],
            benefits: [
                '동화 작가 및 일러스트레이터로 활동',
                '출판사 및 에이전시 취업 기회',
                '아동 교육 콘텐츠 개발 전문가',
                '동화 교육 강사로 활동',
                '자체 출판 및 독립 출판사 창업'
            ]
        }
    };
    
    return courses[courseId] || courses['smartphone'];
}

function openConsultation() {
    // Scroll to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    closeCourseDetail();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target === modal) {
        closeCourseDetail();
    }
}

// Export functions for potential use in other scripts
window.BizAiConsulting = {
    showNotification: function(message, type) {
        // This would be the showNotification function from above
        console.log('Notification:', message, type);
    }
};

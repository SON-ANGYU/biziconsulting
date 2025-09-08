// Community Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Community Tab Navigation
    const communityTabs = document.querySelectorAll('.community-tab');
    const communitySections = document.querySelectorAll('.community-section');
    
    communityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            communityTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            communitySections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab) {
                    section.classList.add('active');
                }
            });
            
            // Show notification
            const tabText = this.textContent;
            showNotification(`${tabText} 섹션으로 이동했습니다.`);
        });
    });
    
    // Resources Filter Functionality
    const resourceFilterBtns = document.querySelectorAll('.filter-btn');
    const resourceItems = document.querySelectorAll('.resource-item');
    
    resourceFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            resourceFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter resources
            resourceItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'flex';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
            
            // Show notification
            const filterText = this.textContent;
            showNotification(`${filterText} 자료를 보여주고 있습니다.`);
        });
    });
    
    // Download Button Functionality
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resourceItem = this.closest('.resource-item');
            const resourceTitle = resourceItem.querySelector('h3').textContent;
            
            // Simulate download
            showDownloadModal(resourceTitle);
        });
    });
    
    // FAQ/Q&A Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item, .qna-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question, .qna-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // FAQ Search Functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3, .qna-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer, .qna-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
            
            if (searchTerm) {
                showNotification(`"${searchTerm}" 검색 결과를 보여주고 있습니다.`);
            }
        }
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Download Modal Function
    function showDownloadModal(resourceTitle) {
        // Remove existing modal
        const existingModal = document.querySelector('.download-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'download-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>자료 다운로드</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="download-info">
                            <i class="fas fa-download"></i>
                            <h4>${resourceTitle}</h4>
                            <p>다운로드를 시작합니다. 잠시만 기다려주세요.</p>
                        </div>
                        <div class="download-progress">
                            <div class="progress-bar">
                                <div class="progress-fill"></div>
                            </div>
                            <span class="progress-text">0%</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary modal-cancel">취소</button>
                        <button class="btn btn-primary modal-confirm">다운로드</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            .download-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 400px;
                width: 100%;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                animation: slideInUp 0.3s ease-out;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--primary-blue);
                font-size: 1.25rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                color: var(--primary-blue);
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .download-info {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .download-info i {
                font-size: 3rem;
                color: var(--primary-green);
                margin-bottom: 10px;
            }
            
            .download-info h4 {
                margin: 10px 0;
                color: var(--primary-blue);
            }
            
            .download-info p {
                color: var(--secondary-gray);
                margin: 0;
            }
            
            .download-progress {
                margin-bottom: 20px;
            }
            
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #e5e7eb;
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .progress-fill {
                height: 100%;
                background: var(--primary-green);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .progress-text {
                text-align: center;
                display: block;
                color: var(--secondary-gray);
                font-size: 0.875rem;
            }
            
            .modal-footer {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
                padding: 20px;
                border-top: 1px solid #e5e7eb;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        // Add styles to head if not already added
        if (!document.querySelector('#download-modal-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'download-modal-styles';
            styleElement.textContent = modalStyles;
            document.head.appendChild(styleElement);
        }
        
        // Add modal to document
        document.body.appendChild(modal);
        
        // Modal event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.modal-cancel');
        const confirmBtn = modal.querySelector('.modal-confirm');
        const progressFill = modal.querySelector('.progress-fill');
        const progressText = modal.querySelector('.progress-text');
        
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease-in';
            setTimeout(() => modal.remove(), 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        
        confirmBtn.addEventListener('click', function() {
            // Simulate download progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    showNotification('다운로드가 완료되었습니다.', 'success');
                    setTimeout(closeModal, 1000);
                }
                progressFill.style.width = progress + '%';
                progressText.textContent = Math.round(progress) + '%';
            }, 200);
        });
        
        // Close modal when clicking overlay
        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Notice item click functionality
    const noticeItems = document.querySelectorAll('.notice-item');
    
    noticeItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const content = this.querySelector('.notice-content').innerHTML;
            
            showNoticeModal(title, content);
        });
    });
    
    // Notice Modal Function
    function showNoticeModal(title, content) {
        // Remove existing modal
        const existingModal = document.querySelector('.notice-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'notice-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="notice-content-modal">
                            ${content}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary modal-close">확인</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            .notice-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                animation: slideInUp 0.3s ease-out;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--primary-blue);
                font-size: 1.25rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                color: var(--primary-blue);
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .notice-content-modal {
                line-height: 1.6;
                color: var(--primary-gray);
            }
            
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                padding: 20px;
                border-top: 1px solid #e5e7eb;
            }
        `;
        
        // Add styles to head if not already added
        if (!document.querySelector('#notice-modal-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'notice-modal-styles';
            styleElement.textContent = modalStyles;
            document.head.appendChild(styleElement);
        }
        
        // Add modal to document
        document.body.appendChild(modal);
        
        // Modal event listeners
        const closeBtns = modal.querySelectorAll('.modal-close');
        
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease-in';
            setTimeout(() => modal.remove(), 300);
        }
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        // Close modal when clicking overlay
        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Initialize animations
    const animatedElements = document.querySelectorAll('.notice-item, .resource-item, .faq-item, .qna-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add fade-in-up animation styles
    const animationStyles = `
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
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    
    if (!document.querySelector('#animation-styles')) {
        const animationStyleElement = document.createElement('style');
        animationStyleElement.id = 'animation-styles';
        animationStyleElement.textContent = animationStyles;
        document.head.appendChild(animationStyleElement);
    }
});

// Export functions for global use
window.CommunityManager = {
    switchTab: function(tabName) {
        const tab = document.querySelector(`[data-tab="${tabName}"]`);
        if (tab) {
            tab.click();
        }
    },
    
    searchFAQ: function(searchTerm) {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('keypress', { key: 'Enter' }));
        }
    },
    
    filterResources: function(category) {
        const filterBtn = document.querySelector(`[data-filter="${category}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
};

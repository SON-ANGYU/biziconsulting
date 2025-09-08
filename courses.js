// Courses Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Course Filter Functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const courseCards = document.querySelectorAll('.course-card-detailed');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('fade-in');
                }
            });
            
            // Show notification
            const filterText = this.textContent;
            showFilterNotification(`${filterText} 과정을 보여주고 있습니다.`);
        });
    });
    
    // Course Action Buttons
    const courseActionButtons = document.querySelectorAll('.course-actions .btn');
    
    courseActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const courseCard = this.closest('.course-card-detailed');
            const courseTitle = courseCard.querySelector('h3').textContent;
            const action = this.textContent.trim();
            
            if (action === '수강신청') {
                showCourseModal(courseTitle, '수강신청');
            } else if (action === '자료 다운로드') {
                showCourseModal(courseTitle, '자료 다운로드');
            }
        });
    });
    
    // Course Modal Function
    function showCourseModal(courseTitle, action) {
        // Remove existing modal
        const existingModal = document.querySelector('.course-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${courseTitle} - ${action}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${getModalContent(action)}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary modal-cancel">취소</button>
                        <button class="btn btn-primary modal-confirm">확인</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            .course-modal {
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
                max-width: 500px;
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
        if (!document.querySelector('#modal-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'modal-styles';
            styleElement.textContent = modalStyles;
            document.head.appendChild(styleElement);
        }
        
        // Add modal to document
        document.body.appendChild(modal);
        
        // Modal event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.modal-cancel');
        const confirmBtn = modal.querySelector('.modal-confirm');
        
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease-in';
            setTimeout(() => modal.remove(), 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        
        confirmBtn.addEventListener('click', function() {
            // Handle confirmation
            if (action === '수강신청') {
                showNotification('수강신청이 접수되었습니다. 담당자가 연락드리겠습니다.', 'success');
            } else if (action === '자료 다운로드') {
                showNotification('자료 다운로드가 시작됩니다.', 'success');
            }
            closeModal();
        });
        
        // Close modal when clicking overlay
        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // Add fadeOut animation
        const fadeOutStyle = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        
        if (!document.querySelector('#fade-out-styles')) {
            const fadeOutElement = document.createElement('style');
            fadeOutElement.id = 'fade-out-styles';
            fadeOutElement.textContent = fadeOutStyle;
            document.head.appendChild(fadeOutElement);
        }
    }
    
    // Get modal content based on action
    function getModalContent(action) {
        if (action === '수강신청') {
            return `
                <div class="enrollment-form">
                    <p>수강신청을 위해 다음 정보를 입력해주세요.</p>
                    <form>
                        <div class="form-group">
                            <label>이름</label>
                            <input type="text" name="name" required>
                        </div>
                        <div class="form-group">
                            <label>연락처</label>
                            <input type="tel" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label>이메일</label>
                            <input type="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label>희망 수강일</label>
                            <input type="date" name="preferred-date">
                        </div>
                        <div class="form-group">
                            <label>문의사항</label>
                            <textarea name="inquiry" rows="3" placeholder="수강 관련 문의사항이 있으시면 입력해주세요."></textarea>
                        </div>
                    </form>
                </div>
            `;
        } else if (action === '자료 다운로드') {
            return `
                <div class="download-content">
                    <p>다음 자료를 다운로드할 수 있습니다.</p>
                    <div class="download-list">
                        <div class="download-item">
                            <i class="fas fa-file-pdf"></i>
                            <span>과정 개요서 (PDF)</span>
                            <button class="btn btn-sm btn-primary">다운로드</button>
                        </div>
                        <div class="download-item">
                            <i class="fas fa-file-alt"></i>
                            <span>커리큘럼 상세 (PDF)</span>
                            <button class="btn btn-sm btn-primary">다운로드</button>
                        </div>
                        <div class="download-item">
                            <i class="fas fa-file-image"></i>
                            <span>브로슈어 (JPG)</span>
                            <button class="btn btn-sm btn-primary">다운로드</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // Add additional styles for modal content
    const additionalStyles = `
        .enrollment-form .form-group {
            margin-bottom: 16px;
        }
        
        .enrollment-form label {
            display: block;
            margin-bottom: 4px;
            font-weight: 600;
            color: var(--primary-gray);
        }
        
        .enrollment-form input,
        .enrollment-form textarea {
            width: 100%;
            padding: 8px 12px;
            border: 2px solid #e5e7eb;
            border-radius: 6px;
            font-family: var(--font-primary);
        }
        
        .enrollment-form input:focus,
        .enrollment-form textarea:focus {
            outline: none;
            border-color: var(--primary-blue);
        }
        
        .download-list {
            margin-top: 16px;
        }
        
        .download-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            margin-bottom: 8px;
        }
        
        .download-item i {
            color: var(--primary-green);
            font-size: 1.2rem;
        }
        
        .download-item span {
            flex: 1;
            color: var(--primary-gray);
        }
        
        .btn-sm {
            padding: 6px 12px;
            font-size: 0.875rem;
        }
    `;
    
    if (!document.querySelector('#additional-modal-styles')) {
        const additionalStyleElement = document.createElement('style');
        additionalStyleElement.id = 'additional-modal-styles';
        additionalStyleElement.textContent = additionalStyles;
        document.head.appendChild(additionalStyleElement);
    }
    
    // Filter notification function
    function showFilterNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.filter-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'filter-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-filter"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    // Course card hover effects
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Search functionality (if search input exists)
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const subtitle = card.querySelector('.course-subtitle').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
                    card.classList.remove('hidden');
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('fade-in');
                }
            });
        });
    }
    
    // Initialize course cards with fade-in animation
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Print course information
    const printButtons = document.querySelectorAll('.print-course');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card-detailed');
            const printWindow = window.open('', '_blank');
            
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${courseCard.querySelector('h3').textContent}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            h1 { color: #1e3a8a; }
                            h2 { color: #059669; }
                            .course-info { margin: 20px 0; }
                            ul { margin: 10px 0; }
                        </style>
                    </head>
                    <body>
                        ${courseCard.innerHTML}
                    </body>
                </html>
            `);
            
            printWindow.document.close();
            printWindow.print();
        });
    });
});

// Export functions for global use
window.CourseFilter = {
    filterByCategory: function(category) {
        const filterTab = document.querySelector(`[data-filter="${category}"]`);
        if (filterTab) {
            filterTab.click();
        }
    },
    
    showAllCourses: function() {
        const allTab = document.querySelector('[data-filter="all"]');
        if (allTab) {
            allTab.click();
        }
    }
};

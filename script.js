// 导航栏功能
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到目标位置
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 移除所有导航链接的active类
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                // 添加当前链接的active类
                this.classList.add('active');
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 监听滚动事件，更新导航链接的active状态
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 150;
        
        document.querySelectorAll('.mindmap-item').forEach(item => {
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;
            const itemId = item.getAttribute('id');
            
            if (scrollPosition >= itemTop && scrollPosition < itemBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${itemId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // 一级标题点击功能
    const categoryTitles = document.querySelectorAll('.category-title');
    
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            // 移除所有一级标题的active类
            categoryTitles.forEach(categoryTitle => {
                categoryTitle.classList.remove('active');
            });
            
            // 添加当前一级标题的active类
            this.classList.add('active');
            
            // 获取当前分类
            const category = this.parentElement.classList.contains('main-category') ? 
                this.textContent.trim().toLowerCase() : '';
            
            // 映射分类名称到CSS类
            const categoryMap = {
                '工学': 'engineering',
                '理学': 'science',
                '经济学': 'economics',
                '生活旅游': 'travel',
                'engineering': 'engineering',
                'science': 'science',
                'economics': 'economics',
                'travel': 'travel'
            };
            
            const targetClass = categoryMap[category] || '';
            
            // 显示或隐藏思维导图项
            document.querySelectorAll('.mindmap-item').forEach(item => {
                if (targetClass && item.classList.contains(targetClass)) {
                    item.style.display = 'flex';
                } else if (!targetClass) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 默认显示工学分类
    const engineeringTitle = document.querySelector('.category-title:nth-child(1)');
    if (engineeringTitle) {
        engineeringTitle.click();
    }
});
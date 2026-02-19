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
});
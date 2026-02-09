// 获取DOM元素
const contentContainer = document.getElementById('content-container');
const langBtn = document.getElementById('langBtn');
const sidebar = document.querySelector('.sidebar');
let currentLang = 'zh'; // 默认中文
let contentData = null; // 存储加载的内容数据
let links = null;
let sections = null;

// 加载内容
async function loadContent() {
    try {
        const response = await fetch('content.json');
        contentData = await response.json();
        renderContent();
        initializeScrollListener();
    } catch (error) {
        console.error('Failed to load content:', error);
    }
}

// 渲染内容
function renderContent() {
    contentContainer.innerHTML = '';
    
    contentData.sections.forEach((section, index) => {
        const sectionEl = document.createElement('section');
        sectionEl.id = section.id;
        if (index !== 0) {
            sectionEl.classList.add('hidden');
        }
        
        // 创建标题
        const h2 = document.createElement('h2');
        h2.setAttribute('data-zh', section.title.zh);
        h2.setAttribute('data-en', section.title.en);
        h2.textContent = section.title.zh;
        sectionEl.appendChild(h2);
        
        // 创建段落
        section.paragraphs.forEach(para => {
            const p = document.createElement('p');
            p.setAttribute('data-zh', para.zh);
            p.setAttribute('data-en', para.en);
            p.textContent = para.zh;
            sectionEl.appendChild(p);
        });
        
        contentContainer.appendChild(sectionEl);
    });
    
    // 更新sections引用
    sections = document.querySelectorAll('section');
    setupClickHandlers();
}

// 设置点击处理器
function setupClickHandlers() {
    links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有导航active样式
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // 获取当前点击的section id
            const targetId = link.getAttribute('href').substring(1);
            
            // 隐藏所有section，显示对应section
            sections.forEach(section => {
                if (section.getAttribute('id') === targetId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });
}

// 初始化滚动监听
function initializeScrollListener() {
    // 滚动时更新导航（可选）
    window.addEventListener('scroll', () => {
        // 根据需要添加滚动时的导航更新逻辑
    });
}

// 语言切换功能
langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    
    // 更新按钮文本
    langBtn.textContent = currentLang === 'zh' ? 'English' : '中文';
    
    // 遍历所有有data-zh和data-en属性的元素
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
        if (currentLang === 'zh') {
            element.textContent = element.getAttribute('data-zh');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
});

// 页面加载完成后加载内容
document.addEventListener('DOMContentLoaded', loadContent);

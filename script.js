// 初始化AOS动画库
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('visible');
        menuToggle.innerHTML = mobileMenu.classList.contains('visible') 
            ? '<i class="fas fa-times text-xl"></i>' 
            : '<i class="fas fa-bars text-xl"></i>';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('visible');
            menuToggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        });
    });
    
    // 作品筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-gray-800', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-800');
            });
            
            // 添加当前按钮的active类
            this.classList.add('active', 'bg-gray-800', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-800');
            
            const filter = this.getAttribute('data-filter');
            
            // 筛选作品
            workItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 联系表单验证
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 简单验证
        if (!name || !email || !message) {
            alert('请填写所有必填字段');
            return;
        }
        
        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址');
            return;
        }
        
        // 模拟表单提交
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            // 5秒后重置表单
            setTimeout(() => {
                formSuccess.classList.add('hidden');
                contactForm.style.display = 'block';
            }, 5000);
        }, 1000);
    });
    
    // 回到顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 作品详情模态框
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    
    // 作品数据
    const projectsData = [
        {
            id: 1,
            title: "宇航员概念海报",
            category: "海报设计",
            client: "科技展览活动",
            date: "2023年10月",
            description: "这是为科技展览活动设计的概念海报，以宇航员为主题，融合了未来感和科技元素。设计采用深色背景与鲜明的蓝色几何图形形成强烈对比，突出宇航员形象，传达探索未知、追求梦想的主题。",
            image: "https://p3-doubao-search-sign.byteimg.com/labis/3b301895d794fcfb533c8f22c88f33b1~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1785061113&x-signature=4XBWuKyuehF7qIh548re%2BFfL6Rs%3D",
            tools: ["Adobe Photoshop", "Adobe Illustrator"],
            url: "#"
        },
        {
            id: 2,
            title: "色彩音乐节海报",
            category: "海报设计",
            client: "城市音乐节",
            date: "2023年8月",
            description: "为城市音乐节设计的宣传海报，采用绚丽的色彩和流体的视觉元素，传达音乐的活力和动感。设计灵感来源于音乐的流动性和色彩的情感表达，通过抽象的色彩漩涡和清晰的活动信息，吸引目标受众的注意力。",
            image: "https://p3-doubao-search-sign.byteimg.com/labis/3e2ba5e6379bf65bd1145f26bfc37fa1~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1785061113&x-signature=FrCKEFSzzIy1YuIkMea6f95InTc%3D",
            tools: ["Adobe Photoshop", "Adobe Illustrator"],
            url: "#"
        },
        {
            id: 3,
            title: "欢喜咖啡品牌VI",
            category: "品牌VI",
            client: "欢喜咖啡连锁",
            date: "2023年5月",
            description: "为欢喜咖啡连锁品牌设计的视觉识别系统，包括标志、名片、菜单等应用。设计采用橙色作为主色调，传达活力和温暖的品牌特质，同时保持简约现代的视觉风格，符合当代消费者的审美需求。",
            image: "https://p11-doubao-search-sign.byteimg.com/labis/964042895d82778fdff01e46daa2817d~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1785061113&x-signature=4hTp0QggvJfITg4a5OQSoGAt2PQ%3D",
            tools: ["Adobe Illustrator", "Adobe InDesign"],
            url: "#"
        },
        {
            id: 4,
            title: "Brasil Botões品牌设计",
            category: "品牌VI",
            client: "Brasil Botões时尚品牌",
            date: "2023年3月",
            description: "为巴西时尚品牌Brasil Botões设计的视觉识别系统，包括标志和应用设计。设计灵感来源于巴西国旗和几何图形，通过简洁的线条和鲜明的色彩对比，展现品牌的时尚感和文化特色。",
            image: "https://p26-doubao-search-sign.byteimg.com/labis/1ad1d93d887c2aae111db8f9fe9de4fc~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1785061113&x-signature=u%2Brp1wsOna5rWLRqKFutdHcD2GU%3D",
            tools: ["Adobe Illustrator", "Adobe Photoshop"],
            url: "#"
        },
        {
            id: 5,
            title: "荔枝乌龙茶包装",
            category: "包装设计",
            client: "茗香茶叶公司",
            date: "2023年7月",
            description: "为茗香茶叶公司设计的荔枝乌龙茶包装，采用手绘风格的插画，展现产品的天然和健康特性。包装结构设计为立方体，便于陈列和运输，同时通过精美的插画和简洁的信息排版，提升产品的附加值。",
            image: "https://p11-doubao-search-sign.byteimg.com/labis/01dfb67d3b3743aa9cf9eb7e3490fc7e~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1785061113&x-signature=OKdHiZOeP6FQEgOyvltV8lrLd2E%3D",
            tools: ["Adobe Illustrator", "Adobe Photoshop", "Cinema 4D"],
            url: "#"
        },
        {
            id: 6,
            title: "幼兽啤酒包装",
            category: "包装设计",
            client: "精酿啤酒厂",
            date: "2023年9月",
            description: "为精酿啤酒厂设计的幼兽啤酒包装，采用国潮风格的插画和鲜明的色彩对比，突出产品的独特性和文化内涵。包装设计考虑了不同口味的差异化表达，通过色彩和图案的变化，帮助消费者区分不同产品。",
            image: "https://p3-doubao-search-sign.byteimg.com/labis/52baa5dc4fcf6aa108687385570dd80e~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1785061113&x-signature=uuAaUVXtNFKsVqj9lgGpElg%2Fww4%3D",
            tools: ["Adobe Illustrator", "Adobe Photoshop"],
            url: "#"
        }
    ];
    
    // 打开模态框
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                modalTitle.textContent = project.title;
                
                // 构建模态框内容
                let content = `
                    <div class="project-detail">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-auto rounded-lg mb-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="md:col-span-2">
                                <h4 class="text-xl font-semibold mb-4">项目描述</h4>
                                <p class="text-gray-600 mb-6">${project.description}</p>
                            </div>
                            <div class="md:col-span-1">
                                <div class="bg-gray-50 p-6 rounded-lg">
                                    <h5 class="text-lg font-semibold mb-4">项目信息</h5>
                                    <ul class="space-y-3">
                                        <li><strong>类别:</strong> ${project.category}</li>
                                        <li><strong>客户:</strong> ${project.client}</li>
                                        <li><strong>日期:</strong> ${project.date}</li>
                                        <li><strong>工具:</strong> ${project.tools.join(', ')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                modalContent.innerHTML = content;
                modal.classList.add('visible');
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            }
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', function() {
        modal.classList.remove('visible');
        document.body.style.overflow = ''; // 恢复背景滚动
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('visible');
            document.body.style.overflow = '';
        }
    });
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 回退方案
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
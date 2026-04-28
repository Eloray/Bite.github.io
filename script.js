document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. 开场动画
    const tl = gsap.timeline();
    tl.to(".loader-logo", { opacity: 1, letterSpacing: "0.1em", duration: 1.2, ease: "power3.out" })
      .to("#loader", { yPercent: -100, duration: 1, ease: "expo.inOut", delay: 0.5,
          onComplete: () => document.body.classList.remove('loading')
      })
      .to(".hero-content", { opacity: 1, y: 0, duration: 1 }, "-=0.4")
      .to(".navbar", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    // 2. 滚动动效
    gsap.to(".hero-bg", {
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
        y: 150, scale: 1.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            opacity: 1, y: 0, duration: 1.2, ease: "power2.out"
        });
    });

    // 3. 详情页交互增强逻辑
    const detailPage = document.getElementById('detail-page');
    const scrollWrapper = document.getElementById('detail-scroll-wrapper');
    const backBtn = document.querySelector('.back-btn');
    
    // 我们现在有两个标题元素要更新：一个隐藏的逻辑元素，一个侧边的显示元素
    const detailTitleSecondary = document.getElementById('detail-title-secondary');
    const detailImg = document.getElementById('detail-main-img');

    const closeDetailPage = () => {
        if (!detailPage.classList.contains('active')) return;
        detailPage.classList.remove('active');
        document.body.style.overflow = ''; 
        setTimeout(() => { detailPage.style.display = 'none'; }, 800);
    };

    document.querySelectorAll('.work-card, .archive-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const imgUrl = card.querySelector('img').src;

            detailTitleSecondary.innerText = title; // 更新左下侧的标题
            detailImg.src = imgUrl;

            detailPage.style.display = 'block';
            scrollWrapper.scrollTop = 0; 

            setTimeout(() => {
                detailPage.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }, 10);
        });
    });

    backBtn.addEventListener('click', closeDetailPage);
    scrollWrapper.addEventListener('click', (e) => { if (e.target === scrollWrapper) closeDetailPage(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetailPage(); });

    // 4. 页脚时间
    const updateTime = () => {
        const timeEl = document.getElementById('local-time');
        if(!timeEl) return;
        const now = new Date();
        const options = { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: true };
        timeEl.innerText = `SHANGHAI ${now.toLocaleTimeString('en-US', options)}`;
    };
    setInterval(updateTime, 1000);
    updateTime();
});
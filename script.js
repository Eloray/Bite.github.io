document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 开场动画
    const tl = gsap.timeline();
    tl.to(".loader-logo", { opacity: 1, letterSpacing: "0.1em", duration: 1.2, ease: "power3.out" })
      .to("#loader", { yPercent: -100, duration: 1, ease: "expo.inOut", delay: 0.5,
          onComplete: () => document.body.classList.remove('loading')
      })
      .to(".hero-content", { opacity: 1, y: 0, duration: 1 }, "-=0.4")
      .to(".navbar", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    // 滚动触发动画
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
            opacity: 1, y: 0, duration: 1, ease: "power2.out"
        });
    });

    // 详情页逻辑
    const detailPage = document.getElementById('detail-page');
    const scrollWrapper = document.getElementById('detail-scroll-wrapper');
    const backBtn = document.querySelector('.back-btn');
    const detailTitleSecondary = document.getElementById('detail-title-secondary');
    const detailImg = document.getElementById('detail-main-img');

    const closeDetailPage = () => {
        detailPage.classList.remove('active');
        document.body.style.overflow = ''; 
        setTimeout(() => { detailPage.style.display = 'none'; }, 800);
    };

    document.querySelectorAll('.work-card, .archive-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const imgUrl = card.querySelector('img').src;
            detailTitleSecondary.innerText = title;
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
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetailPage(); });

    // 时间显示
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
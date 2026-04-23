document.addEventListener('DOMContentLoaded', () => {
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    const reveals = document.querySelectorAll('.reveal');

    // 1. Custom Cursor Logic
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
        // Smooth interpolation for the follower
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursorFollower.style.left = `${cursorX}px`;
        cursorFollower.style.top = `${cursorY}px`;
        cursorFollower.style.transform = `translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor interaction scaling
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .btn-3d');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.width = '64px';
            cursorFollower.style.height = '64px';
            cursorFollower.style.background = 'rgba(168, 85, 247, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.width = '32px';
            cursorFollower.style.height = '32px';
            cursorFollower.style.background = 'transparent';
        });
    });

    // 2. Optimized Intersection Observer for Reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));

    // 3. Simple Mouse Parallax for Spheres
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;

        document.querySelectorAll('.float-sphere').forEach(sphere => {
            sphere.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // 4. Smooth Anchor Scrolling (Fix for flow)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 0;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

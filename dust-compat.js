// Compatibility fixes for Hostinger deployment
(function () {
    'use strict';

    // Override createMagicalDust with production-safe version
    window.createMagicalDustSafe = function (x, y) {
        if (!document.body) return;

        try {
            var dust = document.createElement('div');
            dust.className = 'magical-dust';

            var offsetX = (Math.random() - 0.5) * 30;
            var offsetY = (Math.random() - 0.5) * 30;

            dust.style.left = (x + offsetX) + 'px';
            dust.style.top = (y + offsetY) + 'px';

            var colors = [
                'rgba(1, 0, 128, 0.8)',
                'rgba(0, 71, 171, 0.8)',
                'rgba(138, 43, 226, 0.8)',
                'rgba(255, 215, 0, 0.6)',
                'rgba(255, 255, 255, 0.9)'
            ];
            var randomColor = colors[Math.floor(Math.random() * colors.length)];
            dust.style.background = randomColor;
            dust.style.boxShadow = '0 0 10px ' + randomColor;

            var size = Math.random() * 6 + 3;
            dust.style.width = size + 'px';
            dust.style.height = size + 'px';

            var duration = Math.random() * 1 + 0.5;
            dust.style.animationDuration = duration + 's';
            dust.style.webkitAnimationDuration = duration + 's';

            var moveX = (Math.random() - 0.5) * 100;
            var moveY = (Math.random() - 0.5) * 100;
            dust.style.setProperty('--dust-x', moveX + 'px');
            dust.style.setProperty('--dust-y', moveY + 'px');

            document.body.appendChild(dust);

            setTimeout(function () {
                if (dust && dust.parentNode) {
                    dust.parentNode.removeChild(dust);
                }
            }, duration * 1000);
        } catch (e) {
            // Silently fail
        }
    };
})();

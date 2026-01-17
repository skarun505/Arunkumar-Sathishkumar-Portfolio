// Spider Cursor Animation - Ported to Vanilla JS
(function () {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', initSpiderCursor);

    function initSpiderCursor() {
        const canvas = document.getElementById('spider-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const { sin, cos, PI, hypot, min, max } = Math;
        let w, h;

        // Initialize dimensions
        resize();
        window.addEventListener('resize', resize);

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function many(n, f) {
            return [...Array(n)].map((_, i) => f(i));
        }

        function rnd(x = 1, dx = 0) {
            return Math.random() * x + dx;
        }

        function lerp(a, b, t) {
            return a + (b - a) * t;
        }

        function noise(x, y, t = 101) {
            const w0 = sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * sin(0.4 * y + -1.3 * t + 1.0));
            const w1 = sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * sin(0.5 * x + -1.2 * t + 0.5));
            return w0 + w1;
        }

        function pt(x, y) {
            return { x, y };
        }

        function drawCircle(x, y, r) {
            ctx.beginPath();
            ctx.ellipse(x, y, r, r, 0, 0, PI * 2);
            ctx.fill();
        }

        function drawLine(x0, y0, x1, y1) {
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            many(100, (i) => {
                i = (i + 1) / 100;
                const x = lerp(x0, x1, i);
                const y = lerp(y0, y1, i);
                const k = noise(x / 5 + x0, y / 5 + y0) * 2;
                ctx.lineTo(x + k, y + k);
            });
            ctx.stroke();
        }

        function spawn() {
            const pts = many(333, () => {
                return {
                    x: rnd(w),
                    y: rnd(h),
                    len: 0,
                    r: 0,
                };
            });

            const pts2 = many(9, (i) => {
                return {
                    x: cos((i / 9) * PI * 2),
                    y: sin((i / 9) * PI * 2),
                };
            });

            let seed = rnd(100);
            let tx = rnd(w);
            let ty = rnd(h);
            let x = rnd(w);
            let y = rnd(h);
            let kx = rnd(0.5, 0.5);
            let ky = rnd(0.5, 0.5);
            let walkRadius = pt(rnd(50, 50), rnd(50, 50));
            let r = w / rnd(100, 150);

            function paintPt(pt) {
                pts2.forEach((pt2) => {
                    if (!pt.len) return;
                    drawLine(
                        lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
                        lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
                        x + pt2.x * r,
                        y + pt2.y * r,
                    );
                });
                drawCircle(pt.x, pt.y, pt.r);
            }

            return {
                follow(mouseX, mouseY) {
                    tx = mouseX;
                    ty = mouseY;
                },

                tick(t) {
                    const selfMoveX = cos(t * kx + seed) * walkRadius.x;
                    const selfMoveY = sin(t * ky + seed) * walkRadius.y;
                    const fx = tx + selfMoveX;
                    const fy = ty + selfMoveY;

                    x += min(w / 100, (fx - x) / 10);
                    y += min(w / 100, (fy - y) / 10);

                    let i = 0;
                    pts.forEach((pt) => {
                        const dx = pt.x - x;
                        const dy = pt.y - y;
                        const len = hypot(dx, dy);
                        let r = min(2, w / len / 5);
                        pt.t = 0;
                        const increasing = len < w / 10 && i++ < 8;
                        const dir = increasing ? 0.1 : -0.1;
                        if (increasing) {
                            r *= 1.5;
                        }
                        pt.r = r;
                        pt.len = max(0, min(pt.len + dir, 1));
                        paintPt(pt);
                    });
                },
            };
        }

        const spiders = many(2, spawn);

        window.addEventListener("pointermove", (e) => {
            spiders.forEach((spider) => {
                spider.follow(e.clientX, e.clientY);
            });
        });

        function anim(t) {
            // Clear canvas logic specific to hero background
            // We want it transparent or matching background
            // The original used fillStyle="#000" which makes it black.
            // We want it clear or white-ish for your theme.

            ctx.clearRect(0, 0, w, h);

            // To make lines visible on white, use dark color
            // Or use the blue theme color var if we could read it, but here we hardcode
            // ctx.fillStyle = "#000"; // Background was black in original
            // canvas.style.background = "#fff"; // Ensure bg is white via CSS

            // Draw faint circle in background? Original: drawCircle(0, 0, w * 10) -> black bg
            // We skip background clearing fill

            ctx.fillStyle = ctx.strokeStyle = "#3f63ad"; // Using your Primary Blue

            t /= 1000;
            spiders.forEach((spider) => spider.tick(t));
            requestAnimationFrame(anim);
        }

        requestAnimationFrame(anim);
    }
})();

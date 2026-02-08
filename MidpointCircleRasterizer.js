class MidpointCircleRasterizer {
    rasterize(p1, p2) {
        let pixels = [];

        let xc = Math.round((p1.x + p2.x) / 2);
        let yc = Math.round((p1.y + p2.y) / 2);

        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let r = Math.round(Math.sqrt(dx * dx + dy * dy) / 2);

        let x = r;
        let y = 0;
        let p = 1 - r;

        function plotCirclePoints(xc, yc, x, y, pixels) {
            pixels.push(new Point(xc + x, yc + y));
            pixels.push(new Point(xc - x, yc + y));
            pixels.push(new Point(xc + x, yc - y));
            pixels.push(new Point(xc - x, yc - y));
            pixels.push(new Point(xc + y, yc + x));
            pixels.push(new Point(xc - y, yc + x));
            pixels.push(new Point(xc + y, yc - x));
            pixels.push(new Point(xc - y, yc - x));
        }

        while (x >= y) {
            plotCirclePoints(xc, yc, x, y, pixels);
            y++;

            if (p <= 0) {
                p = p + 2 * y + 1;
            } else {
                x--;
                p = p + 2 * y - 2 * x + 1;
            }
        }

        return pixels;
    }
}

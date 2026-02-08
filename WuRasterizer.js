class WuRasterizer {
    rasterize(p1, p2) {
        let pixels = [];

        function ipart(x) { return Math.floor(x); }
        function fpart(x) { return x - Math.floor(x); }
        function rfpart(x) { return 1 - fpart(x); }

        let x0 = p1.x;
        let y0 = p1.y;
        let x1 = p2.x;
        let y1 = p2.y;

        let steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);

        if (steep) {
            [x0, y0] = [y0, x0];
            [x1, y1] = [y1, x1];
        }

        if (x0 > x1) {
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }

        let dx = x1 - x0;
        let dy = y1 - y0;
        let gradient = dy / dx;

        let y = y0;

        for (let x = x0; x <= x1; x++) {
            if (steep) {
                pixels.push(new Point(ipart(y), x));
                pixels.push(new Point(ipart(y) + 1, x));
            } else {
                pixels.push(new Point(x, ipart(y)));
                pixels.push(new Point(x, ipart(y) + 1));
            }
            y += gradient;
        }

        return pixels;
    }
}

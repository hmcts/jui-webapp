export class Utils {

    buildLineRectangle(rectangles) {

        this.sortByY(rectangles, true);
        const lowestY = rectangles[0].y;
        const lineHeight = rectangles[0].height;

        this.sortByX(rectangles, true);
        const lowestX = rectangles[0].x;
        const upperX = rectangles[rectangles.length - 1].x;
        const width = rectangles[rectangles.length - 1].width;

        const rectangle = {
            y: lowestY,
            x: lowestX,
            width: (upperX - lowestX) + width,
            height: lineHeight
        };
        return rectangle;
    }

    generateRectanglePerLine(annotationRectangles, generatedRectangles) {

        this.sortByY(annotationRectangles, true);
        const highestY = annotationRectangles[annotationRectangles.length - 1].y;
        const lowestY = annotationRectangles[0].y;
        const lineHeight = annotationRectangles[0].height;

        if (this.difference(highestY, lowestY) > lineHeight) {
            const currentLineRectangles = annotationRectangles.filter(rectangle => rectangle.y <= (lowestY + lineHeight));
            const nextLineRectangles = annotationRectangles.filter(rectangle => rectangle.y > (lowestY + lineHeight));
            generatedRectangles.push(this.buildLineRectangle(currentLineRectangles));
            this.generateRectanglePerLine(nextLineRectangles, generatedRectangles);
        } else {
            generatedRectangles.push(this.buildLineRectangle(annotationRectangles));
        }
    }

    sortByY(rectangles, lowest) {
        rectangles.sort(
            function(a, b) {
                const keyA = a.y,
                    keyB = b.y;
                    if (keyA < keyB) { return lowest ? -1 : 1; }
                    if (keyA > keyB) { return lowest ? 1 : -1; }
                return 0;
        });
    }

    sortByX(rectangles, lowest) {
        rectangles.sort(
            function(a, b) {
                const keyA = a.x,
                    keyB = b.x;
                if (keyA < keyB) { return lowest ? -1 : 1; }
                if (keyA > keyB) { return lowest ? 1 : -1; }
                return 0;
        });
    }

    difference(a, b): number { return Math.abs(a - b); }
}

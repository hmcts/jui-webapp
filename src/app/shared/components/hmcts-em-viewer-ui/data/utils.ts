import { Rectangle } from './annotation-set.model';

export class Utils {

    buildLineRectangle(rectangles) {

        this.sortByY(rectangles);
        const lowestY = rectangles[0].y;
        const lineHeight = rectangles[0].height;

        this.sortByX(rectangles);
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

    generateRectanglePerLine(annotationRectangles: Rectangle[], generatedRectangles: Rectangle[]) {

        this.sortByY(annotationRectangles);
        const highestY = annotationRectangles[annotationRectangles.length - 1].y;
        const lowestY = annotationRectangles[0].y;
        const lineHeight = this.getAnnotationLineHeight(annotationRectangles);

        if (this.difference(highestY, lowestY) > lineHeight) {
            const currentLineRectangles = annotationRectangles.filter(rectangle => rectangle.y <= (lowestY + lineHeight));
            const nextLineRectangles = annotationRectangles.filter(rectangle => rectangle.y > (lowestY + lineHeight));
            generatedRectangles.push(this.buildLineRectangle(currentLineRectangles));
            this.generateRectanglePerLine(nextLineRectangles, generatedRectangles);
        } else {
            generatedRectangles.push(this.buildLineRectangle(annotationRectangles));
        }
    }

    getAnnotationLineHeight(rectangles: Rectangle[]): number {
        return rectangles[0].height;
    }

    sortByY(rectangles: Rectangle[], lowest = true) {
        rectangles.sort(
            function (a, b) {
                const keyA = a.y,
                    keyB = b.y;
                if (keyA < keyB) { return lowest ? -1 : 1; }
                if (keyA > keyB) { return lowest ? 1 : -1; }
                return 0;
            });
    }

    sortByX(rectangles: Rectangle[], lowest = true) {
        rectangles.sort(
            function (a, b) {
                const keyA = a.x,
                    keyB = b.x;
                if (keyA < keyB) { return lowest ? -1 : 1; }
                if (keyA > keyB) { return lowest ? 1 : -1; }
                return 0;
            });
    }

    sortByLinePosition(a: Rectangle[], b: Rectangle[]): number {
        this.sortByX(a);
        this.sortByX(b);
        return (a[0].x > b[0].x) ? 1 : -1;
    }

    difference(a: number, b: number): number { return Math.abs(a - b); }

    clickIsHighlight(event: MouseEvent): boolean {
        const target = <HTMLElement>event.target;
        const isHighlight = target.firstElementChild;
        if (isHighlight == null) {
            return false;
        } else if (isHighlight.id.includes('pdf-annotate-screenreader')) {
            return true;
        } else {
            return false;
        }
    }

    getClickedPage(event: any): number {
        let currentParent = event.target;
        for (let step = 0; step < 5; step++) {
            if (currentParent.parentNode != null) {
                const pageNumber = currentParent.parentNode.getAttribute('data-page-number');
                if (pageNumber != null) {
                    return parseInt(pageNumber, null);
                }
                currentParent = currentParent.parentNode;
            }
        }
    }
}

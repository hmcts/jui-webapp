import { Utils } from './utils';
import { Rectangle } from './annotation-set.model';

describe('Utils', () => {
    const utils = new Utils();

    const rectangleX1Y3 = new Rectangle('63225ccd-61fe-4aa7-8c5f-cf9bc31cc424',
                                    '4bcc2edf-487d-4ee0-a5b0-a3cdfe93bf1a',
                                    '123141', null, new Date(), null, null, null,
                                    9.6, 60,
                                    50, 87);
    const rectangleX2Y1 = new Rectangle('de8155b9-5a8e-46f0-b771-d39d3906eeb6',
                                    '4bcc2edf-487d-4ee0-a5b0-a3cdfe93bf1a',
                                    '123141', null, new Date(), null, null, null,
                                    9.6, 50,
                                    68, 70);
    const rectangleX3Y2 = new Rectangle('606fadd5-655b-4675-aa9a-df65f86fb37c',
                                    '4bcc2edf-487d-4ee0-a5b0-a3cdfe93bf1a',
                                    '123141', null, new Date(), null, null, null,
                                    9.6, 45.6,
                                    99, 73);
    const rectangleX4Y4 = new Rectangle('5b864e88-e00e-4f7a-b691-399b83f6cb50',
                                    '4bcc2edf-487d-4ee0-a5b0-a3cdfe93bf1a',
                                    '123141', null, new Date(), null, null, null,
                                    9.6, 20,
                                    108, 90);

    const rectangles = [
        rectangleX3Y2,
        rectangleX2Y1,
        rectangleX1Y3,
        rectangleX4Y4
    ];

    describe('difference', () => {
        it('should return the difference between to numbers', () => {
            const actual = utils.difference(5, 2);
            expect(actual).toBe(3);
        });

        it('should return the difference between negative numbers', () => {
            const actual = utils.difference(-2, 3);
            expect(actual).toBe(5);
        });
    });

    describe('sortByX by lowest', () => {
        it('should order rectangles by lowest X first', () => {
            utils.sortByX(rectangles, true);
            expect(rectangles[0]).toBe(rectangleX1Y3);
        });

        it('should order the other rectangles in X order', () => {
            utils.sortByX(rectangles, true);
            expect(rectangles[1]).toBe(rectangleX2Y1);
            expect(rectangles[2]).toBe(rectangleX3Y2);
        });

        it('should order rectangles by highest X last', () => {
            utils.sortByX(rectangles, true);
            expect(rectangles[rectangles.length - 1]).toBe(rectangleX4Y4);
        });
    });

    describe('sortByX by highest', () => {
        it('should order rectangles by lowest X last', () => {
            utils.sortByX(rectangles, false);
            expect(rectangles[0]).toBe(rectangleX4Y4);
        });

        it('should order the other rectangles in X order', () => {
            utils.sortByX(rectangles, false);
            expect(rectangles[1]).toBe(rectangleX3Y2);
            expect(rectangles[2]).toBe(rectangleX2Y1);
        });

        it('should order rectangles by highest X first', () => {
            utils.sortByX(rectangles, false);
            expect(rectangles[rectangles.length - 1]).toBe(rectangleX1Y3);
        });
    });

    describe('sortByY by lowest', () => {
        it('should order rectangles by lowest Y first', () => {
            utils.sortByY(rectangles, true);
            expect(rectangles[0]).toBe(rectangleX2Y1);
        });

        it('should order the other rectangles in Y order', () => {
            utils.sortByY(rectangles, true);
            expect(rectangles[1]).toBe(rectangleX3Y2);
            expect(rectangles[2]).toBe(rectangleX1Y3);
        });

        it('should order rectangles by lowest Y first', () => {
            utils.sortByY(rectangles, true);
            expect(rectangles[rectangles.length - 1]).toBe(rectangleX4Y4);
        });
    });

    describe('sortByY by highest', () => {
        it('should order rectangles by lowest Y last', () => {
            utils.sortByY(rectangles, false);
            expect(rectangles[0]).toBe(rectangleX4Y4);
        });

        it('should order the other rectangles in Y order', () => {
            utils.sortByY(rectangles, false);
            expect(rectangles[1]).toBe(rectangleX1Y3);
            expect(rectangles[2]).toBe(rectangleX3Y2);
        });

        it('should order rectangles by lowest Y first', () => {
            utils.sortByY(rectangles, false);
            expect(rectangles[rectangles.length - 1]).toBe(rectangleX2Y1);
        });
    });

    describe('build line rectangle', () => {
        it('should set the height of the rectangle to the max height', () => {
            const actualRectangle = utils.buildLineRectangle([rectangleX2Y1, rectangleX3Y2]);
            expect(actualRectangle.height).toBe(rectangleX2Y1.height);
        });

        it('should set the width of the rectangle to the total length of the rectangles', () => {
            const actualRectangle = utils.buildLineRectangle([rectangleX2Y1, rectangleX3Y2]);
            expect(actualRectangle.width).toBe((rectangleX3Y2.x - rectangleX2Y1.x) + rectangleX3Y2.width );
        });

        it('should set the x coordinate to be the lowest rectangle X', () => {
            const actualRectangle = utils.buildLineRectangle([rectangleX2Y1, rectangleX3Y2]);
            expect(actualRectangle.x).toBe(rectangleX2Y1.x);
        });

        it('should set the y coordinate to be the lowest rectangle y', () => {
            const actualRectangle = utils.buildLineRectangle([rectangleX2Y1, rectangleX3Y2]);
            expect(actualRectangle.y).toBe(rectangleX2Y1.y);
        });
    });

    describe('split rectangles by line', () => {
        it('should return 1 rectangle per line', () => {
            const returnedRectangles = [];
            utils.generateRectanglePerLine(rectangles, returnedRectangles);
            expect(returnedRectangles.length).toBe(2);
        });
    });

    describe('clickIsHighlight', () => {
        it('should return false if target has no firstElementChild', () => {
            const event = new MouseEvent('');
            spyOnProperty(event, 'target', 'get')
                .and.returnValue(document.createElement('div'));
            const isHighlight = utils.clickIsHighlight(event);
            expect(isHighlight).toBeFalsy();
        });
    });

    describe('sortByLinePosition', () => {
        it('should return -1 if first rectandle is leftest', () => {
            const sameLine = utils.sortByLinePosition([
                new Rectangle('myId', 'myId', '', null, null, null, null, null, null, null, 10, 0)], 
                [new Rectangle('myId', 'myId', '', null, null, null, null, null, null, null, 15, 0)]);
            expect(sameLine).toBe(-1);
        });

        it('should return 1 if second rectandle is leftest', () => {
            const sameLine = utils.sortByLinePosition([
                new Rectangle('myId', 'myId', '', null, null, null, null, null, null, null, 15, 0)], 
                [new Rectangle('myId', 'myId', '', null, null, null, null, null, null, null, 10, 0)]);
            expect(sameLine).toBe(1);
        });
    });
});

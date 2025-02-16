import { ViewPort } from '@src/ports/ViewPort';

enum ImageEvent {
    DEFAULT = '',
    SET_SIZE = 'SET_SIZE',
    CLEAR = 'CLEAR',
    LINE_COLOR = 'LINE_COLOR',
    CREATE_CONTEXT = 'CREATE_CONTEXT',
    FILL_COLOR = 'FILL_COLOR',
    LINE_WIDTH = 'LINE_WIDTH',
    BORDER = 'BORDER',
    LINE = 'LINE',
    H_LINE = 'H_LINE',
    V_LINE = 'V_LINE',
    BOX = 'BOX',
    DRAW_CIRCLE = 'DRAW_CIRCLE',
    FONT = 'FONT',
    TEXT = 'TEXT',
    SPRITE = 'SPRITE',
    LOAD_IMG = 'LOAD_IMG'
}

export interface ImageAction {
    type: ImageEvent;
}

interface SetSizeAction extends ImageAction {
    type: ImageEvent.SET_SIZE;
    w: number;
    h: number;
}

interface ClearAction extends ImageAction {
    type: ImageEvent.CLEAR;
}

interface LineColorAction extends ImageAction {
    type: ImageEvent.LINE_COLOR;
    color: string;
}

interface CreateContextAction extends ImageAction {
    type: ImageEvent.CREATE_CONTEXT;
}

interface FillColorAction extends ImageAction {
    type: ImageEvent.FILL_COLOR;
    color: string;
}

interface LineWidthAction extends ImageAction {
    type: ImageEvent.LINE_WIDTH;
    width: number;
}

interface BorderAction extends ImageAction {
    type: ImageEvent.BORDER;
}

interface LineAction extends ImageAction {
    type: ImageEvent.LINE;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}

interface HLineAction extends ImageAction {
    type: ImageEvent.H_LINE;
    x0: number;
    y0: number;
    len: number;
}

interface VLineAction extends ImageAction {
    type: ImageEvent.V_LINE;
    x0: number;
    y0: number;
    len: number;
}

interface BoxAction extends ImageAction {
    type: ImageEvent.BOX;
    x0: number;
    y0: number;
    w: number;
    h: number;
}

interface DrawCircleAction extends ImageAction {
    type: ImageEvent.DRAW_CIRCLE;
    xPos: number;
    yPos: number;
    radius: number;
}

interface FontAction extends ImageAction {
    type: ImageEvent.FONT;
    font: string;
}

interface TextAction extends ImageAction {
    type: ImageEvent.TEXT;
    x: number;
    y: number;
    text: string;
}

interface SpriteAction extends ImageAction {
    type: ImageEvent.SPRITE;
    picId: string;
    srcX: number;
    srcY: number;
    destX: number;
    destY: number;
    w: number;
    h: number;
}

interface LoadImgAction extends ImageAction {
    type: ImageEvent.LOAD_IMG;
    path: string;
    picId: string;
}

export const imageAction = {
    setSize: (w: number, h: number): SetSizeAction => ({
        type: ImageEvent.SET_SIZE,
        w,
        h
    }),
    clear: (): ClearAction => ({
        type: ImageEvent.CLEAR
    }),
    lineColor: (color: string): LineColorAction => ({
        type: ImageEvent.LINE_COLOR,
        color
    }),
    createContext: (): CreateContextAction => ({
        type: ImageEvent.CREATE_CONTEXT
    }),
    fillColor: (color: string): FillColorAction => ({
        type: ImageEvent.FILL_COLOR,
        color
    }),
    lineWidth: (width: number): LineWidthAction => ({
        type: ImageEvent.LINE_WIDTH,
        width
    }),
    border: (): BorderAction => ({
        type: ImageEvent.BORDER
    }),
    line: (x0: number, y0: number, x1: number, y1: number): LineAction => ({
        type: ImageEvent.LINE,
        x0,
        y0,
        x1,
        y1
    }),
    hLine: (x0: number, y0: number, len: number): HLineAction => ({
        type: ImageEvent.H_LINE,
        x0,
        y0,
        len
    }),
    vLine: (x0: number, y0: number, len: number): VLineAction => ({
        type: ImageEvent.V_LINE,
        x0,
        y0,
        len
    }),
    box: (x0: number, y0: number, w: number, h: number): BoxAction => ({
        type: ImageEvent.BOX,
        x0,
        y0,
        w,
        h
    }),
    drawCircle: (xPos: number, yPos: number, radius: number): DrawCircleAction => ({
        type: ImageEvent.DRAW_CIRCLE,
        xPos,
        yPos,
        radius
    }),
    font: (font: string): FontAction => ({
        type: ImageEvent.FONT,
        font
    }),
    text: (x: number, y: number, text: string): TextAction => ({
        type: ImageEvent.TEXT,
        x,
        y,
        text
    }),
    loadImage: (path: string, picId: string): LoadImgAction => ({
        type: ImageEvent.LOAD_IMG,
        path,
        picId
    }),
    sprite: (
        picId: string,
        srcX: number,
        srcY: number,
        destX: number,
        destY: number,
        w: number,
        h: number
    ): SpriteAction => ({
        type: ImageEvent.SPRITE,
        picId,
        srcX,
        srcY,
        destX,
        destY,
        w,
        h
    })
};

export class ImageBuilder {
    private actions: ImageAction[] = [];
    private domTarget: string = '';
    private pictures: Record<string, InstanceType<typeof Image>> = {};

    loadPic = (src, id: string) => {
        return new Promise((resolve) => {
            const pic: InstanceType<typeof Image> = new Image();
            pic.src = src;
            pic.onload = () => {
                this.pictures[id] = pic;
                resolve(true);
            };
        });
    };

    setDomTarget = (domTarget: string) => {
        this.domTarget = domTarget;
        return this;
    };

    setSize = (w: number, h: number) => {
        this.actions.push(imageAction.setSize(w, h));
        return this;
    };

    clear = () => {
        this.actions.push(imageAction.clear());
        return this;
    };

    lineColor = (color: string) => {
        this.actions.push(imageAction.lineColor(color));
        return this;
    };

    createContext = () => {
        this.actions.push(imageAction.createContext());
        return this;
    };

    fillColor = (color: string) => {
        this.actions.push(imageAction.fillColor(color));
        return this;
    };

    lineWidth = (width: number) => {
        this.actions.push(imageAction.lineWidth(width));
        return this;
    };

    border = () => {
        this.actions.push(imageAction.border());
        return this;
    };

    line = (x0: number, y0: number, x1: number, y1: number) => {
        this.actions.push(imageAction.line(x0, y0, x1, y1));
        return this;
    };

    hLine = (x0: number, y0: number, len: number) => {
        this.actions.push(imageAction.hLine(x0, y0, len));
        return this;
    };

    vLine = (x0: number, y0: number, len: number) => {
        this.actions.push(imageAction.vLine(x0, y0, len));
        return this;
    };

    box = (x0: number, y0: number, w: number, h: number) => {
        this.actions.push(imageAction.box(x0, y0, w, h));
        return this;
    };

    drawCircle = (xPos: number, yPos: number, radius: number) => {
        this.actions.push(imageAction.drawCircle(xPos, yPos, radius));
        return this;
    };

    addActions = (actions: ImageAction[]) => {
        actions.forEach((action) => {
            this.actions.push(action);
        });
        return this;
    };

    font = (font: string) => {
        this.actions.push(imageAction.font(font));
        return this;
    };

    text = (x: number, y: number, text: string) => {
        this.actions.push(imageAction.text(x, y, text));
        return this;
    };

    drawSprite = (
        picId: string,
        srcX: number,
        srcY: number,
        destX: number,
        destY: number,
        w: number,
        h: number
    ) => {
        this.actions.push(imageAction.sprite(picId, srcX, srcY, destX, destY, w, h));
        return this;
    };

    buildImage = (): Promise<ViewPort> => {
        let viewPort = ViewPort.create(this.domTarget);
        const loadImages = this.actions.filter((action) => action.type === ImageEvent.LOAD_IMG);
        const imagesToLoad = loadImages.filter((action: LoadImgAction) => {
            return typeof this.pictures[action.picId] === 'undefined';
        });
        const noLoadImages = this.actions.filter((action) => action.type !== ImageEvent.LOAD_IMG);
        if (imagesToLoad.length > 0) {
            const loadPromises = imagesToLoad.map((action: LoadImgAction) =>
                this.loadPic(action.path, action.picId)
            );
            Promise.all(loadPromises)
                .then(() => {
                    noLoadImages.forEach((action) => {
                        viewPort = this.doAction(viewPort, action);
                    });
                    Promise.resolve(viewPort);
                })
                .catch((err) => {
                    console.log('error load images', err);
                    return Promise.resolve(viewPort);
                });
        } else {
            noLoadImages.forEach((action) => {
                viewPort = this.doAction(viewPort, action);
            });
            return Promise.resolve(viewPort);
        }
    };

    printActions = () => {
        console.log('renderActions=', JSON.stringify(this.actions));
        return this;
    };

    doAction = (viewPort: ViewPort, action: ImageAction) => {
        switch (action.type) {
            case ImageEvent.SET_SIZE:
                return viewPort.setSize((action as SetSizeAction).w, (action as SetSizeAction).h);

            case ImageEvent.CLEAR:
                return viewPort.clear();

            case ImageEvent.LINE_COLOR:
                return viewPort.lineColor((action as LineColorAction).color);

            case ImageEvent.CREATE_CONTEXT:
                return viewPort.createContext();

            case ImageEvent.FILL_COLOR:
                return viewPort.fillColor((action as FillColorAction).color);

            case ImageEvent.LINE_WIDTH:
                return viewPort.lineWidth((action as LineWidthAction).width);

            case ImageEvent.BORDER:
                return viewPort.border();

            case ImageEvent.LINE:
                return viewPort.line(
                    (action as LineAction).x0,
                    (action as LineAction).y0,
                    (action as LineAction).x1,
                    (action as LineAction).y1
                );

            case ImageEvent.H_LINE:
                return viewPort.hLine(
                    (action as HLineAction).x0,
                    (action as HLineAction).y0,
                    (action as HLineAction).len
                );

            case ImageEvent.V_LINE:
                return viewPort.vLine(
                    (action as VLineAction).x0,
                    (action as VLineAction).y0,
                    (action as VLineAction).len
                );

            case ImageEvent.BOX:
                return viewPort.box(
                    (action as BoxAction).x0,
                    (action as BoxAction).y0,
                    (action as BoxAction).w,
                    (action as BoxAction).h
                );

            case ImageEvent.DRAW_CIRCLE:
                return viewPort.drawCircle(
                    (action as DrawCircleAction).xPos,
                    (action as DrawCircleAction).yPos,
                    (action as DrawCircleAction).radius
                );

            case ImageEvent.FONT:
                return viewPort.font((action as FontAction).font);

            case ImageEvent.TEXT:
                return viewPort.text(
                    (action as TextAction).x,
                    (action as TextAction).y,
                    (action as TextAction).text
                );

            case ImageEvent.SPRITE: {
                const pic = this.pictures[(action as SpriteAction).picId];
                if (pic) {
                    return viewPort.sprite(
                        pic,
                        (action as SpriteAction).srcX,
                        (action as SpriteAction).srcY,
                        (action as SpriteAction).destX,
                        (action as SpriteAction).destY,
                        (action as SpriteAction).w,
                        (action as SpriteAction).h
                    );
                } else {
                    const picId = (action as SpriteAction).picId;
                    console.error(`pic {${picId}} is not found`, action);
                    return viewPort;
                }
            }

            default:
                console.error('ImageBuilder.doAction(): unknown action', action.type);
        }
    };

    static create = (): ImageBuilder => {
        return new ImageBuilder();
    };
}

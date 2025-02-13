import { IKeyboard } from './Keyboard.types';

interface MainController {
    onKeyEvent: () => void;
}

export class Keyboard implements IKeyboard {
    keys: number;
    isUpPressed: boolean = false;
    isDownPressed: boolean = false;
    isLeftPressed: boolean = false;
    isRightPressed: boolean = false;

    constructor(private main: MainController) {}

    listen() {
        document.addEventListener('keydown', this.onKeydown);
        document.addEventListener('keyup', this.onKeyup);
    }

    unlisten() {
        document.removeEventListener('keydown', this.onKeydown);
        document.removeEventListener('keyup', this.onKeyup);
    }

    onKeydown = (event: KeyboardEvent) => {
        if (event.code === 'KeyW' && !this.isUpPressed) {
            this.isUpPressed = true;
            this.main.onKeyEvent();
        }
        if (event.code === 'KeyS' && !this.isDownPressed) {
            this.isDownPressed = true;
            this.main.onKeyEvent();
        }
        if (event.code === 'KeyA' && !this.isLeftPressed) {
            this.isLeftPressed = true;
            this.main.onKeyEvent();
        }
        if (event.code === 'KeyD' && !this.isRightPressed) {
            this.isRightPressed = true;
            this.main.onKeyEvent();
        }
    };

    onKeyup = (event: KeyboardEvent) => {
        if (event.code === 'KeyW') {
            this.isUpPressed = false;
            this.main.onKeyEvent();
        }
        if (event.code === 'KeyS') {
            this.isDownPressed = false;
            this.main.onKeyEvent();
        }
        if (event.code === 'KeyA') {
            this.isLeftPressed = false;
            this.main.onKeyEvent();
        }
        if (event.code === 'KeyD') {
            this.isRightPressed = false;
            this.main.onKeyEvent();
        }
    };
}

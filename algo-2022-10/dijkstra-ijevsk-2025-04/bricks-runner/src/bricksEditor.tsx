import { BricksEditorController } from './bricksEditor/BricksEditorController';

console.log('bricksEditor!');

const target = 'game3';
if (document.getElementById(target)) {
    new BricksEditorController(target, 720, 320).go();
} else {
    console.log('bricksEditor: not found render target=', target);
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const styles: { [className: string]: string };
    export default styles;
}

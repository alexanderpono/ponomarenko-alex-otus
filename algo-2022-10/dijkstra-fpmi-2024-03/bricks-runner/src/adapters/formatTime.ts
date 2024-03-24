export const formatTime = (sec: number): string => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    const zero = seconds < 10 ? '0' : '';
    return `${minutes}:${zero}${seconds}`;
};

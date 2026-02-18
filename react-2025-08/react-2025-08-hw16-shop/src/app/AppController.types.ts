export interface IAppController {
    onAppMount: () => void;
    onThemeChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
}

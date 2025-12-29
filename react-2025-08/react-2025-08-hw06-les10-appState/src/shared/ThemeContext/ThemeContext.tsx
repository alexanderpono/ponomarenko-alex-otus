import React, { createContext, FC, useState } from 'react';
import { Theme } from 'src/constants/Theme';

export const ThemeContext = createContext<{
    theme: string;
    setTheme: (th: string) => void;
}>({ theme: Theme.GREY, setTheme: () => null });

export const ThemeProvider: FC<{ children: React.ReactElement }> = ({ children }) => {
    const [theme, setTheme] = useState<string>(Theme.GREY);

    const values = {
        theme,
        setTheme
    };
    return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};

import { useEffect, useState } from 'react';

export const SwitchTheme = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            console.log("not");
            window.localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            console.log("stupid");
            window.localStorage.setItem('theme', 'light')
            setTheme('light')
        }
    };

    useEffect(() => {
        console.log("smgggg")
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
    }, []);

    return [theme, toggleTheme]
};
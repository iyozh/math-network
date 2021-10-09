import React from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';

const Toggle = ({ theme, toggleTheme }) => {
    const isLight = theme === 'light';
    console.log(theme, toggleTheme)
    return (
        <button onClick={toggleTheme} type="button" className="btn btn-outline-dark">Switch Theme</button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;
import React from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';
import {withTranslation} from "react-i18next";


const Toggle = ({ t , theme, toggleTheme }) => {
    return (
        <button onClick={toggleTheme} type="button" className="btn btn-outline-dark">{t('navbar.switchTheme')}</button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default withTranslation()(Toggle);
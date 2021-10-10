import PropTypes from "prop-types";
import React, { Component } from "react";
import {withTranslation} from "react-i18next";
import withTheme from "./hooksUtils/themeHOC";

class ProfileInfo extends Component {

    static propTypes = {
        authenticated: PropTypes.bool.isRequired,
    };

    render() {
        const {user} = this.props;
        const { t } = this.props;
        if (!user) {
            return (<div>You aren't authenticated</div>)
        }
        else {
            return (
                <section className="section about-section gray-bg" id="about">
                    <div className="container">
                        <div className="row align-items-center flex-row-reverse">
                            <div className="col-lg-6">
                                <div className="about-text go-to">
                                    <h3 className="dark-color">
                                        { user.name }
                                    </h3>
                                    <div className="row about-list">
                                        <div className="col-md-6">
                                            <div className="media">
                                                <label>{t('profile.started')}</label>
                                                <p>
                                                    { new Date(Date.parse(user.createdAt)).toLocaleDateString("nl",{year:"numeric",month:"2-digit", day:"2-digit"}) }
                                                </p>
                                            </div>
                                            <div className="media">
                                                <label>{t('profile.loginVia')}</label>
                                                <p>
                                                    { user.registration_type }
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-avatar">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt=""></img>
                                </div>
                            </div>
                        </div>
                        <div className="counter">
                            <div className="row">
                                <div className="col-6 col-lg-3">
                                    <div className="count-data text-center">
                                        <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                                        <p className="m-0px font-w-600">{t('profile.completed')}</p>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3">
                                    <div className="count-data text-center">
                                        <h6 className="count h2" data-to="150" data-speed="150">{ user.Tasks?.length  }</h6>
                                        <p className="m-0px font-w-600">{t('profile.created')}</p>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3">
                                    <div className="count-data text-center">
                                        <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                                        <p className="m-0px font-w-600">{t('profile.rating')}</p>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3">
                                    <div className="count-data text-center">
                                        <h6 className="count h2" data-to="190" data-speed="190">190</h6>
                                        <p className="m-0px font-w-600">{t('profile.likes')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }

}

export default withTranslation()(withTheme(ProfileInfo));
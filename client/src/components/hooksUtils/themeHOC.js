import {SwitchTheme} from "../themeUtils/SwitchTheme";

export default function withTheme(Component) {
    return function WrappedComponent(props) {
        const switchTheme = SwitchTheme();
        return <Component {...props} switchTheme={switchTheme} />;
    }
}
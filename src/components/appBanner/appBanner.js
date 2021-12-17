import avengers from '../../resources/img/avengers.svg';
import avengersLogo from '../../resources/img/avengers_logo.svg';
import './appBanner.scss';

const AppBanner = () => {
    return (
        <div className="appbanner__header">
                <img src={avengers} alt="avengers" />
                <div className="appbanner__title">
                    New comics every week! <br /> Stay tuned!
                </div>
                <img className="appbanner__header-avengersLogo" src={avengersLogo} alt="avengersLogo" />
        </div>
    )
}

export default AppBanner;
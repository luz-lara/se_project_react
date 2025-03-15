
import logo from '../images/Logo.svg'
import avatar from '../images/avatar.svg'

function Header(props) {
    return (

        <header className="header">
            <div className="header__logo-and-location-container">
                <img src={logo} alt="wtwr logo" className="header__logo" />
                <p className="header__date-and-location">{props.date}</p>
            </div>
            <div className="header__user-container">
                <button className="header__add-clothes-bttn" onClick={props.openmodal}>+ Add clothes</button>
                <p className="header__username">Terrence Tegene</p>
                <img src={avatar} alt='user avatar' className='header__avatar' />
            </div>
        </header>


    )
}
export default Header;
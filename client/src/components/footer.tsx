import Logo from '../assets/hs-emp-logo-data.png';
export default function Footer(){
    return(
        <div className='footer'>
            <img className='logo' src={Logo} alt={'logo'}></img>
            <p>© 2025 ONEHEALTH All rights reserved.</p>
        </div>
    )
}
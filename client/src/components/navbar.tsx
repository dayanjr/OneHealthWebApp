import { Link } from 'react-router-dom';
import Logo from '../assets/hs-emp-logo-data.png';
export default function Navbar(){

    function activeLine(e: any){
        const links = document.querySelectorAll('span');
        links.forEach((link) => {
            link.classList.remove('active');
        })
        e.target.classList.add('active');
    }

    // function hoverLine(e: any){
    //     const links = document.querySelectorAll('a');
    //     links.forEach((link) => {
    //         link.classList.remove('hover');
    //         link.classList.add('other');
    //     })
    //     e.target.classList.remove('other');
    //     e.target.classList.add('hover');
    // }

    // function removeHover(e: any){
    //     const links = document.querySelectorAll('a');
    //     links.forEach((link) => {
    //         link.classList.remove('hover');
    //         link.classList.remove('other');
    //     })
    //     e.target.classList.remove('hover');
            
    // }

    return(
    <div className='nav-container'>
        <img className='logo' src={Logo} alt={'logo'}></img>
        <Link to='/'><span onClick={(e)=> activeLine(e)}>Home</span></Link>
        <Link to='/rewards'><span onClick={(e)=> activeLine(e)}>Prizes </span></Link>
        <Link to='/learn'><span onClick={(e)=> activeLine(e)}>Learn</span></Link>
        <Link to='/medication'><span onClick={(e)=> activeLine(e)}>Medication</span></Link>
        <Link to='/login'><span onClick={(e)=> activeLine(e)}>Login</span></Link>
        <Link to='/admin'><span onClick={(e)=> activeLine(e)}>Accounts</span></Link>
        <Link to='/adminrewards'><span onClick={(e)=> activeLine(e)}>Rewards</span></Link>
        <Link to='/register'><span onClick={(e)=> activeLine(e)}>Register</span></Link>
    </div>
    )
}

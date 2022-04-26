import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchIcon from '@mui/icons-material/Search';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

const Header = () => {
    const [username, setUsername] = useState(0);
    // See https://en.reactjs.org/docs/hooks-effect.html
    useEffect(() => {

        // Run code on client-side only : ensure document is here
        if (typeof document !== undefined) {

            // load JS bootstrap dependency
            require('bootstrap/dist/js/bootstrap')

        }

        let storage = window.localStorage;
        setUsername(storage.getItem("username"));

        // Run useEffect only once
        // Read https://css-tricks.com/run-useeffect-only-once/
    }, [])

    const router = useRouter();
    const logout = () => {
        let storage = window.localStorage;
        storage.setItem("username", "");
        setUsername(storage.getItem("username"));
        alert("Bye bye!")
    }

    return (
        <div className='test'>
            <header className="header">
                <div className="container-fluid">
                    <div className="header__content">
                        <div className="header__logo">
                            <Link href="/">
                                <a>
                                    <img src="assets/images/logo/logo_clean_small.png" alt="logo"></img>
                                </a>
                            </Link>
                        </div>

                        <div className="header__menu ms-auto">
                            <ul className="header__nav mb-0">
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false" data-bs-offset="0,10"><SearchIcon />Search </a>

                                    <ul className="dropdown-menu header__nav-menu">
                                        <li>
                                            <Link href="/indextwo">
                                                <a className={router.pathname == "/indextwo" ? "drop-down-item active" : "drop-down-item"}>Find Songs By Song Info</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/map">
                                                <a className={router.pathname == "/map" ? "drop-down-item active" : "drop-down-item"}>Find Songs By Country</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/indexthree">
                                                <a className={router.pathname == "/indexthree" ? "drop-down-item active" : "drop-down-item"}>Find Songs By Emotional Tendency</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="header__nav-item">
                                    <Link href="/UserRec">
                                        <a className="header__nav-link" href="/UserRec" role="button" 
                                            aria-haspopup="true" aria-expanded="false" data-bs-offset="0,10"><SubscriptionsIcon />User Playlist</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="header__actions">
                            <div className="header__action header__action--search">
                                <button className="header__action-btn" type="button"><i className="icofont-search-1"></i></button>
                            </div>

                            <div className="header__action header__action--profile">
                                <div className="dropdown">
                                    <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false" data-bs-offset="-100,10">
                                        <span><i className="icofont-user"></i></span> <span className="d-none d-md-inline">Hello! {username}</span>
                                    </a>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link href="/signup">
                                                <a className={router.pathname == "/signup" ? "dropdown-item active" : "dropdown-item"}><span className="me-1"><i
                                                    className="icofont-space-shuttle"></i></span>
                                                    Sign
                                                    Up</a>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href="/signin">
                                                <a className={router.pathname == "/signin" ? "dropdown-item active" : "dropdown-item"}><span className="me-1"><i
                                                    className="icofont-login"></i></span>
                                                    Sign
                                                    In</a>
                                            </Link>
                                        </li>

                                        <li>
                                            <hr className="dropdown-divider"></hr>
                                        </li>

                                        <li>
                                            <Link href="/">
                                                <a className="dropdown-item" href="#" onClick={logout}> Sign
                                                    Out <span className="ms-1"><i className="icofont-logout"></i></span></a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;
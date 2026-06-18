import { useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router";
import wallet from "@assets/svg/wallet.svg";
import logo from "@assets/svg/logo.svg";
import avatar from "@assets/svg/avatar.svg";
import cart from "@assets/svg/cart.svg";
import info from "@assets/svg/info.svg";
import inventory from "@assets/svg/inventory.svg";

import { PopupProfile } from "@/UI/PopupProfile";

import { useInventoryItems } from "@/hooks/useInventoryItems";

import styles from "./Header.module.scss";
import { ShieldUser, User } from "lucide-react";

import { observer } from "mobx-react-lite";
import { useProfile } from "@/hooks/useProfile";
import { DropdownMenu } from "@/UI/DropdownMenu";

export const Header = observer(() => {
    const { isAuthenticated, user, isAdmin, isLoading, isResolved } =
        useProfile();

    const { purchasedItems } = useInventoryItems();

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        console.log("Выход");
        togglePopup();
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.leftBlock}>
                    <Link to="/">
                        <div className={styles.logoContainer}>
                            <div className={styles.logo}>
                                <img src={logo} alt="logo" />
                            </div>

                            <div className={styles.brandInfo}>
                                <h1>LorryWorld</h1>
                                <p>Магазин Murder Mystery 2</p>
                            </div>
                        </div>
                    </Link>

                    <nav className={styles.mainNav}>
                        <NavLink
                            className={({ isActive }) =>
                                `${styles.navButton} ${isActive ? styles.navButtonActive : ""}`
                            }
                            to="/"
                        >
                            <img src={cart} alt="" />
                            МАГАЗИН
                        </NavLink>
                        {isAuthenticated ? (
                            <NavLink
                                className={({ isActive }) =>
                                    `${styles.navButton} ${
                                        isActive ? styles.navButtonActive : ""
                                    }`
                                }
                                to="/inventory"
                                data-count={
                                    purchasedItems.length > 0
                                        ? purchasedItems.length
                                        : undefined
                                }
                            >
                                <img src={inventory} alt="" />
                                ИНВЕНТАРЬ
                            </NavLink>
                        ) : (
                            <NavLink
                                className={({ isActive }) =>
                                    `${styles.navButton} ${
                                        isActive ? styles.navButtonActive : ""
                                    }`
                                }
                                to="/login"
                                state={{
                                    backgroundLocation:
                                        location.state?.backgroundLocation ||
                                        location,
                                }}
                            >
                                <img src={inventory} alt="" />
                                ИНВЕНТАРЬ
                            </NavLink>
                        )}
                        <NavLink
                            className={({ isActive }) =>
                                `${styles.navButton} ${isActive ? styles.navButtonActive : ""}`
                            }
                            to="/help"
                        >
                            <img src={info} alt="" />
                            ПОМОЩЬ
                        </NavLink>
                        {/* {isAdmin && (
              <NavLink
                className={({ isActive }) =>
                  `${styles.navButton} ${
                    isActive ? styles.navButtonActive : ""
                  }`
                }
                to="/admin"
              >
                <ShieldUser />
                АДМИНКА
              </NavLink>
            )} */}
                        <DropdownMenu />
                    </nav>
                </div>

                {!isLoading && isResolved ? (
                    !isAuthenticated ? (
                        <Link
                            to="/login"
                            state={{ backgroundLocation: location }}
                            className={styles.loginButton}
                        >
                            <User /> <span> ВОЙТИ</span>
                        </Link>
                    ) : (
                        <div className={styles.userControls}>
                            <div className={styles.balance}>
                                <span className={styles.balanceIcon}>
                                    <img src={wallet} alt="" width={30} />
                                </span>
                                <span className={styles.balanceAmount}>
                                    {user?.balance} ₽
                                </span>
                                <Link
                                    className={styles.addFunds}
                                    to="/topup"
                                    state={{
                                        backgroundLocation:
                                            location.state
                                                ?.backgroundLocation ||
                                            location,
                                    }}
                                >
                                    +
                                </Link>
                            </div>
                            <div className={styles.userProfile}>
                                <button
                                    className={styles.avatarButton}
                                    onClick={togglePopup}
                                >
                                    <img src={avatar} alt="avatar" />
                                </button>

                                {isOpen && (
                                    <PopupProfile
                                        onClose={togglePopup}
                                        onLogout={handleLogout}
                                    />
                                )}
                            </div>
                        </div>
                    )
                ) : (
                    "Загрузка"
                )}
            </div>
        </header>
    );
});

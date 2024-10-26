import React from "react";
import classes from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => (
    <header className={classes.Toolbar}>
        {/* <div onClick={props.openMenu}>Menu</div> */}
        <DrawerToggle clicked={props.openMenu}></DrawerToggle>
        <div className={classes.Logo}>
            {/* <Logo height='80%' /> */}
            <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
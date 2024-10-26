import React from "react";
import classes from './SideDrawer.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={[classes.SideDrawer, props.open?classes.Open: classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    {/* <Logo height='11%' /> */}
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;
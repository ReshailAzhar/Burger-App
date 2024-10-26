import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from './Layout.module.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closedSideDrawer = () => {
        this.setState({ showSideDrawer: false });
    }

    openSideDrawer = () => {
        this.setState({ showSideDrawer: true });
    }

    // toggleSideDrawer = () => {(prevState)=>{
    //     this.setState({ showSideDrawer: !this.state.showSideDrawer })};
    // }
    toggleSideDrawer = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar openMenu={this.toggleSideDrawer} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.toggleSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;
import React, { useEffect, Component } from "react";
import classes from './Modal.module.css';
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {



    // useEffect(()=>{
    //     console.log('Modal render');
    // })

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    // componentDidUpdate() {
    //     console.log('Modal did update');
    // }

    render() {

        // for alternative method
        // let classList = [classes.Modal];
        // // props.show ? classList.push(classes.ShowModal) : null;
        // if(props.show)
        // {
        //     classList.push(classes.ShowModal)
        // }
        // console.log(classList);
        return (

            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal} id="Modal" style={{
                    transform: this.props.show ? 'translateY(0%)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>

                {/* Alternative Method of the above */}
                {/* <div className={classList.join(' ')} id="Modal" >
                    {props.children}
                </div> */}
            </Auxiliary>
        )
    }

}

export default Modal;
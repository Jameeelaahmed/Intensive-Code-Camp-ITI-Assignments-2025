import React, { PureComponent } from 'react'
import classes from './Header.module.css'
class Header extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className={classes.header}>
                Your Movie App
            </div>
        )
    }
}

export default Header;
import { PureComponent } from 'react'
import classes from './Footer.module.css'
class Footer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className={classes.footer}>
                <p>© {new Date().getFullYear()} Jameela. All rights reserved.</p>
            </div>
        )
    }
}

export default Footer
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { inject, observer } from 'mobx-react';

@inject('session') @observer
class Layout extends React.Component {
    constructor(props) {
        super(props);
    }


    componentWillMount () {
        this.props.session.signIn();
    }

    render() {
        return (
            <div id="Layout">
                <Navbar />
                <div className="main-container">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }

}


export default Layout;

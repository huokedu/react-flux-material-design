'use strict';

import React from 'react';

// App Bar
import AppBar from 'material-ui/lib/app-bar';

// Drugs Store
import drugsStore from '../../components/drugs/Drugs-Store';

// Badge
import Badge from './Header-Badge.jsx';

// Application Bar Configuration
const appbarStyle = {
    boxShadow: '0'
};

class Header extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            drugsPending: drugsStore.getDrugsPending()
        }
    }

    componentDidMount () {
        drugsStore.on('CHANGE', this._onChange.bind(this));
    }

    componentWillUnmount () {
        drugsStore.removeListener('CHANGE', this._onChange.bind(this));
    }

    _onChange () {
        this.setState({drugsPending: drugsStore.getDrugsPending()});
    }

    render () {
        return (
                <div style={{position: 'fixed', top: 0, background: '#00BCD4', padding: 5, zIndex: 1500, width: '100%'}}>
                    <AppBar
                    title="My Capsules"
                    style={appbarStyle}
                    showMenuIconButton={false}
                    />

                    <Badge drugsPending={this.state.drugsPending} />

                </div>
            );
    }
};

export default Header;
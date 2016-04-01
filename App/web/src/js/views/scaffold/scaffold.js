'use strict';

import React from 'react';

// Scaffold Store
import scaffoldStores from './Scaffold-Store';

// Flux Dispatcher
import fluxDispatcher from '../../components/drugs/Drugs-Dispatcher';

// App Bar
import AppBar from 'material-ui/lib/app-bar';

// Toolbar
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';

// Canvas
import AppCanvas from 'material-ui/lib/app-canvas';

// Clearfix
import Clearfix from 'material-ui/lib/clearfix';

// Floating Action Button
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

const floatingActionButtonStyle = {
    position: 'fixed',
    top: 100,
    left: 20
}

import ListDrugs from '../../components/drugs/Drugs';

// Application Bar Configuration
const appbarStyle = {
    position: 'fixed',
    height: 150
};

const clearfixStyle = {
  padding: '80px 24px'
};

// Dialog
import Dialog from '../../components/material-ui/dialog/dialog';

class Scaffold extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            dialogDrugOpen: false,
            dialogData: {}
        };
    }

    componentDidMount () {
        scaffoldStores.on('OPEN_DIALOG', (data) => {
            this.setState({
                dialogDrugOpen: true,
                dialogData: data
            });
        });
    }

    openDrugDialog () {
        this.setState({
            dialogDrugOpen: true,
            dialogData: {
                'name': '',
                'howoften': '',
                'nextTakeHour': new Date()
            }
        });
    }

    render () {
		return (
			<div>

                <Dialog
                title="My new drug:"
                confirmationLabel="Save"
                open={this.state.dialogDrugOpen}
                drug={this.state.dialogData}
                />

                <div style={{position: 'fixed', top: 130, left: 10, zIndex: 1500}}>
                    <FloatingActionButton
                    mini={true}
                    onTouchTap={this.openDrugDialog.bind(this)}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>

                <AppBar
                title="My Capsules"
                style={appbarStyle}
                />

                <Clearfix
                style={clearfixStyle}
                >
                    <ListDrugs />
                </Clearfix>
            </div>
		);
	}
}

export default Scaffold;

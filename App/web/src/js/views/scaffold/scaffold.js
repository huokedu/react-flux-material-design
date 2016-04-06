'use strict';

import React from 'react';

// Scaffold Store
import scaffoldStores from './Scaffold-Store';

// Flux Dispatcher
import fluxDispatcher from '../../components/drugs/Drugs-Dispatcher';

// Component: Header
import Header from '../../components/header/Header.jsx';

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

// Dialog
import Dialog from '../../components/material-ui/dialog/dialog.jsx';

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
                'nextTakeHour': null
            }
        });
    }

    render () {
		return (
			<div>

                {/* Dialog */}
                <Dialog
                title="My new drug:"
                confirmationLabel="Save"
                open={this.state.dialogDrugOpen}
                drug={this.state.dialogData}
                />

                {/* Floating Button */}
                <div style={{position: 'fixed', bottom: 20, right: 20, zIndex: 1500}}>
                    <FloatingActionButton
                    mini={true}
                    onTouchTap={this.openDrugDialog.bind(this)}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>

                {/* Header */}
                <Header />

                {/* Drugs List */}
                <Clearfix style={{position: 'relative', top: 50}}>
                    <ListDrugs />
                </Clearfix>
            </div>
		);
	}
}

export default Scaffold;

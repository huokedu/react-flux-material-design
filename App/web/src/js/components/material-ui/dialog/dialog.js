'use strict';

import React from 'react';

// Material UI
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

// Drug Store
import drugsStore from '../../drugs/Drugs-Store';

export default class DialogClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          open: props.open
        };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
           open: nextProps.open
        });
    }

    saveDrug () {
        let drug = {
            id: this.props.drug.id || null,
            name: this.refs.drugName.getValue(),
            howoften: this.refs.drugHours.getValue(),
            nextTakeHour: this.refs.drugsStartHour.getTime().toString()
        };

        if (!drug.id) {
          drugsStore.createDrug(drug);
        } else {
          drugsStore.updateDrug(drug);
        }

        this.setState({open: false});
    }

    handleOpen () {
        this.setState({open: true});
    }

    handleClose () {
        this.setState({open: false});
    }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label={this.props.confirmationLabel}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.saveDrug.bind(this)}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
            {/* Drug's name */}
            <TextField
            hintText="Name"
            floatingLabelText="Name"
            ref="drugName"
            defaultValue={this.props.drug.name}
            />

            {/* Drug's hours */}
            <TextField
            hintText="How often"
            floatingLabelText="Hours"
            ref="drugHours"
            type="number"
            min="1"
            max="23"
            step="1"
            defaultValue={this.props.drug.howoften}
            />

            {/* Next Take hour */}
            <TimePicker
            hintText="12hr Format"
            pedantic={true}
            defaultTime={new Date(this.props.drug.nextTakeHour)}
            ref="drugsStartHour"
            />

        </Dialog>
      </div>
    );
  }
}

'use strict';

import React from 'react';

// Material UI
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

// Drug Store
import drugsStore from '../../drugs/Drugs-Store.jsx';

// Private Properties and Methods
const _nextTakeHour = (nextTakeHour) => {
    let timePickerComponent = null;
    if (!nextTakeHour) {
        timePickerComponent = <TimePicker
            autoOk={true}
            hintText="At what time?"
            pedantic={true}
            ref="drugsStartHour"
            style={{width: '100%'}}
            />;
    } else {
        timePickerComponent = <TimePicker
            autoOk={true}
            hintText="At what time?"
            pedantic={true}
            defaultTime={new Date(nextTakeHour)}
            ref="drugsStartHour"
            style={{width: '100%'}}
            />;
    }

    return timePickerComponent;
}

const _nextTakeDate = (date) => {
    let datePickerComponent = null;
    if (!date) {
        datePickerComponent = <DatePicker
        hintText="When do you want to start taking the medicine?"
        autoOk={true}
        formatDate={_datePickerFormat}
        ref="drugsStartDate"
        />;
    } else {
        datePickerComponent = <DatePicker
        hintText="When do you want to start taking the medicine?"
        autoOk={true}
        formatDate={_datePickerFormat}
        defaultDate={new Date(date)}
        ref="drugsStartDate"
        />;
    }
    return datePickerComponent;
};

const _datePickerFormat = (date) => {
    date = Moment(date);
    date = date.format('dddd, MMMM Do YYYY')
    return date;
};

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
            nextTakeHour: this.refs.drugsStartHour.getTime().toString(),
            nextTakeDate: this.refs.drugsStartDate.getDate().toString()
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

    const TimePickerComponent = _nextTakeHour(this.props.drug.nextTakeHour);
    const DatePickerComponent = _nextTakeDate(this.props.drug.nextTakeDate);

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
            ref="drugName"
            defaultValue={this.props.drug.name}
            style={{fontSize: 34, width: '100%'}}
            />

            <br />
            <br />

            {/* Drug's hours */}
            <TextField
            hintText="How often this needs to be taken? (Hours)"
            ref="drugHours"
            type="number"
            min="1"
            max="23"
            step="1"
            defaultValue={this.props.drug.howoften}
            style={{fontSize: 17}}
            />

            <br />
            <br />

            {/* Next Take date */}
            {DatePickerComponent}

            {/* Next Take hour */}
            {TimePickerComponent}

        </Dialog>
      </div>
    );
  }
}
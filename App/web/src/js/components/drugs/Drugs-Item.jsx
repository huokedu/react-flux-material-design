import React from 'react'

import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import RightIconMenu from './Drugs-Item-Rightmenu';
import FontIcon from 'material-ui/lib/font-icon';
import Avatar from 'material-ui/lib/avatar';

// Private Properties and Methods
const _verifyHour = (drug) => {
    const nextTakeHour = new Date(drug.nextTakeHour);
    const nextTakeDate = new Date(drug.nextTakeDate);
    let fullNextTakeDate = new Date(nextTakeDate.toDateString() + ' ' + nextTakeHour.getHours() + ':' + nextTakeHour.getMinutes());
    fullNextTakeDate = fullNextTakeDate.getTime();

    const currentHour = new Date();
    const milisecondsLeft = fullNextTakeDate - currentHour;

    const minutesLeft = Math.round((milisecondsLeft / 1000) / 60);

    let enablingDrug = true;
    if (15 >= minutesLeft) {
        enablingDrug = false;
    }

    fullNextTakeDate = null;

    return enablingDrug;
};

const _dateFormat = (nextTakeDate) => {
    let nextDate = new Date(nextTakeDate);
    nextDate = Moment(new Date(nextDate)).format('dddd, MMM Do YYYY')

    return nextDate;
};

const _hourFormat = (nextTakeHour) => {
    let nextHour = new Date(nextTakeHour);
    nextHour = Moment(new Date(nextHour)).format('h:mm a')

    return nextHour;
};

class DrugItem extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {

        const enablingDrug = _verifyHour(this.props.drug);
        const dateFormat = _dateFormat(this.props.drug.nextTakeDate);
        const hourFormat = _hourFormat(this.props.drug.nextTakeHour);

        return (
            <div>
                <ListItem
                leftAvatar={
                    <Avatar
                    icon={
                        <FontIcon className="material-icons">
                            {enablingDrug ? 'local_drink' : 'local_drink'}
                        </FontIcon>
                        }
                    color={enablingDrug ? Colors.grey400 : Colors.blue900}
                    backgroundColor={Colors.white}
                    />
                }
                primaryText={
                    <div>
                        <span>{dateFormat}</span>
                        <br />
                        <span>{hourFormat}</span>
                        <span style={{color: Colors.yellow900, fontSize: 10}}> ({this.props.drug.howoften} Hours)</span>
                        <br />
                        <span style={{color: Colors.blue500}}>{this.props.drug.name}</span>
                    </div>
                }
                rightIconButton={<div><RightIconMenu drug={this.props.drug} enablingDrug={enablingDrug}/></div>}
                />
                <Divider inset={true} />
            </div>
        );
    }
}

export default DrugItem;
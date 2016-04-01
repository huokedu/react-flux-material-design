import React from 'react'

import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import RightIconMenu from './Drugs-Item-Rightmenu';
import FontIcon from 'material-ui/lib/font-icon';
import Avatar from 'material-ui/lib/avatar';

// Private Properties and Methods
const _verifyHour = (nextTakeHour) => {
    nextTakeHour = new Date(nextTakeHour);
    const currentHour = new Date();
    const milisecondsLeft = nextTakeHour - currentHour;

    const minutesLeft = Math.round((milisecondsLeft / 1000) / 60);

    let enablingDrug = true;
    if (15 >= minutesLeft) {
        enablingDrug = false;
    }

    return enablingDrug;
};

const _dateFormat = (date) => {
    const dateDifference = new Date(date) - Date.now();
    let dateFormat = '';
    if (0 < dateDifference) {
        dateFormat = Moment().add(dateDifference, 'ms').calendar()
    } else {
        dateFormat = Moment().subtract(Math.abs(dateDifference), 'ms').calendar()
    }

    return dateFormat;
};

class DrugItem extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {

        const enablingDrug = _verifyHour(this.props.drug.nextTakeHour);
        const dateFormat = _dateFormat(this.props.drug.nextTakeHour);

        return (
            <div>
                <ListItem
                leftAvatar={
                    <Avatar
                    icon={
                        <FontIcon className="material-icons">
                            {enablingDrug ? 'notifications_none' : 'notifications_active'}
                        </FontIcon>
                        }
                    color={Colors.white}
                    backgroundColor={enablingDrug ? Colors.gray400 : Colors.blue900 }
                    />
                }
                primaryText={
                    <div>
                        <span>{dateFormat}</span>
                        <br />
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
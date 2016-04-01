import React from 'react';

// Drugs Store
import drugsStore from '../../components/drugs/Drugs-Store';

// Flux Dispatcher
import fluxDispatcher from '../../dispatcher/FluxDispatcher';

import Colors from 'material-ui/lib/styles/colors';

// Right Icon Menu
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/lib/icon-button';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

class RightIconMenu extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={this.takenDrug.bind(this)} disabled={this.props.enablingDrug}>Taken</MenuItem>
                <MenuItem onTouchTap={this.editDrug.bind(this)}>Edit</MenuItem>
                <MenuItem onTouchTap={this.deleteDrug.bind(this)}>Delete</MenuItem>
            </IconMenu>
        );
    }

    deleteDrug () {
        drugsStore.deleteDrug(this.props.drug);
    }

    editDrug () {
        fluxDispatcher.dispatch({
            actionType: 'Drug-edit',
            data: this.props.drug
        });
    }

    takenDrug () {
        const currentDate = new Date();
        const newHour = new Date();
        newHour.setHours(currentDate.getHours() + Number(this.props.drug.howoften));
        this.props.drug.nextTakeHour = newHour;

        fluxDispatcher.dispatch({
            actionType: 'Drug-taken',
            data: this.props.drug
        });
    }
}

export default RightIconMenu;
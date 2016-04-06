'use strict';

import React from 'react';

// Drugs Store
import drugsStore from '../../components/drugs/Drugs-Store';

// Drug Item
import DrugItem from './Drugs-Item.jsx';

// Messages List
import List from 'material-ui/lib/lists/list';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';

// Messages List Configuration
const containerMessagesStyle = {
    marginTop: 70
};

class Drugs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            drugs: drugsStore.getAllDrugs()
        };
    }

    componentDidMount () {
        drugsStore.on('CHANGE', this._onChange.bind(this));
    }

    componentWillUnmount () {
        drugsStore.removeListener('CHANGE', this._onChange.bind(this));
    }

    _onChange () {
        this.setState({drugs: drugsStore.getAllDrugs()});
    }

    render () {
        // List Items
        let listItems = this.state.drugs.map((drug, index, array) => {
            return (
                <div key={index}>

                    <DrugItem drug={drug} />

                </div>
            );
        });

        // The List
        return (
            <div style={containerMessagesStyle}>
                <List insetSubheader={true}>

                    {listItems}

                </List>
            </div>
        );
    }
}

export default Drugs;
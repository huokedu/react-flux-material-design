'use strict';

import React from 'react';

// Clearfix
import Clearfix from 'material-ui/lib/clearfix';

// Bagde
import Badge from 'material-ui/lib/badge';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';

const HeaderBadge = function (props) {

    let BadgeComponent = null;
    if (0 < props.drugsPending) {
        BadgeComponent = (
            <div>
            <Badge
            badgeContent={props.drugsPending}
            primary={true}
            badgeStyle={{fontFamily: "Roboto, sans-serif"}}
            >
                <NotificationsIcon />
            </Badge>
            <span style={{fontFamily: "Roboto, sans-serif", color: '#fff'}}>New drugs to take!</span>
            </div>
            );
    }

    return (
        <Clearfix style={{position: 'relative', margin: 'auto', width: 200, height: 64}}>
            {BadgeComponent}
        </Clearfix>
    );
}

export default HeaderBadge;
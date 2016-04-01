'use strict';

import fluxDispatcher from '../../dispatcher/FluxDispatcher';
import scaffoldStore from '../../views/scaffold/Scaffold-Store';
import drugStore from '../../components/drugs/Drugs-Store';


fluxDispatcher.register(function (payload) {
    switch (payload.actionType) {
        case 'Drug-edit':
            scaffoldStore.openDialog(payload.data);
        break;
        case 'Drug-taken':
            drugStore.updateDrug(payload.data);
        break;
    }
});

export default fluxDispatcher;
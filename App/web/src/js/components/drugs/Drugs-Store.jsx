import Events from 'events';

const EventEmitter = Events.EventEmitter;

// Private Properties and Methods
let _drugs = JSON.parse(window.localStorage.getItem('drugs')) || [];

const _createDrugId = () => Date.now();

const _sortAscendentDrugByDate = (drugsArray) => {

    drugsArray.sort((a, b) => {
        const nextTakeHourA = new Date(a.nextTakeHour);
        const nextTakeDateA = new Date(a.nextTakeDate);
        let fullNextTakeDateA = new Date(nextTakeDateA.toDateString() + ' ' + nextTakeHourA.getHours() + ':' + nextTakeHourA.getMinutes());

        const nextTakeHourB = new Date(b.nextTakeHour);
        const nextTakeDateB = new Date(b.nextTakeDate);
        let fullNextTakeDateB = new Date(nextTakeDateB.toDateString() + ' ' + nextTakeHourB.getHours() + ':' + nextTakeHourB.getMinutes());

        return fullNextTakeDateA - fullNextTakeDateB;
    });

    return drugsArray;
};

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

    return enablingDrug;
};

const Store = Object.assign({}, EventEmitter.prototype, {

    createDrug: function (drug) {
        drug.id = _createDrugId();
        _drugs.push(drug);
        window.localStorage.setItem('drugs', JSON.stringify(_drugs));
        this.emit('CHANGE');
    },

    readDrug: function () {},

    updateDrug: function (drug) {
        let drugId = this.findDrug(drug);
        if(null !== drugId) {
            _drugs[drugId] = drug;
            window.localStorage.setItem('drugs', JSON.stringify(_drugs));
            this.emit('CHANGE');
        }
    },

    deleteDrug: function (drug) {
        let drugId = null;
        _drugs.find((element, index, array)=>{
            drugId = index;
            return element.id === drug.id;
        });
        _drugs.splice(drugId, 1);
        window.localStorage.setItem('drugs', JSON.stringify(_drugs));
        this.emit('CHANGE');
    },

    getAllDrugs: function () {
        _drugs = _sortAscendentDrugByDate(_drugs);
        return _drugs;
    },

    findDrug: function (drug) {
        let drugId = null;
        let drugFound = _drugs.find((element, index, array)=>{
            drugId = index;
            return element.id === drug.id;
        });

        if (!drugFound) {
            drugId = null;
        }

        return drugId;
    },

    getDrugsPending: function () {
        let drugsPending = 0;
        let enablingDrug = false;
        _drugs.forEach((currentDrug, index) => {
            enablingDrug = _verifyHour(currentDrug);
            if (!enablingDrug) {
                drugsPending ++;
                enablingDrug = false;
            }
        });
        return drugsPending;
    }
});

export default Store;
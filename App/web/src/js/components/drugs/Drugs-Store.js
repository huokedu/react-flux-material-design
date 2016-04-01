import Events from 'events';

const EventEmitter = Events.EventEmitter;

// Private Properties and Methods
let _drugs = JSON.parse(window.localStorage.getItem('drugs')) || [];

const _createDrugId = () => Date.now();

const _sortAscendentDrugByDate = (drugsArray) => {

    drugsArray.sort((a, b) => {
        let datea = new Date(a.nextTakeHour);
        let dateb = new Date(b.nextTakeHour);

        return datea - dateb;
    });

    return drugsArray;
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
    }
});

export default Store;
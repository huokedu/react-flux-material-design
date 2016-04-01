import Events from 'events';

const EventEmitter = Events.EventEmitter;

let _openDialog = false;

const ScaffoldStore = Object.assign({}, EventEmitter.prototype, {
    openDialog: function (drug) {
        this.emit('OPEN_DIALOG', drug);
    }
});

export default ScaffoldStore;
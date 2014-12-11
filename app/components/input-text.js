import Ember from 'ember';

export default Ember.Component.extend({
    isEditing: false,
    doubleClick: function () {
        this.set('isEditing', true);
    },
    actions: {
        acceptChanges: function () {
            this.set('isEditing', false);
            this.sendAction();
        }
    }
});

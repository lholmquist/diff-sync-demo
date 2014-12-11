import Ember from 'ember';
import uuid from '../utils/uuid';
import cp from '../utils/poor-mans-copy';

var seedData = {
    id: '12345',
    clientId: uuid(),
    content: {
        name: 'Luke Skywalker',
        profession: 'Jedi',
        hobbies: [
            {
                id: uuid(),
                description: 'Fighting the Dark Side'
            },
            {
                id: uuid(),
                description: 'going into Tosche Station to pick up some power converters'
            },
            {
                id: uuid(),
                description: 'Kissing his sister'
            },
            {
                id: uuid(),
                description: 'Bulls eyeing Womprats on his T-16'
            }
        ]
    }
};

export default Ember.ObjectController.extend({
    needs: ['application'],
    needsInit: true,
    syncClient: {},
    actions: {
        modelUpdate: function () {
            var edits = this.get('syncClient').diff(cp(this.get('model')));
            this.get('syncClient').sendEdits(edits);
        }
    },
    _onmessage: function (e) {
        var data = JSON.parse(e.data),
            doc;

        if (data) {
            this.get('syncClient').patch(data);
        }

        doc = this.get('syncClient').getDocument('12345');
        this.set('model', cp(doc));
    },
    _onopen: function () {
        this.set('controllers.application.isConnected', true);

        if (this.get('needsInit')) {
            this.get('syncClient').addDocument(seedData);
            this.set('needsInit', false);
        } else {
            this.get('syncClient').update('12345');
        }
    }
});

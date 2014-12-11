import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function (controller, model) {
        controller.set('model', model);

        // To test on a real device,  be sure to change the serverURL to your IP
        var syncClient = AeroGear.SyncClient({
                serverUrl: 'ws://localhost:7777/sync',
                onopen: controller.get('_onopen').bind(controller),
                onmessage: controller.get('_onmessage').bind(controller)
            });

        controller.set('syncClient', syncClient);
        this.controllerFor('application').set('syncClient', syncClient);
    }
});

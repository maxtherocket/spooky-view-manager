var mixes = require('mixes');
var _ = require('lodash');

var SpookyViewManager = function(container, overlap){

    this.container = container;

    this.currentView = null;

    this.overlap = (_.isBoolean(overlap)) ? overlap : true;

}

mixes(SpookyViewManager, {

    changeView: function(viewInstance, overlap){
        overlap = (_.isBoolean(overlap)) ? overlap : this.overlap;
        if (overlap){
            if (this.currentView) this.currentView.hide(0, this.destroyView.bind(this.currentView) );
            this.showNewView(viewInstance);
        } else {
            if (this.currentView){
                // Current view already exists
                var curView = this.currentView;
                this.currentView.hide(0, function(){
                    this.destroyView( curView );
                    this.showNewView( viewInstance );
                }.bind(this) );
            } else {
                this.showNewView(viewInstance);
            }
        }
    },

    showNewView: function(viewInstance){
        viewInstance.absolute();
        viewInstance.appendTo( this.container );
        viewInstance.show();
        this.currentView = viewInstance;
    },

    destroyView: function(){
        if (this && this.rip) this.rip();
    }

});

module.exports = SpookyViewManager;
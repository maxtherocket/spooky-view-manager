var mixes = require('mixes');
var _ = require('lodash');
var SpookyEl = require('spooky-element');

var SpookyViewManager = function(container, overlap){

    this.container = new SpookyEl( container );

    this.currentView = null;

    this.overlap = (_.isBoolean(overlap)) ? overlap : true;

}

mixes(SpookyViewManager, {

    changeView: function(viewInstance, overlap){
        overlap = (_.isBoolean(overlap)) ? overlap : this.overlap;
        if (overlap){
            // OVERLAP
            if (this.currentView){
                var curView = this.currentView;
                this.currentView.animateOut(0, function(){
                    curView.destroy();
                }.bind(this) );
            }
            this.showNewView(viewInstance);
        } else {
            // NO overlap
            if (this.currentView){
                // Current view already exists
                var curView = this.currentView;
                this.currentView.animateOut(0, function(){
                    curView.destroy();
                    this.showNewView( viewInstance );
                }.bind(this) );
            } else {
                this.showNewView(viewInstance);
            }
        }
    },

    showNewView: function(viewInstance){
        viewInstance.css({
            position: 'absolute',
            left: 0,
            top: 0
        });
        viewInstance.appendTo( this.container );
        viewInstance.animateIn();
        this.currentView = viewInstance;
    },

    resize: function(w,h){
        this.width = w;
        this.height = h;
        this.container.resize(w,h);
        if (this.currentView){
            this.currentView.resize(w,h);
        }
    }

});

module.exports = SpookyViewManager;
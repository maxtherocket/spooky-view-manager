var mixes = require('mixes');
var _ = require('lodash');
var SpookyEl = require('spooky-element');

var SpookyViewManager = function(container, overlap){

    this.container = new SpookyEl( container );

    this.currentView = null;

    this.overlap = (_.isBoolean(overlap)) ? overlap : true;

}

mixes(SpookyViewManager, {

    changeView: function(viewInstance, appendToContainer, overlap){
        overlap = (_.isBoolean(overlap)) ? overlap : this.overlap;
        if (overlap){
            // OVERLAP
            if (this.currentView){
                var curView = this.currentView;
                this.currentView.animateOut(0, function(){
                    curView.destroy();
                }.bind(this) );
            }
            this.showNewView(viewInstance, appendToContainer);
        } else {
            // NO overlap
            if (this.currentView){
                // Current view already exists
                var curView = this.currentView;
                this.currentView.animateOut(0, function(){
                    curView.destroy();
                    this.showNewView( viewInstance, appendToContainer );
                }.bind(this) );
            } else {
                this.showNewView(viewInstance, appendToContainer);
            }
        }
    },

    showNewView: function(viewInstance, appendToContainer){
        if (_.isUndefined(appendToContainer)) appendToContainer = true;
        if (appendToContainer){
            viewInstance.css({
                position: 'absolute'
            });
            viewInstance.appendTo( this.container );
        }
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
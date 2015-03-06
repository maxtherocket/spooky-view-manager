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
        if (this.currentView){
            this.lastView = this.currentView;
        }
        if (overlap){
            // OVERLAP - ON
            this.showNewView(viewInstance, appendToContainer);
            if (this.lastView){
                var lastView = this.lastView;
                lastView.animateOut(0, function(){
                    lastView.destroy();
                }.bind(this) );
            }
        } else {
            // OVERLAP - OFF
            if (this.lastView){
                // Current view already exists
                var lastView = this.lastView;
                lastView.animateOut(0, function(){
                    lastView.destroy();
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
        this.currentView = viewInstance;
        viewInstance.animateIn();
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
var SpookyEl = require('spooky-element');
var ready = require('domready');
var SpookyViewManager = require('../index');
var tween = require('gsap');
var on = require('dom-events').on;

ready(function(){

    var button = new SpookyEl('<div>Change View</div>')
        .appendTo(document.body)
        .on('click', changeView);

    var container = new SpookyEl( '<div></div>' ).css({
        padding: '20px',
        border: '1px solid #000000',
        position: 'relative'
    }).appendTo(document.body);

    var manager = new SpookyViewManager( container, false );

    var spookA = new SpookyEl('<div>BOO!</div>').css({opacity:'0'});
    spookA.animateIn = function(delay, onComplete){
        tween.to(this, 2, {opacity:1, onComplete:onComplete});
    }
    spookA.animateOut = function(delay, onComplete){
        tween.to(this, 2, {opacity:0, onComplete:onComplete});
    }

    manager.changeView( spookA );

    function changeView(){

        manager.changeView( new SpookyEl('<div>Hi</div>') );

    }

    var resize = function(){
        manager.resize(window.innerWidth, window.innerHeight);
    }
    on(window, 'resize', resize);
    resize();

});
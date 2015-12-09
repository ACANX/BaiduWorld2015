
/* Copyright (C) 2013 Justin Windle, http://soulwire.co.uk */

(function ( root, factory ) {
    
    if ( typeof exports === 'object' ) {

        // CommonJS like
        module.exports = factory(root, root.document);

    } else if ( typeof define === 'function' && define.amd ) {

        // AMD
        define( function() { return factory( root, root.document ); });

    } else {

        // Browser global
        root.Sketch = factory( root, root.document );
    }

}( typeof window !== "undefined" ? window : this, function ( window, document ) {


    "use strict";

    /*
    ----------------------------------------------------------------------

        Config

    ----------------------------------------------------------------------
    */

  var MATH_PROPS = 'E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min'.split( ' ' );
    var HAS_SKETCH = '__hasSketch';
    var M = Math;

    var CANVAS = 'canvas';
    var WEBGL = 'webgl';
    var DOM = 'dom';

    var doc = document;
    var win = window;

    var instances = [];

    var defaults = {

        fullscreen: true,
        autostart: true,
        autoclear: true,
        autopause: true,
        container: doc.body,
        interval: 1,
        globals: true,
        retina: false,
        type: CANVAS
    };

    var keyMap = {

         8: 'BACKSPACE',
         9: 'TAB',
        13: 'ENTER',
        16: 'SHIFT',
        27: 'ESCAPE',
        32: 'SPACE',
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN'
    };

    /*
    ----------------------------------------------------------------------

        Utilities

    ----------------------------------------------------------------------
    */

    function isArray( object ) {

        return Object.prototype.toString.call( object ) == '[object Array]';
    }

    function isFunction( object ) {

        return typeof object == 'function';
    }

    function isNumber( object ) {

        return typeof object == 'number';
    }

    function isString( object ) {

        return typeof object == 'string';
    }

    function keyName( code ) {

        return keyMap[ code ] || String.fromCharCode( code );
    }

    function extend( target, source, overwrite ) {

        for ( var key in source )

            if ( overwrite || !( key in target ) )

                target[ key ] = source[ key ];

        return target;
    }

    function proxy( method, context ) {

        return function() {

            method.apply( context, arguments );
        };
    }

    function clone( target ) {

        var object = {};

        for ( var key in target ) {

            if ( isFunction( target[ key ] ) )

                object[ key ] = proxy( target[ key ], target );

            else

                object[ key ] = target[ key ];
        }

        return object;
    }

    /*
    ----------------------------------------------------------------------

        Constructor

    ----------------------------------------------------------------------
    */

    function constructor( context ) {

        var request, handler, target, parent, bounds, index, suffix, clock, node, copy, type, key, val, min, max, w, h;

        var counter = 0;
        var touches = [];
        var resized = false;
        var setup = false;
        var ratio = win.devicePixelRatio || 1;
        var isDiv = context.type == DOM;
        var is2D = context.type == CANVAS;

        var mouse = {
            x:  0.0, y:  0.0,
            ox: 0.0, oy: 0.0,
            dx: 0.0, dy: 0.0
        };

        var eventMap = [

            context.element,

                pointer, 'mousedown', 'touchstart',
                pointer, 'mousemove', 'touchmove',
                pointer, 'mouseup', 'touchend',
                pointer, 'click',
                pointer, 'mouseout',
                pointer, 'mouseover',

            doc,

                keypress, 'keydown', 'keyup',

            win,

                active, 'focus', 'blur',
                resize, 'resize'
        ];

        var keys = {}; for ( key in keyMap ) keys[ keyMap[ key ] ] = false;

        function trigger( method ) {

            if ( isFunction( method ) )

                method.apply( context, [].splice.call( arguments, 1 ) );
        }

        function bind( on ) {

            for ( index = 0; index < eventMap.length; index++ ) {

                node = eventMap[ index ];

                if ( isString( node ) )

                    target[ ( on ? 'add' : 'remove' ) + 'EventListener' ].call( target, node, handler, false );

                else if ( isFunction( node ) )

                    handler = node;

                else target = node;
            }
        }

        function update() {

            cAF( request );
            request = rAF( update );

            if ( !setup ) {

                trigger( context.setup );
                setup = isFunction( context.setup );
            }

            if ( !resized ) {
                trigger( context.resize );
                resized = isFunction( context.resize );
            }

            if ( context.running && !counter ) {

                context.dt = ( clock = +new Date() ) - context.now;
                context.millis += context.dt;
                context.now = clock;

                trigger( context.update );

                // Pre draw

                if ( is2D ) {

                    if ( context.retina ) {

                        context.save();
                        context.scale( ratio, ratio );
                    }

                    if ( context.autoclear )

                        context.clear();
                }

                // Draw

                trigger( context.draw );
                
                // Post draw

                if ( is2D && context.retina )

                    context.restore();
            }

            counter = ++counter % context.interval;
        }

        function resize() {

            target = isDiv ? context.style : context.canvas;
            suffix = isDiv ? 'px' : '';

            w = context.width;
            h = context.height;

            if ( context.fullscreen ) {

                h = context.height = 605;
                w = context.width = 1440;
            }

            if ( context.retina && is2D && ratio ) {

                target.style.height = h + 'px';
                target.style.width = w + 'px';

                w *= ratio;
                h *= ratio;
            }

            if ( target.height !== h )

                target.height = h + suffix;

            if ( target.width !== w )

                target.width = w + suffix;

            if ( setup ) trigger( context.resize );
        }

        function align( touch, target ) {

            bounds = target.getBoundingClientRect();

            touch.x = touch.pageX - bounds.left - (win.scrollX || win.pageXOffset);
            touch.y = touch.pageY - bounds.top - (win.scrollY || win.pageYOffset);

            return touch;
        }

        function augment( touch, target ) {

            align( touch, context.element );

            target = target || {};

            target.ox = target.x || touch.x;
            target.oy = target.y || touch.y;

            target.x = touch.x;
            target.y = touch.y;

            target.dx = target.x - target.ox;
            target.dy = target.y - target.oy;

            return target;
        }

        function process( event ) {

            event.preventDefault();

            copy = clone( event );
            copy.originalEvent = event;

            if ( copy.touches ) {

                touches.length = copy.touches.length;

                for ( index = 0; index < copy.touches.length; index++ )

                    touches[ index ] = augment( copy.touches[ index ], touches[ index ] );

            } else {

                touches.length = 0;
                touches[0] = augment( copy, mouse );
            }

            extend( mouse, touches[0], true );

            return copy;
        }

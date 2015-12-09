
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


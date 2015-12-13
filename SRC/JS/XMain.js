/**
 * Created by XTQXK on 2015/8/25.
 */


var MAX_PARTICLES = 6000;
var COLOURS = ["#22295F", "#691783", "#005078", "#0D0A24", "#2D1635", "#F39700", "#FFF000", "#EC6C00", "#C3D600", "#FEFEFE", "#541A86", "#00AAEB", "#33284F", "#AE2752", "#152B85","#E50011","#EC6C00"];

var particles = [];
var pool = [];
var _width,_height;

var xStage = Sketch.create({
    container: document.getElementById( 'XStage' )
});


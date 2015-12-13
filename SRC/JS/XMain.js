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


function Particle( x, y, radius ) {
    this.init( x, y, radius );
}

Particle.prototype = {

    init: function( x, y, radius ) {

        this.alive = true;

        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta = random( TWO_PI );
        this.drag = 1.72;
        this.color = '#fff';
        this.alpha = 0.001;

        this.x = x || 0.0;
        this.y = y || 0.0;

        this.vx = 0.0;
        this.vy = 0.0;
    },
    draw: function( ctx ) {



        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        //ctx.globalCompositeOperation = 'destination-over';
        ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

xStage.setup = function() {

};

xStage.spawn = function( x, y ,channel, num) {
    num = num || 0;

    if ( particles.length >= MAX_PARTICLES )
        pool.push( particles.shift() );

    var maxWidth = (num==2?11:15);

    //创建一个粒子
    particle = pool.length ? pool.pop() : new Particle();
    //设置粒子默认高宽
    particle.init( x+channel, y+channel, random( 7, 15 ) );

    //
    particle.wander = random( 0.5, 4.0 );
    particle.color = random( COLOURS );
    particle.drag = random( 0.9, 0.99 );

    theta = random( TWO_PI );
    force = random( 2, 5 );

    particle.vx = sin( theta ) * force;
    particle.vy = cos( theta ) * force;
    particle.alpha=1;

    var _p =[
        [
            {"x":58,"y":260},
            {"x":328,"y":115},
            {"x":538,"y":87},
            {"x":787,"y":127},
            {"x":875,"y":141},
            {"x":910,"y":174},
            {"x":940,"y":178},
            {"x":980,"y":202},
            {"x":983,"y":226},
            {"x":981,"y":250},
            {"x":980,"y":275},
            {"x":954,"y":290},
            {"x":936,"y":302},
            {"x":913,"y":305},
        ],
        [   
            {"x":172,"y":516},
            {"x":217,"y":430},
            {"x":361,"y":300},
            {"x":459,"y":230},
            {"x":536,"y":210},
            {"x":588,"y":201},
            {"x":645,"y":204},
            {"x":705,"y":192},
            {"x":772,"y":209},
        ],
        [
            {"x":586,"y":684},
            {"x":543,"y":554},
            {"x":478,"y":483},
            {"x":488,"y":347},
            {"x":518,"y":314},
            {"x":570,"y":247},
            {"x":622,"y":241},
        ],
        [
            {"x":1280,"y":380},
            {"x":1200,"y":420},
            {"x":950,"y":545},
            {"x":792,"y":543},
            {"x":710,"y":510},
            {"x":642.4,"y":486},
            {"x":621,"y":473},
            {"x":604,"y":415},
            {"x":590,"y":391},
            {"x":586,"y":370},
            {"x":586,"y":320},
            {"x":600,"y":276},
        ],
    ]

    var _len= _p[num].length;
    for (_idx in _p[num]){
        if (_idx<_len-1){
            _p[num][_idx].x+=(_len-_idx)/_len*channel;
            _p[num][_idx].y+=(_len-_idx)/_len*channel;
        }
    }

    TweenMax.killTweensOf(particle);
    TweenMax.to(particle,3*random(1,7)+3,{onComplete:function(item){
        item.alive=false;
    },onCompleteParams:[particle],alpha:1,radius:1,bezier:{type:"soft",autoRotate:false,values:_p[num]},ease:Sine.easeOut});
    particles.push( particle );
};

xStage.update = function() {

    var i, particle;

    for ( i = particles.length - 1; i >= 0; i-- ) {

        particle = particles[i];

        if ( particle.alive ) {}
        else pool.push( particles.splice( i, 1 )[0] );
    }
};

xStage.draw = function() {

    xStage.globalCompositeOperation  = 'lighter';

    for ( var i = particles.length - 1; i >= 0; i-- ) {
        particles[i].draw( xStage );
    }
};

// xStage.mouseup = function() {
//     var particle, theta, force, tou ch, max, i, j, n;

//     for ( i = 0, n = xStage.touches.length; i < n; i++ ) {
//         touch = xStage.touches[i], max = random( 50, 200 );

//         for ( j = 0; j < max; j++ ) {
//             var _channel = Math.pow(random(1,500),2)/1500;
//             xStage.spawn( touch.x+random(-100,100), touch.y+random(-100,100),-_channel );
//         }
//     }
// };


function goto() {
    _width = document.getElementById("XStage").offsetWidth;
    _height = document.getElementById("XStage").offsetHeight;
    var _arr = [];
    var touch, max, i, j, n;
    var _rdn = [40,30,25,50];
    var _channels = [2100,2100,1500,1700];

    var _touches = [
            {x:_width*-0.5, y: _height*1.4},
            {x:_width*-0.4,y: _height*1.7},
            {x:_width*0.57,y:  _height*1.42},
            {x:_width*1.4,y: _height*0.05}
    ];


    for ( i = 0, n = _touches.length; i < n; i++ ) {
        touch = _touches[i], max = _rdn[i];//random( 50, _rdn[i] );

        for ( j = 0; j < max; j++ ) {
            var _channel = Math.pow(random(1,500),2)/_channels[i];
            if(i!=2){
                xStage.spawn( touch.x+random(-60,60), touch.y+random(-60,60),-_channel,i);
            }else{
                xStage.spawn( touch.x+random(-300,300), touch.y+random(-30,30),-_channel,i);
            }

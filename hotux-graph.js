//yelow to red = 255,255,0 -> 255,0,0
//light blue to hardy blue = 0,255,255 -> 0,0,255

var HotuxGraph = (function(){

    var line, $container = $('#container'), red, green, blue;
   

    function init(){
        var heatmap = new HeatCanvas("container");
        heatmap.push(500, 500, 45);
        heatmap.render();
        //yelowToRed();
        //blueToBlue();
    }

    function yelowToRed(){
        for (var i = 0; i <= 255; i++){
            line = $('<div style="background-color:rgb(255,'+ i +', 0); width:100px; height:1px; ">');
            $container.append(line);
        }
    }

    function blueToBlue(){
        for (var i = 255; i >= 0 ; i--){
            line = $('<div style="background-color:rgb(0,'+ i +', 255); width:100px; height:1px; ">');
            $container.append(line);
        }
    }

    return {init:init, yelowToRed: yelowToRed, blueToBlue: blueToBlue};

})();

$(function(){
    HotuxGraph.init();
});

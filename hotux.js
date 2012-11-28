var HotUX = (function(){

    var pointsStorage = {}, 
        spot, 
        hotSpot, 
        coords = [], 
        options, 
        average, 
        quantity = 0, 
        total = 0;
    
    function init( options ) {

        options = options;

        $(document).mousemove( function(e){
            setPointsStorage( e.pageX, e.pageY );
        });

        if( !options.debug ) {
            startSavingData();
        }        
    }

    function setPointsStorage( x, y ) {
        if( !pointsStorage['point_'+ x +'_'+ y] ) {
            pointsStorage['point_'+ x +'_'+ y] = 1;
        } else{
            pointsStorage['point_'+ x +'_'+ y] += 1;
        }

        drawSpot(y, x);
    }

    function getPointsStorage(){
        return pointsStorage;
    }

    function drawSpot(top, left){
        spot = $('<div class="hotux-spot" style=" top:'+top+'px; left:'+left+'px;" />');

        $('body').append( spot );
    }

    function drawHotSpot(top, left){
        hotSpot = $('<div class="hotux-hotspot" style=" top:'+top+'px; left:'+left+'px;" />');

        $('body').prepend( hotSpot );
    }

    function showHotSpots( tolerance ) {
        
        $('.hotux-spot').remove();

        average = calcPointsAverage();

        for( i in pointsStorage ) {
            if( pointsStorage[i] >= average ){
                coords = i.split('_');
                drawHotSpot(coords[2], coords[1] );
            }
        }
    }

    function calcPointsAverage(){

        for( i in pointsStorage ) {
            total += pointsStorage[i];
            quantity++;
        }

        return total/quantity;
    }

    function startSavingData(){
        window.setInterval(function(){
            saveData();
        }, 1000);
    }

    function saveData(){
        $.ajax({
            url: '',
            async: true,
            type: 'post',
            data: { client_id: options.client_id, page: window.location.href, points: pointsStorage}
        });
    }

    return { init: init, getPointsStorage: getPointsStorage, showHotSpots: showHotSpots, drawSpot: drawSpot, drawHotSpot: drawHotSpot};    

})();

$(function(){
    HotUX.init({ client_id: '1', debug: true});
});
var HotUX = (function(){

    var pointsStorage = {}, 
        spot, 
        hotSpot, 
        coords = [],
        average,
        quantity = 0,
        total = 0,
        debugMode = false,
        client_id = '',
        tmpTrackRest,
        lastPoint = {};
    
    function init( options ) {
        
        if( options.debug ) {
            debugMode = true;
        }

        if( options.client_id ) {
            client_id = options.client_id;
        }

        $(document).mousemove( function(e){
            lastPoint = {x: e.pageX, y: e.pageY };
            setPointsStorage( e.pageX, e.pageY );
        });

        if( !debugMode ) {
            startSavingData();
        }

        trackMouseRest();
    }

    function registerPoint( x, y ) {
        if( !pointsStorage['point_'+ x +'_'+ y] ) {
            pointsStorage['point_'+ x +'_'+ y] = 1;
        } else {
            pointsStorage['point_'+ x +'_'+ y] += 1;
        }
    }
    function setPointsStorage( x, y ) {
        
        registerPoint(x, y);

        if( debugMode ) {
            drawSpot(y, x);
        }
    }

    function getPointsStorage(){
        return pointsStorage;
    }

    function drawSpot(top, left){
        spot = $('<div class="hotux-spot" style=" top:'+top+'px; left:'+left+'px;" />');

        $('body').prepend( spot );
    }

    function drawHotSpot(top, left){
        hotSpot = $('<div class="hotux-hotspot" style=" top:'+top+'px; left:'+left+'px;" />');

        $('body').prepend( hotSpot );
    }

    function showHotSpots( tolerance ) {
        
        $('.hotux-spot, .hotux-hotspot').remove();

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

    function trackMouseRest(){
        clearInterval(tmpTrackRest);
        tmpTrackRest = window.setInterval(function(){
            registerPoint( lastPoint.x, lastPoint.y );
        }, 200);
    }

    return { init: init, getPointsStorage: getPointsStorage, showHotSpots: showHotSpots, drawSpot: drawSpot, drawHotSpot: drawHotSpot};    

})();

$(function(){
    HotUX.init({ client_id: '1', debug: true});
});
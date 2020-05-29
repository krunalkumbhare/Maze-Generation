var openSet = [];
var closeSet = [];
var path = [];






function pathfinder() {
    var start_position = grid[0];
    var end_position =   grid[grid.length - 1];
  
    //console.log("pathfinder is called")
    start_position.highlight();
    end_position.highlight();

    for (let i = 0; i < grid.length; i++) {
        grid[i].Real_Neighbors();
        //console.log(grid[i].neighbor);
    }

    var flag = true;
    var current;
    openSet.push(start_position);

    while (flag ) {
        if( openSet.length > 0 ){
            var winner = 0;

            // f is the total cost for starting to end passing thru i 
            for ( var i = 0 ; i < openSet.length ; i++){
                if (openSet[i].f  <  openSet[winner].f){
                    winner = i;
                }
            }


            current = openSet[winner];

            //did i finish
            if( current === end_position){
                flag = false;
                console.log('!Done');
            }

            // yahan pr jo evaluate ho chuka h usko openSet se nikl kr closeSet me dalo
            removeFromArray(openSet , current);
            closeSet.push(current);

            var neighbors = current.neighbor;
            for (var i = 0 ; i < neighbors.length ; i ++){
                var neighbor = neighbors[i];


                if ( !closeSet.includes(neighbor) ){
                    var tempG = current.g + heuristic(neighbor , current);

                    // is this a better path than before
                    var newPath = false;
                    if (openSet.includes(neighbor)){
                        if(tempG < neighbor.g){
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    } else {
                        neighbor.g = tempG;
                        newPath = true;
                        openSet.push(neighbor);
                    }

                    // yes , its a btter path 
                    if (newPath) {
                        neighbor.h = heuristic( neighbor , end_position);
                        neighbor.f = neighbor.g + neighbor.h ;
                        neighbor.previous = current;
                    }
                }
            }

        } else {
        console.log('no solution ');
        flag = false;
        }
    
        // for( var i = 0 ; i < closeSet.length ; i++){
        //     closeSet[i].highlight('red');
        // }
        // for( var i = 0 ; i < openSet.length ; i++){
        //     openSet[i].highlight('green');
        // }

        path = [];
        var temp = current ; 
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }

        
        
    }
    
    
    console.log(path);
    for (var k = 0 ; k < path.length ; k++){

        path[k].highlight('blue');
        console.log(path[k].i , path[k].j);
    }    
}


function removeFromArray( arr , elt ){
    for( var i = arr.length -1 ;  i >= 0 ; i--){
        if (arr[i] == elt ){
            arr.splice(i , 1);
        }
    }
}

function heuristic(a , b){
    var dist = Math.sqrt( Math.pow((a.i- b.i), 2) + Math.pow((a.j- b.j), 2) );
    return dist;
}


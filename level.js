staticBlocks.push(new create_staticBlock(200,400,200,50,0));
staticBlocks.push(new create_staticBlock(-284,386,200,50,0.43500000000000033));


World.add(world, [
    car,
    ground,
]);

placement_block_x = 200;
placement_block_y = 400;
placement_block_width = 200;
placement_block_height = 50;
placement_block_rotation = 0;
placement_block_roundness = 0;
var placement_block = Bodies.rectangle(placement_block_x, placement_block_y, placement_block_width, placement_block_height, {
    isStatic: true,
    chamfer: {
        radius: placement_block_roundness
    },
    render: {
        fillStyle: groundColor,
        lineWidth: 0
    }
})
World.add(world, [
    placement_block,
]);

SpawnObjects();


function SpawnObjects(){

    for (let i = 0; i < staticBlocks.length; i++) {
        var staticBlock = Bodies.rectangle(staticBlocks[i].x, staticBlocks[i].y, staticBlocks[i].width, staticBlocks[i].height, {
            isStatic: true,
            chamfer: {
                radius: staticBlocks[i].roundness
            },
            render: {
                fillStyle: groundColor,
                lineWidth: 0
            }
        });
    
        World.add(world, [
            staticBlock,
        ]);
    
        Body.rotate(staticBlock, staticBlocks[i].rotation);
        if(editLevel == true){
            console.log("staticBlocks.push(new create_staticBlock(" + staticBlocks[i].x + "," + staticBlocks[i].y + "," + staticBlocks[i].width + "," + staticBlocks[i].height + "," + staticBlocks[i].rotation + "));" );
            
        }
    }

}




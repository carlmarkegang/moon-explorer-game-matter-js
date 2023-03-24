staticBlocks.push(new create_staticBlock(200, 400, 200, 50));


World.add(world, [
    car,
    ground,
]);

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
    //Matter.Body.set( staticBlocks[i], "position", { x: staticBlocks[i].x, y: staticBlocks[i].y })
}




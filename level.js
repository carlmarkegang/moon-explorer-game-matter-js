
var rotated_block_1 = Bodies.rectangle(200, 400, 200, 50, {
    isStatic: true,
    render: {
        fillStyle: groundColor,
        lineWidth: 0
    }
});
var rotated_block_2 = Bodies.rectangle(700, 450, 400, 200, {
    isStatic: true,
    render: {
        fillStyle: groundColor,
        lineWidth: 0
    }
});

var rotated_block_3 = Bodies.rectangle(2000, 0, 200, 1000, {
    isStatic: true,
    render: {
        fillStyle: groundColor,
        lineWidth: 0
    }
});

var rotated_block_4 = Bodies.rectangle(-300, 0, 20, 1000, {
    isStatic: true,
    render: {
        fillStyle: groundColor,
        lineWidth: 0
    }
});


World.add(world, [
    car,
    ground,
    rotated_block_1,
    rotated_block_2,
    rotated_block_3,
    rotated_block_4
]);


Body.rotate(rotated_block_1, 0.7);
Matter.Body.set(rotated_block_1, "position", { x: 300, y: 430 })
Body.rotate(rotated_block_2, 0.3);
Body.rotate(rotated_block_3, 0.4);

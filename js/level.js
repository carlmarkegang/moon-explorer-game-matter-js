// Created by setting var editLevel = true; in game.js
staticBlocks.push(new create_staticBlock(200,400,200,50,0,0));
staticBlocks.push(new create_staticBlock(-284,386,200,50,0.43500000000000033,0));
staticBlocks.push(new create_staticBlock(538,506,500,500,0,0));
staticBlocks.push(new create_staticBlock(-462,324,200,50,6.521,0));
staticBlocks.push(new create_staticBlock(-634,254,200,50,6.8199999999999985,0));
staticBlocks.push(new create_staticBlock(-780,156,200,50,0.6539999999999959,0));
staticBlocks.push(new create_staticBlock(-884,26,200,50,-1.941000000000007,0));
staticBlocks.push(new create_staticBlock(-962,-154,200,50,-1.941000000000007,0));
staticBlocks.push(new create_staticBlock(142,356,200,50,2.415000000000001,0));
staticBlocks.push(new create_staticBlock(300,248,200,50,8.963000000000003,0));
staticBlocks.push(new create_staticBlock(468,230,200,50,15.948000000000004,0));
staticBlocks.push(new create_staticBlock(-926,-272,200,50,-0.6660000000000005,0));
staticBlocks.push(new create_staticBlock(-780,-342,200,50,-3.252,0));
staticBlocks.push(new create_staticBlock(-960,-298,200,50,-3.542,0));
staticBlocks.push(new create_staticBlock(-588,552,500,500,0.38900000000000035,0));
staticBlocks.push(new create_staticBlock(-938,370,500,500,0.6570000000000006,0));
staticBlocks.push(new create_staticBlock(-1134,38,500,500,2.786,0));
staticBlocks.push(new create_staticBlock(-1430,298,1000,1000,-0.1900000000000001,0));
staticBlocks.push(new create_staticBlock(338,534,500,500,-0.4960000000000004,0));
staticBlocks.push(new create_staticBlock(670,470,500,500,-1.4980000000000004,0));
staticBlocks.push(new create_staticBlock(1028,470,500,500,-1.967,0));
staticBlocks.push(new create_staticBlock(1762,688,700,700,0.2300000000000002,0));
staticBlocks.push(new create_staticBlock(2380,586,700,700,1.2090000000000007,0));
staticBlocks.push(new create_staticBlock(2742,326,700,700,2.4599999999999995,0));
staticBlocks.push(new create_staticBlock(-858,-344,200,50,-0.7470000000000006,0));
staticBlocks.push(new create_staticBlock(-778,-400,200,50,-9.197,0));
staticBlocks.push(new create_staticBlock(-908,-362,200,50,-10.231,0));
staticBlocks.push(new create_staticBlock(3640,362,1000,1000,2.3880000000000003,0));
staticBlocks.push(new create_staticBlock(3950,22,1000,1000,1.8350000000000009,0));
staticBlocks.push(new create_staticBlock(3492,598,1000,1000,1.590000000000001,0));
staticBlocks.push(new create_staticBlock(4990,546,1000,1000,0.5700000000000007,0));
staticBlocks.push(new create_staticBlock(5968,790,1000,1000,-2.2310000000000008,0));
staticBlocks.push(new create_staticBlock(5334,828,1000,1000,0,0));
staticBlocks.push(new create_staticBlock(6688,828,1000,1000,-0.12000000000000005,0));
staticBlocks.push(new create_staticBlock(7168,788,1000,1000,-1.1760000000000008,0));
staticBlocks.push(new create_staticBlock(8492,1316,1000,1000,-1.7110000000000007,0));
staticBlocks.push(new create_staticBlock(7892,1280,1000,1000,-2.5440000000000005,0));
staticBlocks.push(new create_staticBlock(9274,1616,1000,1000,-4.452,0));
staticBlocks.push(new create_staticBlock(10170,1688,1000,1000,-4.997999999999999,0));
staticBlocks.push(new create_staticBlock(9784,1752,1000,1000,-5.837999999999999,0));


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

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
if (params.blockWidth != undefined) {
    placement_block_width = params.blockWidth;
}
if (params.blockHeight != undefined) {
    placement_block_height = params.blockHeight;
}
if (params.roundness != undefined) {
    placement_block_roundness = params.roundness;
}

// Used to show where block will be spawned in the level editor mode
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


function SpawnObjects() {
    document.getElementById("spawn").value = "";
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
        if (editLevel == true) {
            document.getElementById("spawn").value += "\nstaticBlocks.push(new create_staticBlock(" + staticBlocks[i].x + "," + staticBlocks[i].y + "," + staticBlocks[i].width + "," + staticBlocks[i].height + "," + staticBlocks[i].rotation + "," + staticBlocks[i].roundness + "));"
        }
    }

}




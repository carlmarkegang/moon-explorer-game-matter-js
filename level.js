

staticBlocks.push(new create_staticBlock(200,400,200,50,0));
staticBlocks.push(new create_staticBlock(-284,386,200,50,0.43500000000000033));
staticBlocks.push(new create_staticBlock(538,506,500,500,0));
staticBlocks.push(new create_staticBlock(-462,324,200,50,6.521));
staticBlocks.push(new create_staticBlock(-634,254,200,50,6.8199999999999985));
staticBlocks.push(new create_staticBlock(-780,156,200,50,0.6539999999999959));
staticBlocks.push(new create_staticBlock(-884,26,200,50,-1.941000000000007));
staticBlocks.push(new create_staticBlock(-962,-154,200,50,-1.941000000000007));
staticBlocks.push(new create_staticBlock(142,356,200,50,2.415000000000001));
staticBlocks.push(new create_staticBlock(300,248,200,50,8.963000000000003));
staticBlocks.push(new create_staticBlock(468,230,200,50,15.948000000000004));
staticBlocks.push(new create_staticBlock(-926,-272,200,50,-0.6660000000000005));
staticBlocks.push(new create_staticBlock(-780,-342,200,50,-3.252));
staticBlocks.push(new create_staticBlock(-960,-298,200,50,-3.542));
staticBlocks.push(new create_staticBlock(-588,552,500,500,0.38900000000000035));
staticBlocks.push(new create_staticBlock(-938,370,500,500,0.6570000000000006));
staticBlocks.push(new create_staticBlock(-1134,38,500,500,2.786));
staticBlocks.push(new create_staticBlock(-1430,298,1000,1000,-0.1900000000000001));


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
            document.getElementById("spawn").value += "\nstaticBlocks.push(new create_staticBlock(" + staticBlocks[i].x + "," + staticBlocks[i].y + "," + staticBlocks[i].width + "," + staticBlocks[i].height + "," + staticBlocks[i].rotation + "));"
        }
    }

}




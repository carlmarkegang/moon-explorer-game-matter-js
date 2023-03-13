var Engine = Matter.Engine,
    Render = Matter.Render,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
Events = Matter.Events;
// create engine
var engine = Engine.create(), world = engine.world;
engine.gravity.y = 0.4;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1000,
        height: 650,
        wireframes: false,
        background: '#edebd1'
    }
});
Engine.run(engine);
Render.run(render);

var car = create_car(150, 100, 150, 30, 40);
var ground = Bodies.rectangle(400, 400, 8100, 30, {
    isStatic: true,
    render: {
        fillStyle: '#1e6b28',
        lineWidth: 0
    }
});
var rotated_block_1 = Bodies.rectangle(200, 400, 200, 50, {
    isStatic: true,
    render: {
        fillStyle: '#1e6b28',
        lineWidth: 0
    }
});
var rotated_block_2 = Bodies.rectangle(700, 450, 400, 200, {
    isStatic: true,
    render: {
        fillStyle: '#1e6b28',
        lineWidth: 0
    }
});

var rotated_block_3 = Bodies.rectangle(2000, 0, 200, 1000, {
    isStatic: true,
    render: {
        fillStyle: '#1e6b28',
        lineWidth: 0
    }
});


World.add(world, [
    car,
    ground,
    rotated_block_1,
    rotated_block_2,
    rotated_block_3
]);



Body.rotate(rotated_block_1, 0.7);
Matter.Body.set(rotated_block_1, "position", { x: 300, y: 430 })

Body.rotate(rotated_block_2, 0.3);

Body.rotate(rotated_block_3, 0.4);

function create_car(xx, yy, width, height, wheelSize) {
    var group = Body.nextGroup(true),
        wheelBase = 20,
        wheelAOffset = -width * 0.5 + wheelBase,
        wheelBOffset = width * 0.5 - wheelBase,
        wheelYOffset = 0;

    var car = Composite.create({ label: 'Car' }),
        body = Bodies.rectangle(xx, yy, width, height, {
            collisionFilter: {
                group: group
            },
            chamfer: {
                radius: height * 0.5
            },
            render: {
                fillStyle: '#5c5e5e',
                lineWidth: 0
            },
            density: 0.0002
        });

    var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
        collisionFilter: {
            group: group
        },
        render: {
            fillStyle: '#3f4142',
            lineWidth: 0,
            sprite: {
                texture: './assets/wheel.png'
            }
        },
        friction: 1
    });

    var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
        collisionFilter: {
            group: group
        },
        render: {
            fillStyle: '#3f4142',
            lineWidth: 0,
            sprite: {
                texture: './assets/wheel.png'
            }
        },
        friction: 1
    });

    var axelA = Constraint.create({
        bodyB: body,
        pointB: { x: wheelAOffset, y: wheelYOffset },
        bodyA: wheelA,
        stiffness: 1,
        length: 0
    });

    var axelB = Constraint.create({
        bodyB: body,
        pointB: { x: wheelBOffset, y: wheelYOffset },
        bodyA: wheelB,
        stiffness: 1,
        length: 0
    });

    
    Composite.addBody(car, wheelA);
    Composite.addBody(car, wheelB);
    Composite.addBody(car, body);
    Composite.addConstraint(car, axelA);
    Composite.addConstraint(car, axelB);

    return car;
};





var keysDown = {};
var WheelSpeed = 0.2;
var CameraFollow = 0;
function update() {
    if (16 in keysDown ) {
        WheelSpeed = 0.4;
    } else {
        WheelSpeed = 0.2;
    }

    if (68 in keysDown || 39 in keysDown) {
        Body.applyForce(car.bodies[0], { x: car.bodies[0].position.x, y: car.bodies[0].position.y }, { x: 0.001, y: 0 });
        Body.setAngularVelocity(car.bodies[0], WheelSpeed)
        Body.setAngularVelocity(car.bodies[1], WheelSpeed)
        if (CameraFollow > -100) {
            CameraFollow -= 1;
        }

    }
    if (65 in keysDown || 37 in keysDown) {
        Body.applyForce(car.bodies[0], { x: car.bodies[0].position.x, y: car.bodies[0].position.y }, { x: -0.001, y: 0 });
        Body.setAngularVelocity(car.bodies[0], -WheelSpeed)
        Body.setAngularVelocity(car.bodies[1], -WheelSpeed)
        if (CameraFollow > 100) {
            CameraFollow += 1;
        }
    }

    if (87 in keysDown || 38 in keysDown) {
        //Body.setAngularVelocity(car.bodies[2], 0.05)
        Body.applyForce(car.bodies[2], { x: car.bodies[2].position.x, y: car.bodies[2].position.y }, { x: -0, y: -0.005 });
    }

    if (83 in keysDown || 40 in keysDown) {
        Body.setAngularVelocity(car.bodies[2], -0.05)
    }


}
window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
});
Events.on(render, 'beforeRender', function () {
    Render.lookAt(render, car.bodies[0], {
        x: 300 + CameraFollow,
        y: 400
    }, true);
});
let drawInterval = setInterval(update, 7);

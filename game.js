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
    Runner = Matter.Runner;
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
        background: '#19343c',
        showStats: true,
        showPerformance: true,
        pixelRatio: 1

    }
});


var runner = Runner.create({
    isFixed: true,
    fps: 60,
  });  

Render.run(render);
Runner.run(runner, engine);

var groundColor = "#89877e"

var car = create_car(150, 100, 150, 30, 40);
var ground = Bodies.rectangle(400, 400, 8100, 30, {
    isStatic: true,
    render: {
        fillStyle: groundColor,
        lineWidth: 0
    }
});
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
                fillStyle: '#c3613c',
                lineWidth: 0
            },
            density: 0.0002
        });

    var body2 = Bodies.rectangle(xx, yy, width - 140, height - 80, {
        collisionFilter: {
            group: group
        },
        render: {
            fillStyle: 'lightgrey',
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

    var body2Constraint = Constraint.create({
        bodyB: body,
        pointB: { x: 5, y: wheelYOffset },
        bodyA: body2,
        stiffness: 1,
        length: 0
    });


    Composite.addBody(car, wheelA);
    Composite.addBody(car, wheelB);
    Composite.addBody(car, body2);
    Composite.addBody(car, body);
    Composite.addConstraint(car, axelA);
    Composite.addConstraint(car, axelB);
    Composite.addConstraint(car, body2Constraint);

    return car;
};




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
        Body.setAngularVelocity(car.bodies[3], 0.05)
    }

    if (83 in keysDown || 40 in keysDown) {
        Body.setAngularVelocity(car.bodies[3], -0.05)
    }

    if (32 in keysDown) {
        Body.applyForce(car.bodies[3], { x: car.bodies[3].position.x, y: car.bodies[3].position.y }, { x: -0, y: -0.005 });
        Body.setAngularVelocity(car.bodies[2], 0.3)
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

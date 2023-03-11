

var keysDown = {};
function update() {
    if (68 in keysDown || 39 in keysDown) {
        Body.applyForce(car.bodies[0], { x: car.bodies[0].position.x, y: car.bodies[0].position.y }, { x: 0.008, y: 0 });
    }
    if (65 in keysDown || 37 in keysDown) {
        Body.applyForce(car.bodies[0], { x: car.bodies[0].position.x, y: car.bodies[0].position.y }, { x: -0.008, y: 0 });
    }

    if (87 in keysDown || 38 in keysDown) {
        Body.setAngularVelocity(car.bodies[0], 0.05)
    }

    if (83 in keysDown || 40 in keysDown) {
        Body.setAngularVelocity(car.bodies[0], -0.05)
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
        x: 400,
        y: 400
    });
});
let drawInterval = setInterval(update, 7);

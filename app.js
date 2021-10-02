let update = () => {};
let key_handler = (key, isPress) => {};
let intro_scene;
let next_scene;

function app(pixi) {
    let stage = new PIXI.Stage();
    pixi.stage = stage;

    PIXI.utils.sayHello("LD49 unstable!");

    intro_scene = Intro_scene(pixi);
    intro_scene.visible = false;
    stage.addChild(intro_scene);

    next_scene = Next_scene(pixi);
    next_scene.visible = false;
    stage.addChild(next_scene);

    select_scene(intro_scene);

    window.addEventListener(
        "keydown",
        (event) => {
            key_handler(event.keyCode, true);
            if(event.keyCode !== 116 && event.keyCode !== 122/* && event.keyCode !== 123*/) {
                event.preventDefault();
            }
        },
        false
    );

    window.addEventListener(
        "keyup",
        (event) => {
            key_handler(event.keyCode, false);
            event.preventDefault();
        },
        false
    );

    pixi.ticker.add(delta => update(delta, performance.now()));
}

let current_scene = null;
let back_scene = null;

function select_scene(scene, params) {
    if(current_scene !== null) {
        current_scene.visible = false;
    }
    scene.visible = true;
    current_scene = scene;

    update = scene.update;
    key_handler = scene.key_handler;
    scene.select(params);
}

function popup_scene(scene, params) {
    back_scene = current_scene;
    current_scene = scene;

    scene.visible = true;

    update = scene.update;
    key_handler = scene.key_handler;
    scene.select(params);
}
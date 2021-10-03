let update = () => {};
let key_handler = (key, isPress) => {};
let intro_scene;
let next_scene;
let dialog_scene;
let dirt_scene;
let perfomance_scene;
let wake_up_scene;

let ludum_scene = null;

function eye_wrap(scene) {
    scene.rect_width = parseInt(pixi.screen.width * 0.8);
    scene.rect_height = parseInt(pixi.screen.height * 0.8);
    scene.rect_x = parseInt(pixi.screen.width * 0.1);
    scene.rect_y = parseInt(pixi.screen.height * 0.1);

    let bg_left = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, scene.rect_x, pixi.screen.height)
        .endFill();

    let bg_right = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, scene.rect_x, pixi.screen.height)
        .endFill();
    bg_left.addChild(bg_right);

    let bg_top = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, pixi.screen.width - 2 * scene.rect_x, scene.rect_y)
        .endFill();
    bg_left.addChild(bg_top);

    let bg_bottom = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, pixi.screen.width - 2 * scene.rect_x, scene.rect_y)
        .endFill();
    bg_left.addChild(bg_bottom);

    let eye_top = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, scene.rect_width, scene.rect_height/2)
        .endFill();
    bg_left.addChild(eye_top);

    let eye_bottom = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, scene.rect_width, scene.rect_height/2)
        .endFill();
    bg_left.addChild(eye_bottom);

    scene.addChild(bg_left);

    bg_right.x = pixi.screen.width - scene.rect_x - 1;
    bg_top.x = scene.rect_x;
    bg_bottom.x = scene.rect_x;
    bg_bottom.y = pixi.screen.height - scene.rect_y - 1;
    eye_top.x = scene.rect_x;
    eye_top.y = scene.rect_y;
    eye_bottom.x = scene.rect_x;
    eye_bottom.y = scene.rect_y + scene.rect_height/2;

    let blur_filter = new PIXI.filters.BlurFilter();
    blur_filter.blur = 5;
    scene.filters = [blur_filter];

    scene.scene_start = null;
    scene.eye_wrap_flag = true;
    let step;
    let eye_opened = false;
    let update = scene.update;

    let wrap_update = (delta, now) => {
        if(scene.eye_wrap_flag){
            if(scene.scene_start === null) scene.scene_start = now;

            step = 16 * delta;
            if( now - scene.scene_start > 200){
                if (!eye_opened) {
                    eye_top.height -= step;
                    eye_bottom.y += step;
                    eye_bottom.height -= step;
                    if (eye_top.getBounds().height - step < 0){
                        eye_opened = true;
                    }
                } else {
                    bg_left.alpha -= 0.08 * delta;
                }
             }

            if(bg_left.alpha <= 0){
                scene.scene_start = null;
                scene.eye_wrap_flag = false;
            }

        } else {
            update(delta, now);
        }
    };

    scene.update = wrap_update;
    return scene;
}

function app(pixi) {
    let stage = new PIXI.Stage();
    pixi.stage = stage;

    PIXI.utils.sayHello("LD49 unstable!");

    let preintro_scene = Preintro_scene(pixi);
    preintro_scene.visible = false;
    stage.addChild(preintro_scene);
    
    ludum_scene = eye_wrap(Ludum_scene(pixi));
    ludum_scene.visible = false;
    stage.addChild(ludum_scene);

    dirt_scene = Dirt_scene(pixi);
    dirt_scene.visible = false;
    stage.addChild(dirt_scene);

    intro_scene = Intro_scene(pixi);
    intro_scene.visible = false;
    stage.addChild(intro_scene);

    perfomance_scene = Perfomance_scene(pixi);
    perfomance_scene.visible = false;
    stage.addChild(perfomance_scene);

    wake_up_scene = Wake_up_scene(pixi);
    wake_up_scene.visible = false;
    stage.addChild(wake_up_scene);

    dialog_scene = Dialog_scene(pixi);
    dialog_scene.visible = false;
    stage.addChild(dialog_scene);
    
    init_dialog_data();

    // select_scene(dialog_scene, "morning_1");
    //select_scene(preintro_scene);
    select_scene(dialog_scene, "to_ludum_dialog");
    // select_scene(wake_up_scene);

    window.addEventListener(
        "keydown",
        (event) => {
            key_handler(event.keyCode, true);
            if( event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 /*event.keyCode !== 116 && event.keyCode !== 122 && event.keyCode !== 123*/) {
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
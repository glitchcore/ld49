function Intro_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.bg = (color) => background
        .beginFill(color)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    {
        let message = new PIXI.Text("Welcome!", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - 100, pixi.screen.height/2);
        scene.addChild(message);
    }

    scene.interactive = true;
    scene.click = function(e) {
        console.log("click");
    }

    let blur_filter = new PIXI.filters.BlurFilter();
    let my_filter = new PIXI.Filter(null, my_fragment, {time: 0.});

    blur_filter.blur = 10;
    scene.filters = [blur_filter, my_filter];

    scene.update = (delta, now) => {
        if(now/1000 % 3 > 2) {
            blur_filter.blur = 0;
        } else if (now/1000 % 3 > 1) {
            blur_filter.blur = 10;
            // my_filter.time = 0.2;
        }
    };

    let scene_seq = [
        dirt_scene,
        ludum_scene,
    ];
    let seq_id = 0;

    scene.key_handler = (key, isPress) => {
        if(isPress) {
            let next_scene = scene_seq[seq_id % scene_seq.length];
            select_scene(next_scene);
            seq_id++;
        }
    };

    scene.select = () => {
    };

    return scene;
}

function Preintro_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0x97866c)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    let message = new PIXI.Text("LD49/Unstabe. Click to begin", DIALOG_STYLE_ANSWER);
    message.anchor.set(0.5);
    message.position.set(pixi.screen.width/2 - 100, pixi.screen.height/2);
    scene.addChild(message);

    let fadeout = false;

    scene.interactive = true;
    scene.click = function(e) {
        fadeout = true;
    }

    scene.update = (delta, now) => {
        if(fadeout) {
            message.alpha -= 0.02 * delta;
            if(message.alpha <= 0) {
                select_scene(intro_scene);
            }
        }
    };

    scene.key_handler = (key, isPress) => {
    };

    scene.select = () => {
    };

    return scene;
}
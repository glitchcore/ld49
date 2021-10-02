function Intro_scene(pixi) {
    let scene = new PIXI.Container();
    let next_screen;

    let background = new PIXI.Graphics()
        .beginFill(0x97866c)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    /*let frames = new PIXI.Graphics()
        .beginFill(colors)
        graphics.lineStyle(4, 0x0, .3);*/

    let message = new PIXI.Text("", DIALOG_STYLE_ANSWER);
    message.position.set(pixi.screen.width/2, pixi.screen.height/2);
    message.alpha = 0;
    message.anchor.set(0.5);
    scene.addChild(message);

    let scene_start = null;

    scene.update = (delta, now) => {
        if(scene_start === null) scene_start = now;

        if(message.alpha < 1) message.alpha += 0.02 * delta;

        if(now - scene_start > 2500 && scene.alpha > 0) {
            scene.alpha -= 0.05 * delta;
        }

        if(now - scene_start > 3000) {
            select_scene( next_screen.scene, next_screen.params );
        }
    };

    scene.key_handler = (key, isPress) => {
    };

    scene.select = (param) => {
        message.text = param.text;
        next_screen = param.next;
        
        scene_start = null;
        message.alpha = 0;
        scene.alpha = 1;
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
    message.position.set(pixi.screen.width/2, pixi.screen.height/2);
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
                select_scene(intro_scene, {
                    text: "4 days before Ludum...",
                    next: {
                        scene: dialog_scene,
                        params: "to_ludum_dialog"
                    }
                });
            }
        }
    };

    scene.key_handler = (key, isPress) => {
    };

    scene.select = () => {
    };

    return scene;
}
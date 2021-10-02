function Intro_scene(pixi) {
    let scene = new PIXI.Container();
    let next_screen;

    let background = new PIXI.Graphics()
        .beginFill(0x97866c)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    const FRAME_WIDTH = pixi.screen.width * 0.06;
    const FRAME_HEIGHT = pixi.screen.width * 0.08;
    const FRAME_SPACE = pixi.screen.width * 0.008;

    let frames = new PIXI.Graphics()
        // .beginFill(colors.white)
        .lineStyle(4, 0xffffff, 1.)
        .drawRoundedRect(-FRAME_WIDTH - FRAME_SPACE/2, 0, FRAME_WIDTH, FRAME_HEIGHT, FRAME_WIDTH/4)
        .drawRoundedRect(-2 * FRAME_WIDTH - 3 * FRAME_SPACE, 0, FRAME_WIDTH, FRAME_HEIGHT, FRAME_WIDTH/4)
        .drawRoundedRect(-3 * FRAME_WIDTH - 4 * FRAME_SPACE, 0, FRAME_WIDTH, FRAME_HEIGHT, FRAME_WIDTH/4)
        .drawRoundedRect(FRAME_SPACE/2, 0, FRAME_WIDTH, FRAME_HEIGHT, FRAME_WIDTH/4)
        .drawRoundedRect(FRAME_WIDTH + 3 * FRAME_SPACE, 0, FRAME_WIDTH, FRAME_HEIGHT, FRAME_WIDTH/4)
        .drawRoundedRect(2 * FRAME_WIDTH + 4 * FRAME_SPACE, 0, FRAME_WIDTH, FRAME_HEIGHT, FRAME_WIDTH/4);
    frames.position.set(pixi.screen.width/2, pixi.screen.height/2 - frames.height/2);
    scene.addChild(frames);

    let digits = [0, 1, 2, 3, 4, 5].map(digit => {
        let digit_graphic = new PIXI.Text(digit.toString(), DIALOG_STYLE_ANSWER);
        digit_graphic.anchor.set(0.5);
        scene.addChild(digit_graphic);

        return digit_graphic;
    });

    digits[2].position.set(-FRAME_WIDTH * 0.5 - FRAME_SPACE/2 + pixi.screen.width/2, pixi.screen.height/2);
    digits[1].position.set(-FRAME_WIDTH * 1.5 - 3 * FRAME_SPACE + pixi.screen.width/2, pixi.screen.height/2);
    digits[0].position.set(-FRAME_WIDTH * 2.5 - 4 * FRAME_SPACE + pixi.screen.width/2, pixi.screen.height/2);
    digits[3].position.set(FRAME_SPACE * 0.5 + FRAME_WIDTH/2 + pixi.screen.width/2, pixi.screen.height/2);
    digits[4].position.set(FRAME_WIDTH * 1.5 + 3 * FRAME_SPACE + pixi.screen.width/2, pixi.screen.height/2);
    digits[5].position.set(FRAME_WIDTH * 2.5 + 4 * FRAME_SPACE + pixi.screen.width/2, pixi.screen.height/2);

    let days_label = new PIXI.Text("DAYS", DIALOG_STYLE_MAIN);
    days_label.anchor.set(0.5);
    days_label.position.set(
        - FRAME_WIDTH * 2 - FRAME_SPACE * 3.5 + pixi.screen.width/2,
        pixi.screen.height/2 - FRAME_HEIGHT/2 - FRAME_SPACE * 2
    );
    scene.addChild(days_label);

    let hours_label = new PIXI.Text("HOURS", DIALOG_STYLE_MAIN);
    hours_label.anchor.set(0.5);
    hours_label.position.set(
        pixi.screen.width/2,
        pixi.screen.height/2 - FRAME_HEIGHT/2 - FRAME_SPACE * 2
    );
    scene.addChild(hours_label);

    let minutes_label = new PIXI.Text("MINUTES", DIALOG_STYLE_MAIN);
    minutes_label.anchor.set(0.5);
    minutes_label.position.set(
        FRAME_WIDTH * 2 + FRAME_SPACE * 3.5 + pixi.screen.width/2,
        pixi.screen.height/2 - FRAME_HEIGHT/2 - FRAME_SPACE * 2
    );
    scene.addChild(minutes_label);

    let main_label = new PIXI.Text("Ludum Dare 49 Starts", DIALOG_STYLE_ANSWER);
    main_label.anchor.set(0.5);
    main_label.position.set(
        pixi.screen.width/2,
        pixi.screen.height/2 - FRAME_HEIGHT/2 - FRAME_SPACE * 8
    );
    scene.addChild(main_label);


    let message = new PIXI.Text("", DIALOG_STYLE_ANSWER);
    message.position.set(pixi.screen.width/2, pixi.screen.height/2);
    message.alpha = 0;
    message.anchor.set(0.5);
    scene.addChild(message);

    let scene_start = null;

    scene.update = (delta, now) => {
        if(scene_start === null) scene_start = now;

        if(message.alpha < 1) message.alpha += 0.02 * delta;

        /*if(now - scene_start > 2500 && scene.alpha > 0) {
            scene.alpha -= 0.05 * delta;
        }

        if(now - scene_start > 3000) {
            select_scene(next_screen.scene, next_screen.params);
        }*/
    };

    scene.key_handler = (key, isPress) => {
    };

    scene.select = (param) => {
        // message.text = param.text;
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
function Kitchen_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();
    scene.addChild(background);

    let phone_sprite = PIXI.Sprite.from("assets/phone.png");
    phone_sprite.anchor.set(0.5);
    phone_sprite.width = scene.width * 0.8;
    phone_sprite.height = scene.height * 0.8;
    phone_sprite.x = scene.width * 0.5;
    phone_sprite.y = scene.height * 0.5;
    scene.addChild(phone_sprite);

    const FRAME_WIDTH = pixi.screen.width * 0.19;
    const FRAME_HEIGHT = pixi.screen.width * 0.06;
    const FRAME_SPACE = pixi.screen.width * 0.008;

    let frames = [0,0,0,0].map((_, id) => {
        console.log("frame");
        frame = new PIXI.Graphics()
            .beginFill(colors.white)
            .lineStyle(4, 0xffffff, 1.)
            .drawRoundedRect(
                -pixi.screen.width * (0.095 - (id % 2 == 0 ? 0.015 : 0.0)),
                -pixi.screen.height * (0.19 - id * 0.13),
                FRAME_WIDTH, FRAME_HEIGHT, FRAME_WIDTH/8
            )
        frame.position.set(pixi.screen.width/2, pixi.screen.height/2 - frame.height/2);
        frame.visible = false;
        scene.addChild(frame);

        return frame;
    });

    let blur_filter = new PIXI.filters.BlurFilter();
    blur_filter.blur = 5;
    scene.filters = [blur_filter];

    let scene_start = null;
    let message_time = null;
    let message_counter = 0;

    scene.update = (delta, now) => {
        if(scene_start === null) scene_start = now;
        if(message_time === null) message_time = now;

        if(now - message_time > 1200) {
            if(message_counter < frames.length) {
                message_time = now;
                frames[message_counter].visible = true;
                message_counter++;
            } else {
                select_scene(dialog_scene, "perfomance_after");
            }
        }
    }

    scene.key_handler = (key, isPress) => {
    };

    scene.select = () => {
        message_counter = 0;
        message_time = null;
        scene_start = null;

        frames.forEach(frame => {frame.visible = false;});
    };

    return scene;
}
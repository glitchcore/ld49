function Ludum_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0xbe9871)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();
    scene.addChild(background);

    let sprite_list = [
        "assets/laptop-0.jpg",
        "assets/laptop-1.jpg",
        "assets/laptop-2.jpg",
        "assets/laptop-3.jpg",
        "assets/laptop-4.jpg",
    ].map(name => PIXI.Sprite.from(name));

    sprite_list.forEach(sprite => {
        sprite.anchor.set(0.5);
        sprite.width = scene.width * 0.8;
        sprite.height = scene.height * 0.8;
        sprite.x = scene.width * 0.5;
        sprite.y = scene.height * 0.5;
        scene.addChild(sprite);
    });

    let ludum_sprite = PIXI.Sprite.from("assets/ludum.png");
    ludum_sprite.anchor.set(0.5);
    ludum_sprite.width = scene.width * 0.22;
    ludum_sprite.height = scene.height * 0.22;
    ludum_sprite.x = scene.width * 0.55;
    ludum_sprite.y = scene.height * 0.3;
    ludum_sprite.visible = false;
    scene.addChild(ludum_sprite);

    
    let blur_filter = new PIXI.filters.BlurFilter();
    blur_filter.blur = 5;
    scene.filters = [blur_filter];

    let tilt_time = null;
    let tilt = 0;
    let seq_speed = 0.005;
    let seq_id = 0;

    const speed_seq = [0.003, 0.002, 0.002, 0.003, 0.002];

    let scene_start = null;

    scene.update = (delta, now) => {
        sprite_list.forEach((sprite, id, all) => {
            sprite.alpha = 0.5 + 0.5 * Math.sin(
                now * seq_speed +
                Math.PI * 2 * id / all.length
            );
        });

        if(tilt_time === null) tilt_time = now;
        if(scene_start === null) scene_start = now;

        if(now - tilt_time > 1000) {
            tilt_time = now;
            shuffle(sprite_list);
            seq_speed = speed_seq[seq_id % speed_seq.length];
            seq_id++;
        }

        if(now - scene_start > 3000) {
            ludum_sprite.visible = true;
        }

        if(now - scene_start > 6000) {
            select_scene(dialog_scene, "to_ludum_continue");
        }
    }

    scene.key_handler = (key, isPress) => {
        
    };

    scene.select = () => {
        scene_start = null;
        tilt_time = null;
        seq_id = 0;
    };

    return scene;
}
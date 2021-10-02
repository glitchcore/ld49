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
        sprite.x = scene.width / 2;
        sprite.y = scene.height / 2;
        scene.addChild(sprite);
    });
    
    let blur_filter = new PIXI.filters.BlurFilter();
    blur_filter.blur = 5;
    scene.filters = [blur_filter];

    let tilt_time = null;
    let tilt = 0;
    let seq_speed = 0.005;
    let seq_id = 0;

    const speed_seq = [0.005, 0.001, 0.002, 0.001, 0.001];

    scene.update = (delta, now) => {
        sprite_list.forEach((sprite, id, all) => {
            sprite.alpha = 0.5 + 0.5 * Math.sin(
                now * seq_speed +
                Math.PI * 2 * id / all.length
            );
        });

        if(tilt_time === null) tilt_time = now;

        if(now - tilt_time > 2000) {
            tilt_time = now;
            shuffle(sprite_list);
            seq_speed = speed_seq[seq_id % speed_seq.length];
            seq_id++;
        }
    }

    scene.key_handler = (key, isPress) => {
        
    };

    scene.select = () => {
    };

    return scene;
}
function Dirt_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0x97866c)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();
    scene.addChild(background);

    let sprite_list = [
        "assets/dirt-0.jpg",
        "assets/dirt-1.jpg",
        "assets/dirt-2.jpg",
    ].map(name => PIXI.Sprite.from(name));

    sprite_list.forEach(sprite => {
        sprite.anchor.set(0.5);
        sprite.width = scene.width * 0.8;
        sprite.height = scene.height * 0.8;
        sprite.x = scene.width * 0.5;
        sprite.y = scene.height * 0.5;
        sprite.alpha = 0;
        scene.addChild(sprite);
    });
    sprite_list[0].alpha = 1;

    let blur_filter = new PIXI.filters.BlurFilter();
    blur_filter.blur = 5;
    scene.filters = [blur_filter];

    let sprite_id = 0;

    scene.update = (delta, now) => {
        let eoc = true;
        if(sprite_list[sprite_id].alpha > 0) {
            sprite_list[sprite_id].alpha -= 0.004 * delta;
            eoc = false;
        }
        if(sprite_list[sprite_id + 1].alpha <= 1) {
            sprite_list[sprite_id + 1].alpha += 0.004 * delta;
            eoc = false;
        }
        if(eoc) {
            sprite_id++;
            if(sprite_id === sprite_list.length - 1) {
                select_scene(intro_scene);
            }
        }
    }

    scene.key_handler = (key, isPress) => {
        
    };

    scene.select = () => {
        sprite_list.forEach(sprite => {
            sprite.alpha = 0;
        });
        sprite_list[0].alpha = 2;

        sprite_id = 0;
    };

    return scene;
}
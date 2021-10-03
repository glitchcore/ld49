function Wake_up_scene(pixi) {
    let scene = new PIXI.Container();
    let rect_width = parseInt(pixi.screen.width * 0.8);
    let rect_height = parseInt(pixi.screen.height * 0.8);
    let rect_x = parseInt(pixi.screen.width * 0.1);
    let rect_y = parseInt(pixi.screen.height * 0.1);


    let background = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();
    scene.addChild(background);

    /*let room_sprite = PIXI.Sprite.from("assets/room-wake.png");
    room_sprite.anchor.set(0.5);
    room_sprite.width = scene.width * 0.8;
    room_sprite.height = scene.height * 0.8;
    room_sprite.x = scene.width * 0.5;
    room_sprite.y = scene.height * 0.5;
    scene.addChild(room_sprite);*/

    let world_top = new PIXI.Graphics()
        .beginFill(0xE3FAFF)
        .drawRect(0, 0, rect_width, 10)
        .endFill();
    scene.addChild(world_top);

    let world_bottom = new PIXI.Graphics()
        .beginFill(0xE3FAFF)
        .drawRect(0, 0, rect_width, 10)
        .endFill();
    scene.addChild(world_bottom);

    world_top.x = rect_x;
    world_top.y = rect_y + parseInt(rect_height/2) - 10;
    world_bottom.x = rect_x;
    world_bottom.y = rect_y + parseInt(rect_height/2);

    //console.log(world_top.getBounds());
    //console.log("------------");
    //console.log(world_bottom.getBounds());

    let blur_filter = new PIXI.filters.BlurFilter();
    blur_filter.blur = 5;
    scene.filters = [blur_filter];

    let scene_start = null;
    let update_time = null;

    let step;

    scene.update = (delta, now) => {
        if(scene_start === null) scene_start = now;
        if(update_time === null) update_time = now;

        if(now - update_time > 100) {
            update_time = now;
            if( now - scene_start > 500 && world_bottom.getBounds().height < rect_height/2 ) {
                world_top.y -= step;
                world_top.height += step;
                world_bottom.height += step;
            }
        }
    }

    scene.key_handler = (key, isPress) => {
        
    };

    scene.select = (param) => {
        if (param === 'good'){
            step = 4;
        } else if (param === 'bad') {
            step = 2;
        } else {
            step = 3;
        }
    };

    return scene;
}
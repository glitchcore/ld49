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

        //if (world_bottom.getBounds().height > 0.8 * rect_height/2){
        //    console.log('AAAAAAAAAA');
        //    world_top.color = 0xE3FAFF;
        //}

    }

    scene.key_handler = (key, isPress) => {
        
    };

    scene.select = (param) => {
        if (param == 'good'){
            step = 4;
        } else if (param == 'bad') {
            step = 2;
        }
    };

    return scene;
}
function Perfomance_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();
    scene.addChild(background);



    scene.update = (delta, now) => {
    }

    scene.key_handler = (key, isPress) => {
        select_scene(dialog_scene, "perfomance_after");
    };

    scene.select = () => {
    };

    return scene;
}
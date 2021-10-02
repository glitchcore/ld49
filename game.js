let RED_STYLE_H1 = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 56,
  fill: "#ff3b94",
  stroke: '#55ffe1',
  strokeThickness: 1,
  dropShadow: true,
  dropShadowColor: "#af3dff",
  dropShadowBlur: 15,
  dropShadowAngle: Math.PI / 7,
  dropShadowDistance: 3,
});

function Intro_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0x030000)
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
        select_scene(intro_scene);
    }

    let blur_filter = new PIXI.filters.BlurFilter();
    blur_filter.blur = 10;
    scene.filters = [blur_filter];

    scene.update = (delta, now) => {
        if(now/1000 % 3 > 2) {
            blur_filter.blur = 0;
        } else if (now/1000 % 3 > 1) {
            blur_filter.blur = 10;
        } else {
            select_scene(next_scene)
        }
    };

    scene.key_handler = (key, isPress) => {
        
    };

    scene.select = () => {
    };

    return scene;
}

function Next_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0xFAD208)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    {
        let message = new PIXI.Text("GUBBLE GUM!", RED_STYLE_H1);
        message.position.set(pixi.screen.width/2 - 100, pixi.screen.height/2);
        scene.addChild(message);
    }

    scene.interactive = true;
    scene.click = function(e) {
        console.log("click");
        select_scene(intro_scene);
    }

    scene.update = (delta, now) => {
        if(now/1000 % 3 > 1) {
            select_scene(intro_scene)
        }
    };

    scene.key_handler = (key, isPress) => {

    };

    scene.select = () => {
    };

    return scene;
}
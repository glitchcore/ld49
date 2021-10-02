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

const my_fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;

void main(void)
{
   gl_FragColor = vTextureCoord.x > 0.
       ? texture2D(uSampler, vTextureCoord)
       : vec4(1., 0., 0., 1.);
}
`;

function Intro_scene(pixi) {
    let scene = new PIXI.Container();

    let background = new PIXI.Graphics()
        .beginFill(0x030000)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.bg = (color) => background
        .beginFill(color)
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
    let my_filter = new PIXI.Filter(null, my_fragment, {time: 0.});

    blur_filter.blur = 10;
    scene.filters = [blur_filter, my_filter];

    scene.update = (delta, now) => {
        if(now/1000 % 2 > 1) {
            blur_filter.blur = 10;
            // my_filter.time = 0.2;
        } else {
            blur_filter.blur = 0;
            // my_filter.time = 0.0;
        }
    };

    scene.key_handler = (key, isPress) => {
        
    };

    scene.select = () => {
    };

    return scene;
}
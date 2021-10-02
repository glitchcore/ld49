

let colors = {
    background_gray: 0x666650,
    light_yellow: 0xF5F592,
    gray: 0x393938,
    dark_gray: 0x292905,
    black: 0x000000,
    white: 0xFFFFFF,
};

let DIALOG_STYLE_H1 = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 50,
  fill: "#4E4A36",
  stroke: PIXI.utils.hex2string(colors.gray),
  strokeThickness: 1,
  dropShadow: true,
  dropShadowColor: PIXI.utils.hex2string(colors.light_yellow),
  dropShadowBlur: 15,
  dropShadowAngle: Math.PI / 7,
  dropShadowDistance: 3,
});
let DIALOG_STYLE_MAIN = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 30,
  fill: PIXI.utils.hex2string(colors.white),
  strokeThickness: 1
});
let DIALOG_STYLE_ANSWER = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 80,
  fill: PIXI.utils.hex2string(colors.white),
  strokeThickness: 1
});

let answers = [
    { name: "Кушац" },
    { name: "Гуляц" },
    { name: "Гуляц и кушац" },
    { name: "Орац"}
]

function Dialog_scene(pixi) {
    let scene = new PIXI.Container();
    let selected_answer = 0;

    let background = new PIXI.Graphics()
        .beginFill(colors.black)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    {
        // title
        let message = new PIXI.Text("Dialog", DIALOG_STYLE_H1);
        message.position.set( pixi.screen.width/2, pixi.screen.height - 100 );
        scene.addChild(message);
    }

    // поле для текста
    let dialog_text_field = new PIXI.Graphics()
        .beginFill(colors.black)
        .drawRect( 0, 0, pixi.screen.width - 200, 150)
        .endFill();

    {
        // dialog
        let message = new PIXI.Text("Какой-то текст, возможно, очень длинный", DIALOG_STYLE_MAIN);
        message.position.set( 10, 10 );
        dialog_text_field.addChild(message);
    }

    dialog_text_field.x = 100;
    dialog_text_field.y = 100;
    scene.addChild(dialog_text_field);

    //показываем варианты
    borders = show_answers(answers, scene);

    scene.interactive = true;
    scene.click = function(e) {
        console.log("click");
        select_scene(intro_scene);
    }

    scene.update = (delta, now) => {
    };

    scene.key_handler = (key, isPress) => {
        //console.log(key);// 38 - вверх, 40 - вниз, 13 - enter
        //console.log(isPress);
        if( key == 38 && isPress ){
            selected_answer = navigate('up', selected_answer, answers, borders);
        } else if( key == 40 && isPress ){
            selected_answer = navigate('down', selected_answer, answers, borders);
        }
    };

    scene.select = () => {
    };

    return scene;
}

function show_answers(answers, scene){
    let dialog_answers_area = new PIXI.Graphics()
        .beginFill(colors.black)
        .drawRect( 0, 0, pixi.screen.width - 200, 300)
        .endFill();

    let variants_delay = 100;
    let borders = [];

    answers.forEach( (v, v_num) => {
        console.log(v_num, v);
        // рамка для текста ответа
        let answer_shape = new PIXI.Graphics()
            .beginFill(colors.white)
            .drawRect(0, 0 + variants_delay * v_num, pixi.screen.width - 200, 100)
            .endFill();
        borders.push(answer_shape);
        // поле для текста ответа
        let answer_field = new PIXI.Graphics()
            .beginFill(colors.black)
            .drawRect(3, 3 + variants_delay * v_num, answer_shape.getBounds().width - 6, answer_shape.getBounds().height - 6)
            .endFill();
        answer_shape.addChild(answer_field);
        if ( v_num != 0 ){
            answer_shape.visible = false;
        }
        dialog_answers_area.addChild(answer_shape);
        {
            //  добавляем вариант ответа
            let message = new PIXI.Text(v.name, DIALOG_STYLE_ANSWER);
            message.position.set( 10, 10 + variants_delay * v_num );
            dialog_answers_area.addChild(message);
        }
    });
    dialog_answers_area.x = 100;
    dialog_answers_area.y = 300;
    scene.addChild(dialog_answers_area);

    return borders;
}

function navigate(direction, selected_answer, answers, borders){
    let length = answers.length;
    console.log(length, length - 1);

    borders.forEach( (border) => {
        border.visible = false;
    });

    if ( direction == 'up' && selected_answer > 0 ){
        selected_answer--;
    } else if ( direction == 'down' && selected_answer < length - 1 ){
        selected_answer++;
    }

    borders[selected_answer].visible = true;
    console.log("выбран ", selected_answer);
    return selected_answer;
}
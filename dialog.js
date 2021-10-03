let obsessions_data = [
];

function Dialog_scene(pixi) {
    let scene = new PIXI.Container();
    scene.sortableChildren = true;

    let next_obsession;
    let answer;
    let selected_answer;
    let borders;
    let fadeout = false;

    let background = new PIXI.Graphics()
        .beginFill(colors.black)
        .drawRect(0, 0, pixi.screen.width, pixi.screen.height)
        .endFill();

    scene.addChild(background);

    // поле для текста
    let dialog_text_field = new PIXI.Graphics()
        .beginFill(colors.black)
        .drawRect( 0, 0, pixi.screen.width - 200, 150)
        .endFill();


    let top_message = new PIXI.Text("", DIALOG_STYLE_MAIN);
    top_message.position.set(10, 10);
    dialog_text_field.addChild(top_message);

    dialog_text_field.x = 100;
    dialog_text_field.y = 100;
    scene.addChild(dialog_text_field);

    let answers_obsessions = [];

    let obsessions = [];

    scene.update = (delta, now) => {
        if(fadeout === false) {
            let need_update = false;
            obsessions.forEach(obsession => {
                if(obsession.update(delta, now)) {
                    need_update = true;
                }
            });
            if(need_update) {
                answers_obsessions = [...answers, ...obsessions.filter(x => x.is_answer)];
                shuffle(answers_obsessions);

                selected_answer = navigate(
                    "", selected_answer, answers_obsessions
                );
            }
        }

        if(fadeout) {
            scene.alpha -= 0.02 * delta;
            if(scene.alpha <= 0) {
                // cleanup scene
                answers.forEach(answer => scene.removeChild(answer));
                obsessions.forEach(obsession => scene.removeChild(obsession));
                
                select_scene(
                    answers_obsessions[selected_answer].action.scene,
                    answers_obsessions[selected_answer].action.params
                );
                if(next_obsession !== undefined) {
                    obsessions_data.push(next_obsession);
                }
            }
        }
    };

    scene.key_handler = (key, isPress) => {
        // console.log(key);// 38 - вверх, 40 - вниз, 13 - enter
        if(fadeout === false && isPress) {
            if(key == 38){
                selected_answer = navigate(
                    'up', selected_answer, answers_obsessions
                );
            } else if(key == 40){
                selected_answer = navigate(
                    'down', selected_answer, answers_obsessions
                );
            } else if(key == 13){
                fadeout = true;
            }
        }
    };

    scene.select = (dialog_name) => {
        scene.alpha = 1;
        fadeout = false;

        obsessions = show_obsessions(obsessions_data, scene);

        // показываем варианты
        answers = show_answers(dialog_data[dialog_name].answers, scene);
        answers_obsessions = [...answers, ...obsessions.filter(x => x.is_answer)];
        selected_answer = navigate("", 0, [...answers, ...obsessions.filter(x => x.is_answer)]);
        next_obsession = dialog_data[dialog_name].obsession;
        top_message.text = dialog_data[dialog_name].text;

        obsessions.forEach(obsession => scene.addChild(obsession));
    };

    return scene;
}

function show_answers(answers, scene){
    let dialog_answers_area = new PIXI.Graphics()
        .beginFill(colors.black)
        .drawRect( 0, 0, pixi.screen.width - 200, 300)
        .endFill();

    let variants_interval = 100;

    answers = answers.map((v, v_num) => {
        // рамка для текста ответа
        let cursor = new PIXI.Graphics()
            .beginFill(colors.white)
            .drawRect(0, 0, pixi.screen.width - 200, 100)
            .endFill();

        // поле для текста ответа
        let cursor_inner = new PIXI.Graphics()
            .beginFill(colors.black)
            .drawRect(
                0, 0,
                cursor.getBounds().width - 6, cursor.getBounds().height - 6
            )
            .endFill();
        cursor_inner.position.set(3, 3);
        cursor.addChild(cursor_inner);
        cursor.position.set(0, variants_interval * v_num);
        cursor.visible = false;

        dialog_answers_area.addChild(cursor);
        //  добавляем вариант ответа
        let text = new PIXI.Text(v.name, DIALOG_STYLE_ANSWER.clone());
        text.position.set(10, 10 + variants_interval * v_num);
        dialog_answers_area.addChild(text);

        return {
            cursor,
            text,
            action: v.action,
        };
    });

    dialog_answers_area.x = 100;
    dialog_answers_area.y = 300;
    scene.addChild(dialog_answers_area);

    return answers;
}

function navigate(direction, selected_answer, answers) {
    answers.forEach((answer) => {
        answer.cursor.visible = false;
    });

    if(selected_answer > (answers.length - 1)) selected_answer = answers.length - 1;

    if (direction == 'up' && selected_answer > 0){
        selected_answer--;
    } else if (direction == 'down' && selected_answer < answers.length - 1){
        selected_answer++;
    }

    answers[selected_answer].cursor.visible = true;
    return selected_answer;
}
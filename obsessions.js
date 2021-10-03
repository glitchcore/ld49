
function show_obsessions(obsessions_data, scene) {
    return obsessions_data.map(obsession => {
        let self = new PIXI.Container();

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
        cursor.visible = false;
        self.addChild(cursor);

        self.cursor = cursor;

        let text = new PIXI.Text(obsession.label, DIALOG_STYLE_ANSWER.clone());
        text.style.fill = 0xff0000;
        self.addChild(text);
        self.text = text;
        
        self.is_answer = false;
        self.is_answer_prev = self.is_answer;

        self.last_update = null;
        self.update_time = 500;

        self.zIndex = 99;

        self.update = (delta, now) => {
            let need_update = false;

            if(self.last_update === null) self.last_update = now;

            if(now - self.last_update > self.update_time) {
                self.last_update = now;

                let next_position = new PIXI.Point(Math.random() - 0.5, Math.random() - 0.5);
                let magnitude = Math.sqrt(Math.pow(next_position.x, 2) + Math.pow(next_position.y, 2));

                next_position.x = (0.5 + next_position.x) * pixi.screen.width;
                next_position.y = (0.5 + next_position.y) * pixi.screen.height;

                self.text.position.set(next_position.x, next_position.y);
                self.cursor.position.set(next_position.x, next_position.y);

                if(magnitude < 0.2) {
                    self.update_time = 2000 + Math.random() * 1000;

                    self.is_answer = true;
                    self.text.style.fill = 0xffffff;
                } else {
                    self.update_time = 500 + Math.random() * 500;

                    self.is_answer = false;
                    self.text.style.fill = 0xff0000;
                    self.cursor.visible = false;
                }

                if(self.is_answer !== self.is_answer_prev) need_update = true;
                self.is_answer_prev = self.is_answer;
            }

            return need_update;
        };

        self.update(0, null);

        self.action = obsession.action;

        return self;
    });
}
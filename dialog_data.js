let dialog_data = {};

function init_dialog_data(){
    dialog_data = {
        start_dialog: {
            text: "Уже утро?",
            answers: [
                {
                    name: "Открыть глаза",
                    action:
                    {
                        scene: dialog_scene,
                        params: "choose_activity"
                    }
                },
                {
                    name: "Спать ещё",
                    action:
                    {
                        scene: dialog_scene,
                        params: "start_dialog"
                    }
                }
            ]
        },
        choose_activity: {
            text: "Мы в отчаяниии... Нужно выбрать, что делать. Прямо сейчас! Если не выберем - лучше бы вышли в окно!",
            answers: [
                { name: "Поесть" },
                { name: "Пойти гулять" },
                { name: "И поесть, и погулять" },
                { name: "Сидеть и ОРАТЬ!"}
            ]
        }
    }
}

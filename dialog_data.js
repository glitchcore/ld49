let dialog_data = {};

function init_dialog_data(){
    dialog_data = {
        to_ludum_dialog: {
            text: "Хм... Скоро людумдаре! Мы пойдём?",
            answers: [
                {
                    name: "Конечно!",
                    action:
                    {
                        scene: ludum_scene
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

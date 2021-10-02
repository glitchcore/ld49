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
        to_ludum_continue: {
            text: "Всё! Зарегались :) Теперь надо не забыть до выходных",
            answers: [
                {
                    name: "Запомнили",
                    action:
                    {
                        scene: intro_scene,
                        params: {
                            text: "2 days before Ludum...",
                            next: {
                                scene: dialog_scene,
                                params: "dirty_pre"
                            }
                        }
                    }
                }
            ]
        },
        dirty_pre: {
            text: "Что это? Это наша квартира?",
            answers: [
                {
                    name: "Смотреть",
                    action:
                    {
                        scene: dirt_scene
                    }
                }
            ]
        },
        dirty_after: {
            text: "Пора прибраться...",
            answers: [
                {
                    name: "Сделаю на выходных",
                    action:
                    {
                        scene: intro_scene,
                        params: {
                            text: "1 day before Ludum",
                            next: {
                                scene: dialog_scene,
                                params: "perfomance_pre"
                            }
                        }
                    }
                }
            ]
        },
        perfomance_pre: {
            text: "Пришло сообщение!",
            answers: [
                {
                    name: "Проверить телегу",
                    action:
                    {
                        scene: perfomance_scene
                    }
                }
            ]
        },
        perfomance_after: {
            text: "Ура! Нас зовут играть крутую музыку с крутыми музыкантами :)",
            answers: [
                {
                    name: "На выходных выступаем!",
                    action:
                    {
                        scene: perfomance_scene
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

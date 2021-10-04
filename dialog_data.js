let dialog_data = {};

function init_dialog_data(){
    init_intro_dialog(dialog_data);
}

function init_intro_dialog(dialog_data) {
    dialog_data.to_ludum_dialog = {
        text: "Хм... Скоро людумдаре! Мы пойдём?",
        answers: [
            {
                name: "Конечно!",
                action: {scene: ludum_scene}
            }
        ]
    };
    dialog_data.to_ludum_continue = {
        text: "Всё! Зарегались :) Теперь надо не забыть до выходных",
        obsession: {
            label: "Ludum!",
            action: {scene: ludum_scene}
        },
        answers: [
            {
                name: "Запомнили",
                action: {
                    scene: intro_scene,
                    params: {
                        time: 2,
                        next: {scene: dialog_scene, params: "dirty_pre"}
                    }
                }
            }
        ]
    };
    dialog_data.dirty_pre = {
            text: "Что это? Это наша квартира?",
            answers: [
                {
                    name: "Смотреть",
                    action: {scene: dirt_scene}
                }
            ]
        },
    dialog_data.dirty_after = {
        text: "Пора прибраться...",
        obsession: {
            label: "Прибраться!",
            action: {scene: dirt_scene}
        },
        answers: [
            {
                name: "Сделаю на выходных",
                action:
                {
                    scene: intro_scene,
                    params: {
                        time: 1,
                        next: {scene: dialog_scene, params: "perfomance_pre"}
                    }
                }
            }
        ]
    };
    dialog_data.perfomance_pre = {
            text: "Пришло сообщение!",
            answers: [
                {
                    name: "Проверить телегу",
                    action:{scene: perfomance_scene}
                }
            ]
        },
    dialog_data.perfomance_after = {
        text: "Ура! Нас зовут играть крутую музыку с крутыми музыкантами :)",
        obsession: {
            label: "Подготовиться к выступлению",
            action: {scene: perfomance_scene}
        },
        answers: [
            {
                name: "На выходных выступаем!",
                action: {scene: dialog_scene, params: "morning_1"}
            }
        ]
    };
    dialog_data.morning_1 = {
        text: "Утро... Или ещё ночь... Какой сейчас год... Спаааать...",
        answers: [
            {
                name: "Спать ещё",
                action: {scene: dialog_scene, params: "morning_2"}
            },
            {
                name: "Просыпаемся",
                action: {scene: wake_up_scene, params: "bad"}
            }
        ]
    };
    dialog_data.morning_2 = {
        text: "Кажется, выспались!",
        answers: [
            {
                name: "Просыпаемся",
                action: {scene: wake_up_scene, params: "good"}
            },
            {
                name: "Спать ещё",
                action: {scene: dialog_scene, params: "morning_3"}
            }
        ]
    };
    dialog_data.morning_3 = {
        text: "Мы всё проспали? Ежки-кошки...",
        answers: [
            {
                name: "Просыпаемся! Без вариантов!",
                action: {scene: wake_up_scene, params: "bad"}
            }
        ]
    };

    dialog_data.choose_activity = {
        text: "Мы в отчаяниии... Нужно выбрать, что делать. Прямо сейчас! Если не выберем - лучше бы вышли в окно!",
        answers: [
            { name: "Поесть" },
            { name: "Пойти гулять" },
            { name: "И поесть, и погулять" },
            { name: "Сидеть и ОРАТЬ!"}
        ]
    };
}

let game = {
    ctx: null,
    platform: null,
    ball: null,
    sprites: {
        background: null,
        ball: null,
        platform: null
    },

    init: function () {
        // Инициализация нашей игры
        this.ctx = document.getElementById('mycanvas').getContext('2d');
    },

    preload: function (callback) {
        // Прелоад спрайтов
        let loaded = 0;
        let required = Object.keys(this.sprites).length; //Количество спрайтов

        //Цикл добавляющий к каждому спрайту картинку, а так же контроль загрузки картинок
        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = `img/${key}.png`;

            this.sprites[key].addEventListener('load', () => {
                ++loaded;

                if (loaded >= required) {
                    callback();
                }
            });

        }
    },

    run: function () {
        // Запуск игры
        window.requestAnimationFrame(() => {
            this.render();
        });
    },

    render: function () {
        // Что именно будем отрисовывать
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
        this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);

    },

    start: function () {
        this.init();
        this.preload(() => {
            this.run();
        });
    }
};

// Исходные значения местоположения на канвасе
game.ball = {
    x: 320,
    y: 280,
    width: 20,
    height: 20
}

game.platform = {
    x: 280,
    y: 300
};

// Объект window на который установлен обработчик событий
// позволяющий запускать метод start объекта game после загрузки html страницы. 
window.addEventListener('load', () => {
    game.start();
});


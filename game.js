const keys = {
    left: 37,
    right: 39
};

let game = {
    ctx: null,
    platform: null,
    ball: null,
    blocks: [],
    rows: 4,
    cols: 8,

    sprites: {
        background: null,
        ball: null,
        platform: null,
        block: null,
    },

    init: function () {
        // Инициализация нашей игры
        this.ctx = document.getElementById('mycanvas').getContext('2d');
        this.setEvents();
    },
    // Двигаем платформу
    setEvents() {
        window.addEventListener('keydown', e => {
            if (e.keyCode === keys.left || e.keyCode === keys.right) {
                this.platform.start(e.keyCode);
            }
        });

        window.addEventListener('keyup', e => {
            this.platform.stop();
            this.platform.dx = 0;
        });
    },

    preload: function (callback) {
        // Прелоад спрайтов
        let loaded = 0;
        let required = Object.keys(this.sprites).length; //Количество спрайтов

        let onImageLoad = () => {
            ++loaded;
            if (loaded >= required) {
                callback();
            }
        }
        //Цикл добавляющий к каждому спрайту картинку, а так же контроль загрузки картинок
        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = `img/${key}.png`;
            this.sprites[key].addEventListener('load', onImageLoad);
        }
    },
    create: function () {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.blocks.push({
                    x: 64 * col + 65,
                    y: 24 * row + 35
                });
            }
        }
    },
    // Изменения в игровом поле
    update: function () {
        this.platform.move();
    },

    run: function () {
        // Запуск игры
        window.requestAnimationFrame(() => {
            this.update();
            this.render();
            this.run();
        });
    },

    render: function () {
        // Что именно будем отрисовывать
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
        this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
        this.renderBlocks();
    },

    renderBlocks() {
        for (let block of this.blocks) {
            this.ctx.drawImage(this.sprites.block, block.x, block.y);
        }
    },

    start: function () {
        this.init();
        this.preload(() => {
            this.create();
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
    velocity: 6,
    dx: 0,
    x: 280,
    y: 300,

    start(direction) {
        if (direction === keys.left) {
            this.dx = - this.velocity;
        }
        else if (direction === keys.right) {
            this.dx = this.velocity;
        }
    },

    stop() {
        this.dx = 0;
    },

    move() {
        if (this.dx) {
            this.x += this.dx;
            game.ball.x += this.dx;
        }
    }
};

// Объект window на который установлен обработчик событий
// позволяющий запускать метод start объекта game после загрузки html страницы. 
window.addEventListener('load', () => {
    game.start();
});


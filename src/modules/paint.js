import Component from './component';

class Paint extends Component {
    constructor(data) {
        super(data);
        this._canvas = null;
        this._ctx = null;
        
        this._canvasPosition = {left:null,top:null,};
        this._startPosition = {x: null,y: null,};
        this._currentPosition = {x: null,y: null,};
        this._drawing = false;
        this._drawOptions = {
            color: '#000000',
            lineWidth: 1,
        }
        this._pencilType = {
            pencil: 'Карандаш',
            line: 'Линия',
            rect: 'Прямоугольник',
            circle: 'Круг',
            eraser: 'Ластик',
        };
        this._currentPencilType = null;
        this._pointsArray = [];

        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
        this._onDrawOptionsChange = this._onDrawOptionsChange.bind(this);
        this._onPencilTypeChange = this._onPencilTypeChange.bind(this);

    }

    get template() {
        return `
        <div class="paint">
            <div class="paint__col">
                <input class="paint__display" type="text">
                <canvas class="paint__canvas js-paint-canvas" width="600" height="400"></canvas>
                <div class="paint__row">
                    
                    <input class="paint__name" type="text" placeholder="Укажите имя файла">
                    <button class="paint__save">save</button>

                    <button class="paint__clear">clear</button>
                    
                    <button class="paint__download">download</button>
                </div>
            </div>
            <div class="paint__col">
                <div class="paint__group-box">
                    ${Object.keys(this._pencilType).map((it, i) => `
                        <label>
                            <input class="paint__radio js-pencil-type" name="pencil-type" data-pencil-type=${it} type="radio" ${i === 0 ? `checked` : ``}>
                            ${this._pencilType[it]}
                        </label>`).join(` `)
                    }
                </div>
                <div class="paint__group-box">
                    <label>
                        <input class="paint__color js-paint-option" data-option-type="color" type="color">
                        Цвет линии
                    </label>
                    <label>
                        <input class="paint__color js-paint-option" data-option-type="lineWidth" type="number" value=${this._drawOptions.lineWidth}>
                        Толщина линии
                    </label>
                </div>
            </div>
        </div>`.trim();
    }

    _init() {
        this._currentPencilType = this._pencilType.pencil;    
    }

    _drawLine() {
        if (this._canvas) {
            this._ctx.fillStyle = this._drawOptions.color;
            this._ctx.strokeStyle = this._drawOptions.color;
            this._ctx.lineWidth = this._drawOptions.lineWidth;
            this._ctx.beginPath();
            this._ctx.moveTo(this._startPosition.x, this._startPosition.y);
            this._ctx.lineTo(this._currentPosition.x, this._currentPosition.y);
            //this._ctx.closePath();
            this._ctx.stroke();
            this._startPosition.x = this._currentPosition.x;
            this._startPosition.y = this._currentPosition.y;
        }
    }

    _getCanvasCoords() {
        if (this._canvas) {
            const box = this._canvas.getBoundingClientRect();
            this._canvasPosition = {
                left: Math.round(box.left),
                top: Math.round(box.top),
            }
        }
    }

    _getPensilCoords(evt) {
        this._currentPosition.x = evt.clientX - this._canvasPosition.left;
        this._currentPosition.y = evt.clientY - this._canvasPosition.top;
    }

    _onMouseDown(evt) {
        evt.preventDefault();
        this._getCanvasCoords();
        this._startPosition = {
            x: evt.clientX - this._canvasPosition.left,
            y: evt.clientY - this._canvasPosition.top,
        };
        this._drawing = true;
    }

    _onMouseUp(evt) {
        evt.preventDefault();
        if (this._currentPencilType === this._pencilType.line) {
            this._getPensilCoords(evt);
            this._drawLine();
        }
        this._startPosition = null;
        this._drawing = false;
    }

    _onMouseMove(evt) {
        evt.preventDefault();
        if (this._drawing && this._currentPencilType === this._pencilType.pencil) {
            this._getPensilCoords(evt);
            this._drawLine();
        }
    }

    _onMouseOut(evt) {
        evt.preventDefault();
        this._drawing = false;
    }

    _onDrawOptionsChange(evt) {
        evt.preventDefault();
        const currentCtrl = evt.target;
        const newValueType = currentCtrl.dataset.optionType;
        const newValue = currentCtrl.value;
        this._drawOptions[newValueType] = newValue;
        console.log(this._drawOptions);
    }

    _onPencilTypeChange(evt) {
        evt.preventDefault();
        const dataPencilType = evt.target.dataset.pencilType;
        this._currentPencilType = this._pencilType[dataPencilType];
    }

    bind() {
        const optionsCtrl = this._element.querySelectorAll('.js-paint-option');
        const pencilTypeCtrl = this._element.querySelectorAll('.js-pencil-type');
        
        this._canvas = this._element.querySelector('.js-paint-canvas');
        this._ctx = this._canvas.getContext('2d');

        this._canvas.addEventListener('mousedown', this._onMouseDown);
        this._canvas.addEventListener('mouseup', this._onMouseUp);
        this._canvas.addEventListener('mousemove', this._onMouseMove);
        this._canvas.addEventListener('mouseout', this._onMouseOut);
        optionsCtrl.forEach(el => {
            el.addEventListener('change', this._onDrawOptionsChange);
        });
        pencilTypeCtrl.forEach(el => {
            el.addEventListener('change', this._onPencilTypeChange);
        });
    }

    unbind() {}
}

export default Paint;

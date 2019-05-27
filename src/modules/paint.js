import Component from './component'
class Paint extends Component {
    constructor(data) {
        super(data);
        this._startPointX = null;
        this._startPointY = null;
        this._currentPointX = null;
        this._currentPointY = null;
        this._canvasPosition = null;
        this._pointsArray = [];
    }

    get template() {
        return `
        <div class="row">
            <div class="col">
                <input id="id-display" type="text">
                <canvas class="canvas" id="id-canvas" width="600" height="400"></canvas>
                <div class="row">
                    
                    <input id="id-name" type="text" placeholder="Укажите имя файла">
                    <button id="id-save">save</button>
                    

                    <button id="id-clear">clear</button>
                    
                    <button id="id-download">download</button>
                </div>
            </div>
            <div class="col">
                <label for="fix-x">
                    <input id="fix-x" type="checkbox">
                    Фиксировать ось X
                </label>
                <label for="fix-y">
                    <input id="fix-y" type="checkbox">
                    Фиксировать ось Y
                </label>
                <div class="group-box">
                    <input name="pencil-type" type="radio">
                    <input name="pencil-type" type="radio">
                    <input name="pencil-type" type="radio">
                    <input name="pencil-type" type="radio">
                </div>
            </div>
        </div>`.trim();
    }
}

export default Paint;

import createDomElement from './create-dom-element';

class Component {
    constructor(data) {
        if (new.target === Component) {
            throw new Error('Нельзя создать экземпляр базового компонента!');
        }
        this._element = null;
    }

    get element() {
        return this._element;
    }

    get template() {
        throw new Error('Шаблон не определен, определяется в наследниках класса!');
    }

    render() {
        this._element = createDomElement(this.template);
        this.bind();
        return this._element;
    }

    unrender() {
        if (this._element) {
            this.unbind();
            this._element = null;
        }
    }

    update() {}

    bind() {}

    unbind() {}
}

export default Component;

import React from 'react';
import './card_input.css';

export class CardInput extends React.Component {
    state = {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
    }

    constructor(props) {
        super(props);
        this.area1 = React.createRef();
        this.area2 = React.createRef();
        this.area3 = React.createRef();
        this.area4 = React.createRef();
        this.switchArea = this.switchArea.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    componentDidMount() {
        this.area1.current.focus();
    }

    switchArea(number) {
        return event => {
            // Возврат бекспейсом с пустого поля
            if (event.key === 'Backspace'
                && event.target.value.length === 0
                && parseInt(number) !== 1
            ) {
                this.focusPrevious(number);
            }

            // Возврат бекспейсом с начала заполненного поля
            if (event.key === 'Backspace'
                && event.target.value.length !== 0
                && event.target.selectionStart === 0
                && event.target.selectionEnd === 0
                && parseInt(number) !== 1
            ) {
                this.focusPrevious(number);
            }

            // Переход по предыдущим заполненным полям вручную
            if (event.key !== 'Backspace'
                && event.key !== 'ArrowLeft'
                && event.key !== 'ArrowRight'
                && event.target.value.length === 4
                && parseInt(number) !== 4
            ) {
                this.focusNext(number);
            }

            // Навигация стрелочками
            if (event.key === 'ArrowLeft'
                && event.target.selectionStart === 0
                && parseInt(number) !== 1
            ) {
                event.preventDefault();
                this.focusPrevious(number);
            }

            if (event.key === 'ArrowRight'
                && event.target.selectionEnd === event.target.value.length
                && parseInt(number) !== 4
            ) {
                event.preventDefault();
                this.focusNext(number);
                this['area' + (parseInt(number) + 1)].current.selectionStart = 0;
                this['area' + (parseInt(number) + 1)].current.selectionEnd = 0;
            }
        }
    }

    focusPrevious(number) {
        this['area' + (number - 1)].current.focus();
        this['area' + (number - 1)].current.selectionStart
            = this['area' + (number - 1)].current.value.length;
    }

    focusNext(number) {
        this['area' + (parseInt(number) + 1)].current.focus();
        this['area' + (parseInt(number) + 1)].current.selectionStart
            = this['area' + (parseInt(number) + 1)].current.value.length;
    }

    changeInput(number) {
        return event => {
            if (event.target.value.match(/^\d+$/) || event.target.value.match(/^$/)) {
                this.setState({
                    ['input' + number]: event.target.value,
                });

                // Автопереход при заполнении инпута
                if (event.target.value.length === 4 && parseInt(number) !== 4) {
                    this.focusNext(number);
                }
            }
        }
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className='card_input'>
                <input type='text'
                       maxLength='4'
                       ref={this.area1}
                       value={this.state.input1}
                       onKeyDown={this.switchArea(1)}
                       onChange={this.changeInput(1)}
                />
                <input type='text'
                       maxLength='4'
                       ref={this.area2}
                       value={this.state.input2}
                       onKeyDown={this.switchArea(2)}
                       onChange={this.changeInput(2)}
                />
                <input type='text'
                       maxLength='4'
                       ref={this.area3}
                       value={this.state.input3}
                       onKeyDown={this.switchArea(3)}
                       onChange={this.changeInput(3)}
                />
                <input type='text'
                       maxLength='4'
                       ref={this.area4}
                       value={this.state.input4}
                       onKeyDown={this.switchArea(4)}
                       onChange={this.changeInput(4)}
                />
            </div>
        );
    }
}

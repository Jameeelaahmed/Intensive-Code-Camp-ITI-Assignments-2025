var buttons = document.querySelectorAll('input[type="button"]');
var input = document.querySelector('input[type="text"]');
const operators = ['+', '-', '*', '/'];
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        const currentValue = input.value;
        const lastChar = currentValue.slice(-1);
        const clickedValue = this.value;

        //more than one operator condition
        if (operators.includes(clickedValue)) {
            if (operators.includes(lastChar)) {
                input.value = currentValue.slice(0, -1) + clickedValue;
                return;
            }
        }
        if (clickedValue === '=') {
            const inputStr = input.value;
            let operatorIndex = -1;
            var operator = '';

            for (let i = 0; i < inputStr.length; i++) {
                if (operators.includes(inputStr[i])) {
                    operatorIndex = i;
                    operator = inputStr[i];
                    break;
                }
            }

            let leftValue = '';
            let rightValue = '';

            if (operatorIndex !== -1) {
                leftValue = inputStr.substring(0, operatorIndex);
                rightValue = inputStr.substring(operatorIndex + 1);
            }

            leftValue = parseFloat(leftValue)
            rightValue = parseFloat(rightValue)
            if (operator === '+') {
                var plus = leftValue + rightValue
                input.value = plus;
                return;
            } else if (operator === '-') {
                var minus = leftValue - rightValue;
                input.value = minus;
                return;
            } else if (operator === '*') {
                var mul = leftValue * rightValue;
                input.value = mul;
                return;
            } else if (operator === '/') {
                var div = leftValue / rightValue;
                input.value = div;
                return;
            }
        }

        if (clickedValue === 'C') {
            input.value = '';
            return;
        }

        if (clickedValue === '.') {
            const parts = currentValue.split(/[+\-*/]/);
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes('.')) {
                return;
            }
            input.value += '.';
            console.log(input.value)
            return;
        }
        var nonWrittenOper = ['C', '=']
        if (!nonWrittenOper.includes(clickedValue)) {
            input.value += clickedValue;
        }
    });
}
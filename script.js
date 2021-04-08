//Calculator class
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
//The clear fuction
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
//The remove or delete function
  remove() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
//The push or append function
  pushNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
//arithmetic fuction
  compute() {
    let arithmetic
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        arithmetic = (prev + current)
        break
      case '-':
        arithmetic = (prev - current)
        break
      case '÷':
        arithmetic = (prev / current)
        break
      case '*':
        arithmetic = (prev * current)
        break
      default:
        return
    }
    this.currentOperand = arithmetic
    this.operation = undefined
    this.previousOperand = ''
  }
//DisplayNumber
  DisplayNo(number) {
    const stringNo = number.toString()
    const intDigit = parseFloat(stringNo.split('.')[0])
    const decDigit = stringNo.split('.')[1]
    let integerDisplay
    if (isNaN(intDigit)) {
      integerDisplay = ''
    } else {
      integerDisplay = intDigit.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decDigit != null) {
      return `${integerDisplay}.${decDigit}`
    } else {
      return integerDisplay
    }
  }
//ChangeDisplay
  changeDisplayContent() {
    this.currentOperandTextElement.innerText =
      this.DisplayNo(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.DisplayNo(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

//querySelector for each values on the LHS
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.pushNumber(button.innerText)
    calculator.changeDisplayContent()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.changeDisplayContent()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.changeDisplayContent()
})
deleteButton.addEventListener('click', button => {
  calculator.remove()
  calculator.changeDisplayContent()
})


allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.changeDisplayContent()
})

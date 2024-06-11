let displayValue = "";
let operationValue = "";
let isCleanDisplay = false;

function appendNumber(number) {
  if (isCleanDisplay) {
    displayValue = "";
    isCleanDisplay = false;
  }

  displayValue += number;
  operationValue += number;
  updateDisplay();
}

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

function appendOperator(operator) {
  if (operationValue === "") return;

  if (isOperator(operationValue[operationValue.length - 1])) {
    operationValue = operationValue.slice(0, -1);
  }

  isCleanDisplay = true;
  operationValue += operator;
  updateDisplay();
}

function toggleOperatorActive(button) {
  const buttonClass = button.classList[0];

  const active = buttonClass !== "action";

  const operatorButtons = document.querySelectorAll(".operator");
  operatorButtons.forEach((btn) => btn.classList.remove("active"));

  if (active) {
    button.classList.add("active");
  }
}

function appendDecimal() {
  if (isCleanDisplay) {
    displayValue = "";
    isCleanDisplay = false;
  }

  if (
    isOperator(operationValue[operationValue.length - 1]) ||
    operationValue === ""
  ) {
    operationValue += "0.";
  } else if (!displayValue.includes(".")) {
    operationValue += ".";
  }

  if (displayValue === "") {
    displayValue = "0.";
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

function toggleSign() {
  if (displayValue !== "") {
    displayValue = displayValue.startsWith("-")
      ? displayValue.slice(1)
      : "-" + displayValue;

    operationValue = operationValue.replace(
      /([\+\-\*\/]\s*)?(-?\d+\.?\d*)$/,
      (match, operator, number) => {
        return operator ? operator + " -" + number : "-" + number;
      }
    );
  }

  updateDisplay();
}

// function calculatePercentage() {
//   if (displayValue !== "") {
//     console.log(displayValue, operationValue);

//     // Calcula a soma dos valores anteriores em operationValue
//     let sum = 0;
//     let lastNumber = parseFloat(displayValue);

//     console.log("1");

//     // Encontra todos os números na string operationValue e realiza as operações
//     const numbers = operationValue.split(/[\+\-\*\/]/);
//     numbers.forEach((num) => {
//       sum = eval(`${sum} ${operator || "+"} ${num}`);
//     });

//     console.log("2");

//     // Calcula a porcentagem do último número
//     const percentage = (lastNumber / sum) * 100;

//     console.log("3");

//     // Atualiza operationValue com a porcentagem calculada
//     operationValue += ` + ${percentage}`;

//     console.log("4");

//     // Atualiza displayValue com a porcentagem calculada
//     displayValue = percentage.toString();

//     console.log("5");

//     updateDisplay();
//   }
// }

function calculatePercentage() {
  console.log(displayValue, operationValue);
  if (displayValue !== "") {
    // Verificar se há operações anteriores
    if (
      operationValue.includes("+") ||
      operationValue.includes("-") ||
      operationValue.includes("*") ||
      operationValue.includes("/")
    ) {
      // Separar a operação em partes
      let parts = operationValue.split(/(\+|\-|\*|\/)/);

      // Pegar o último número da operação
      const lastNumber = parseFloat(parts[parts.length - 1]);

      // Calcular o resultado das operações anteriores

      let previousResult = eval(operationValue);

      // Calcular a porcentagem
      const percentage = lastNumber * 0.01;

      //   if (Number.isInteger(percentage)) {
      //     displayValue = percentage;
      //   } else {
      //     displayValue = percentage.toFixed(2).toString();
      //   }

      //   if (Number.isInteger(previousResult + percentage)) {
      //     operationValue = previousResult + percentage;
      //   } else {
      //     operationValue = (previousResult + percentage).toFixed(1).toString();
      //   }

      // Atualizar os valores
      displayValue = percentage;
      operationValue = previousResult + percentage;
    } else {
      // Se não houver operações anteriores, apenas calcular a porcentagem do valor atual
      const percentage = displayValue * 0.01;

      console.log("percentage2", percentage);

      // Atualizar os valores

      displayValue = percentage;
      operationValue = displayValue;
    }

    updateDisplay();
  }
}

function clearDisplay() {
  if (displayValue === "" || operationValue === "") return;

  displayValue = "";
  operationValue = "";
  updateDisplay();
}

function calculate() {
  if (operationValue === "") return;

  try {
    const result = eval(operationValue);

    console.log(result);
    if (Number.isInteger(result)) {
      displayValue = result.toString();
      operationValue = result.toString();
    } else {
      displayValue = result.toFixed(1).toString();
      operationValue = result.toFixed(1).toString();
    }
  } catch (error) {
    displayValue = "Erro";
  } finally {
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("display").value = displayValue;
}

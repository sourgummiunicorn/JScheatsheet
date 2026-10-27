const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const lamp = $('#lamp');
const lampButton = $('#lamp-button');
const lampStatus = $('#lamp-status');
let isLightOn = false;

function updateLamp() {
  lamp.classList.toggle('glowing', isLightOn);
  lampStatus.textContent = `The lamp is ${isLightOn ? 'ON' : 'OFF'}`;
  lampButton.textContent = isLightOn ? 'Turn lamp off' : 'Turn lamp on';
  lampButton.setAttribute('aria-pressed', String(isLightOn));
}

lampButton.addEventListener('click', () => {
  isLightOn = !isLightOn;
  updateLamp();
});

const labFiles = {
  html: {
    code: `<button id="lamp-button">Turn lamp on</button>\n<p id="lamp-status">The lamp is OFF</p>`,
    explanation: 'HTML creates the button and status message. Their IDs give JavaScript a way to find them.'
  },
  css: {
    code: `.lamp.glowing .bulb {\n  background: #ffdc5a;\n  box-shadow: 0 0 36px #ffbb37;\n}`,
    explanation: 'CSS decides how the lamp looks when JavaScript adds the glowing class.'
  },
  js: {
    code: `let isLightOn = false;\n\nlampButton.addEventListener("click", () => {\n  isLightOn = !isLightOn;\n  updateLamp();\n});`,
    explanation: 'JavaScript listens for a click, flips the boolean, then updates the page.'
  }
};

function showTab(name) {
  $$('.code-tabs button').forEach(button => button.setAttribute('aria-selected', String(button.dataset.tab === name)));
  $('#lab-code').textContent = labFiles[name].code;
  $('#code-explanation').textContent = labFiles[name].explanation;
}

$$('.code-tabs button').forEach(button => button.addEventListener('click', () => showTab(button.dataset.tab)));
showTab('html');

function buildPrompt() {
  const state = $('#prompt-state').value.trim();
  const trigger = $('#prompt-trigger').value.trim();
  const result = $('#prompt-result').value.trim();
  $('#prompt-output').textContent = `I am building an interactive web page in HTML, CSS, and JavaScript. I want ${state}. When ${trigger}, switch the state. The visible result should be: ${result}. Use clear variable names and explain each JavaScript line for a beginner.`;
}

$('#build-prompt').addEventListener('click', buildPrompt);

const copyText = {
  ifElse: `if (isLightOn) {\n  lampStatus.textContent = "ON";\n  lamp.classList.add("glowing");\n} else {\n  lampStatus.textContent = "OFF";\n  lamp.classList.remove("glowing");\n}`,
  prompt: () => $('#prompt-output').textContent
};

$$('.copy-button').forEach(button => button.addEventListener('click', async () => {
  const item = copyText[button.dataset.copy];
  const value = typeof item === 'function' ? item() : item;
  await navigator.clipboard.writeText(value);
  const original = button.textContent;
  button.textContent = 'Copied ✓';
  setTimeout(() => { button.textContent = original; }, 1300);
}));

$$('[data-answer]').forEach(button => button.addEventListener('click', () => {
  const correct = button.dataset.answer === 'true';
  $$('.answer-buttons button').forEach(item => item.classList.remove('selected', 'wrong'));
  button.classList.add(correct ? 'selected' : 'wrong');
  $('#mission-feedback').textContent = correct
    ? 'Correct. ! means “the opposite,” so false becomes true. The menu is now open.'
    : 'Try again. ! means “the opposite.” What is the opposite of false?';
}));

$('#reset-mission').addEventListener('click', () => {
  $$('.answer-buttons button').forEach(button => button.classList.remove('selected', 'wrong'));
  $('#mission-feedback').textContent = 'Choose an answer, then explain why.';
});

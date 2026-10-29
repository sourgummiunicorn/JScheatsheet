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

$$('.concept-try').forEach(button => button.addEventListener('click', () => {
  const play = $(`#play-${button.dataset.play}`);
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!isOpen));
  play.hidden = isOpen;
  button.textContent = isOpen ? '↗' : '×';
}));

const typeMessages = {
  number: '3 is a number. You can count with it or do math.',
  text: '"mint" is text, also called a string. The quotes hold the letters together.',
  boolean: 'true is a boolean. A boolean only answers true or false.'
};
$$('[data-type-demo]').forEach(button => button.addEventListener('click', () => {
  $('#data-output').textContent = typeMessages[button.dataset.typeDemo];
}));

let candyCount = 3;
function updateCandies() { $('#candy-output').textContent = `candies = ${candyCount}`; }
$('#candy-minus').addEventListener('click', () => { candyCount -= 1; updateCandies(); });
$('#candy-plus').addEventListener('click', () => { candyCount += 1; updateCandies(); });

function updateOperator() { const total = Number($('#operator-range').value); $('#operator-output').textContent = `${total} > 6 is ${total > 6}`; }
$('#operator-range').addEventListener('input', updateOperator);

const comparisonPairs = {
  converted: { label: '"2" and 2', results: [['==', true], ['===', false], ['!=', false], ['!==', true]] },
  different: { label: '1 and 2', results: [['==', false], ['===', false], ['!=', true], ['!==', true]] }
};
function showComparison(name) {
  const pair = comparisonPairs[name];
  $$('[data-comparison]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.comparison === name)));
  $('#comparison-output').innerHTML = `<strong>${pair.label}</strong>${pair.results.map(([operator, result]) => `<span><code>${operator}</code> → <b class="${result ? 'is-true' : 'is-false'}">${result}</b></span>`).join('')}`;
}
$$('[data-comparison]').forEach(button => button.addEventListener('click', () => showComparison(button.dataset.comparison)));
showComparison('converted');

function updateScore() { const score = Number($('#score-range').value); $('#score-output').textContent = `${score} → ${score > 50 ? 'Pass!' : 'Keep trying!'}`; }
$('#score-range').addEventListener('input', updateScore);

$('#cheer-button').addEventListener('click', () => { const name = $('#cheer-name').value.trim() || 'friend'; $('#cheer-output').textContent = `Go, ${name}!`; });

const fruits = ['apple', 'banana'];
$('#add-fruit').addEventListener('click', () => { if (!fruits.includes('mango')) fruits.push('mango'); $('#collection-output').textContent = `fruits = [${fruits.map(fruit => `"${fruit}"`).join(', ')}]`; });
$('#show-age').addEventListener('click', () => { $('#collection-output').textContent = 'students[0].age = 24'; });

$('#make-pizza').addEventListener('click', () => { const topping = $('#topping-input').value.trim() || 'cheese'; $('#pizza-output').textContent = `Pizza with ${topping} is ready!`; });

const eventLog = $('#event-log');
function addEventLog(message) {
  const item = document.createElement('p');
  item.textContent = message;
  eventLog.prepend(item);
  while (eventLog.children.length > 6) eventLog.lastElementChild.remove();
}
$('#event-click').addEventListener('click', () => addEventLog('🖱️ onclick: You clicked the button!'));
$('#event-double').addEventListener('dblclick', () => addEventLog('✨ ondblclick: You double-clicked!'));
$('#event-hover').addEventListener('mouseover', () => addEventLog('👋 onmouseover: Your pointer moved over the button!'));
const mouseEventButton = $('#event-mouse');
mouseEventButton.addEventListener('mousedown', () => addEventLog('⬇️ onmousedown: Mouse button pressed down.'));
mouseEventButton.addEventListener('mouseup', () => addEventLog('⬆️ onmouseup: Mouse button released.'));
$('#event-key').addEventListener('keydown', event => addEventLog(`⌨️ onkeydown: You pressed "${event.key}".`));
$('#clear-events').addEventListener('click', () => { eventLog.innerHTML = '<p>Event log: Try a control above.</p>'; });

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


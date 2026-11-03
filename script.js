const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

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

function updateEnergy() {
  const energy = Number($('#energy-range').value);
  const activity = energy < 60 ? 'rest' : energy < 80 ? 'snack' : 'create';
  $('#energy-number').textContent = energy;
  $('#energy-output').textContent = `${energy} → activity = "${activity}"`;
}
$('#energy-range').addEventListener('input', updateEnergy);

function celsiusToFahrenheit(celsius) { return (celsius * 9 / 5) + 32; }
$('#convert-temperature').addEventListener('click', () => {
  const celsius = Number($('#celsius-input').value);
  const fahrenheit = celsiusToFahrenheit(celsius);
  $('#temperature-output').textContent = `${celsius}°C → ${fahrenheit}°F`;
});

$('#run-for-loop').addEventListener('click', () => {
  const students = ['Yixin', 'Sarah', 'Erin', 'June', 'Xiran'];
  const found = [];
  for (let i = 0; i < students.length; i += 1) found.push(students[i]);
  $('#for-output').textContent = `Found: ${found.join(', ')}`;
});

$('#run-while-loop').addEventListener('click', () => {
  let count = 3;
  const countdown = [];
  while (count > 0) { countdown.push(count); count -= 1; }
  $('#while-output').textContent = `${countdown.join(' → ')} → done!`;
});

$('#cheer-button').addEventListener('click', () => { const name = $('#cheer-name').value.trim() || 'friend'; $('#cheer-output').textContent = `Go, ${name}!`; });

const fruits = ['apple', 'banana'];
$('#add-fruit').addEventListener('click', () => { if (!fruits.includes('mango')) fruits.push('mango'); $('#collection-output').textContent = `fruits = [${fruits.map(fruit => `"${fruit}"`).join(', ')}]`; });
$('#show-age').addEventListener('click', () => { $('#collection-output').textContent = 'students[0].age = 24'; });

$('#make-pizza').addEventListener('click', () => { const topping = $('#topping-input').value.trim() || 'cheese'; $('#pizza-output').textContent = `Pizza with ${topping} is ready!`; });

function buildPrompt() {
  const state = $('#prompt-state').value.trim();
  const trigger = $('#prompt-trigger').value.trim();
  const result = $('#prompt-result').value.trim();
  $('#prompt-output').textContent = `I am building an interactive web page in HTML, CSS, and JavaScript. I want ${state}. When ${trigger}, switch the state. The visible result should be: ${result}. Use clear variable names and explain each JavaScript line for a beginner.`;
}

$('#build-prompt').addEventListener('click', buildPrompt);

const copyText = {
  energy: `if (energyLevel < 60) {\n  activity = "rest";\n} else if (energyLevel < 80) {\n  activity = "snack";\n} else {\n  activity = "create";\n}`,
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


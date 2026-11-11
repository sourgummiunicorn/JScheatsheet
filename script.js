const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const themeToggle = $('#theme-toggle');
function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '🌙' : '💡';
  themeToggle.querySelector('.theme-label').textContent = isDark ? 'Dark' : 'Light';
  localStorage.setItem('js-field-guide-theme', theme);
}
themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
setTheme(localStorage.getItem('js-field-guide-theme') || 'light');

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

const wizards = ['Harry', 'Hermione'];
$('#add-wizard').addEventListener('click', () => { if (!wizards.includes('Ron')) wizards.push('Ron'); $('#collection-output').textContent = `wizards = [${wizards.map(wizard => `"${wizard}"`).join(', ')}]`; });
$('#show-house').addEventListener('click', () => { $('#collection-output').textContent = 'wizard.house = "Gryffindor"'; });

const wizardCards = [
  { name: 'Harry', house: 'Gryffindor', spell: 'Expelliarmus' },
  { name: 'Hermione', house: 'Gryffindor', spell: 'Alohomora' },
  { name: 'Ron', house: 'Gryffindor', spell: 'Wingardium Leviosa' }
];
function showWizard(name) {
  const wizard = wizardCards.find(card => card.name === name);
  const index = wizardCards.indexOf(wizard);
  $('#wizard-output').innerHTML = `<code>wizards[${index}]</code> is ${wizard.name} → <code>house</code>: ${wizard.house} · <code>spell</code>: ${wizard.spell}`;
}
$$('[data-wizard]').forEach(button => button.addEventListener('click', () => showWizard(button.dataset.wizard)));

const arrayMethodExamples = {
  pop: {
    title: 'pop() removes the last wizard',
    code: 'const wizards = ["Harry", "Hermione", "Ron"];\n\nconst lastWizard = wizards.pop();\n\nconsole.log(lastWizard); // "Ron"\nconsole.log(wizards); // ["Harry", "Hermione"]',
    explanation: 'pop() takes the final item out of the array and gives it back to us.'
  },
  splice: {
    title: 'splice() changes one position',
    code: 'const wizards = ["Harry", "Draco", "Hermione"];\n\nwizards.splice(1, 1, "Ron");\n\nconsole.log(wizards); // ["Harry", "Ron", "Hermione"]',
    explanation: 'splice(1, 1, "Ron") starts at index 1, removes one item, then puts Ron there.'
  },
  find: {
    title: 'find() finds the first match',
    code: 'const wizards = [\n  { name: "Harry", house: "Gryffindor" },\n  { name: "Draco", house: "Slytherin" }\n];\n\nconst slytherin = wizards.find(function (wizard) {\n  return wizard.house === "Slytherin";\n});\n\nconsole.log(slytherin.name); // "Draco"',
    explanation: 'find() stops when it finds the first character that passes the test.'
  },
  filter: {
    title: 'filter() makes a smaller list',
    code: 'const wizards = [\n  { name: "Harry", house: "Gryffindor" },\n  { name: "Hermione", house: "Gryffindor" },\n  { name: "Draco", house: "Slytherin" }\n];\n\nconst gryffindors = wizards.filter(function (wizard) {\n  return wizard.house === "Gryffindor";\n});\n\nconsole.log(gryffindors.length); // 2',
    explanation: 'filter() checks every item and returns a new array with only the matches.'
  },
  forEach: {
    title: 'forEach() visits every wizard',
    code: 'const wizards = ["Harry", "Hermione", "Ron"];\n\nwizards.forEach(function (wizard) {\n  console.log("Welcome, " + wizard + "!");\n});',
    explanation: 'forEach() repeats the same step once for every item in the array.'
  },
  sort: {
    title: 'sort() puts names in order',
    code: 'const wizards = ["Ron", "Harry", "Hermione"];\n\nwizards.sort();\n\nconsole.log(wizards);\n// ["Harry", "Hermione", "Ron"]',
    explanation: 'sort() rearranges this list alphabetically. It changes the original array.'
  }
};
const arrayMethodDialog = $('#array-method-dialog');
let arrayExampleTrigger;
$$('[data-array-method]').forEach(button => button.addEventListener('click', () => {
  const example = arrayMethodExamples[button.dataset.arrayMethod];
  arrayExampleTrigger = button;
  $('#array-method-title').textContent = example.title;
  $('#array-method-code').textContent = example.code;
  $('#array-method-explanation').textContent = example.explanation;
  arrayMethodDialog.showModal();
}));
arrayMethodDialog.addEventListener('close', () => { if (arrayExampleTrigger) arrayExampleTrigger.focus(); });

$('#make-pizza').addEventListener('click', () => { const topping = $('#topping-input').value.trim() || 'cheese'; $('#pizza-output').textContent = `Pizza with ${topping} is ready!`; });

function buildPrompt() {
  const state = $('#prompt-state').value.trim();
  const trigger = $('#prompt-trigger').value.trim();
  const result = $('#prompt-result').value.trim();
  $('#prompt-output').textContent = `I am building an interactive web page in HTML, CSS, and JavaScript. I want ${state}. When ${trigger}, switch the state. The visible result should be: ${result}. Use clear variable names and explain each JavaScript line for a beginner.`;
}

$('#build-prompt').addEventListener('click', buildPrompt);

function quizDraft() {
  return {
    html: $('#quiz-html').value,
    css: $('#quiz-css').value,
    js: $('#quiz-js').value
  };
}
function renderQuizPreview() {
  const draft = quizDraft();
  const htmlWithoutFiles = draft.html
    .replace(/<link\b[^>]*href=["']style\.css["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*src=["']script\.js["'][^>]*>\s*<\/script>/gi, '');
  const safeCss = draft.css.replace(/<\/style/gi, '<\\/style');
  const safeJs = draft.js.replace(/<\/script/gi, '<\\/script');
  const withStyles = htmlWithoutFiles.includes('</head>')
    ? htmlWithoutFiles.replace('</head>', `<style>${safeCss}</style></head>`)
    : `<style>${safeCss}</style>${htmlWithoutFiles}`;
  const finishedPreview = withStyles.includes('</body>')
    ? withStyles.replace('</body>', `<script>${safeJs}</script></body>`)
    : `${withStyles}<script>${safeJs}</script>`;
  $('#quiz-preview').srcdoc = finishedPreview;
}
[$('#quiz-html'), $('#quiz-css'), $('#quiz-js')].forEach(editor => editor.addEventListener('input', renderQuizPreview));
renderQuizPreview();
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function zipFiles(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let localSize = 0;
  for (const [name, source] of Object.entries(files)) {
    const nameBytes = encoder.encode(name);
    const fileBytes = encoder.encode(source);
    const crc = crc32(fileBytes);
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true); localView.setUint16(4, 20, true); localView.setUint16(6, 0x0800, true);
    localView.setUint32(14, crc, true); localView.setUint32(18, fileBytes.length, true); localView.setUint32(22, fileBytes.length, true); localView.setUint16(26, nameBytes.length, true);
    localHeader.set(nameBytes, 30);
    localParts.push(localHeader, fileBytes);
    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true); centralView.setUint16(4, 20, true); centralView.setUint16(6, 20, true); centralView.setUint16(8, 0x0800, true);
    centralView.setUint32(16, crc, true); centralView.setUint32(20, fileBytes.length, true); centralView.setUint32(24, fileBytes.length, true); centralView.setUint16(28, nameBytes.length, true); centralView.setUint32(42, localSize, true);
    centralHeader.set(nameBytes, 46);
    centralParts.push(centralHeader);
    localSize += localHeader.length + fileBytes.length;
  }
  const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true); endView.setUint16(8, Object.keys(files).length, true); endView.setUint16(10, Object.keys(files).length, true); endView.setUint32(12, centralSize, true); endView.setUint32(16, localSize, true);
  return new Blob([...localParts, ...centralParts, end], { type: 'application/zip' });
}
function downloadQuizFiles() {
  const draft = quizDraft();
  const zip = zipFiles({ 'index.html': draft.html, 'style.css': draft.css, 'script.js': draft.js, 'README.txt': 'My quiz project\n\nOpen index.html in a browser after you finish connecting your CSS and JavaScript files.\n' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zip);
  link.download = 'my-quiz-project.zip';
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  $('#quiz-save-message').textContent = 'Downloaded to your browser downloads ✓';
}
$('#download-quiz').addEventListener('click', downloadQuizFiles);

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


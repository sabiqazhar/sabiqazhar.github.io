const cli   = document.getElementById('cli');
const output = document.getElementById('output');

const commands = {
  help: () => `Available commands: about, projects, contact, clear`,
  about: () => `I'm a Software Engineer & Data Engineer who loves open-source, books, and coffee.`,
  projects: () => `Check my GitHub: <a href="https://github.com/sabiqazhar" target="_blank">https://github.com/sabiqazhar</a>`,
  contact: () => `Email: sabiqandazhar@gmail.com | LinkedIn: <a href="https://linkedin.com/in/sabiqazhar" target="_blank">https://linkedin.com/in/sabiqazhar</a>`,
  clear: () => { output.innerHTML = ''; return ''; }
};

cli.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = cli.value.trim();
    let response = commands[cmd] ? commands[cmd]() : `Command not found: ${cmd}`;
    if (response || response === '') appendLine(`guest@sabiqaz:~/aboutme$ ${cmd}`);
    if (response) appendLine(response);
    cli.value = '';
  }
});

function appendLine(text) {
  const p = document.createElement('p');
  p.innerHTML = text;
  output.appendChild(p);
  p.scrollIntoView({ behavior: 'smooth' });
}
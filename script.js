const cli   = document.getElementById('cli');
const output = document.getElementById('output');

const commands = {
  help: () => `Available commands: about, projects, contact, clear`,
  about: () => `I'm a Software Engineer & Data Engineer who loves open-source, books, and coffee.`,
  projects: () => `Check my GitHub: https://github.com/sabiqazhar`,
  contact: () => `Email: sabiqandazhar@gmail.com | LinkedIn: https://linkedin.com/in/sabiqazhar | Medium: https://medium.com/sabiqazhar`,
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
  p.textContent = text;
  output.appendChild(p);
  p.scrollIntoView({ behavior: 'smooth' });
}
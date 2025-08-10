const cli    = document.getElementById('cli');
const output = document.getElementById('output');

const commands = {
  help:     () => `Available commands: about, projects, contact, clear`,
  about:    () => `I'm a Software Engineer & Data Engineer who loves open-source, books, and coffee.`,
  projects: () => `Check my GitHub: <a href="https://github.com/sabiqazhar" target="_blank">https://github.com/sabiqazhar</a>`,
  contact:  () => `Email: sabiqandazhar@gmail.com | LinkedIn: <a href="https://linkedin.com/in/sabiqazhar" target="_blank">linkedin.com/in/sabiqazhar</a> | Medium: <a href="https://medium.com/sabiqazhar" target="_blank">medium.com/sabiqazhar</a>`,
  clear:    () => { output.innerHTML = ''; return ''; }
};

let lastCmd = '';

cli.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = cli.value.trim();
    if (cmd) lastCmd = cmd;

    let response = commands[cmd] ? commands[cmd]() : `Command not found: ${cmd}`;
    appendLine(`guest@sabiqaz:~/aboutme$ ${cmd}`);
    if (response) appendLine(response);
    cli.value = '';
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    cli.value = lastCmd;
  }
});

function appendLine(text) {
  const p = document.createElement('p');
  p.innerHTML = text;
  output.appendChild(p);
  p.scrollIntoView({ behavior: 'smooth' });
}
const editor = document.getElementById('editor');
const consoleEl = document.getElementById('console');
const statusEl = document.getElementById('status');
const language = document.getElementById('language');
const deviceType = document.getElementById('deviceType');

let serialPort = null;

function log(message) {
  consoleEl.textContent += `\n${message}`;
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

function setStatus(message) {
  statusEl.textContent = message;
}

async function connectSerial() {
  if (!('serial' in navigator)) {
    setStatus('Web Serial is not supported by this browser.');
    log('Use a Chromium-based browser with Web Serial support.');
    return;
  }

  try {
    serialPort = await navigator.serial.requestPort();
    await serialPort.open({ baudRate: 115200 });
    setStatus('USB / Serial connected');
    log('Serial device connected.');
  } catch (error) {
    setStatus('Connection cancelled');
    log(`Serial error: ${error.message}`);
  }
}

async function connectBluetooth() {
  if (!('bluetooth' in navigator)) {
    setStatus('Web Bluetooth is not supported by this browser.');
    log('Use a browser/device that supports Web Bluetooth.');
    return;
  }

  try {
    const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
    setStatus(`Bluetooth: ${device.name || 'device selected'}`);
    log(`Bluetooth device selected: ${device.name || 'Unnamed device'}`);
    log('Bluetooth GATT service/characteristic configuration is device-specific.');
  } catch (error) {
    setStatus('Bluetooth selection cancelled');
    log(`Bluetooth error: ${error.message}`);
  }
}

async function runCode() {
  const code = editor.value;
  const selectedLanguage = language.value;

  log(`Run requested (${selectedLanguage}).`);

  if (!serialPort) {
    log('No USB/Serial device is connected. The editor is ready, but no code was uploaded.');
    return;
  }

  // A generic serial device cannot safely accept arbitrary source code.
  // A device-specific uploader/bootloader must be implemented before writing bytes.
  log('Device connected, but automatic upload is not enabled for this device yet.');
  log(`Code length: ${code.length} characters.`);
}

function insertStarter() {
  if (language.value === 'python') {
    editor.value = `from microbit import *\n\nwhile True:\n    if button_a.is_pressed():\n        display.show("A")\n    elif button_b.is_pressed():\n        display.show("B")\n    else:\n        display.clear()\n`;
  } else {
    editor.value = `input.onButtonPressed(Button.A, function () {\n    basic.showString("A")\n})\n\ninput.onButtonPressed(Button.B, function () {\n    basic.showString("B")\n})\n`;
  }
  log('Starter code inserted.');
}

document.getElementById('connectSerial').addEventListener('click', connectSerial);
document.getElementById('connectBluetooth').addEventListener('click', connectBluetooth);
document.getElementById('runCode').addEventListener('click', runCode);
document.getElementById('insertStarter').addEventListener('click', insertStarter);
document.getElementById('clearEditor').addEventListener('click', () => {
  editor.value = '';
  log('Editor cleared.');
});

deviceType.addEventListener('change', () => {
  setStatus(`Selected: ${deviceType.options[deviceType.selectedIndex].text}`);
});

language.addEventListener('change', () => {
  log(`Language changed to ${language.value}.`);
});

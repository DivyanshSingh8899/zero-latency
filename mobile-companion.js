const urlInput = document.querySelector('#ws-url');
const connectButton = document.querySelector('#connect-button');
const connectionStatus = document.querySelector('#connection-status');
const connectionDot = document.querySelector('#connection-dot');
const reportForm = document.querySelector('#report-form');
const sendStatus = document.querySelector('#send-status');
let socket;

const params = new URLSearchParams(window.location.search);
urlInput.value = params.get('ws') || localStorage.getItem('zero-latency-ws-url') || '';

function setConnectionState(connected, message) {
  connectionStatus.textContent = message;
  connectionDot.classList.toggle('connected', connected);
  connectButton.textContent = connected ? 'Disconnect' : 'Connect';
}

function connect() {
  const url = urlInput.value.trim();
  if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
    setConnectionState(false, 'Enter a valid ws:// or wss:// URL.');
    return;
  }

  localStorage.setItem('zero-latency-ws-url', url);
  socket = new WebSocket(url);
  setConnectionState(false, 'Connecting...');
  socket.addEventListener('open', () => setConnectionState(true, 'Connected to desktop'));
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'CONNECTED') setConnectionState(true, message.message);
    if (message.type === 'ALERT_RECEIVED') sendStatus.textContent = 'Desktop received the report.';
    if (message.type === 'PATCH_APPLIED') sendStatus.textContent = 'Desktop applied the patch.';
    if (message.type === 'ERROR') sendStatus.textContent = message.message;
  });
  socket.addEventListener('close', () => setConnectionState(false, 'Disconnected from desktop'));
  socket.addEventListener('error', () => setConnectionState(false, 'Connection failed. Check Wi-Fi and the URL.'));
}

connectButton.addEventListener('click', () => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.close();
    return;
  }
  connect();
});

reportForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    sendStatus.textContent = 'Connect to the desktop before sending a report.';
    return;
  }

  const payload = {
    type: document.querySelector('#report-type').value,
    filePath: document.querySelector('#file-path').value.trim(),
    lineNumber: Number(document.querySelector('#line-number').value),
    originalCode: document.querySelector('#original-code').value,
    suggestedFix: document.querySelector('#suggested-fix').value,
    explanation: document.querySelector('#explanation').value.trim(),
  };

  socket.send(JSON.stringify(payload));
  sendStatus.textContent = 'Report sent. Waiting for desktop acknowledgement...';
});

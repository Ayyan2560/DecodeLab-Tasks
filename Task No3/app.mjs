
    // 1) Counter Click
    let count = 0;
    const countValue = document.getElementById('countValue');
    const interactionStatus = document.getElementById('interactionStatus');

    function renderCount() {
      countValue.textContent = count;
      interactionStatus.textContent = `Counter updated: ${count}`;
    }

    document.getElementById('increaseBtn').addEventListener('click', () => {
      count++;
      renderCount();
    });

    document.getElementById('decreaseBtn').addEventListener('click', () => {
      count--;
      renderCount();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      count = 0;
      renderCount();
    });

    // 2) Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
      const lightIsOn = document.body.classList.toggle('light-theme');
      themeToggle.textContent = lightIsOn ? '🌙 Dark mode' : '☀️ Light mode';
      themeToggle.setAttribute('aria-pressed', String(lightIsOn));
      interactionStatus.textContent = lightIsOn ? 'Light theme enabled' : 'Dark theme enabled';
    });

    // 3) Greeting form:
    const greetingForm = document.getElementById('greetingForm');
    const nameInput = document.getElementById('nameInput');
    const greetingMessage = document.getElementById('greetingMessage');

    greetingForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Stop the form from reloading the page.
      const name = nameInput.value.trim();
      if (!name) {
        greetingMessage.textContent = 'Please enter your name first.';
        nameInput.focus();
        return;
      }
      greetingMessage.textContent = `Welcome, ${name}! 🎉 Thanks for trying this interactive webpage.`;
      interactionStatus.textContent = `Greeting displayed for ${name}`;
    });

    // 4) Show/hide details by toggling a class.
    const detailsToggle = document.getElementById('detailsToggle');
    const detailsPanel = document.getElementById('detailsPanel');

    detailsToggle.addEventListener('click', () => {
      const isVisible = detailsPanel.classList.toggle('visible');
      detailsToggle.textContent = isVisible ? 'Hide details' : 'Show details';
      detailsToggle.setAttribute('aria-expanded', String(isVisible));
      detailsPanel.setAttribute('aria-hidden', String(!isVisible));
      interactionStatus.textContent = isVisible ? 'DOM details shown' : 'DOM details hidden';
    });

    // 5) Change and restore dynamic text.
    const dynamicMessage = document.getElementById('dynamicMessage');
    const originalMessage = '<strong>Ready when you are!</strong> Click the button to update this message.';
    const messages = [
      '<strong>Nice work!</strong> You just triggered a JavaScript click event.',
      '<strong>DOM updated!</strong> The text changed without refreshing the page.',
      '<strong>Keep experimenting!</strong> Small interactions make websites feel alive.'
    ];
    let messageIndex = 0;

    document.getElementById('changeTextBtn').addEventListener('click', () => {
      dynamicMessage.innerHTML = messages[messageIndex];
      messageIndex = (messageIndex + 1) % messages.length;
      interactionStatus.textContent = 'Dynamic message updated';
    });

    document.getElementById('restoreTextBtn').addEventListener('click', () => {
      dynamicMessage.innerHTML = originalMessage;
      messageIndex = 0;
      interactionStatus.textContent = 'Original message restored';
    });
  
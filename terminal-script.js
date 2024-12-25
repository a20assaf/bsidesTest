var TerminalEmulator = {
  init: function(screen) {
    var inst = Object.create(this);
    inst.screen = screen;
    inst.createInput();
    return inst;
  },

  createInput: function() {
    var inputField = document.createElement('div');
    var inputWrap = document.createElement('div');
    
    inputField.className = 'terminal_emulator__field';
    inputField.innerHTML = '';
    inputWrap.appendChild(inputField);
    this.screen.appendChild(inputWrap);
    this.field = inputField;
    this.fieldwrap = inputWrap;
  },

  enterInput: function(input) {
    return new Promise((resolve, reject) => {
      var randomSpeed = (max, min) => { 
        return Math.random() * (max - min) + min; 
      };

      var speed = randomSpeed(30, 50); // Reduced speed for faster typing
      var i = 0;
      var str = '';
      var type = () => {
        str = str + input[i];
        this.field.innerHTML = str.replace(/ /g, '&nbsp;');
        i++;
        
        setTimeout(() => {
          if (i < input.length) {
            if (i % 5 === 0) speed = randomSpeed(30, 50); // Maintain fast speed
            type();
          } else {
            resolve();
          }
        }, speed);
      };
      
      type();
    });
  },

  enterCommand: function() {
    return new Promise((resolve, reject) => {
      var resp = document.createElement('div');
      resp.className = 'terminal_emulator__command';
      resp.innerHTML = this.field.innerHTML;
      this.screen.insertBefore(resp, this.fieldwrap);
      
      this.field.innerHTML = '';
      resolve();
    });
  },

  enterResponse: function(response) {
    return new Promise((resolve, reject) => {
      var resp = document.createElement('div');
      resp.className = 'terminal_emulator__response';
      resp.innerHTML = response;
      this.screen.insertBefore(resp, this.fieldwrap);

      // Scroll to the bottom after new content is added
      this.screen.scrollTop = this.screen.scrollHeight;

      resolve();
    });
  },

  wait: function(time, busy) {
    busy = (busy === undefined) ? true : busy;
    return new Promise((resolve, reject) => {
      if (busy) {
        this.field.classList.add('waiting');
      } else {
        this.field.classList.remove('waiting');
      }
      setTimeout(() => {
        resolve();
      }, time); // Wait for the specified time
    });
  },

  reset: function() {
    return new Promise((resolve, reject) => {
      this.field.classList.remove('waiting');
      resolve();
    });
  }
};

// Check if the user has already visited the index
if (localStorage.getItem('hasVisited') === 'true') {
  // Redirect to the "soon.html" page directly if already visited
  window.location.href = 'soon.html';
} else {
  // Initialize Terminal Emulator if not visited before
  var TE = TerminalEmulator.init(document.getElementById('screen'));

  // Start the simulated installation process
  TE.wait(1000, false)
    .then(TE.enterInput.bind(TE, 'sudo apt install BSides_Amman; bsides_amman'))
    .then(TE.enterCommand.bind(TE))
    .then(TE.enterResponse.bind(TE, 'Installing:'))
    .then(TE.wait.bind(TE, 1000)) // Faster waiting
    .then(TE.enterResponse.bind(TE, '  Mohammad Al-Adwan - Lead Organizer'))
    .then(TE.wait.bind(TE, 300))  // Faster waiting
    .then(TE.enterResponse.bind(TE, '  Ayham Assaf - Co Organizer'))
    .then(TE.wait.bind(TE, 300))
    .then(TE.enterResponse.bind(TE, '  Qais Qupti - Co Organizer'))
    .then(TE.wait.bind(TE, 300))
    .then(TE.enterResponse.bind(TE, '  Abdalhameed Daradkeh - Co Organizer'))
    .then(TE.wait.bind(TE, 300))
    .then(TE.enterResponse.bind(TE, '  Abdulrahman Nahhas - Co Organizer'))
    .then(TE.wait.bind(TE, 300))
    .then(TE.enterResponse.bind(TE, '  Mohammad Omari - Co Organizer'))
    .then(TE.wait.bind(TE, 300))
    .then(TE.enterResponse.bind(TE, '  Layla AlZoubi - Team Advisor'))
    .then(TE.wait.bind(TE, 300))
    .then(TE.enterResponse.bind(TE, '  Rami Ahmad - Team Advisor'))
    .then(TE.wait.bind(TE, 500))
    .then(TE.enterResponse.bind(TE, 'Summary:'))
    .then(TE.enterResponse.bind(TE, '  Upgrading: 0, Installing: 8, Removing: 0, Not Upgrading: 0'))
    .then(TE.enterResponse.bind(TE, '  Download size: 0 MB'))
    .then(TE.enterResponse.bind(TE, '  Space needed: 2 MB / 20 GB available'))
    .then(TE.wait.bind(TE, 1000))
    .then(TE.enterResponse.bind(TE, 'Get:1 Team Data...'))
    .then(TE.wait.bind(TE, 500))  // Faster waiting
    .then(TE.enterResponse.bind(TE, 'Fetched 2 MB in 1s (2.0 MB/s)'))
    .then(TE.enterResponse.bind(TE, 'Selecting previously unselected team member Mohammad Al-Adwan...'))
    .then(TE.wait.bind(TE, 1000))
    .then(TE.enterResponse.bind(TE, '(Reading database ... 457891 files and directories currently installed.)'))
    .then(TE.wait.bind(TE, 1500))
    .then(TE.enterResponse.bind(TE, 'Preparing to install Mohammad...'))
    .then(TE.enterResponse.bind(TE, 'Unpacking Mohammad Al-Adwan (Lead Organizer)...'))
    .then(TE.enterResponse.bind(TE, 'Setting up Mohammad Al-Adwan...'))
    .then(TE.enterResponse.bind(TE, 'Processing triggers for team collaboration...'))
    .then(TE.wait.bind(TE, 1000))
    .then(TE.enterResponse.bind(TE, 'Selecting previously unselected team member Ayham Assaf...'))
    .then(TE.enterResponse.bind(TE, 'Preparing to install Ayham Assaf...'))
    .then(TE.enterResponse.bind(TE, 'Unpacking Ayham Assaf (Co Organizer)...'))
    .then(TE.enterResponse.bind(TE, 'Setting up Ayham Assaf...'))
    .then(TE.enterResponse.bind(TE, 'Processing triggers for LinkedIn sharing...'))
    .then(TE.wait.bind(TE, 500))  // Faster waiting
    .then(TE.enterResponse.bind(TE, 'Selecting previously unselected team member Qais Qupti...'))
    .then(TE.enterResponse.bind(TE, 'Preparing to install Qais Qupti...'))
    .then(TE.enterResponse.bind(TE, 'Unpacking Qais Qupti (Co Organizer)...'))
    .then(TE.enterResponse.bind(TE, 'Setting up Qais Qupti...'))
    .then(TE.enterResponse.bind(TE, 'Processing triggers for event coordination...'))
    .then(TE.wait.bind(TE, 1000))
    .then(TE.enterResponse.bind(TE, 'Running bsides_amman command...'))
    .then(TE.wait.bind(TE, 500))  // Faster waiting
    .then(TE.enterResponse.bind(TE, 'Launching event...'))
    .then(TE.enterResponse.bind(TE, 'Event has been successfully launched!'))
    .then(TE.enterResponse.bind(TE, 'All team members are now part of the BSides_Amman event.'))
    .then(TE.wait.bind(TE, 500))
    .then(TE.enterResponse.bind(TE, 'It\'s coming back again, and forever!'))
    .then(TE.wait.bind(TE, 3000)) // Added 3-second delay before "Redirecting..."
    .then(TE.enterResponse.bind(TE, 'Redirecting...'))  // Added redirect message
    .then(TE.wait.bind(TE, 3000)) // Wait for 3 seconds after "Redirecting..."
    .then(TE.reset.bind(TE))
    .then(() => {
      // After showing all content, mark as visited
      localStorage.setItem('hasVisited', 'true');
      // Redirect to soon.html
      window.location.href = 'soon.html';
    });
}

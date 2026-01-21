// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check Local Storage
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Typewriter Effect
const texts = ["Software Developer", "Innovator", "Problem Solving", "Tech Enthusiast"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        typewriter.textContent = letter;
    }

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Wait before clearing
    } else {
        setTimeout(type, 100);
    }
})();


// Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.bento-card, .project-card, .timeline-item, .hero-content');
hiddenElements.forEach((el) => observer.observe(el));

// Add 'hidden' class to CSS dynamically or in CSS file
// We'll add a quick style injection for the animation classes here to ensure they exist if missed in CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .bento-card, .project-card, .timeline-item, .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(styleSheet);


/* --- VOICE ASSISTANT LOGIC --- */

const voiceBtn = document.getElementById('voice-assistant-btn');
const voiceModal = document.getElementById('voice-assistant-modal');
const closeVoice = document.getElementById('close-voice');
const startListeningBtn = document.getElementById('start-listening');
const listeningText = document.getElementById('listening-text');
const chatBox = document.getElementById('chat-box');

// Toggle Modal
voiceBtn.addEventListener('click', () => {
    voiceModal.classList.toggle('open');
});

closeVoice.addEventListener('click', () => {
    voiceModal.classList.remove('open');
});

// Speech API Support Check
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;

if (!SpeechRecognition) {
    listeningText.textContent = "Browser not supported";
    startListeningBtn.disabled = true;
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    startListeningBtn.addEventListener('click', () => {
        try {
            recognition.start();
            startListeningBtn.classList.add('listening');
            listeningText.textContent = "Listening...";
        } catch (e) {
            // Already started
            recognition.stop();
            startListeningBtn.classList.remove('listening');
        }
    });

    recognition.onend = () => {
        startListeningBtn.classList.remove('listening');
        listeningText.textContent = "Click to Speak...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        addMessage(transcript, 'user-message');
        processCommand(transcript.toLowerCase());
    };
}

function addMessage(text, className) {
    const div = document.createElement('div');
    div.classList.add('message', className);
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Process User Commands (Simple Keyword Matching)
function processCommand(command) {
    let response = "I didn't quite get that. You can ask about my skills, projects, or contact info.";

    if (command.includes('hi') || command.includes('hello')) {
        response = "Hello! How can I help you today?";
    } else if (command.includes('who are you') || command.includes('name')) {
        response = "I am Manaka Gift Phuti, a passionate Software Developer and IT graduate.";
    } else if (command.includes('skills') || command.includes('stack') || command.includes('technology')) {
        response = "I am skilled in Java, PhP, Web Development,Framework- Spring Boot, and Database Management.";
    } else if (command.includes('project')) {
        response = "I have built projects like RetailCast AI, Student Accommodation System, and this interactive portfolio. Check the Projects section for more.";
    } else if (command.includes('contact') || command.includes('email') || command.includes('hire')) {
        response = "You can go to contact page and send me a message there or contact me via WhatsApp @ 0812741278 or connect with me on LinkedIn.";
    } else if (command.includes('experience') || command.includes('education') || command.includes('journey')) {
        response = "My journey began at Makgetha Secondary School. I have now finished my IT Qualification at Vaal University of Technology and have participated in multiple hackathons.";
    }

    // Delay response slightly for realism
    setTimeout(() => {
        addMessage(response, 'bot-message');
        speak(response);
    }, 500);
}

// Text to Speech
function speak(text) {
    if (synth.speaking) {
        synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    // Select a voice if available
    const voices = synth.getVoices();
    // Try to find a nice English voice
    utterance.voice = voices.find(v => v.lang.includes('en-US')) || voices[0];
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
}

// Helper for suggestion chips
window.askQuestion = function (question) {
    addMessage(question, 'user-message');
    processCommand(question.toLowerCase());
};

// Load voices when they are ready (some browsers load async)
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => synth.getVoices();
}

/* --- PAGE NAVIGATION LOGIC --- */
const sections = document.querySelectorAll('.page-section');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const navLinks = document.querySelectorAll('.nav-links a');
let currentSectionIndex = 0;

// Initialize
function updateNavigation() {
    // Update Active Section
    sections.forEach((section, index) => {
        if (index === currentSectionIndex) {
            section.classList.add('active-section');
            // Reset animations for the active section (optional, makes it feel fresh)
            resetAnimations(section);
        } else {
            section.classList.remove('active-section');
        }
    });

    // Update Navbar Links
    navLinks.forEach((link, index) => {
        if (index === currentSectionIndex) {
            link.style.color = 'var(--accent)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
}

function nextSection() {
    if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
        updateNavigation();
    } else {
        // Optional: Loop back to start?
        currentSectionIndex = 0;
        updateNavigation();
    }
}

function prevSection() {
    if (currentSectionIndex > 0) {
        currentSectionIndex--;
        updateNavigation();
    } else {
        // Optional: Loop to end?
        currentSectionIndex = sections.length - 1;
        updateNavigation();
    }
}

// Button Events
nextBtn.addEventListener('click', nextSection);
prevBtn.addEventListener('click', prevSection);

// Keyboard Events
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            nextSection();
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            prevSection();
        }
    }
});

// Update Navbar Click Events to use Page Logic instead of Hash Scroll
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentSectionIndex = index;
        updateNavigation();
    });
});

// Helper to re-trigger CSS animations
function resetAnimations(section) {
    const animatedElements = section.querySelectorAll('.bento-card, .project-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.style.animation = null;
        el.classList.add('show'); // Ensure they are visible
    });
}

// "Let's Talk" Button Logic
const letsTalkBtn = document.querySelector('.hero-actions a[href="#contact"]');
if (letsTalkBtn) {
    letsTalkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Index 4 corresponds to Contact Section (Home=0, About=1, Timeline=2, Projects=3, Contact=4)
        currentSectionIndex = 4;
        updateNavigation();
    });
}

// Initial Call
updateNavigation();

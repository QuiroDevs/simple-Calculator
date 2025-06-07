document.addEventListener('keydown', handleKeyboardInput);

function scrollToCalculator() {
    console.log("Button clicked");
    document.getElementById('calculator-section').scrollIntoView({ behavior: 'smooth' });
}

function appendToScreen(value) {
    const screen = document.getElementById('screen');

    // Añade el valor al contenido del div
    screen.textContent += value;
}

function clearEntry() {
    const screen = document.getElementById('screen');
    const history = document.getElementById('history');
    screen.textContent = '';         
    history.innerHTML = '';     
}

function clearScreen() {
    const screen = document.getElementById('screen');
    
    // Elimina el último carácter del contenido de la pantalla
    screen.textContent = screen.textContent.slice(0, -1);
}

function calculate() {
    const screen = document.getElementById('screen');
    const history = document.getElementById('history');
    
    try {
        const result = eval(screen.textContent);
        history.innerHTML = `${screen.textContent}`; 
        screen.textContent = result; 
    } catch (e) {
        screen.textContent = 'Error'; 
    }
}

function toggleSign() {
    const screen = document.getElementById('screen');
    if (screen.textContent.startsWith('-')) {
        screen.textContent = screen.textContent.substring(1);
    } else {
        screen.textContent = '-' + screen.textContent;
    }
}

function copyToClipboard() {
    const screen = document.getElementById('screen');

    if (screen.textContent) { // Verifica que haya algo que copiar
        navigator.clipboard.writeText(screen.textContent).catch((err) => {
            console.error("Failed to copy: ", err);
        });
    }
}

function handleKeyboardInput(event) {
    const key = event.key;
    if (/[0-9/*\-+.]/.test(key)) {
        appendToScreen(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        clearScreen();
    } else if (key === 'Escape') {
        clearEntry();
    }
}

// Animaciones

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const features = entry.target.querySelectorAll('.feature');
            if (features.length) {
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.classList.add('show');
                    }, index * 700);
                });
            } else {
                const elementsToAnimate = entry.target.querySelectorAll('.logo, .hero-text, .hero-image img, .ctas, .calculator-container, .calculator-instructions');
                elementsToAnimate.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('show');
                    }, index * 300);
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // 50% visible para activar

// Seleccionar y observar las secciones
document.addEventListener('DOMContentLoaded', () => {
    const headerSection = document.querySelector('header');
    observer.observe(headerSection);

    const featuresSection = document.querySelector('.features');
    observer.observe(featuresSection);
    
    const heroSection = document.querySelector('.hero');
    observer.observe(heroSection);

    const ctaSection = document.querySelector('.cta');
    observer.observe(ctaSection);

    const calculatorSection = document.querySelector('.calculator-section');
    observer.observe(calculatorSection);
});
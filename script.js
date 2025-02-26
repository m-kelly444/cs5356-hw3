async function fetchTechContent() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayTechQuotes(data);
    } catch (error) {
        console.error('Error fetching content:', error);
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Sorry, there was an error fetching the content. Please try again later.';
        
        const projectsContainer = document.getElementById('api-projects');
        projectsContainer.innerHTML = '';
        projectsContainer.appendChild(errorMessage);
    }
}

function displayTechQuotes(quotes) {
    const projectsContainer = document.getElementById('api-projects');
    
    projectsContainer.innerHTML = '';
    
    const visuals = [
        {
            emoji: "🧠",
            color: "linear-gradient(135deg, #9c6bfa, #6e42ca)"
        },
        {
            emoji: "🔐",
            color: "linear-gradient(135deg, #6e42ca, #3a86ff)"
        },
        {
            emoji: "⚡",
            color: "linear-gradient(135deg, #3a86ff, #2ec4b6)"
        },
        {
            emoji: "🚀",
            color: "linear-gradient(135deg, #2ec4b6, #9c6bfa)"
        }
    ];
    
    quotes.forEach((quote, index) => {
        const visual = visuals[index % visuals.length];
        
        const quoteCard = document.createElement('div');
        quoteCard.className = 'project-card quote-card';
        
        quoteCard.innerHTML = `
            <div class="quote-visual" style="background: ${visual.color}">
                <span class="quote-emoji">${visual.emoji}</span>
            </div>
            <div class="project-content">
                <p class="quote-text">"${quote.content}"</p>
                <p class="quote-author">— ${quote.author}</p>
            </div>
        `;
        
        projectsContainer.appendChild(quoteCard);
        
        addMouseInteractivity(quoteCard);
    });
}

async function fetchCyberFacts() {
    try {
        const response = await fetch('http://numbersapi.com/random/date?json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        displayCyberFacts(data);
    } catch (error) {
        console.error('Error fetching cyber facts:', error);
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Sorry, there was an error fetching the cyber facts. Please try again later.';
        
        const projectsContainer = document.getElementById('api-projects');
        projectsContainer.innerHTML = '';
        projectsContainer.appendChild(errorMessage);
    }
}

function displayCyberFacts(facts) {
    const projectsContainer = document.getElementById('api-projects');
    
    projectsContainer.innerHTML = '';
    
    facts.forEach(fact => {
        const factCard = document.createElement('div');
        factCard.className = 'project-card fact-card';
        
        factCard.innerHTML = `
            <div class="fact-icon">${fact.icon}</div>
            <div class="project-content">
                <h3 class="project-title">${fact.title}</h3>
                <p class="project-description">${fact.fact}</p>
                <div class="quote-section">
                    <p class="quote-text">"${fact.quote}"</p>
                    <p class="quote-author">— ${fact.author}</p>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(factCard);
        
        addMouseInteractivity(factCard);
    });
}

function addMouseInteractivity(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        card.style.transition = 'transform 0.1s';
        
        const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent)`;
        card.style.backgroundImage = shine;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.5s, box-shadow 0.5s';
        card.style.backgroundImage = 'none';
    });
}

function setupContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                form.innerHTML = `
                    <div class="success-message">
                        <h3>Thanks for reaching out!</h3>
                        <p>I'll get back to you soon.</p>
                    </div>
                `;
            } else {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.textContent = 'Please fill out all fields.';
                
                const existingError = form.querySelector('.form-error');
                if (existingError) {
                    form.removeChild(existingError);
                }
                
                form.prepend(errorDiv);
            }
        });
    }
}

function setupHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(252, 249, 255, 0.9)';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.backgroundColor = 'rgba(252, 249, 255, 0.7)';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });
}

function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCyberFacts();
    
    setupContactForm();
    setupHeaderScroll();
    setupSmoothScroll();
});

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
    }
    
    fetchMLProjects();
    setupFormValidation();
    addSmoothScrolling();
});

async function fetchMLProjects() {
    try {
        const response = await fetch('https://api.quotable.io/quotes/random?tags=technology,wisdom&limit=4');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const mlProjects = [
            {
                title: "BigID ML-based Data Classification",
                description: "Lead Engineer for the Skyway project, integrating AI-driven data classification platform across enterprise infrastructure.",
                quote: data[0].content,
                author: data[0].author,
                tags: ["AWS", "⋆ BigID", "⋆ Data Classification", "⋆ ML"]
            },
            {
                title: "Custom PyTorch Implementation",
                description: "Developed complete PyTorch implementation from scratch, including tensor operations, auto-differentiation, and neural network architectures.",
                quote: data[1].content,
                author: data[1].author,
                tags: ["PyTorch", "⋆ Neural Networks", "⋆ Deep Learning"]
            },
            {
                title: "ML-Based Access Control System",
                description: "Orchestrated development of machine learning-based access control systems ensuring precise data access patterns.",
                quote: data[2].content,
                author: data[2].author,
                tags: ["Security", "⋆ Access Control", "⋆ ML"]
            },
            {
                title: "Predictive Analytics Dashboard",
                description: "Created comprehensive cyber risk management dashboard with predictive analytics capabilities for executive decision-making.",
                quote: data[3].content,
                author: data[3].author,
                tags: ["Power BI", "⋆ Predictive Analytics", "⋆ Data Visualization"]
            }
        ];
        
        displayMLProjects(mlProjects);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        
        const fallbackProjects = [
            {
                title: "BigID ML-based Data Classification",
                description: "Lead Engineer for the Skyway project, integrating AI-driven data classification platform across enterprise infrastructure.",
                quote: "The future belongs to those who learn more skills and combine them in creative ways.",
                author: "Robert Greene",
                tags: ["AWS ", "⋆ BigID ", "⋆ Data Classification ", "⋆ ML"]
            },
            {
                title: "Custom PyTorch Implementation",
                description: "Developed complete PyTorch implementation from scratch, including tensor operations, auto-differentiation, and neural network architectures.",
                quote: "Information is the oil of the 21st century, and analytics is the combustion engine.",
                author: "Peter Sondergaard",
                tags: ["PyTorch ", "⋆ Neural Networks ", "⋆ Deep Learning"]
            },
            {
                title: "ML-Based Access Control System",
                description: "Orchestrated development of machine learning-based access control systems ensuring precise data access patterns.",
                quote: "In God we trust. All others must bring data.",
                author: "W. Edwards Deming",
                tags: ["Security ", "⋆ Access Control ", "⋆ ML"]
            },
            {
                title: "Predictive Analytics Dashboard",
                description: "Created comprehensive cyber risk management dashboard with predictive analytics capabilities for executive decision-making.",
                quote: "Without data, you're just another person with an opinion.",
                author: "W. Edwards Deming",
                tags: ["Power BI ", "⋆ Predictive Analytics ", "⋆ Data Visualization"]
            }
        ];
        
        displayMLProjects(fallbackProjects);
    }
}

function displayMLProjects(projects) {
    const projectsContainer = document.getElementById('api-projects');
    
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const tagsHTML = project.tags ? 
            `<div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>` : '';
        
        card.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                ${tagsHTML}
                <div class="quote-section">
                    <p class="quote-text">"${project.quote}"</p>
                    <p class="quote-author">${project.author}</p>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(card);
        
        addHoverEffect(card);
    });
}

function addHoverEffect(card) {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 6px 20px rgba(39, 39, 39, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
}

function setupFormValidation() {
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
                        <h3>Thank you for your message</h3>
                        <p>I'll get back to you as soon as possible.</p>
                    </div>
                `;
            } else {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.textContent = 'Please complete all fields.';
                
                const existingError = form.querySelector('.form-error');
                if (existingError) {
                    form.removeChild(existingError);
                }
                
                form.prepend(errorDiv);
            }
        });
    }
}

function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 2rem';
        header.style.boxShadow = '0 2px 10px rgba(39, 39, 39, 0.05)';
    } else {
        header.style.padding = '2rem 2rem';
        header.style.boxShadow = 'none';
    }
});
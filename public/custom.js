function addLoginDisclaimer() {
    // Find the login form
    const loginForm = document.querySelector('form');
    if (loginForm) {
        // Create a container for both elements
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        
        // Create a disclaimer element
        const disclaimerElement = document.createElement('div');
        
        // Apply improved styling for better appearance
        disclaimerElement.className = 'text-center mt-6 p-4 rounded-md';
        disclaimerElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        disclaimerElement.style.backdropFilter = 'blur(5px)';
        disclaimerElement.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        disclaimerElement.style.color = 'rgba(255, 255, 255, 0.8)';
        disclaimerElement.style.maxWidth = '400px';
        disclaimerElement.style.margin = '0 auto';
        disclaimerElement.style.textAlign = 'center';
        
        // Simplified text
        disclaimerElement.innerHTML = `
            Skip login at 
            <a href="https://public.langchaindoc.com" 
               style="color: rgba(255, 255, 255, 0.9); 
                      font-weight: 500; 
                      text-decoration: none; 
                      background: linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%);
                      background-size: 100% 1px;
                      background-position: 0 100%;
                      background-repeat: no-repeat;
                      padding: 0 2px;
                      transition: all 0.3s ease;" 
               onmouseover="this.style.color='white'; this.style.background='linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 100%)'; this.style.backgroundSize='100% 1px'; this.style.backgroundPosition='0 100%'; this.style.backgroundRepeat='no-repeat'; this.style.textShadow='0 0 8px rgba(255,255,255,0.4)';" 
               onmouseout="this.style.color='rgba(255, 255, 255, 0.9)'; this.style.background='linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)'; this.style.backgroundSize='100% 1px'; this.style.backgroundPosition='0 100%'; this.style.backgroundRepeat='no-repeat'; this.style.textShadow='none';">
               public.langchaindoc.com
            </a>`;
        
        // Create small disclaimer text below
        const smallDisclaimerElement = document.createElement('div');
        smallDisclaimerElement.style.fontSize = '11px';
        smallDisclaimerElement.style.color = 'rgba(255, 255, 255, 0.5)';
        smallDisclaimerElement.style.marginTop = '8px';
        smallDisclaimerElement.style.maxWidth = '400px';
        smallDisclaimerElement.style.textAlign = 'center';
        smallDisclaimerElement.innerText = 'When login is skipped, conversations are not saved';
        
        // Add both elements to container
        container.appendChild(disclaimerElement);
        container.appendChild(smallDisclaimerElement);
        
        // Append container to the form
        loginForm.appendChild(container);
        console.log('Disclaimer with sub-text added');
    }
}

function mutationObserverCallback(mutationsList, observer) {
    var buttons = document.querySelectorAll('button');
    
    // Check if Google button exists and add text below it
    for (let button of buttons) {
        if (button.innerText.includes('Google')) {
            addLoginDisclaimer(); // Add the disclaimer
            observer.disconnect();
            break;
        }
    }
}

if (window.location.href.includes('login')) {
    const observer = new MutationObserver(mutationObserverCallback);
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
    console.log('Mutation observer initialized');
}
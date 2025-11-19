// ================= CONTACT FORM VALIDATION & EMAIL COMPILATION =================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageTextarea = document.getElementById('contact-message');

    // Character counter for message
    const charCountDiv = document.createElement('div');
    charCountDiv.style.cssText = 'font-size: 0.85rem; color: #7f8c8d; margin-top: 0.3rem; text-align: right;';
    messageTextarea.parentElement.appendChild(charCountDiv);

    // ===== VALIDATION FUNCTIONS =====

    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    function showError(input, message) {
        removeError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.textContent = message;
        
        input.parentElement.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
    }

    function removeError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '#bdc3c7';
    }

    // ===== CHARACTER COUNTER FOR MESSAGE =====
    messageTextarea.addEventListener('input', function() {
        const length = this.value.length;
        const minLength = 10;
        
        if (length < minLength) {
            charCountDiv.textContent = `${length}/${minLength} characters (minimum ${minLength} required)`;
            charCountDiv.style.color = '#e74c3c';
        } else {
            charCountDiv.textContent = `${length} characters`;
            charCountDiv.style.color = '#27ae60';
        }
    });

    // ===== REAL-TIME VALIDATION =====

    nameInput.addEventListener('blur', function() {
        if (!validateName(this.value)) {
            showError(this, 'Please enter a valid name (2-50 characters, letters only)');
        } else {
            removeError(this);
        }
    });

    emailInput.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            removeError(this);
        }
    });

    messageTextarea.addEventListener('blur', function() {
        if (!validateMessage(this.value)) {
            showError(this, 'Message must be at least 10 characters long');
        } else {
            removeError(this);
        }
    });

    // ===== FORM SUBMISSION =====

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        let isValid = true;

        // Validate all required fields
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Please enter a valid name (2-50 characters, letters only)');
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (!validateMessage(messageTextarea.value)) {
            showError(messageTextarea, 'Message must be at least 10 characters long');
            isValid = false;
        }

        // If valid, compile and show email
        if (isValid) {
            compileAndShowEmail();
        } else {
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // ===== COMPILE EMAIL & SHOW PREVIEW =====

    function compileAndShowEmail() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim() || 'General Enquiry';
        const message = messageTextarea.value.trim();

        // Compile email body
        const emailBody = `
Hello Helping Hands Team,

${message}

---
Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}

Sent via Helping Hands Contact Form
        `.trim();

        // Create mailto link
        const mailtoLink = `mailto:info@HelpingHands.org.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        // Display email preview
        displayEmailPreview(name, email, subject, message, mailtoLink);
    }

    function displayEmailPreview(name, email, subject, message, mailtoLink) {
        // Create preview container
        const previewDiv = document.createElement('div');
        previewDiv.className = 'email-preview';
        previewDiv.style.cssText = `
            background: white;
            border: 3px solid #3498db;
            border-radius: 10px;
            padding: 2rem;
            margin-top: 2rem;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            animation: slideIn 0.5s ease;
        `;

        previewDiv.innerHTML = `
            <h3 style="color: #3498db; margin-bottom: 1rem; font-size: 1.8rem;">
                ✓ Message Ready to Send!
            </h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
                <strong>Hi ${name},</strong><br>
                Your message has been compiled and is ready to send to our team.
            </p>
            
            <div style="background: #ecf0f1; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 1rem; color: #2c3e50;">Email Preview:</h4>
                <div style="background: white; padding: 1rem; border-left: 4px solid #3498db; font-family: monospace; font-size: 0.9rem; white-space: pre-wrap;">Hello Helping Hands Team,

${message}

---
Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}

Sent via Helping Hands Contact Form</div>
            </div>

            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 1rem; border-radius: 5px; margin-bottom: 1.5rem;">
                <strong>📧 Next Step:</strong> Click the button below to open your email client and send this message to us at <strong>info@HelpingHands.org.za</strong>
            </div>

            <div style="text-align: center; margin-top: 1.5rem;">
                <a href="${mailtoLink}" style="background: #27ae60; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; font-size: 1.1rem; display: inline-block; margin-right: 1rem;">
                    📧 Send Email Now
                </a>
                <button onclick="location.reload()" style="background: #95a5a6; color: white; padding: 1rem 2rem; border: none; border-radius: 5px; font-size: 1.1rem; cursor: pointer;">
                    Send Another Message
                </button>
            </div>

            <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: #7f8c8d;">
                We typically respond within 24-48 hours during business days.
            </p>
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        // Hide form and show preview
        form.style.display = 'none';
        form.parentElement.appendChild(previewDiv);

        // Scroll to preview
        previewDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
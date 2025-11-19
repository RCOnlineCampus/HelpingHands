// ================= ENQUIRY FORM VALIDATION & PROCESSING =================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const interestSelect = document.getElementById('interest');
    const messageTextarea = document.getElementById('message');

    // ===== VALIDATION FUNCTIONS =====

    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function validatePhone(phone) {
        if (phone.trim() === '') return true; // Phone is optional
        const phoneRegex = /^[\d\s\-()]{10,15}$/;
        return phoneRegex.test(phone.trim());
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

    phoneInput.addEventListener('blur', function() {
        if (!validatePhone(this.value)) {
            showError(this, 'Please enter a valid phone number (10-15 digits)');
        } else {
            removeError(this);
        }
    });

    interestSelect.addEventListener('change', function() {
        if (this.value === '') {
            showError(this, 'Please select how you would like to get involved');
        } else {
            removeError(this);
        }
    });

    // ===== FORM SUBMISSION =====

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        document.querySelectorAll('.error-message').forEach(el => el.remove());

        let isValid = true;

        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Please enter a valid name (2-50 characters, letters only)');
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid phone number (10-15 digits)');
            isValid = false;
        }

        if (interestSelect.value === '') {
            showError(interestSelect, 'Please select how you would like to get involved');
            isValid = false;
        }

        if (isValid) {
            processEnquiry();
        } else {
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // ===== PROCESS ENQUIRY & SHOW RESPONSE =====

    function processEnquiry() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const interest = interestSelect.value;
        const message = messageTextarea.value.trim();

        const response = generateResponse(interest, name);
        displayResponse(response, name, email, phone, interest, message);
    }

    function generateResponse(interest, name) {
        const responses = {
            'volunteer': {
                title: 'Volunteer Opportunity',
                message: `Thank you for your interest in volunteering! Our weekly meal distributions happen every Thursday from 5:00 PM - 7:00 PM.`,
                details: `
                    <strong>What to expect:</strong>
                    <ul style="margin-left: 2rem; margin-top: 0.5rem;">
                        <li>Commitment: 2-4 hours per week (flexible schedule)</li>
                        <li>Activities: Meal preparation, serving, cleanup, community interaction</li>
                        <li>Cost: FREE - you're giving your time!</li>
                        <li>Availability: Immediate - we always need volunteers</li>
                    </ul>
                    <p style="margin-top: 1rem;"><strong>Next Steps:</strong> Our volunteer coordinator will contact you within 2 business days to schedule an orientation session.</p>
                `,
                color: '#27ae60'
            },
            'sponsor': {
                title: 'Sponsorship Opportunity',
                message: `Thank you for considering sponsoring our programs! Your support directly feeds our community.`,
                details: `
                    <strong>Sponsorship Options & Costs:</strong>
                    <ul style="margin-left: 2rem; margin-top: 0.5rem;">
                        <li><strong>Single Meal Sponsorship:</strong> R500 (feeds 25 people for one Thursday)</li>
                        <li><strong>Monthly Meal Program:</strong> R2,000 (covers all weekly meals for a month)</li>
                        <li><strong>Event Sponsorship:</strong> R5,000-R15,000 (seasonal events like Back-to-School)</li>
                        <li><strong>Equipment/Supplies:</strong> Varies (kitchen equipment, serving supplies)</li>
                    </ul>
                    <p style="margin-top: 1rem;"><strong>Tax Benefits:</strong> All donations are tax-deductible. Section 18A receipts provided.</p>
                    <p><strong>Next Steps:</strong> We'll send you detailed sponsorship packages and payment options within 24 hours.</p>
                `,
                color: '#3498db'
            },
            'donate': {
                title: 'Donation Opportunity',
                message: `Thank you for your generosity! We accept various types of donations.`,
                details: `
                    <strong>What we accept:</strong>
                    <ul style="margin-left: 2rem; margin-top: 0.5rem;">
                        <li><strong>Clothing:</strong> Clean, quality items (all ages, work attire, school uniforms)</li>
                        <li><strong>Non-perishable food:</strong> Canned goods, rice, pasta, cooking oil</li>
                        <li><strong>Blankets & bedding:</strong> Especially needed in winter months</li>
                        <li><strong>School supplies:</strong> Books, pens, bags, uniforms</li>
                    </ul>
                    <p style="margin-top: 1rem;"><strong>Drop-off Times:</strong> Monday-Friday, 9:00 AM - 4:00 PM at our Central location</p>
                    <p><strong>Cost:</strong> FREE - we accept donations at no charge to you</p>
                    <p><strong>Availability:</strong> We can arrange pickup for large donations</p>
                `,
                color: '#9b59b6'
            },
            'skills': {
                title: 'Skills Workshop Leadership',
                message: `Excellent! We're always looking for professionals to share their expertise.`,
                details: `
                    <strong>Workshop Details:</strong>
                    <ul style="margin-left: 2rem; margin-top: 0.5rem;">
                        <li><strong>When:</strong> Second Saturday of each month, 9:00 AM - 12:00 PM</li>
                        <li><strong>Duration:</strong> 1-3 hour sessions</li>
                        <li><strong>Topics needed:</strong> CV writing, interview skills, computer literacy, entrepreneurship, financial planning</li>
                        <li><strong>Participants:</strong> 15-30 community members seeking employment</li>
                    </ul>
                    <p style="margin-top: 1rem;"><strong>Cost:</strong> Volunteer-based (we provide venue and materials)</p>
                    <p><strong>Availability:</strong> Slots available from February 2025 onwards</p>
                    <p><strong>Next Steps:</strong> We'll discuss your expertise and schedule a workshop that fits your availability.</p>
                `,
                color: '#e67e22'
            },
            'partnership': {
                title: 'Business Partnership',
                message: `We're excited about potential corporate partnerships!`,
                details: `
                    <strong>Partnership Opportunities:</strong>
                    <ul style="margin-left: 2rem; margin-top: 0.5rem;">
                        <li><strong>Employee Volunteer Days:</strong> Team-building through community service</li>
                        <li><strong>Program Sponsorship:</strong> R2,000 - R15,000 monthly (includes branding)</li>
                        <li><strong>In-kind Donations:</strong> Products, services, or equipment</li>
                        <li><strong>Skills Training:</strong> Provide industry-specific training to our community</li>
                        <li><strong>Fundraising Events:</strong> Co-host charity events</li>
                    </ul>
                    <p style="margin-top: 1rem;"><strong>Benefits:</strong> Tax deductions, CSI compliance, positive brand visibility, community impact reports</p>
                    <p><strong>Next Steps:</strong> Our director will contact you to schedule a meeting and discuss customized partnership packages.</p>
                `,
                color: '#16a085'
            },
            'question': {
                title: 'General Enquiry',
                message: `Thank you for reaching out! We're here to answer your questions.`,
                details: `
                    <p style="margin-top: 0.5rem;"><strong>Our Response Time:</strong> We aim to respond to all enquiries within 24-48 hours.</p>
                    <p style="margin-top: 0.5rem;"><strong>Common Questions:</strong></p>
                    <ul style="margin-left: 2rem; margin-top: 0.5rem;">
                        <li>How to access our services (immediate assistance available)</li>
                        <li>Volunteer requirements (flexible, no experience needed)</li>
                        <li>Donation guidelines (see our Services page for details)</li>
                        <li>Partnership opportunities (contact our director directly)</li>
                    </ul>
                    <p style="margin-top: 1rem;"><strong>Urgent Assistance:</strong> For immediate food assistance, call our emergency line at <strong>073 456 7890</strong></p>
                `,
                color: '#34495e'
            }
        };

        return responses[interest] || responses['question'];
    }

    function displayResponse(response, name, email, phone, interest, message) {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'enquiry-response';
        responseDiv.style.cssText = `
            background: white;
            border: 3px solid ${response.color};
            border-radius: 10px;
            padding: 2rem;
            margin-top: 2rem;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            animation: slideIn 0.5s ease;
        `;

        responseDiv.innerHTML = `
            <h3 style="color: ${response.color}; margin-bottom: 1rem; font-size: 1.8rem;">
                ✓ ${response.title}
            </h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
                <strong>Hi ${name},</strong><br>
                ${response.message}
            </p>
            <div style="background: #ecf0f1; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                ${response.details}
            </div>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid ${response.color};">
                <strong>Your Enquiry Summary:</strong>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
                    <li><strong>Interest:</strong> ${interestSelect.options[interestSelect.selectedIndex].text}</li>
                    ${message ? `<li><strong>Message:</strong> ${message}</li>` : ''}
                </ul>
            </div>
            <p style="text-align: center; margin-top: 1.5rem; font-size: 0.95rem; color: #7f8c8d;">
                A confirmation email has been sent to <strong>${email}</strong>
            </p>
            <div style="text-align: center; margin-top: 1.5rem;">
                <button onclick="location.reload()" style="background: ${response.color}; color: white; padding: 0.8rem 2rem; border: none; border-radius: 5px; font-size: 1rem; cursor: pointer; margin-right: 1rem;">
                    Submit Another Enquiry
                </button>
                <a href="contact.html" style="background: #95a5a6; color: white; padding: 0.8rem 2rem; text-decoration: none; border-radius: 5px; font-size: 1rem; display: inline-block;">
                    Contact Us
                </a>
            </div>
        `;

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

        form.style.display = 'none';
        form.parentElement.appendChild(responseDiv);
        responseDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
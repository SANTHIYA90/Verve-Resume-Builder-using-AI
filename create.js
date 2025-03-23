document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const wolfContainer = document.querySelector('.wolf-container');
    const speechBubble = document.querySelector('.wolf-speech-bubble');

    const inputs = {
        fullName: document.getElementById('fullName'),
        jobTitle: document.getElementById('jobTitle'),
        experience: document.getElementById('experience'),
        skills: document.getElementById('skills'),
        education: document.getElementById('education'),
        address: document.getElementById('address'),
        phoneNumber: document.getElementById('phoneNumber'),
        linkedIn: document.getElementById('linkedIn'),
        certifications: document.getElementById('certifications'),
        experienceDetails: document.getElementById('experienceDetails'),
        summary: document.getElementById('summary')
    };

    const atsGuidelines = {
        fullName: 'Enter your name with the first letter capitalized. Ensure there are no initials at the start of your name.',
        jobTitle: 'Specify your desired job title clearly. Avoid using jargon or abbreviations that an ATS may not understand.',
        experience: 'Enter the number of years you have worked professionally. Use whole numbers only.',
        skills: 'List relevant technical skills separated by commas. Ensure that each skill is a valid, industry-recognized term.',
        education: 'Enter the name of your most recent educational institution and degree. Ensure it matches standard formatting for ATS.',
        address: 'Enter your full address in standard format (e.g., Street, City, State, ZIP).',
        phoneNumber: 'Enter a valid phone number in the format (xxx) xxx-xxxx or +1 xxx xxx xxxx.',
        linkedIn: 'Provide a valid LinkedIn profile URL starting with https://.',
        certifications: 'List certifications separated by commas. Ensure the certification names are accurate.',
        experienceDetails: 'Summarize your work experience concisely. Use bullet points to describe your roles, responsibilities, and achievements.',
        summary: 'Provide a brief professional summary. Use concise, ATS-friendly language, focusing on your key achievements and strengths.'
    };

    // Event listeners for input field hover
    document.querySelectorAll('.input-wrapper').forEach(wrapper => {
        wrapper.addEventListener('mouseenter', () => {
            const inputName = wrapper.querySelector('input, textarea').id;
            provideSuggestion(atsGuidelines[inputName]);
        });
        wrapper.addEventListener('mouseleave', () => {
            speechBubble.style.display = 'none';
            speechBubble.style.opacity = '0';
        });
    });

    // Event listener for wolf character click (for help)
    wolfContainer.addEventListener('click', () => {
        provideSuggestion('Need help? Just hover over the fields!');
    });

    // Adding validation and suggestions for each input field
    inputs.fullName.addEventListener('input', () => validateFullName(inputs.fullName));
    inputs.jobTitle.addEventListener('input', () => validateJobTitle(inputs.jobTitle));
    inputs.experience.addEventListener('input', () => validateExperience(inputs.experience));
    inputs.skills.addEventListener('input', () => validateSkills(inputs.skills));
    inputs.education.addEventListener('input', () => validateEducation(inputs.education));
    inputs.address.addEventListener('input', () => validateAddress(inputs.address));
    inputs.phoneNumber.addEventListener('input', () => validatePhoneNumber(inputs.phoneNumber));
    inputs.linkedIn.addEventListener('input', () => validateLinkedIn(inputs.linkedIn));
    inputs.certifications.addEventListener('input', () => validateCertifications(inputs.certifications));
    inputs.summary.addEventListener('input', () => validateSummary(inputs.summary));

    // Restore 'Generate Experience' and 'Generate Summary' features
    document.querySelector('.form-group button[onclick="generateExperience()"]').addEventListener('click', generateExperience);
    document.querySelector('.form-group button[onclick="generateProfileSummary()"]').addEventListener('click', generateProfileSummary);

    // Function to provide AI suggestions
    function provideSuggestion(message) {
        speechBubble.textContent = message;
        speechBubble.style.display = 'block';
        speechBubble.style.opacity = '1';
    }

    // Store data in localStorage
    function storeData() {
        for (const key in inputs) {
            localStorage.setItem(key, inputs[key].value);
        }
    }

    // Validation functions for each field
    function validateFullName(input) {
        const value = input.value;
        if (!/^[A-Z]/.test(value)) {
            provideSuggestion('Full name should start with a capital letter and no initials at the beginning.');
        } else {
            provideSuggestion('Looks good!');
        }
    }

    function validateJobTitle(input) {
        const value = input.value.trim();
        if (!value.match(/^[a-zA-Z\s]+$/)) {
            provideSuggestion('Job title should contain only letters and spaces. No special characters or numbers.');
        } else {
            provideSuggestion('Good job title! Make sure it matches the job you are applying for.');
        }
    }

    function validateExperience(input) {
        const value = input.value.trim();
        if (!value.match(/^[0-9]+$/)) {
            provideSuggestion('Years of experience should be a valid number.');
        } else {
            provideSuggestion('Looks good!');
        }
    }

    function validateSkills(input) {
        const value = input.value.trim();
        if (value.length === 0 || !value.includes(',')) {
            provideSuggestion('List skills separated by commas, e.g., JavaScript, React, Node.js.');
        } else {
            provideSuggestion('Your skills look well-formatted!');
        }
    }

    function validateEducation(input) {
        if (!input.value.trim()) {
            provideSuggestion('Please enter a valid institution name and degree.');
        } else {
            provideSuggestion('Education looks good!');
        }
    }

    function validateAddress(input) {
        if (!input.value.trim()) {
            provideSuggestion('Please enter a complete address.');
        } else {
            provideSuggestion('Address is properly formatted!');
        }
    }

    function validatePhoneNumber(input) {
        const value = input.value.trim();
        const phoneRegex = /^(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!phoneRegex.test(value)) {
            provideSuggestion('Phone number should be in the format (xxx) xxx-xxxx or +1 xxx xxx xxxx.');
        } else {
            provideSuggestion('Phone number looks good!');
        }
    }

    function validateLinkedIn(input) {
        const value = input.value.trim();
        if (!value.startsWith('https://www.linkedin.com')) {
            provideSuggestion('Ensure your LinkedIn URL starts with "https://www.linkedin.com".');
        } else {
            provideSuggestion('LinkedIn profile link is valid!');
        }
    }

    function validateCertifications(input) {
        if (!input.value.trim()) {
            provideSuggestion('Please list your certifications separated by commas.');
        } else {
            provideSuggestion('Certifications look good!');
        }
    }

    function validateSummary(input) {
        const value = input.value.trim();
        if (value.length < 50) {
            provideSuggestion('Your summary should be at least 50 characters long.');
        } else {
            provideSuggestion('Your summary looks ATS-compliant!');
        }
    }

    // Generate random experience and profile summary functions
    function generateExperience() {
        const experiences = [
            `Senior Software Engineer at Tech Company Inc. | Jan 2020 - Present
            - Lead a team of 10 developers in creating scalable web applications.
            - Optimized system performance, reducing load times by 30%.
            - Collaborated with cross-functional teams to define project requirements and timelines.`,

            `Software Engineer at Innovatech Solutions | Jan 2017 - Dec 2019
            - Developed and maintained features for a customer relationship management (CRM) platform.
            - Improved codebase quality through peer code reviews and refactoring.
            - Provided technical support and guidance to junior team members.`,

            `Junior Software Engineer at StartUp Hub | Aug 2015 - Dec 2016
            - Assisted in the development of web applications using JavaScript, HTML, and CSS.
            - Participated in code reviews and sprint planning.
            - Worked on bug fixes and enhancements for the internal content management system.`
        ];

        const randomExperience = experiences[Math.floor(Math.random() * experiences.length)];
        inputs.experienceDetails.value = randomExperience;
    }

    function generateProfileSummary() {
        const fullName = inputs.fullName.value;
        const jobTitle = inputs.jobTitle.value;
        const experience = inputs.experience.value;
        const skills = inputs.skills.value;
        const education = inputs.education.value;

        const summaries = [
            `${fullName} is a proficient ${jobTitle} with ${experience} years of experience. Specializes in ${skills} and has a strong educational background from ${education}.`,
            `${fullName} has a rich history of ${experience} years in the ${jobTitle} field, with expertise in ${skills}. Holds a degree from ${education}.`,
            `${fullName} is an accomplished ${jobTitle} with ${experience} years of professional experience. A strong background in ${skills} and an educational degree from ${education}.`
        ];

        const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
        inputs.summary.value = randomSummary;
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        storeData();  // Store data in localStorage
        window.location.href = 'output.html';  // Navigate to output.html after submission
    });
});

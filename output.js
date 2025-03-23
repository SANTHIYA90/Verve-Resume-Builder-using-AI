// Function to dynamically display resume content from localStorage
function displayResume() {
    document.getElementById('outputFullName').textContent = localStorage.getItem('fullName') || 'John Doe';
    document.getElementById('outputPhoneNumber').textContent = localStorage.getItem('phoneNumber') || '(123) 456-7890';
    document.getElementById('outputEmail').textContent = localStorage.getItem('email') || 'johndoe@example.com';
    document.getElementById('outputLinkedIn').textContent = localStorage.getItem('linkedIn') || 'linkedin.com/in/johndoe';
    document.getElementById('outputAddress').textContent = localStorage.getItem('address') || '123 Main Street, City, Country';
    document.getElementById('outputSummary').textContent = localStorage.getItem('summary') || 
        'Highly motivated and results-oriented professional with over 5 years of experience in the tech industry. Skilled in software development, project management, and team leadership.';

    document.getElementById('outputExperience').innerHTML = localStorage.getItem('experience') || `
        Senior Software Engineer at Tech Company Inc. | Jan 2020 - Present
        <ul>
            <li>Lead a team of 10 developers in creating scalable web applications.</li>
            <li>Optimized system performance, reducing load times by 30%.</li>
            <li>Collaborated with cross-functional teams to define project requirements and timelines.</li>
        </ul>
        Software Engineer at Innovatech Solutions | Jan 2017 - Dec 2019
        <ul>
            <li>Developed and maintained features for a customer relationship management (CRM) platform.</li>
            <li>Improved codebase quality through peer code reviews and refactoring.</li>
            <li>Provided technical support and guidance to junior team members.</li>
        </ul>
    `;

    document.getElementById('outputEducation').textContent = localStorage.getItem('education') || 
        'Bachelor of Science in Computer Science, University of Technology, 2016';

    const skills = localStorage.getItem('skills') || 'JavaScript, React, Node.js, Project Management, Agile Methodologies';
    document.getElementById('outputSkills').innerHTML = skills.split(', ').map(skill => `<li>${skill}</li>`).join('');

    document.getElementById('outputCertifications').textContent = localStorage.getItem('certifications') || 
        'Certified Scrum Master (CSM), 2020';
}

// Function to download the resume as a PDF
function downloadResume() {
    const resume = document.querySelector('.resume');

    // Set up html2canvas options
    html2canvas(resume, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Calculate image dimensions to fit PDF
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale image height based on width
        let heightLeft = imgHeight;

        let position = 0;

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // If image height exceeds page height, add more pages
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save('resume.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}

// Display the resume on page load
document.addEventListener('DOMContentLoaded', displayResume);

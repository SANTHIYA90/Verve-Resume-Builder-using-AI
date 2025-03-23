document.addEventListener('DOMContentLoaded', function() {
    const resumeData = JSON.parse(localStorage.getItem('resumeData'));

    if (resumeData) {
        // Populate the resume sections with data
        document.getElementById('name').textContent = resumeData.name;
        document.getElementById('contact').textContent = resumeData.contact;
        document.getElementById('email').textContent = resumeData.email;
        document.getElementById('email').href = `mailto:${resumeData.email}`;
        document.getElementById('careerObjective').textContent = resumeData.careerObjective;
        
        populateList('educationList', resumeData.education);
        populateList('achievementsList', resumeData.achievements);
        populateList('internshipsList', resumeData.internships);
        populateList('projectsList', resumeData.projects);
        populateList('skillsList', resumeData.skills);
        populateList('certificationsList', resumeData.certifications);
        populateList('linksList', resumeData.links);
    }

    function populateList(elementId, data) {
        const listElement = document.getElementById(elementId);
        const items = data.split('\n').filter(item => item.trim() !== '');
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    }
});

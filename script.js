let currentStep = 'hero';
let selectedRoles = [];
let completedRoles = [];
let currentRoleContext = null;

const navigationHistory = [];

const formContainer = document.getElementById('formContainer');
const heroSection = document.getElementById('hero');
const makerBanner = document.getElementById('makerBanner');
const progressFill = document.getElementById('progressFill');
const progressSteps = document.getElementById('progressSteps');
const roleNextBtn = document.getElementById('roleNextBtn');

const steps = [
    { id: 'step-general', title: 'General Info' },
    { id: 'step-role', title: 'Role Selection' },
    { id: 'step-questions', title: 'Role Questions' },
    { id: 'step-commitment', title: 'Commitment' }
];

function startApplication() {
    heroSection.style.display = 'none';
    makerBanner.style.display = 'none';
    formContainer.style.display = 'block';
    
    renderProgressSteps();
    goToStep('step-general');
}

function goToStep(stepId, skipHistory = false) {
    if (!skipHistory && currentStep !== 'hero') {
        navigationHistory.push(currentStep);
    }
    
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
        step.style.display = 'none';
    });
    
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
        targetStep.style.display = 'block';
        setTimeout(() => targetStep.classList.add('active'), 50);
        currentStep = stepId;
        updateProgress(stepId);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
    if (navigationHistory.length > 0) {
        const previousStep = navigationHistory.pop();
        goToStep(previousStep, true);
    } else {
        formContainer.style.display = 'none';
        heroSection.style.display = 'flex';
        makerBanner.style.display = 'flex';
        currentStep = 'hero';
    }
}

function validateStep(stepId) {
    const stepElement = document.getElementById(stepId);
    if (!stepElement) return false;
    
    const requiredInputs = stepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        input.classList.remove('error');
        
        if (input.type === 'radio') {
            const radioGroup = document.getElementsByName(input.name);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                if(input.closest('.radio-group')) {
                    input.closest('.radio-group').classList.add('error');
                }
            } else {
                if(input.closest('.radio-group')) {
                    input.closest('.radio-group').classList.remove('error');
                }
            }
        } else if (input.type === 'checkbox') {
            if (!input.checked) {
                isValid = false;
                if(input.closest('.checkbox-card')) {
                    input.closest('.checkbox-card').classList.add('error');
                }
            } else {
                if(input.closest('.checkbox-card')) {
                    input.closest('.checkbox-card').classList.remove('error');
                }
            }
        } else if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
    }
    
    return isValid;
}

function goToRoleSelect() {
    if (validateStep('step-general')) {
        goToStep('step-role');
        updateRoleSelectionUI();
    }
}

function selectRole(element) {
    const role = element.getAttribute('data-role');
    
    if (completedRoles.includes(role)) {
        return;
    }
    
    // Deselect all others for single-role selection per submission
    document.querySelectorAll('.role-card').forEach(card => card.classList.remove('selected'));
    
    selectedRoles = [role];
    element.classList.add('selected');
    
    roleNextBtn.disabled = selectedRoles.length === 0;
}

function updateRoleSelectionUI() {
    document.querySelectorAll('.role-card').forEach(card => {
        const role = card.getAttribute('data-role');
        
        if (completedRoles.includes(role)) {
            card.classList.add('completed');
            card.classList.remove('selected');
            card.style.opacity = '0.5';
            card.style.pointerEvents = 'none';
        } else if (selectedRoles.includes(role)) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
    
    roleNextBtn.disabled = selectedRoles.length === 0;
}

function goToRoleQuestions() {
    if (selectedRoles.length === 0) return;
    
    const nextRole = selectedRoles[0];
    currentRoleContext = nextRole;
    
    if (nextRole === 'Learning Coordinator') {
        goToStep('step-lc');
    } else if (nextRole === 'Women In Tech (WIT) Lead(Only for females)') {
        goToStep('step-wit');
    } else if (nextRole === 'Outreach Lead') {
        goToStep('step-outreach');
    }
}

function finishRoleQuestions(roleType) {
    const stepId = `step-${roleType}`;
    if (!validateStep(stepId)) return;
    
    goToStep('step-commitment');
}

function renderProgressSteps() {
    progressSteps.innerHTML = '';
    steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.classList.add('progress-step');
        stepElement.setAttribute('data-step', step.id);
        
        const dot = document.createElement('div');
        dot.classList.add('progress-dot');
        dot.textContent = index + 1;
        
        const label = document.createElement('span');
        label.classList.add('progress-label');
        label.textContent = step.title;
        
        stepElement.appendChild(dot);
        stepElement.appendChild(label);
        progressSteps.appendChild(stepElement);
    });
}

function updateProgress(currentStepId) {
    let activeIndex = 0;
    
    if (currentStepId === 'step-general') activeIndex = 0;
    else if (currentStepId === 'step-role') activeIndex = 1;
    else if (['step-lc', 'step-wit', 'step-outreach', 'step-another'].includes(currentStepId)) activeIndex = 2;
    else if (currentStepId === 'step-commitment') activeIndex = 3;
    else activeIndex = 3;
    
    const fillPercentage = (activeIndex / (steps.length - 1)) * 100;
    progressFill.style.width = `${fillPercentage}%`;
    
    const stepElements = document.querySelectorAll('.progress-step');
    stepElements.forEach((step, index) => {
        if (index <= activeIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function submitForm() {
    if (!validateStep('step-commitment')) return;
    
    const formData = gatherFormData();
    
    goToStep('step-loading');
    
    const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdfAf4-xdroALxr7H7UTEoxl4J9_JIhcIpSZCxUH1TVwIyxLw/formResponse';
    
    const formMap = {
        'fullName': 'entry.1950655773',
        'currentYear': 'entry.1517261288',
        'department': 'entry.1678758918',
        'contactNo': 'entry.1409435584',
        'contactMail': 'entry.1867425250',
        'github': 'entry.1897789274',
        'roles': 'entry.1397408261',
        'lcVideo': 'entry.965181024',
        'lcTech': 'entry.1992808272',
        'witVideo': 'entry.1249036805',
        'witTech': 'entry.965929698',
        'witOpenMic': 'entry.1939119650',
        'outreachVideo': 'entry.1726300202',
        'outreachTeam': 'entry.2137491411',
        'outreachTools': 'entry.775487292',
        'travelCommitment': 'entry.1584806847',
        'acknowledgment': 'entry.1394325944'
    };
    let pageHistory = '0';
    if (selectedRoles.includes('Learning Coordinator')) {
        pageHistory = '0,1,4';
    } else if (selectedRoles.includes('Women In Tech (WIT) Lead(Only for females)')) {
        pageHistory = '0,2,4';
    } else if (selectedRoles.includes('Outreach Lead')) {
        pageHistory = '0,3,4';
    } else {
        pageHistory = '0,1,2,3,4'; // Fallback
    }
    
    const urlParams = new URLSearchParams();
    urlParams.append('pageHistory', pageHistory);
    
    for (const key in formData) {
        if (formMap[key]) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(val => {
                    if (val) urlParams.append(formMap[key], val);
                });
            } else {
                if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
                    urlParams.append(formMap[key], formData[key]);
                }
            }
        }
    }
    
    fetch(googleFormURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlParams.toString()
    })
    .then(() => {
        if (selectedRoles.length > 0 && !completedRoles.includes(selectedRoles[0])) {
            completedRoles.push(selectedRoles[0]);
        }
        
        const anotherRoleBtn = document.getElementById('anotherRoleBtn');
        if (anotherRoleBtn) {
            if (completedRoles.length >= 3) {
                anotherRoleBtn.style.display = 'none';
            } else {
                anotherRoleBtn.style.display = 'inline-block';
            }
        }
        
        goToStep('step-success');
    })
    .catch((e) => {
        console.error('Submission failed', e);
        alert('There was an error submitting your application. Please try again.');
        goBack();
    });
}

function gatherFormData() {
    const data = {
        fullName: document.getElementById('fullName').value,
        department: document.getElementById('department').value,
        contactNo: document.getElementById('contactNo').value,
        contactMail: document.getElementById('contactMail').value,
        github: document.getElementById('github').value,
        roles: selectedRoles,
        
        lcVideo: document.getElementById('lcVideo')?.value,
        lcTech: document.getElementById('lcTech')?.value,
        
        witVideo: document.getElementById('witVideo')?.value,
        witTech: document.getElementById('witTech')?.value,
        witOpenMic: document.getElementById('witOpenMic')?.value,
        
        outreachVideo: document.getElementById('outreachVideo')?.value,
        outreachTeam: document.getElementById('outreachTeam')?.value,
        outreachTools: document.getElementById('outreachTools')?.value
    };
    
    const yearRadios = document.getElementsByName('currentYear');
    for (const radio of yearRadios) {
        if (radio.checked) data.currentYear = radio.value;
    }
    
    const travelRadios = document.getElementsByName('travelCommitment');
    for (const radio of travelRadios) {
        if (radio.checked) data.travelCommitment = radio.value;
    }
    
    const acknowledgmentCheckbox = document.getElementById('acknowledgment');
    if (acknowledgmentCheckbox && acknowledgmentCheckbox.checked) {
        // Form expects specific value for checkbox usually, standard forms send the label string.
        data.acknowledgment = 'Yes I am okay with that';
    }
    
    return data;
}

function applyForAnotherRole() {
    // Clear role-specific inputs
    const roleInputs = ['lcVideo', 'lcTech', 'witVideo', 'witTech', 'witOpenMic', 'outreachVideo', 'outreachTeam', 'outreachTools'];
    roleInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = '';
            el.classList.remove('error');
        }
    }); document.querySelectorAll('input[name="travelCommitment"], input[name="acknowledgment"]').forEach(radio => radio.checked = false);
    
    // Clear selected roles and go back to role step
    selectedRoles = [];
    document.getElementById('roleNextBtn').disabled = true;
    updateRoleSelectionUI();
    
    goToStep('step-role');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            if (input.type === 'radio' && input.closest('.radio-group')) {
                input.closest('.radio-group').classList.remove('error');
            }
            if (input.type === 'checkbox' && input.closest('.checkbox-card')) {
                input.closest('.checkbox-card').classList.remove('error');
            }
        });
    });
});


const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
});

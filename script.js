let currentStep = 0;
const steps = document.querySelectorAll('.step');
let timerInterval;
const totalPrepTime = 45 * 60; 
let timeRemaining = totalPrepTime;


document.getElementById('toggle-ingredients').addEventListener('click', function() {
    const ingredients = document.getElementById('ingredients');
    ingredients.classList.toggle('active');
    this.textContent = ingredients.classList.contains('active') ? 'Hide Ingredients' : 'Show Ingredients';
});


document.getElementById('start-cooking').addEventListener('click', function() {
    currentStep = 0; // Reset to the first step
    const stepsContainer = document.getElementById('steps');
    stepsContainer.style.display = 'block'; // Show all steps
    highlightStep(currentStep);
    this.style.display = 'none'; // Hide start button
    document.getElementById('next-step').style.display = 'inline-block'; 
    startTimer();
});


document.getElementById('next-step').addEventListener('click', function() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        highlightStep(currentStep);
    } else {
        alert('Cooking process complete!');
        currentStep = 0; 
        steps.forEach(step => step.classList.remove('highlight')); 
        this.style.display = 'none'; // Hide next button
        document.getElementById('start-cooking').style.display = 'inline-block'; 
        const stepsContainer = document.getElementById('steps');
        stepsContainer.style.display = 'none';
        clearInterval(timerInterval);
        timeRemaining = totalPrepTime;
        document.getElementById('timer').style.display = 'none';
    }
});

function startTimer() {
    document.getElementById('timer').style.display = 'block';
    const timeDisplay = document.getElementById('time-remaining');
    
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            return;
        }
        
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}


function highlightStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.remove('highlight'); 
        step.style.display = 'block';
        if (index === stepIndex) {
            step.classList.add('highlight'); 
        }
    });
}


document.getElementById('print-recipe').addEventListener('click', function() {
    window.print();
});



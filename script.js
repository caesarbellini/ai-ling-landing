// Array of question and answer pairs
const texts = [
    { question: "I just spent $10 on a taxi.", answer: "Ok, I'll record it in your monthly expenses. 📊" },
    { question: "Do I have any appointments for tomorrow?", answer: "Tomorrow you have a doctor's appointment at 3:00 PM, that's it. 👌" },
    { question: "Could you help me feel better? I had a bad day.", answer: "Don't worry, I'm here to help you. Tell me what happened ❤️" },
    { question: "What's the weather like today?", answer: "The weather is sunny and warm. ☀️" },
    { question: "What do you recommend I have for dinner tonight, something healthy?", answer: "How about a Caesar Salad? I'll share the recipe. 👇" },
    { question: "Remind me to do my laundry tomorrow night.", answer: "Perfect, I'll remind you tomorrow at 7:00 PM. 👌" },
    { question: "I have no battery. Tell my dad in 30 minutes that I'm on my way home.", answer: "Don't worry, I'll tell him. Be careful! ⚡️" },
    { question: "Tell me the total expenses I had this week.", answer: "This week you spent $128.50, which is less than last week! 💵" },
    { question: "Notify my coworkers that I won't be able to go to the office tomorrow.", answer: "Sure, I'll let them know! 🏢" },
    { question: "If my girlfriend writes to you, never reply to her!", answer: "Understood! 🚫" },
    { question: "Remind me to stretch every 10 minutes.", answer: "I’ll remind you! Stretching is great! 🧘" },
    { question: "Find me a formal photo for my LinkedIn.", answer: "I’ll look for a suitable photo! 📸" },
];

// Control variable for tracking the last shown index
let lastIndex = -1;

// Wait 2 seconds before displaying the text boxes
setTimeout(() => {
    showQuestionAndAnswer();
}, 2000);

function showQuestionAndAnswer() {
    let index;
    do {
        index = Math.floor(Math.random() * texts.length);
    } while (index === lastIndex);
    lastIndex = index;

    const txt1 = document.querySelector('.txt1');
    const txt2 = document.querySelector('.txt2');

    txt1.innerHTML = "";
    txt2.innerHTML = "";

    txt1.style.opacity = '0';
    txt1.style.transform = 'translateY(20px)';
    txt1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    txt1.innerHTML = texts[index].question;
    txt1.style.opacity = '1';
    txt1.style.transform = 'translateY(0)';

    typeWriter(txt1, texts[index].question, '', 0, true);

    setTimeout(() => {
        txt2.style.opacity = '0';
        txt2.style.transform = 'translateY(20px)';
        txt2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        txt2.innerHTML = texts[index].answer;
        txt2.style.opacity = '1';
        txt2.style.transform = 'translateY(0)';

        typeWriter(txt2, texts[index].answer, '', 0, false);
    }, 4000);

    setTimeout(changeText, 10000);
}

function typeWriter(element, message, time, i, isFirst) {
    if (i < message.length) {
        element.innerHTML = message.substring(0, i + 1);
        setTimeout(() => {
            typeWriter(element, message, time, i + 1, isFirst);
        }, 50);
    } else {
        const timeElement = document.createElement('p');
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        timeElement.innerHTML = currentTime;
        timeElement.style.opacity = '0';
        timeElement.style.transition = 'opacity 0.5s ease';
        element.appendChild(timeElement);
        setTimeout(() => {
            timeElement.style.opacity = '1';
        }, 100);
    }
}

function changeText() {
    const txt1 = document.querySelector('.txt1');
    const txt2 = document.querySelector('.txt2');

    txt1.style.opacity = '0';
    txt2.style.opacity = '0';

    setTimeout(() => {
        showQuestionAndAnswer();
    }, 1000);
}

// SLIDESHOOOOOOOOW
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Manual slide function
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Pause question and answer animations when using manual slide
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        clearTimeout(changeText); // Stops auto-advance temporarily
        showSlide(i);
    });
});

// Default first slide
showSlide(0);

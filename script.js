// Niz objekata sa pitanjima, ponuđenim odgovorima i indeksom tačnog odgovora (0-3)
const quizData = [
    {
        question: "Koja ključna reč se koristi za deklarisanje promenljive čija se vrednost ne može menjati u JavaScript-u?",
        answers: ["var", "let", "const", "static"],
        correct: 2 // 'const' je pod indeksom 2
    },
    {
        question: "Šta vraća typeof operater za vrednost null?",
        answers: ["null", "object", "undefined", "number"],
        correct: 1 // Ovo je poznata specifičnost u JS-u ('object')
    },
    {
        question: "Koja metoda se koristi za dodavanje novog elementa na kraj niza?",
        answers: ["pop()", "shift()", "push()", "unshift()"],
        correct: 2 // 'push()' dodaje na kraj
    },
    {
        question: "Kako proveravamo strogu jednakost (i po vrednosti i po tipu podataka) u JavaScript-u?",
        answers: ["==", "===", "=", "!=="],
        correct: 1 // '===' proverava i vrednost i tip
    }
];

// Selektovanje DOM elemenata
const questionText = document.getElementById('questionText');
const answerButtons = document.getElementById('answerButtons');
const nextBtn = document.getElementById('nextBtn');
const quizBox = document.getElementById('quizBox');
const scoreContainer = document.getElementById('scoreContainer');
const scoreText = document.getElementById('scoreText');
const restartBtn = document.getElementById('restartBtn');

// Promenljive koje prate stanje kviza
let currentQuestionIndex = 0;
let score = 0;

// Funkcija za pokretanje/resetovanje kviza
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden'); // Sakrivamo ekran sa rezultatom
    quizBox.classList.remove('hidden');     // Prikazujemo kviz
    showQuestion();                         // Prikazujemo prvo pitanje
}

// Funkcija koja prikazuje trenutno pitanje i opcije
function showQuestion() {
    resetState(); // Čistimo prethodna dugmad i sakrivamo dugme "Sledeće"
    
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // Kreiramo dugme za svaki ponuđeni odgovor
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('btn');
        
        // Dodajemo event listener na klik svakog dugmeta odgovora
        button.addEventListener('click', () => selectAnswer(index, button));
        answerButtons.appendChild(button);
    });
}

// Funkcija koja resetuje stanje pre svakog novog pitanja
function resetState() {
    nextBtn.classList.add('hidden'); // Sakrivamo dugme "Sledeće" dok korisnik ne izabere odgovor
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Brišemo stara dugmad
    }
}

// Funkcija koja se izvršava kada korisnik izabere odgovor
function selectAnswer(selectedIndex, selectedButton) {
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;

    // Proveravamo da li je izabrani odgovor tačan
    if (selectedIndex === correctIndex) {
        selectedButton.classList.add('correct');
        score++; // Povećavamo broj poena
    } else {
        selectedButton.classList.add('incorrect');
        // Opciono: automatski obojimo tačan odgovor zeleno da korisnik vidi šta je bilo tačno
        answerButtons.children[correctIndex].classList.add('correct');
    }

    // Onemogućavamo klik na sva dugmad nakon što je izabrano
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    // Prikazujemo dugme "Sledeće" ili završavamo kviz ako je poslednje pitanje
    if (currentQuestionIndex < quizData.length - 1) {
        nextBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.add('hidden');
        // Čekamo malo pa prikazujemo rezultat
        setTimeout(showScore, 1000);
    }
}

// Funkcija za prikaz ekrana sa konačnim rezultatom
function showScore() {
    quizBox.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreText.textContent = `Osvojio/la si ${score} od ${quizData.length} poena!`;
}

// Event listener za dugme "Sledeće pitanje"
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

// Event listener za ponovno igranje
restartBtn.addEventListener('click', startQuiz);

// Pokrećemo kviz pri učitavanju stranice
startQuiz();
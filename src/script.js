// Existing slider code...
const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');
const caption = document.querySelectorAll('.caption');

let currentSlide = 0;

function hideSlider() {
    slider.forEach(item => item.classList.remove('on'))
    caption.forEach(item => item.classList.remove('on'))
}

function showSlider() {
    slider[currentSlide].classList.add('on')
    caption[currentSlide].classList.add('on')
}

function nextSlider() {
    hideSlider()
    if(currentSlide == slider.length -1){
        currentSlide = 0;
    }
    else{
        currentSlide++;
    }
    showSlider()
}

function prevSlider(){
    hideSlider()
    if(currentSlide == 0){
        currentSlide = slider.length - 1;
    }
    else{
        currentSlide--;
    }
    showSlider()
}

btnNext.addEventListener('click', () => nextSlider());
btnPrev.addEventListener('click', () => prevSlider());


// New counter logic
const timeElapsedSpan = document.getElementById('time-elapsed');

// Define a data de início da contagem: 9 de junho de 2024 às 20:34
const startDate = new Date('2024-06-09T20:34:00'); 

function updateTimeElapsed() {
    const now = new Date();
    let diffMs = now.getTime() - startDate.getTime(); // Diferença em milissegundos

    // Se a data de início for no futuro (caso a página seja acessada antes da data definida),
    // exibir "Em breve..." ou 0 tempo.
    if (diffMs < 0) {
        timeElapsedSpan.textContent = 'Em breve...';
        return;
    }

    const totalSeconds = Math.floor(diffMs / 1000);

    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / (60 * 60)) % 24;
    const days = Math.floor(totalSeconds / (60 * 60 * 24));

    // Cálculos de anos e dias restantes após os anos completos
    // Usamos 365.25 para uma aproximação de anos bissextos
    const years = Math.floor(days / 365.25);
    const remainingDaysAfterYears = Math.floor(days % 365.25);

    let displayParts = [];

    // Adiciona anos se houver
    if (years > 0) {
        displayParts.push(`${years} ano${years !== 1 ? 's' : ''}`);
    }
    // Adiciona dias restantes após os anos se houver
    if (remainingDaysAfterYears > 0) {
        displayParts.push(`${remainingDaysAfterYears} dia${remainingDaysAfterYears !== 1 ? 's' : ''}`);
    }

    // Sempre inclui horas, minutos e segundos, formatados com dois dígitos
    displayParts.push(`${hours.toString().padStart(2, '0')} hora${hours !== 1 ? 's' : ''}`);
    displayParts.push(`${minutes.toString().padStart(2, '0')} minuto${minutes !== 1 ? 's' : ''}`);
    displayParts.push(`${seconds.toString().padStart(2, '0')} segundo${seconds !== 1 ? 's' : ''}`);

    let finalDisplayString = '';
    if (displayParts.length > 1) {
        // Pega a última parte (segundos) e a remove do array
        const lastPart = displayParts.pop();
        // Junta o restante com vírgulas e adiciona " e " antes da última parte
        finalDisplayString = displayParts.join(', ') + ' e ' + lastPart;
    } else {
        // Se houver apenas uma parte (muito improvável para este contador), exibe-a
        finalDisplayString = displayParts[0];
    }
    
    // Atualiza o texto do span no HTML
    timeElapsedSpan.textContent = finalDisplayString;
}

// Atualiza o contador a cada segundo (1000 milissegundos)
setInterval(updateTimeElapsed, 1000);

// Chama a função uma vez ao carregar a página para exibir o contador imediatamente
updateTimeElapsed();

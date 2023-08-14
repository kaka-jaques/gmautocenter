const counters = document.querySelectorAll('.counter-number');
const speed = 2000;

counters.forEach(counter => {
    const start = +counter.innerText;
    const target = +counter.getAttribute('akhi');
    const duration = 2000; // Tempo total da animação em milissegundos
    const interval = 10; // Intervalo de atualização em milissegundos
    let currentTime = 0;

    const animate = () => {
        currentTime += interval;
        const progress = Math.min(currentTime / duration, 1); // Garante que o progresso esteja entre 0 e 1
        const easedProgress = easeInOutCubic(progress); // Aplica uma função de easing (aceleração) personalizada

        const value = Math.round(start + (target - start) * easedProgress);
        counter.innerText = value;

        if (currentTime < duration) {
            setTimeout(animate, interval);
        }
    };

    animate();
});

// Função de easing personalizada (easeInOutCubic)
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

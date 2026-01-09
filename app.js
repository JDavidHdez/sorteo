
    let intervalo;
    let tiempoInicio;
    const duracion = 5000; // 5 segundos

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function iniciarSorteo() {
        const min = parseInt(document.getElementById('minNum').value);
        const max = parseInt(document.getElementById('maxNum').value);

        if (isNaN(min) || isNaN(max)) {
            alert('Por favor, ingresa números válidos');
            return;
        }

        if (min >= max) {
            alert('El número mínimo debe ser menor que el máximo');
            return;
        }

        // Calcular el número final desde el inicio
        const numeroFinal = getRandomInt(min, max);

        // Ocultar panel de configuración y mostrar display
        document.getElementById('configPanel').classList.add('hidden');
        document.getElementById('displayPanel').classList.remove('hidden');

        const display = document.getElementById('numberDisplay');
        const statusText = document.getElementById('statusText');
        
        display.classList.remove('final');
        statusText.textContent = 'Sorteando...';

        tiempoInicio = Date.now();

        // Mostrar números aleatorios rápidamente
        intervalo = setInterval(() => {
            const tiempoTranscurrido = Date.now() - tiempoInicio;
            
            if (tiempoTranscurrido >= duracion) {
                // Mostrar el número final
                clearInterval(intervalo);
                display.textContent = numeroFinal;
                display.classList.add('final');
                statusText.textContent = '¡Número ganador!';
                
                // Lanzar confeti
                crearConfeti();
            } else {
                // Mostrar número aleatorio temporal
                display.textContent = getRandomInt(min, max);
            }
        }, 50); // Cambiar número cada 50ms
    }

    function resetear() {
        clearInterval(intervalo);
        document.getElementById('configPanel').classList.remove('hidden');
        document.getElementById('displayPanel').classList.add('hidden');
        document.getElementById('numberDisplay').classList.remove('final');
        
        // Limpiar confeti
        const confetis = document.querySelectorAll('.confetti');
        confetis.forEach(c => c.remove());
    }

    function crearConfeti() {
        const colores = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ff0088', '#88ff00', '#0088ff'];
        const cantidad = 150;
        
        for (let i = 0; i < cantidad; i++) {
            setTimeout(() => {
                const confeti = document.createElement('div');
                confeti.className = 'confetti';
                confeti.style.left = Math.random() * 100 + 'vw';
                confeti.style.top = '-10px';
                confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
                confeti.style.width = (Math.random() * 10 + 5) + 'px';
                confeti.style.height = (Math.random() * 10 + 5) + 'px';
                confeti.style.opacity = Math.random();
                confeti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
                
                // Variación en la duración de la caída
                const duracion = Math.random() * 3 + 2;
                confeti.style.animationDuration = duracion + 's';
                
                document.body.appendChild(confeti);
                
                // Eliminar el confeti después de que termine la animación
                setTimeout(() => confeti.remove(), duracion * 2000);
            }, i * 15);
        }
    }
    
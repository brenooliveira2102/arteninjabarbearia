document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if(menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // Carrossel da galeria
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
        const track = document.getElementById('carousel-track');
        const imageNames = ['9','8','7','6','5','3','1']; // Nomes dos seus arquivos de imagem
        const allImages = [...imageNames, ...imageNames]; 

        // [MELHORIA SEO APLICADA] Array com descrições específicas para as imagens
        const descricoesAlt = [
          "Corte degradê masculino na Arte Ninja Barbearia no Paranoá",
          "Barba modelada e finalizada por barbeiro profissional",
          "Cabelo platinado masculino, um dos nossos tratamentos especiais",
          "Corte de cabelo social clássico feito na tesoura",
          "Cliente recebendo um corte de cabelo moderno no Paranoá DF",
          "Barbeiro finalizando um penteado estiloso",
          "Detalhe de um corte de cabelo com navalha"
        ];

        allImages.forEach((name, index) => {
            const div = document.createElement('div');
            div.className = 'flex-shrink-0 w-4/5 sm:w-1/2 md:w-1/3 p-1';
            
            const img = document.createElement('img');
            img.src = `${name}.webp`;
            img.loading = 'lazy'; 
            // [MELHORIA SEO APLICADA] Atribui um alt text descritivo e variado para cada imagem
            img.alt = descricoesAlt[index % descricoesAlt.length]; 
            img.className = 'w-full h-64 md:h-80 object-cover rounded-lg shadow-lg';
            
            div.appendChild(img);
            track.appendChild(div);
        });

        track.classList.add('overflow-x-auto', 'no-scrollbar', 'cursor-grab');
        
        // Lógica para o scroll infinito
        track.addEventListener('scroll', () => {
            const scrollableWidth = track.scrollWidth / 2;
            if (track.scrollLeft >= scrollableWidth) {
                track.scrollLeft -= scrollableWidth;
            } else if (track.scrollLeft === 0 && scrollableWidth > 0) {
                track.scrollLeft = scrollableWidth;
            }
        }, { passive: true });

        // Lógica para arrastar (mouse e toque)
        let isDown = false, startX, scrollLeft;

        const start = (e) => {
            isDown = true;
            track.classList.add('cursor-grabbing');
            startX = (e.pageX || e.touches[0].pageX) - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        };

        const end = () => {
            isDown = false;
            track.classList.remove('cursor-grabbing');
        };

        const move = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = (e.pageX || e.touches[0].pageX) - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            track.scrollLeft = scrollLeft - walk;
        };

        track.addEventListener('mousedown', start);
        track.addEventListener('mouseleave', end);
        track.addEventListener('mouseup', end);
        track.addEventListener('mousemove', move);
        
        track.addEventListener('touchstart', start, { passive: true });
        track.addEventListener('touchend', end);
        track.addEventListener('touchmove', move, { passive: false });
    }

    // Lazy-load + autoplay do vídeo
    const video = document.getElementById('sobre-video');
    if (video) {
        const videoSource = video.querySelector('source');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (videoSource && videoSource.dataset.src) {
                        videoSource.src = videoSource.dataset.src;
                        video.load();
                        video.play().catch(err => {
                            console.log("Autoplay do vídeo foi bloqueado pelo navegador.", err);
                        });
                        obs.unobserve(video);
                    }
                }
            });
        }, { threshold: 0.25 }); 
        observer.observe(video);
    }
});

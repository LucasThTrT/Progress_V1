document.addEventListener('DOMContentLoaded', function() {
    const refuserBtn = document.getElementById('refuser-btn');
    const accepterBtn = document.getElementById('accepter-btn');
    const buttonContainer = document.getElementById('button-container');
    const videoContainer = document.getElementById('video-container');
    const afterAccept = document.getElementById('after-accept');
    const subtitle1 = document.querySelector('.challenge.subtitle.first');
    const subtitle2 = document.querySelector('.challenge.subtitle.second');
    let currentX = 0;
    let currentY = 0;

    // Gestion du clic sur le bouton Accepter
    accepterBtn.addEventListener('click', function() {
        // Masquer les subtitles
        subtitle1.style.display = 'none';
        subtitle2.style.display = 'none';
        
        // Masquer les boutons
        buttonContainer.style.display = 'none';
        
        // Afficher after-accept
        afterAccept.style.display = 'block';
    });

    // Gestion du clic pour faire disparaître le bouton Refuser
    refuserBtn.addEventListener('click', function() {
        refuserBtn.style.display = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        const btnRect = refuserBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - btnCenterX, 2) + Math.pow(mouseY - btnCenterY, 2)
        );
        
        if (distance < 2000) {
            // Calculer la direction opposée à la souris
            const directionX = btnCenterX - mouseX;
            const directionY = btnCenterY - mouseY;
            
            // Calculer l'intensité du mouvement selon la distance
            const intensity = (100 - distance) / 100;
            const moveDistance = 200 * intensity;
            
            // Normaliser la direction
            const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
            
            if (magnitude > 0) {
                const moveX = (directionX / magnitude) * moveDistance;
                const moveY = (directionY / magnitude) * moveDistance;
                
                // Calculer les nouvelles positions
                const newX = currentX + moveX * 0.15;
                const newY = currentY + moveY * 0.15;
                
                // Calculer la position actuelle et nouvelle du bouton par rapport à la souris
                const currentBtnX = btnCenterX;
                const currentBtnY = btnCenterY;
                const newBtnX = currentBtnX + (newX - currentX);
                const newBtnY = currentBtnY + (newY - currentY);
                
                // Distance actuelle et nouvelle entre la souris et le bouton
                const currentDistanceToMouse = Math.sqrt(
                    Math.pow(mouseX - currentBtnX, 2) + Math.pow(mouseY - currentBtnY, 2)
                );
                const newDistanceToMouse = Math.sqrt(
                    Math.pow(mouseX - newBtnX, 2) + Math.pow(mouseY - newBtnY, 2)
                );
                
                // Seulement appliquer le mouvement s'il éloigne le bouton de la souris
                if (newDistanceToMouse >= currentDistanceToMouse) {
                    currentX = newX;
                    currentY = newY;
                    
                    // Limiter le mouvement pour éviter que le bouton sorte de l'écran
                    const maxMoveX = window.innerWidth * 0.3;
                    const maxMoveY = window.innerHeight * 0.2;
                    
                    currentX = Math.max(-maxMoveX, Math.min(maxMoveX, currentX));
                    currentY = Math.max(-maxMoveY, Math.min(maxMoveY, currentY));
                    
                    refuserBtn.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            }
        }
    });
});
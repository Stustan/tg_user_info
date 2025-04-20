// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Enable closing confirmation
tg.enableClosingConfirmation();

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the WebApp
    tg.ready();

    // Get user data and log it for debugging
    const user = tg.initDataUnsafe.user;
    console.log('Full user object:', user); // Debug log for user object

    try {
        if (user) {
            // Update profile information
            const userIdElement = document.getElementById('userId');
            const usernameElement = document.getElementById('username');
            const isPremiumElement = document.getElementById('isPremium');
            const birthDateElement = document.getElementById('birthDate');

            if (userIdElement) userIdElement.textContent = user.id || 'Недоступно';
            if (usernameElement) usernameElement.textContent = user.username || 'Недоступно';
            
            // Correctly handle premium status with proper type checking and debugging
            if (isPremiumElement) {
                const premiumStatus = Boolean(user.premium || user.is_premium);
                console.log('Premium status details:', {
                    raw_premium: user.premium,
                    raw_is_premium: user.is_premium,
                    computed_status: premiumStatus
                });
                isPremiumElement.textContent = premiumStatus ? 'Да' : 'Нет';
            }
            
            // Handle birth date (not available in Telegram Mini Apps)
            if (birthDateElement) {
                birthDateElement.textContent = 'Недоступно';
                console.log('Birth date is not available through Telegram Mini Apps API');
            }
        } else {
            console.warn('User data is not available');
            ['userId', 'username', 'isPremium', 'birthDate'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = 'Недоступно';
            });
        }
    } catch (error) {
        console.error('Error processing user data:', error);
    }

    // Function to add a photo to the gallery
    function addPhotoToGallery(photoUrl) {
        const gallery = document.getElementById('photoGallery');
        if (!gallery) return;

        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = 'User photo';
        
        // Add click handler to open photo in Telegram
        img.addEventListener('click', () => {
            tg.openLink(photoUrl);
        });
        
        photoDiv.appendChild(img);
        gallery.appendChild(photoDiv);
    }

    // Example function to load photos (you'll need to implement this with your backend)
    function loadUserPhotos() {
        // This is a placeholder. In a real app, you would fetch photos from your backend
        const demoPhotos = [
            'https://picsum.photos/300/300?random=1',
            'https://picsum.photos/300/300?random=2',
            'https://picsum.photos/300/300?random=3',
            'https://picsum.photos/300/300?random=4',
            'https://picsum.photos/300/300?random=5',
            'https://picsum.photos/300/300?random=6'
        ];
        
        demoPhotos.forEach(photoUrl => addPhotoToGallery(photoUrl));
    }

    // Load photos when the page is ready
    loadUserPhotos();

    // Expand the WebApp to full height
    tg.expand();
});

// Log complete initialization data for debugging
console.log('Complete Telegram WebApp Data:', {
    initData: tg.initData,
    initDataUnsafe: tg.initDataUnsafe,
    version: tg.version,
    platform: tg.platform,
    colorScheme: tg.colorScheme,
    themeParams: tg.themeParams
}); 
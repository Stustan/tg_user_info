// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Enable closing confirmation
tg.enableClosingConfirmation();

// Initialize the WebApp
tg.ready();

// Get user data
const user = tg.initDataUnsafe.user;
if (user) {
    // Update profile information
    document.getElementById('userId').textContent = user.id || 'Недоступно';
    document.getElementById('username').textContent = user.username || 'Недоступно';
    document.getElementById('isPremium').textContent = user.isPremium ? 'Да' : 'Нет';
    
    // Format and display auth date
    const authDate = new Date(tg.initDataUnsafe.auth_date * 1000);
    document.getElementById('authDate').textContent = authDate.toLocaleString();
}

// Function to add a photo to the gallery
function addPhotoToGallery(photoUrl) {
    const gallery = document.getElementById('photoGallery');
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
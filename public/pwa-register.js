/**
 * @file pwa-register.js
 * @description PWA Registration and Update Management
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

// PWA Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('PWA: Service Worker registered successfully', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New update available
              showUpdateNotification();
            }
          });
        }
      });
      
      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('PWA: New service worker activated');
        // Reload to get the latest version
        window.location.reload();
      });
      
    } catch (error) {
      console.error('PWA: Service Worker registration failed', error);
    }
  });
}

// Install prompt handling
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA: Install prompt triggered');
  
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button
  showInstallPrompt();
});

// Handle app installed
window.addEventListener('appinstalled', () => {
  console.log('PWA: App was installed');
  hideInstallPrompt();
  deferredPrompt = null;
});

// Update notification
function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <div class="pwa-notification-content">
      <div class="pwa-notification-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>
      <div class="pwa-notification-text">
        <h4>تحديث متاح!</h4>
        <p>إصدار جديد من PrePilot متاح للتحميل</p>
      </div>
      <div class="pwa-notification-actions">
        <button class="pwa-btn pwa-btn-primary" onclick="updatePWA()">
          تحديث الآن
        </button>
        <button class="pwa-btn pwa-btn-secondary" onclick="hideUpdateNotification()">
          لاحقاً
        </button>
      </div>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    color: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
    z-index: 10000;
    max-width: 320px;
    animation: slideInUp 0.3s ease-out;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    hideUpdateNotification();
  }, 10000);
}

// Install prompt
function showInstallPrompt() {
  const installBtn = document.createElement('div');
  installBtn.className = 'pwa-install-prompt';
  installBtn.innerHTML = `
    <div class="pwa-install-content">
      <div class="pwa-install-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </div>
      <div class="pwa-install-text">
        <h4>ثبت التطبيق!</h4>
        <p>احصل على تجربة أفضل مع التطبيق المثبت</p>
      </div>
      <div class="pwa-install-actions">
        <button class="pwa-btn pwa-btn-success" onclick="installPWA()">
          تثبيت
        </button>
        <button class="pwa-btn pwa-btn-secondary" onclick="hideInstallPrompt()">
          لاحقاً
        </button>
      </div>
    </div>
  `;
  
  // Add styles
  installBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
    z-index: 10000;
    max-width: 320px;
    animation: slideInUp 0.3s ease-out;
  `;
  
  // Add to page
  document.body.appendChild(installBtn);
  
  // Auto-hide after 15 seconds
  setTimeout(() => {
    hideInstallPrompt();
  }, 15000);
}

// Global functions
window.updatePWA = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }
};

window.installPWA = async function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('PWA: Install prompt outcome', outcome);
    deferredPrompt = null;
  }
};

window.hideUpdateNotification = function() {
  const notification = document.querySelector('.pwa-update-notification');
  if (notification) {
    notification.style.animation = 'slideOutDown 0.3s ease-in';
    setTimeout(() => notification.remove(), 300);
  }
};

window.hideInstallPrompt = function() {
  const prompt = document.querySelector('.pwa-install-prompt');
  if (prompt) {
    prompt.style.animation = 'slideOutDown 0.3s ease-in';
    setTimeout(() => prompt.remove(), 300);
  }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  
  .pwa-btn {
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    margin: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .pwa-btn-primary {
    background: white;
    color: #8B5CF6;
  }
  
  .pwa-btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .pwa-btn-success {
    background: white;
    color: #10B981;
  }
  
  .pwa-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .pwa-notification-content,
  .pwa-install-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .pwa-notification-text,
  .pwa-install-text {
    flex: 1;
  }
  
  .pwa-notification-text h4,
  .pwa-install-text h4 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  .pwa-notification-text p,
  .pwa-install-text p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
  }
  
  .pwa-notification-actions,
  .pwa-install-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }
`;
document.head.appendChild(style);

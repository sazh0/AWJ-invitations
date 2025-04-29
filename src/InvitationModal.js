// InvitationModal.js with Celebration Effect
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, ChevronRight, ChevronLeft, Share2 } from 'lucide-react';
import './invitation-modal.css';

// Translations for the modal
const translations = {
  en: {
    title: "You are invited to experience the full journey of AWJ",
    subtitle: "where generative AI meets startups' passion to create a new path for entrepreneurs and startups.",
    dateLabel: "Date:",
    dateValue: "Sunday, May 4, 2025",
    timeLabel: "Time:",
    timeValue: "10:00 AM - 2:00 PM",
    locationLabel: "Location:",
    locationValue: "FCIT female building",
    highlightsLabel: "Highlights:",
    highlightsValue: "Our story, an interactive experience, and a Q&A session with the AWJ developers",
    addToCalendar: "Add to Calendar",
    shareNews: "Share this news",
    backToHomepage: "Back to Homepage",
    calendarAdded: "Calendar event added for AWJ Project Poster Day: May 4, 2025",
    shareMessage: "Join me at the AWJ Project Poster Day on Sunday, May 4, 2025 at FCIT female building from 10:00 AM - 2:00 PM",
    thankYouShare: "Thank you for sharing!",
    countdown: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds"
    }
  },
  ar: {
    title: "أنت مدعو لتجربة أَوج المتكاملة",
    subtitle: "حيث يمتزج الذكاء الاصطناعي التوليدي بشغف الريادة ليصنع مسارًا جديدًا لرواد الأعمال والشركات الناشئة",
    dateLabel: "التاريخ:",
    dateValue: "الأحد، ٤ مايو ٢٠٢٥",
    timeLabel: "الوقت:",
    timeValue: "١٠:٠٠ صباحاً - ٢:٠٠ مساءً",
    locationLabel: "المكان:",
    locationValue: "مبنى كلية الحاسبات والمعلومات للبنات",
    highlightsLabel: "أهم اللحظات:",
    highlightsValue: "قصتنا، تجربة تفاعلية مباشرة، أسئلة وأجوبة مع مطورين أَوج",
    addToCalendar: "إضافة إلى التقويم",
    shareNews: "مشاركة الخبر",
    backToHomepage: "العودة إلى الصفحة الرئيسية",
    calendarAdded: "تمت إضافة حدث التقويم ليوم عرض مشروع أوج: ٤ مايو ٢٠٢٥",
    shareMessage: "انضم إلي في يوم عرض مشروع أوج يوم الأحد ٤ مايو ٢٠٢٥ في مبنى كلية الحاسبات والمعلومات للبنات من الساعة ١٠:٠٠ صباحاً إلى ٢:٠٠ مساءً",
    thankYouShare: "شكراً للمشاركة!",
    countdown: {
      days: "أيام",
      hours: "ساعات",
      minutes: "دقائق",
      seconds: "ثواني"
    }
  }
};

// AWJ Invitation Modal with Countdown Timer and Language Support
const InvitationModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [isCelebrating, setIsCelebrating] = useState(false);

  // Get current language from localStorage
  const currentLanguage = localStorage.getItem('appLanguage') || 'ar';

  // Get translations based on current language
  const t = translations[currentLanguage];

  // Set the countdown date (May 4, 2025, 10:00 AM)
  const countdownDate = new Date("May 4, 2025 10:00:00").getTime();

  // Memoize calculation function to improve performance
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  }, [countdownDate]);

  // Update the countdown every second
  useEffect(() => {
    if (!isOpen) return;

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, calculateTimeLeft]);

  // Ensure body scrolling is managed correctly
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // For animation effect - simplified to improve performance
  useEffect(() => {
    if (!isOpen) return;

    // Reduced animation items and simplified timing
    const elements = document.querySelectorAll('.animate-in');

    // Batch the animations with requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('appear');
        }, index * 80); // Reduced delay between animations
      });
    });
  }, [isOpen]);

  // Cleanup celebration effect after 5 seconds
  useEffect(() => {
    if (isCelebrating) {
      const timer = setTimeout(() => {
        setIsCelebrating(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isCelebrating]);

  // Create confetti elements
  const createConfettiElements = () => {
    // Generate 50 confetti pieces
    return Array.from({ length: 50 }).map((_, index) => (
      <div
        key={index}
        className="confetti"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          backgroundColor: getRandomColor()
        }}
      />
    ));
  };

  // Get random color for confetti
  const getRandomColor = () => {
    const colors = [
      '#e63a46', // Red (secondary-color)
      '#ff7b89', // Light red (secondary-light)
      '#1d3557', // Blue (primary-color)
      '#457b9d', // Light blue (primary-light)
      '#43aa8b', // Green (tertiary-color)
      '#90be6d', // Light green (tertiary-light)
      '#ffd166', // Yellow
      '#ef476f', // Pink
      '#06d6a0', // Teal
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handle clicking outside the modal to close it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCalendar = (e) => {
    e.preventDefault();
    alert(t.calendarAdded);
  };

  // Handle sharing functionality with celebration
  const handleShare = (e) => {
    e.preventDefault();

    // Start celebration animation
    setIsCelebrating(true);

    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: t.title,
        text: t.shareMessage,
        url: window.location.href,
      })
        .catch((error) => {
          console.log('Error sharing:', error);
          // Still show celebration even if sharing fails
          fallbackShare();
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      fallbackShare();
    }
  };

  // Fallback sharing method (copy to clipboard)
  const fallbackShare = () => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = t.shareMessage;
    document.body.appendChild(textarea);

    // Select and copy the text
    textarea.select();
    document.execCommand('copy');

    // Clean up and notify the user
    document.body.removeChild(textarea);
    alert('Message copied to clipboard! You can paste it in your messaging app.');
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Check direction for conditional rendering
  const isRTL = currentLanguage === "ar";
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div
      className={`invitation-modal ${isOpen ? 'open' : ''} ${isRTL ? "rtl-content" : "ltr-content"}`}
      onClick={handleBackdropClick}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="invitation-content">
        <div className="invitation-ribbon"></div>

        {/* Celebration overlay */}
        {isCelebrating && (
          <div className="celebration-container">
            {createConfettiElements()}
            <div className="thank-you-message">
              <span>🎉 {t.thankYouShare} 🎉</span>
            </div>
          </div>
        )}

        <div className="invitation-body">
          <h2 className="invitation-title animate-in">{t.title}</h2>
          <p className="invitation-subtitle animate-in">
            {t.subtitle}
          </p>

          <div className="countdown-container animate-in">
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.days}</div>
              <div className="countdown-label">{t.countdown.days}</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.hours}</div>
              <div className="countdown-label">{t.countdown.hours}</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.minutes}</div>
              <div className="countdown-label">{t.countdown.minutes}</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.seconds}</div>
              <div className="countdown-label">{t.countdown.seconds}</div>
            </div>
          </div>

          <div className="invitation-details animate-in">
            <div className="invitation-detail">
              <span className="detail-icon">📅</span>
              <span><strong>{t.dateLabel}</strong> {t.dateValue}</span>
            </div>
            <div className="invitation-detail">
              <span className="detail-icon">🕒</span>
              <span><strong>{t.timeLabel}</strong> {t.timeValue}</span>
            </div>
            <div className="invitation-detail">
              <span className="detail-icon">📍</span>
              <span><strong>{t.locationLabel}</strong> {t.locationValue}</span>
            </div>
            <div className="invitation-detail">
              <span className="detail-icon">✨</span>
              <span><strong>{t.highlightsLabel}</strong> {t.highlightsValue}</span>
            </div>
          </div>

          <div className="invitation-buttons animate-in">

            <a href="#" className="invitation-button share-button" onClick={handleShare}>
              <Share2 className="button-icon" size={20} />
              <span>{t.shareNews}</span>
            </a>

            <a href="#" className="invitation-button primary-button" onClick={handleAddToCalendar}>
              <Calendar className="button-icon" size={20} />
              <span>{t.addToCalendar}</span>
            </a>

            <button className="invitation-button secondary-button" onClick={onClose}>
              <span>{t.backToHomepage}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationModal;
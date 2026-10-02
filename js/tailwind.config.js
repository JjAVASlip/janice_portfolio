// Tailwind CSS Configuration for Janice Mas Bulanon Portfolio
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgPrimary: '#060810',
        bgSecondary: '#0A0F1E',
        deepNavy: '#0B1530',
        electricBlue: '#2864FF',
        royalPurple: '#7652E8',
        deepPurple: '#2A164D',
        gold: '#D4AF37',
        softGold: '#F0D77A',
        primaryText: '#F5F3EE',
        secondaryText: '#A9B0C0',
        mutedText: '#6F7788',
        borderSubtle: 'rgba(255, 255, 255, 0.10)',
        borderGold: 'rgba(212, 175, 55, 0.25)',
      },
      fontFamily: {
        sora: ['Sora', 'Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(40, 100, 255, 0.25)',
        'glow-purple': '0 0 30px rgba(118, 82, 232, 0.25)',
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.20)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    }
  }
};

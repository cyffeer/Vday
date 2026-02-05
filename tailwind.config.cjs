module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#ff6b81'
        }
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '50%': { transform: 'translateY(-20px) translateX(8px)', opacity: '.9' },
          '100%': { transform: 'translateY(0) translateX(-4px)', opacity: '1' }
        },
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        beat: 'beat 1s infinite',
        fadeIn: 'fadeIn 0.6s ease both'
      }
    }
  },
  plugins: []
}

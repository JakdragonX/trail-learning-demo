export const theme = {
    colors: {
      primary: {
        DEFAULT: '#2D4F1E',
        light: '#3A6527',
        dark: '#1F3614',
        contrast: '#FAF6F1'
      },
      secondary: {
        DEFAULT: '#FAF6F1',
        light: '#FFFFFF',
        dark: '#E5E1DC'
      },
      accent: {
        DEFAULT: '#FF6B6B',
        success: '#4CAF50',
        warning: '#FFA726',
        error: '#EF5350'
      }
    },
    animation: {
      transition: 'all 0.3s ease-in-out',
      hover: 'transform 0.2s ease-in-out',
      slideIn: 'slideIn 0.5s ease-out',
      fadeIn: 'fadeIn 0.3s ease-in'
    }
  };
  
  export const styles = {
    container: "min-h-screen bg-gradient-to-b from-secondary to-secondary-light",
    header: "bg-gradient-to-r from-primary to-primary-light text-secondary py-6 px-8 shadow-lg",
    card: "bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300",
    button: {
      primary: "bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 disabled:opacity-50",
      secondary: "border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-secondary transition-all duration-300",
      icon: "w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-all duration-300"
    },
    input: "w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-light focus:outline-none transition-all duration-300",
    section: "max-w-6xl mx-auto p-8",
    heading: {
      h1: "text-4xl font-bold text-primary",
      h2: "text-3xl font-semibold text-primary",
      h3: "text-2xl font-medium text-primary"
    }
  };
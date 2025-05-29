
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: 'Home',
    entertainment: 'Entertainment',
    health: 'Health',
    sport: 'Sport',
    lifestyle: 'Life Style',
    food: 'Food',
    technology: 'Technology',
    business: 'Business',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    createBlog: 'Create Blog',
    latestBlogs: 'Latest Blogs',
    popularBlogs: 'Popular Blogs',
    categories: 'Categories',
    contactUs: 'Contact Us',
    name: 'Name',
    email: 'Email',
    mobile: 'Mobile',
    message: 'Message',
    submit: 'Submit',
    readMore: 'Read More',
    by: 'By',
    on: 'on',
    forgotPassword: 'Forgot Password?',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    advertisement: 'Advertisement'
  },
  hi: {
    home: 'होम',
    entertainment: 'मनोरंजन',
    health: 'स्वास्थ्य',
    sport: 'खेल',
    lifestyle: 'जीवनशैली',
    food: 'भोजन',
    technology: 'तकनीक',
    business: 'व्यापार',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    createBlog: 'ब्लॉग बनाएं',
    latestBlogs: 'नवीनतम ब्लॉग',
    popularBlogs: 'लोकप्रिय ब्लॉग',
    categories: 'श्रेणियां',
    contactUs: 'संपर्क करें',
    name: 'नाम',
    email: 'ईमेल',
    mobile: 'मोबाइल',
    message: 'संदेश',
    submit: 'भेजें',
    readMore: 'और पढ़ें',
    by: 'द्वारा',
    on: 'को',
    forgotPassword: 'पासवर्ड भूल गए?',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड पुष्टि',
    alreadyHaveAccount: 'पहले से खाता है?',
    dontHaveAccount: 'खाता नहीं है?',
    advertisement: 'विज्ञापन'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

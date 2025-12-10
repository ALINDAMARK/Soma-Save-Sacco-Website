import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const scrollReveal = () => {
      scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', scrollReveal);
    window.addEventListener('load', scrollReveal);
    scrollReveal();
    
    return () => {
      window.removeEventListener('scroll', scrollReveal);
      window.removeEventListener('load', scrollReveal);
    };
  }, []);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-20 md:py-32 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-5xl md:text-6xl animate-fadeInUp">
              Empowering Members Through Savings, Loans & Financial Growth
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-normal text-gray-600 dark:text-gray-400 animate-fadeInUp stagger-1">
              Join our community-focused SACCO and take control of your financial future. We are dedicated to supporting the well-being of our members in Uganda.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 items-center justify-center animate-fadeInUp stagger-2">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-gray-900 text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 hover-glow transform hover:scale-105">
                <span className="truncate">Become a Member</span>
              </button>
              <Link to="/loan-application">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary/20 dark:bg-primary/30 text-gray-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 dark:hover:bg-primary/40 transform hover:scale-105">
                  <span className="truncate">Apply for a Loan</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white dark:bg-gray-900/50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-3 text-center items-center hover-lift animate-scaleIn stagger-1 cursor-pointer">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 text-primary hover-scale">
                <span className="material-symbols-outlined text-3xl">savings</span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white text-lg font-bold leading-normal">Flexible Savings Accounts</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Securely grow your money with our competitive savings options.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 text-center items-center hover-lift animate-scaleIn stagger-2 cursor-pointer">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 text-primary hover-scale">
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white text-lg font-bold leading-normal">Affordable Loan Products</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Access the funds you need with our fair and transparent loan terms.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 text-center items-center hover-lift animate-scaleIn stagger-3 cursor-pointer">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 text-primary hover-scale">
                <span className="material-symbols-outlined text-3xl">smartphone</span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white text-lg font-bold leading-normal">Easy Mobile Money</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Conveniently manage your finances on the go with mobile integration.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 text-center items-center hover-lift animate-scaleIn stagger-4 cursor-pointer">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 text-primary hover-scale">
                <span className="material-symbols-outlined text-3xl">star</span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white text-lg font-bold leading-normal">Exclusive Member Benefits</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Enjoy dividends, financial education, and a supportive community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 scroll-reveal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 items-center hover-lift animate-fadeInUp stagger-1 cursor-pointer">
              <span className="material-symbols-outlined text-primary text-2xl hover-scale">shield</span>
              <h2 className="text-gray-900 dark:text-white text-base font-bold leading-tight">Registered SACCO</h2>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 items-center hover-lift animate-fadeInUp stagger-2 cursor-pointer">
              <span className="material-symbols-outlined text-primary text-2xl hover-scale">lock</span>
              <h2 className="text-gray-900 dark:text-white text-base font-bold leading-tight">Secure Transactions</h2>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 items-center hover-lift animate-fadeInUp stagger-3 cursor-pointer">
              <span className="material-symbols-outlined text-primary text-2xl hover-scale">support_agent</span>
              <h2 className="text-gray-900 dark:text-white text-base font-bold leading-tight">Reliable Support</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900/50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What Our Members Are Saying</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Real stories from our community.</p>
          </div>
          <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-8 flex-nowrap">
              {[
                { 
                  name: 'Sarah K.', 
                  text: '"SomaSave helped me start my small business with a loan that had fair rates. I\'m so grateful for their support."',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArseaAnYHpdBe2K3C-u0pms9a_9SLOBGPKdI3rwDdv5yaXfn9eA7CHvGecrq0mAXAZbvgDWibOLLMOKSX4_j_AL1uBFN2jwN07KDogusjYITpMv2i7UMTM6OllIDEHUyL8KShczE0eAFALhwkn3Nuqkfu8btpu5WvKSVamonRNScL5WS66BANQBq1ePWFWFnm8aioJUbqo2ML09w4q5HEerf780w20ii1h-78J398ZWYwrnn8GpAjgh9CqfBxqb9gxAkpL2E2Vkoyp'
                },
                { 
                  name: 'David M.', 
                  text: '"The mobile money payment feature is so convenient! Managing my savings has never been easier."',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHE3hJ5qbK5WuT-0DSeog2TBP4D0I0t019f_pMJT4WV2IF9cBl9CeNyRPH2yy763wskDGHH706xs8RBWccti36iyPZFxAoirRoAUX-55VKKuCSQiiDAnGQHGTfdzn_fMO6ymRunCpzYVH47T7GH3o5EriSNw1i9c7WA1DWWSkxlUHAKNSssJsr2e9PvDpE_0DsJlIwKh2VkjPoQAx1rNlDQC1oikpn1Dm5Z6Jbhl5Fa3IZt3tmhRGesxC2EqLmeaNQeieKxhi-FmoR'
                },
                { 
                  name: 'Grace A.', 
                  text: '"Being part of this SACCO feels like being part of a family. They truly care about our financial growth."',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWlBxi1ttj7UXVc5_hwPmN56rOSnHlGEtyCQDGvhhguGpKdOkH55X3ZxrCThbouN8emV0bZQBXVGuc1HkOfTnkCTel0E8xFGH0dinFU3r_kRAIrlKJoLZDFhNV_3iOXBljfoeKjIIYpke2u17ZxQO9GOGF1BXteRPVhmpjWc92VlcKkHiGbL9R19vuSMk4P_dSWMrl1DBaVtGn56kseXyOU2fE5WnYCxB2HpNShb7Yaw8mIQlpQW0btjPX8hlyTOBA-G4nNtjiboHA'
                },
                { 
                  name: 'John L.', 
                  text: '"Their financial education workshops have been invaluable. I feel more confident managing my money."',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsFs1QwTyIsw2PORw1s6COi_8Q4CC71f3X06SpuSrpnYEKj5tlnAl9Pf0CGoWnYLjsHwBt6YEt3Yuuoq1SeVHCx1TzpPFAwm707VyL2E6JK6VjVjQXV2jB_dtpZ9NQYejkgqzFmggKbk7xG5dS7ZC5oSirL1R2oV28ELeb2datbQhI3uXf_dT34lS4rEcyS1vzjHpjlO0wjEoixj08iibIbh5EP_LQdDampijK4l8f4pdNcmnSuK9Gi4fmaLNuJ8TMBIKooglSfNpW'
                }
              ].map((testimonial, index) => (
                <div key={index} className={`flex h-full flex-col gap-4 text-center rounded-xl min-w-72 max-w-72 p-6 bg-background-light dark:bg-background-dark hover-lift animate-fadeIn stagger-${index + 1} cursor-pointer`}>
                  <img 
                    src={testimonial.image} 
                    alt={`Portrait of ${testimonial.name}`}
                    className="w-24 h-24 mx-auto rounded-full object-cover hover-scale"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white text-base font-bold leading-normal">{testimonial.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal mt-2">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

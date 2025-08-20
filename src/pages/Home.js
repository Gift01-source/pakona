import React from 'react';
import { Link } from 'react-router-dom';



function Home() {
  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="bg-cover bg-center text-white py-24 px-6" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584697964154-0d94d3f3a940?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">TutorConnect</h1>
          <p className="text-xl mb-6">Find the perfect tutor or become one — in just a few clicks.</p>
          <Link to="/Login">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-white text-lg font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            title="Qualified Tutors"
            description="We handpick the best instructors across every subject."
          />
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
            title="Flexible Scheduling"
            description="Book sessions that fit your schedule, anytime."
          />
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            title="Secure Payments"
            description="Simple, secure payment options built into the platform."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <StepCard
            image="https://c:\Users\User\Pictures\FB_IMG_16902272581146454.jpg"
            title="1. Sign Up"
            description="Create your free account as a student or tutor."
          />
          <StepCard
            image="https://images.unsplash.com/photo-1611974789857-9c7d53c74f88?auto=format&fit=crop&w=600&q=80"
            title="2. Match & Book"
            description="Get matched with tutors and book sessions instantly."
          />
          <StepCard
            image="https://images.unsplash.com/photo-1581093448793-25b9b1ed1573?auto=format&fit=crop&w=600&q=80"
            title="3. Start Learning"
            description="Join your session and learn with ease online."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TutorConnect. All rights reserved. Mr.BT
      </footer>
    </div>
  );
}

const FeatureCard = ({ image, title, description }) => (
  <div className="w-64 text-center">
    <img src={image} alt={title} className="w-16 h-16 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ image, title, description }) => (
  <div className="w-72 bg-white rounded-lg overflow-hidden shadow-lg">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Home;

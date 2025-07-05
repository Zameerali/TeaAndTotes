function About() {
  return (
    <>
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-10 md:p-16 text-center border border-green-100 dark:border-gray-800 backdrop-blur-md animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 dark:text-green-200 mb-6 drop-shadow-lg">About Tea and Totes</h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-6 font-medium">
            At <span className="text-green-600 dark:text-green-300 font-bold">Tea and Totes</span>, we are passionate about making a positive impact on the environment and our community. We sell high-quality, cloth-made tote bags designed to reduce the use of plastic and promote sustainable living.
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-6 font-medium">
            Our mission goes beyond eco-friendly products. We are dedicated to <span className="text-green-600 dark:text-green-300 font-bold">empowering women</span> by providing them with meaningful work opportunities, helping them achieve financial independence and a better quality of life.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center mt-8">
            <div className="flex-1 bg-green-100/60 dark:bg-green-900/40 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-200 mb-2">Eco-Friendly</h2>
              <p className="text-gray-700 dark:text-gray-200">All our totes are made from sustainable materials, helping you make a difference with every purchase.</p>
            </div>
            <div className="flex-1 bg-green-100/60 dark:bg-green-900/40 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-200 mb-2">Women Empowerment</h2>
              <p className="text-gray-700 dark:text-gray-200">We support women artisans and workers, providing fair wages and a supportive work environment.</p>
            </div>
            <div className="flex-1 bg-green-100/60 dark:bg-green-900/40 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-200 mb-2">Community Impact</h2>
              <p className="text-gray-700 dark:text-gray-200">A portion of every sale goes back to community initiatives and environmental causes.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

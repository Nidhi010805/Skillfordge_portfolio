import React from "react";

const ContactPage = () => {
  return (
    <div className="mt-16 min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
          📬 Get in Touch
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          We'd love to hear from you. Fill out the form and we’ll get back to you shortly.
        </p>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
            <input
              type="text"
              placeholder="How can we help you?"
              className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

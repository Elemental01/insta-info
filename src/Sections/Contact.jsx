    import { useState, useRef } from "react";
    import { instagram, github, twitter } from "../assets";
    import emailjs from 'emailjs-com';

    const Contact = () => {
      const formRef = useRef();
      const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      const [loading, setLoading] = useState(false);
      const [formStatus, setFormStatus] = useState(null);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.send(
          'service_xd2az7s',  // Your Service ID
          'template_01hnhjo', // Your Template ID
          {
            from_name: form.name,
            to_name: 'Harsh',
            from_email: form.email,
            to_email: 'raiharsh022@gmail.com', // Your email
            subject: form.subject,
            message: form.message,
          },
          'P2DkQHQEv1-ufkPTU' // Your User ID
        )
        .then(() => {
          setLoading(false);
          setFormStatus('success');
          setForm({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        // Reset the form using the reference
        formRef.current.reset();
        }, (error) => {
          setLoading(false);
          console.error(error);
          setFormStatus('error');
        });
      };

      return (
        <div className='container px-4 mx-auto my-8 md:flex justify-between' id="contact">
          <div>
            <h3 className='font-poppins text-4xl font-light text-wrap'>Contact</h3>
            <p className='m-2 font-poppins italic text-lg text-wrap'>Please fill out the form below to send us an email.</p>
            <p className="m-2 font-poppins mb-2 text-lg text-wrap"><span className='text-secondary font-semibold italic hover:animate-pulse'>Hi, I'm Harsh.</span> Feel free to reach out to me through any of the methods below:</p>
            <div className="flex w-2/4 space-x-2">
              <a href="https://github.com/Elemental01" target="_blank" rel="noopener noreferrer">
                <img src={github} className="w-10 rounded-full m-2" alt="GitHub" />
              </a>
              <a href="https://x.com/itsElemental01" target="_blank" rel="noopener noreferrer">
                <img src={twitter} className="w-10 rounded-full m-2" alt="Twitter" />
              </a>
              <a href="https://www.instagram.com/raiharsh022/" target="_blank" rel="noopener noreferrer">
                <img src={instagram} className="w-10 rounded-full m-2" alt="Instagram" />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <form ref={formRef} onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="shadow bg-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your name"
                  aria-label="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="shadow bg-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="shadow bg-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter the subject"
                  aria-label="Enter the subject"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="shadow bg-primary appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your message"
                  rows="4"
                  aria-label="Enter your message"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`bg-secondary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading && 'cursor-not-allowed opacity-50'}`}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Submit'}
                </button>
              </div>
              {formStatus === 'success' && (
                alert("Thank you, I will get back to you as soon as possible.")
              )}
              {formStatus === 'error' && (
                alert("Something went wrong. Please try again.")
              )}
            </form>
          </div>
        </div>
      );
    };

    export default Contact;

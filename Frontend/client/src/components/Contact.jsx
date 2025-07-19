import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-orange-50 via-gray-300 to-gray-200 flex flex-col items-center py-10 px-4 sm:px-8">
            {/* Apple Map Embed */}
            <div className="w-full max-w-6xl h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg mb-10">
                <iframe
                    title="Apple Maps Location"
                    src="https://www.google.com/maps?q=32.264290,75.159330&hl=es;z=14&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Contact Info */}
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {/* Email */}
                <a
                    href="mailto:pakistanmartskg@gmail.com"
                    className="flex flex-col items-center bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                    <FaEnvelope className="text-[#a73e2c] text-3xl mb-3" />
                    <h3 className="text-lg font-semibold text-[#a73e2c] mb-1">Email</h3>
                    <p className="text-gray-700 break-all">pakistanmartskg@gmail.com</p>
                </a>

                {/* Phone */}
                <a
                    href="tel:0542450992"
                    className="flex flex-col items-center bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                    <FaPhoneAlt className="text-[#a73e2c] text-3xl mb-3" />
                    <h3 className="text-lg font-semibold text-[#a73e2c] mb-1">Phone</h3>
                    <p className="text-gray-700">0542-450992</p>
                </a>

                {/* Location */}
                <a
                    href="https://maps.apple.com/?ll=32.264290,75.159330&q=Marked%20Location&t=m"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                    <FaMapMarkerAlt className="text-[#a73e2c] text-3xl mb-3" />
                    <h3 className="text-lg font-semibold text-[#a73e2c] mb-1">Location</h3>
                    <p className="text-gray-700 text-sm">Pakistan Paper Mart basement of UBL bank railway road shakargarh</p>
                </a>
            </div>
        </div>
    );
}

export default Contact;

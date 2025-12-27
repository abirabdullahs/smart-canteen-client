import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>

                {/* Developed By Section - Minimal */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <a
                        href="https://www.linkedin.com/in/abirabdullah/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-gray-400 hover:text-orange-500 transition-colors text-sm"
                    >
                        Developed by <span className="font-semibold">Abir Abdullah</span>
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
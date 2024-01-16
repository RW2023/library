import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/feedback">Feedback</Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4 text-3xl">
          {/* GitHub */}
          <a
            href="https://github.com/RW2023/library"
            target="https://github.com/RW2023/library"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © 2023 - All rights reserved by
          <span> Ryan Wilson</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

import Image from 'next/image';
import LightHeading from '@/app/components/ui/LightSubHeading';
import LightSubHeading from '@/app/components/ui/LightSubHeading';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: 'url(hero.webp)',
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            {/* <LightHeading title="Welcome to the Library" /> */}
            <h1
              className="text-5xl"
              style={{
                textShadow:
                  '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
              }}
            >
              Enter the Library
            </h1>

            <Link
            href="/library"
            >
              <button type="button" className="btn btn-primary">
                Explore Titles 📚
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

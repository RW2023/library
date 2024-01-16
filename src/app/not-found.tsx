import Link from 'next/link';
import SubHeading from '@/app/components/ui/SubHeading';

function Custom404() {
  return (
    <div
      className="bg-base-100 min-h-screen flex items-center justify-center text-center "
      // data-theme="halloween"
    >
      <div className="card bordered p-10 shadow-xl bg-base-300 mx-auto w-3/4">
        <div className="border rounded p-4 bg-base-100">
          <SubHeading
            title="Oh oh!🥹"
            iconClass="fas fa-exclamation-triangle"
          />
        </div>
        <SubHeading title="The page you're looking for cannot be found" />
        <p className="mt-4">
          The page might have been moved, deleted, or maybe you just mistyped
          the address. Don&apos;t worry, you can find your way back.
        </p>
        <Link href="/" className="mt-5 btn btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default Custom404;

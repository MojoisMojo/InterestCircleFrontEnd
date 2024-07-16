import { BellIcon } from '@heroicons/react/20/solid';
export default function BellButton({ className }) {
  return (
    <button
      type="button"
      className={`${className} \
relative rounded-full bg-gray-800 p-1 text-gray-400 \
hover:text-white \
focus:outline-none focus:ring-2 focus:ring-white \
focus:ring-offset-2 focus:ring-offset-gray-800`}
    > {/* bell button */}
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};
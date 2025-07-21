import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="px-4 md:px-8 lg:px-16 xl:px-24 pt-6 w-full text-gray-600">
      <div className="flex flex-col md:flex-row justify-between w-full gap-6 border-b border-gray-400 pb-4">
        <div className="md:max-w-lg">
          <img className="h-8" src={assets.logo} alt="logo" />
          <p className="mt-4 text-sm leading-relaxed">
            Experience the power of AI with Promptify...
            <br />
            Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
          </p>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-8 md:justify-end">
          <div>
            <h2 className="mb-3 text-gray-800">Company</h2>
            <ul className="text-sm space-y-1">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About us</a></li>
              <li><a href="/contact-us">Contact us</a></li>
              <li><a href="/privacy-policy">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-gray-800">Subscribe to our newsletter</h2>
            <p className="text-sm mb-2">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-400 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-xs h-8 rounded px-2"
              />
              <button className="bg-primary text-white rounded w-20 h-8 cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-3 text-center text-xs md:text-sm pb-4">
        Copyright 2024 © <a href="/">Quick.AI</a>. All Right Reserved.
      </p>
    </footer>
  );
}

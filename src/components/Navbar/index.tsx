import { component$, useSignal } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import logo from "../../media/logo.png";

export default component$(() => {
  const searchQuery = useSignal(""); 
  const nav = useNavigate();

  return (
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <Link href="/" class="text-2xl flex items-center font-bold text-gray-500 text-primary">
              <img src={logo} alt="QwikPulse" class="w-8 h-8 object-cover" /> QwikPulse
            </Link>
          </div>

          <nav class="hidden md:flex space-x-8">
            <Link href="/politics/" class="text-gray-700 hover:text-primary">Politics</Link>
            <Link href="/technology/" class="text-gray-700 hover:text-primary">Technology</Link>
            <Link href="/business/" class="text-gray-700 hover:text-primary">Business</Link>
            <Link href="/sports/" class="text-gray-700 hover:text-primary">Sports</Link>
            <Link href="/entertainment/" class="text-gray-700 hover:text-primary">Entertainment</Link>
          </nav>

          <div class="flex items-center space-x-4">
            <div class="flex items-center px-4 py-1.5 rounded-md border border-gray-300 focus-within:border-primary">
              <input
                type="text"
                value={searchQuery.value}
                onInput$={(e) => (searchQuery.value = (e.target as HTMLInputElement).value)}
                placeholder="Search news..."
                class="outline-none border-none bg-transparent flex-grow"
              />
              <button
                onClick$={async () => {
                  if (searchQuery.value.trim()) {
                    await nav(`/search/${encodeURIComponent(searchQuery.value.trim())}`);
                    searchQuery.value = ""; 
                  }
                }}
                class="p-1 text-gray-700 hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-6 w-6"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </button>
            </div>
            <button class="md:hidden p-1 text-gray-700 hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
            <Link
              href="/subscribe"
              class="hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});
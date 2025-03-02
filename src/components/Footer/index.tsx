import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(()=>{
    return <>
     <footer class="bg-gray-800 text-white mt-12">
        <div class="container mx-auto px-4 py-12">
          <div class="grid md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4">QwikPulse</h3>
              <p class="text-gray-400">Delivering fast, reliable news with the speed of Qwik.</p>
              <div class="flex space-x-4 mt-4">
                <a href="#" class="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 class="font-bold mb-4">Categories</h4>
              <ul class="space-y-2">
                <li><Link href="/world/" class="text-gray-400 hover:text-white">World</Link></li>
                <li><Link href="/politics/" class="text-gray-400 hover:text-white">Politics</Link></li>
                <li><Link href="/business/" class="text-gray-400 hover:text-white">Business</Link></li>
                <li><Link href="/technology/" class="text-gray-400 hover:text-white">Technology</Link></li>
                <li><Link href="/entertainment/" class="text-gray-400 hover:text-white">Entertainment</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-bold mb-4">Company</h4>
              <ul class="space-y-2">
                <li><Link href="/about/" class="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/careers/" class="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/contact/" class="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/advertise/" class="text-gray-400 hover:text-white">Advertise</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-bold mb-4">Legal</h4>
              <ul class="space-y-2">
                <li><Link href="/terms/" class="text-gray-400 hover:text-white">Terms of Use</Link></li>
                <li><Link href="/privacy/" class="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/cookies/" class="text-gray-400 hover:text-white">Cookie Policy</Link></li>
                <li><Link href="/accessibility/" class="text-gray-400 hover:text-white">Accessibility</Link></li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400">© {new Date().getFullYear()} QwikPulse. All rights reserved.</p>
            <p class="text-gray-400 mt-2 md:mt-0">Built with Qwik and Tailwind CSS.</p>
            <p class="text-gray-400 mt-2 md:mt-0">Build By Rajan ❤️</p>
          </div>
        </div>
      </footer>
    </>
})
import { component$, useSignal } from "@builder.io/qwik"

export const NewsletterSignup = component$(() => {
  const email = useSignal("")
  const isSubmitted = useSignal(false)

  return (
    <div class="bg-gray-100 p-6 rounded-lg">
      <h3 class="text-xl font-bold mb-2">Newsletter</h3>
      <p class="text-gray-600 text-sm mb-4">Stay updated with our latest news and special offers.</p>

      {isSubmitted.value ? (
        <div class="text-green-600 font-medium">Thank you for subscribing!</div>
      ) : (
        <form
          preventdefault:submit
          onSubmit$={() => {
            if (email.value) {
              isSubmitted.value = true
              email.value = ""
            }
          }}
        >
          <div class="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              bind:value={email}
            />
            <button type="submit" class="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition">
              Subscribe
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-2">By subscribing, you agree to our Privacy Policy.</p>
        </form>
      )}
    </div>
  )
})


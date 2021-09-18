<style lang="postcss">
#Login {
  background: white;
}
.title {
  font-family: "Ribeye Marrow", cursive;
}
</style>

<script>
import { fade } from "svelte/transition";
import Google from "../components/Google.svelte";
import { navigate } from "svelte-routing";
import { currentUser } from "../utils/stores";
import authMachine from "../utils/lib/authMachine";
import { useMachine } from "../utils/lib/useMachine";
const { state, send } = useMachine(authMachine);
let src = "../images/login.png";

function preload(src) {
  return new Promise(function (resolve) {
    let img = new Image();
    img.onload = resolve
    img.src = src;
  });
}

async function loginProcess() {
  send({ type: "LOGIN", provider: "google" });
}
state.subscribe((state) => {
  if (state.value === "signedIn") {
    navigate("/");
    currentUser.set({
      username: state.context.auth.displayName,
      email: state.context.auth.email,
      picture: state.context.auth.photoURL,
      accessToken: state.context.auth.accessToken,
      isLogin: true,
    });
  }
});
</script>

<div in:fade id="Login" class="h-screen  flex items-center justify-center">
  <!-- card -->
  <section
    class="max-w-2xl mx-auto p-6 overflow-hidden bg-white rounded-lg  dark:bg-gray-800">
    <div
      class="title md:text-4xl text-3xl flex items-center justify-center flex-wrap	">
      <span class="mr-2 whitespace-nowrap">Login with</span>
      <Google className="inline-block" />
    </div>
    {#await preload(src)}
      <div
        class="border border-pulae shadow rounded-md mt-20 mb-20 p-2 max-w-sm w-full mx-auto">
        <div class="animate-pulse ">
          <div class="rounded-lg bg-pulae  w-full m-auto h-56"></div>
        </div>
      </div>
    {:then}
      <img
        in:fade
        class="object-cover w-3/4 md:w-3/4 sm:w-3/4 lg:w-2/3  m-auto  mb-20"
        src="{src}"
        alt="login" />
    {/await}
    <div class="flex items-center justify-center">
      {#if $state.matches("checkAuth")}
        <button
          type="button"
          class=" w-full flex items-center cursor-not-allowed justify-center capitalize transition-colors tracking-wide py-2 bg-yellow px-4 focus:outline-none  text-white text-base font-semibold rounded-lg transition shadow-md  ease-in-out duration-500"
          disabled>
          <svg
            class="animate-spin h-5 w-5 mr-3 "
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.2"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#FBF6EB"></path>
            <path
              d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
              fill="#FBF6EB"></path>
          </svg>

          Processing
        </button>
      {:else}
        <button
          on:click="{loginProcess}"
          class="
        w-2/3
        text-base
        font-semibold
        py-2
        px-4
        text-white
        bg-yellow
        hover:bg-yellow
        rounded-lg
        shadow-md
        focus:outline-none
        transition
        duration-500
        ease-in-out
      ">
          Login
        </button>
      {/if}
    </div>
  </section>
</div>

<style lang="postcss">
  #sidebar {
    --tw-translate-x: -100%;
  }
  #menu-close-icon {
    display: none;
  }

  #menu-open:checked ~ #sidebar {
    --tw-translate-x: 0;
  }
  #menu-open:checked ~ * #mobile-menu-button {
  }
  #menu-open:checked ~ * #menu-open-icon {
    display: none;
  }
  #menu-open:checked ~ * #menu-close-icon {
    display: block;
  }

  @media (min-width: 768px) {
    #sidebar {
      --tw-translate-x: 0;
    }
  }
</style>

<script>
  import { navigate, Link } from 'svelte-routing';
  import { fade } from 'svelte/transition';
  import { currentUser } from "../utils/stores"
  import authMachine,{  logout } from "../utils/lib/authMachine"
  import { useMachine } from "../utils/lib/useMachine"
  const { state } = useMachine(authMachine)
  async function logoutProcess() {
    try {
      await logout();
      currentUser.set({
        username: null,
        email: null,
        picture: null,
        accessToken: null,
        isLogin: false
    })
      navigate("/login")
    } catch (error) {
      alert(error);
      hasError = true;
    }
  }
</script>

<input type="checkbox" id="menu-open" class="hidden" />
<!-- Mobile header -->
<header
  class=" text-brown flex justify-between md:hidden"
  data-dev-hint="mobile menu bar"
>


  <label
    for="menu-open"
    id="mobile-menu-button"
    class="m-2 p-2 cursor-pointer focus:outline-none hover:text-white  rounded-md"
  >
    <!-- Mobile Icon -->
    <svg
      width="24"
      height="15"
      viewBox="0 0 24 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.75 0H2.25C2.66421 0 3 0.335786 3 0.75C3 1.16421 2.66421 1.5 2.25 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0ZM6.75 0H23.25C23.6642 0 24 0.335786 24 0.75C24 1.16421 23.6642 1.5 23.25 1.5H6.75C6.33579 1.5 6 1.16421 6 0.75C6 0.335786 6.33579 0 6.75 0ZM2.25 9H0.75C0.335786 9 0 9.33579 0 9.75C0 10.1642 0.335786 10.5 0.75 10.5H2.25C2.66421 10.5 3 10.1642 3 9.75C3 9.33579 2.66421 9 2.25 9ZM6.75 9H23.25C23.6642 9 24 9.33579 24 9.75C24 10.1642 23.6642 10.5 23.25 10.5H6.75C6.33579 10.5 6 10.1642 6 9.75C6 9.33579 6.33579 9 6.75 9ZM2.25 4.5H0.75C0.335786 4.5 0 4.83579 0 5.25C0 5.66421 0.335786 6 0.75 6H2.25C2.66421 6 3 5.66421 3 5.25C3 4.83579 2.66421 4.5 2.25 4.5ZM6.75 4.5H17.25C17.6642 4.5 18 4.83579 18 5.25C18 5.66421 17.6642 6 17.25 6H6.75C6.33579 6 6 5.66421 6 5.25C6 4.83579 6.33579 4.5 6.75 4.5ZM2.25 13.5H0.75C0.335786 13.5 0 13.8358 0 14.25C0 14.6642 0.335786 15 0.75 15H2.25C2.66421 15 3 14.6642 3 14.25C3 13.8358 2.66421 13.5 2.25 13.5ZM6.75 13.5H17.25C17.6642 13.5 18 13.8358 18 14.25C18 14.6642 17.6642 15 17.25 15H6.75C6.33579 15 6 14.6642 6 14.25C6 13.8358 6.33579 13.5 6.75 13.5Z"
        fill="#483B3B"
      />
    </svg>
  </label>
</header>

<!-- sidebar -->
<aside
  id="sidebar"
  class=" bg-secondary text-primary md:w-64 w-full z-50  px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between "
  data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
>
  <label
    for="menu-open"
    id="menu-close-icon"
    class="m-2 p-2 focus:outline-none hover:text-white float-right rounded-md"
  >
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.3392 1.64625L15.0972 6.88823C15.0748 6.91065 15.0513 6.93128 15.0268 6.95011C15.0077 6.97505 14.9868 6.99903 14.9639 7.02185L12.5246 9.46117L13.5391 10.4757L21.3539 2.66091C21.6347 2.38006 21.6347 1.92638 21.3532 1.6456C21.0739 1.36551 20.6192 1.36551 20.3392 1.64625ZM14.5541 11.4906L22.3688 3.67587C23.2105 2.83426 23.2105 1.47075 22.3682 0.630642C21.5293 -0.21043 20.1638 -0.21043 19.3236 0.631941L14.0823 5.87327C14.0595 5.89609 14.0385 5.92006 14.0194 5.945C13.9949 5.96384 13.9714 5.98447 13.949 6.00689L11.5096 8.44622L11.0518 7.98841C11.0443 7.98085 11.0366 7.9735 11.0288 7.96635L3.70582 0.643387C2.86625 -0.198334 1.50081 -0.198334 0.660591 0.644037C-0.17872 1.4855 -0.17872 2.848 0.66124 3.68796L8.46457 11.4913L0.674645 19.2812C0.58561 19.3675 0.462917 19.5133 0.342678 19.7087C-0.157624 20.5214 -0.159675 21.4783 0.669262 22.3061C1.51298 23.1314 2.46053 23.1325 3.27559 22.656C3.47119 22.5416 3.61796 22.4246 3.71268 22.3323L10.0105 16.0346C10.2907 15.7543 10.2907 15.2999 10.0105 15.0196C9.73019 14.7393 9.27577 14.7393 8.9955 15.0196L2.70426 21.3108C2.69364 21.3211 2.63528 21.3676 2.5511 21.4169C2.24463 21.596 1.99564 21.5957 1.6952 21.3019C1.38254 20.9898 1.38304 20.7567 1.56501 20.4611C1.61599 20.3783 1.6645 20.3207 1.68197 20.3037L11.5096 10.4761L12.5241 11.4906L11.1283 12.8865C11.0342 12.9806 10.9716 13.0944 10.9407 13.2146C10.7816 13.4892 10.8195 13.8467 11.0545 14.0817L19.3194 22.3466C20.1609 23.1881 21.5239 23.1881 22.3654 22.3466C23.2054 21.5045 23.2054 20.142 22.3654 19.302L14.5541 11.4906ZM13.5391 12.5056L12.5237 13.521L20.3344 21.3316C20.6153 21.6126 21.0695 21.6126 21.3498 21.3323C21.6301 21.0513 21.6301 20.5966 21.3505 20.317L13.5391 12.5056ZM1.6762 2.673L9.47953 10.4763L10.4942 9.46167L2.69021 1.6577C2.41083 1.37761 1.95622 1.37761 1.67685 1.6577C1.39657 1.9387 1.39657 2.39337 1.6762 2.673Z"
        fill="#483B3B"
      />
    </svg>
  </label>
  <div
    class="h-full flex flex-col "
    data-dev-hint="optional div for having an extra footer navigation"
  >
    <div in:fade class="flex flex-col items-center mt-6 -mx-2">
      <!-- avatar -->

      <img
        in:fade
        class="object-cover w-28 h-28 mx-2 rounded-full"
        src={$currentUser.picture ? $currentUser.picture : "https://i.imgur.com/QZgMts0.png"}
        alt="avatar"
      />

      <p
        class="mx-2 mt-2 font-bold text-primary border-transparent border-0 text-3xl"
      >
        {$currentUser.username ? $currentUser.username : ""}
      </p>
    </div>

    <!-- nav -->
    <div class="flex flex-col justify-between flex-1 mt-6 h-full">
      <nav class="flex flex-col items-center mt-6 -mx-2 h-full justify-between">
        <div class="flex flex-col items-center mt-6 -mx-2">

          <Link
            to="/"
            class=" group mx-4 font-medium text-center text-2xl flex items-center px-4 py-2 text-primary  dark:bg-gray-700 dark:text-gray-200"
          >
            Reports
          </Link>


        </div>

        <div class="flex flex-col items-center mt-6 mb-6 -mx-2">
          <div
            on:click={logoutProcess}
            class="flex cursor-pointer items-center px-4 py-2 mt-5 text-primary transition-colors duration-200 transform dark:text-gray-400 "
          >
            <svg
              width="35"
              height="28"
              viewBox="0 0 35 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M33.8523 11.8185C35.3826 12.8624 35.3826 15.1187 33.8523 16.1626L17.2034 27.5208C15.4577 28.7091 13.0919 27.46 13.0919 25.3482V13.1144H2.6295C2.14592 13.1144 1.753 13.5073 1.753 13.9909C1.753 14.4745 2.14592 14.8674 2.6295 14.8674H9.49073C9.9748 14.8674 10.3672 15.2598 10.3672 15.7439C10.3672 16.228 9.9748 16.6204 9.49073 16.6204H2.6295C1.17776 16.6204 0 15.4426 0 13.9909C0 12.5392 1.17776 11.3614 2.6295 11.3614H13.0919V2.63464C13.0919 0.521602 15.4573 -0.728252 17.2041 0.460856L33.8523 11.8185ZM14.845 11.3614V2.63469C14.845 1.9299 15.6342 1.51285 16.2169 1.90952L32.8645 13.2667C33.3746 13.6147 33.3746 14.3665 32.8645 14.7145L16.2162 26.0722C15.6344 26.4683 14.845 26.0515 14.845 25.3483V13.1144H19.2409C19.725 13.1144 20.1174 12.722 20.1174 12.2379C20.1174 11.7538 19.725 11.3614 19.2409 11.3614H14.845Z"
                fill="#FBF6EB"
              />
            </svg>
            <span class="mx-4 font-medium text-2xl">Logout</span>
          </div>
        </div>
      </nav>
    </div>
  </div>
</aside>

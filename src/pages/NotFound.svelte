<script>
    import { navigate } from 'svelte-routing';


    async function onNavigate(e) {
       e.preventDefault()
       navigate("/")
    }

</script>

    <header>
        <div class="w-full bg-center bg-cover h-screen bg-primary" style="background-image: url('../images/404.jpg');">
            <div class="flex items-center justify-center w-full h-full ">
                <div class="text-center">
                    <h1 class="text-2xl font-semibold rounded-md bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500  uppercase lg:text-3xl">404 not found</h1>
                    <p class="text-xl font-semibold rounded-md bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500  lg:text-xl">Lost in space ? </p>
                    <button on:click={onNavigate} class="w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-gradient-to-r from-green-400 to-blue-500 focus:from-pink-500 focus:to-yellow-500 rounded-md lg:w-auto hover:bg-brown focus:outline-none focus:bg-brown">go back to home</button>
                </div>
            </div>
        </div>
    </header>
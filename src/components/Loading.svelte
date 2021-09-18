<style lang="postcss">

   .first-circle{
		animation-delay: 0.1s;
	}
	.second-circle{
		animation-delay: 0.2s;
	}
	.third-circle{
		animation-delay: 0.3s;
	}


</style>

<div  class=" h-screen z-50 overflow-hidden bg-primary   flex flex-col items-center justify-center">
	<div class="flex justify-center items-center mb-5 z-50 animate-pulse">
	<div class="bg-brown p-2  w-4 h-4 rounded-full animate-bounce first-circle"></div>
	<div
	class="bg-brown p-2 w-4 h-4 ml-3 mr-3  rounded-full animate-bounce second-circle"
	></div>
	<div
	class="bg-brown p-2  w-4 h-4  rounded-full animate-bounce third-circle"
	></div>
	</div>
	<h2 class="text-center text-brown text-xl font-semibold">Loading...</h2>
	<p class="w-1/3 text-center text-brown">This may take a few seconds, please don't close this page.</p>
</div>

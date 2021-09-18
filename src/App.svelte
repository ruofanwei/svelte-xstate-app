<script>
  import { Router, Route , navigate} from "svelte-routing"
  import Login from "./pages/Login.svelte"
  import NotFound from "./pages/NotFound.svelte"
  import Loading from "./components/Loading.svelte"
  // Admin Layout
  import Layout from "./layout/Layout.svelte"
  import Report from "./layout/Report.svelte"
  import {  beforeUpdate } from "svelte"
  import { currentUser } from "./utils/stores"
  import authMachine from "./utils/lib/authMachine"
  import { useMachine } from "./utils/lib/useMachine"
  const { state } = useMachine(authMachine)

  // use custom auth machine store
  beforeUpdate(() => {
    if(!$state.matches('signedIn') && !$state.matches('checkAuth')){
      navigate("/login")
    }
  })
  state.subscribe((state) => {
    if(state.value === 'signedIn'){
      currentUser.set({
        username: state.context.auth.displayName,
        email: state.context.auth.email,
        picture: state.context.auth.photoURL,
        accessToken: state.context.auth.accessToken,
        isLogin: true,
      });
    }
  })

  export let url = ""

</script>

<div>
<Router url="{url}">
  {#if $state.matches('signedIn')}
  <Route path="/" component="{Report}" />
  <Route path="admin/*" component="{Layout}" />
  {:else if $state.matches('checkAuth')}
  <Loading />
  {/if}

  <Route path="/login" component="{Login}" />

  <Route path="*" component="{NotFound}" />

</Router>
</div>
<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

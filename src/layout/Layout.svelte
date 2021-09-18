<script>
    import { Router, Route } from "svelte-routing"

    // components for this layout
    import NotFound from "../pages/NotFound.svelte"

    import SideBar from "../components/SideBar.svelte"


    export const admin = ""
    export let location
</script>
<div class="relative min-h-screen h-screen overflow-hidden md:flex" data-dev-hint="container">
  <SideBar location={location}/>

  <main id="content" class="flex-1 p-6 lg:px-8 h-screen overflow-auto">

    <Router url="admin">
        <Route path="*" component="{NotFound}" />
    </Router>

  </main>
</div>
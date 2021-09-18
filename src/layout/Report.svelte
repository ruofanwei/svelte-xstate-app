<script>
    import { Router, Route } from "svelte-routing"

    // components for this layout
    import SideBar from "../components/SideBar.svelte"
    // pages for this layout
    import Home from "../pages/Home.svelte"


    export const maibooking = ""
    export let location
</script>
<div class="relative min-h-screen h-screen overflow-hidden md:flex" data-dev-hint="container">
  <SideBar location={location}/>
  <main id="content" class="flex-1 p-6 lg:px-8 h-screen overflow-auto">
    <Router>
        <Route path="/"><Home /></Route>
    </Router>

  </main>
</div>
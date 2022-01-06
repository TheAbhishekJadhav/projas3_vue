<template>
  <div class="home">
    <section class="hero is-medium is-info">
      <div class="hero-body has-text-centered">
        <p class="title">
          Welcome to ARM
        </p>
        <p class="subtitle">
          This is an application for resource management it is used for managing, scheduling and assigning the resources to the registered users.  
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info"><i class="fas fa-chart-line"></i></span>
              <h2 class="is-size-4 mt-4 mb-4">Resource Efficiency</h2>
              <p>Maximise the resource efficiency by avoiding bottlenecks.</p>
            </div>
          </div>

          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info"><i class="fas fa-user-lock"></i></span>
              <h2 class="is-size-4 mt-4 mb-4">Secure Login</h2>
              <p>Secure login for registered users by token authentication.</p>
            </div>
          </div>

          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info"><i class="fas fa-tasks"></i></span>
              <h2 class="is-size-4 mt-4 mb-4">Track Bookings</h2>
              <p>Track records of utilisation for various kinds of resources.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  <div class="column is-12 has-text-centered">
    <a href="/login" class="button is-info is-size-3 mt-6 mb-6">Click to get started</a>
  </div>
  </div>

</template>

<script>
export default {
  name: "Home",
};
</script>

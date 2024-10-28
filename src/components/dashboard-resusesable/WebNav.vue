<template>
  <nav class="land_nav d-flex justify-content-between align-items-center">
    <RouterLink to="/" style="text-decoration: none">
      <div class="d-flex align-items-center">
        <img src="/aella.svg" style="max-width: 200px;" />
      </div>
    </RouterLink>

    <div>
      <RouterLink to="/" style="text-decoration: none">
        <button class="create me-2" @click="returnHome">Home</button>
      </RouterLink>
    </div>

    <div
      class="bars"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
    >
      <i class="fas fa-bars"></i>
    </div>
  </nav>

  <!-- navbar mobile -->
  <div
    class="offcanvas navLand offcanvas-start"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <!-- <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5> -->
      <div class="d-flex align-items-center">
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="10" width="34" height="34" rx="8.5" fill="#4C6FFF" />
          <path
            d="M10 37.7885C10 35.4413 11.9028 33.5385 14.25 33.5385H39.75C42.0972 33.5385 44 35.4413 44 37.7885V44H10V37.7885Z"
            fill="white"
          />
        </svg>
        <h2 class="ms-2">aella</h2>
      </div>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex flex-column">
        <RouterLink to="/" style="text-decoration: none">
          <button class="create mb-2" @click="returnHome">Home</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>


<script setup>

const returnHome = () => {
  window.location.reload();
};
</script>

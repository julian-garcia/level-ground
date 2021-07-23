<template>
  <div class="modal-background"></div>
  <div class="modal">
    <img
      src="../assets/images/close.svg"
      class="modal-close"
      alt=""
      @click="emitHideModal"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["width"],
  emits: ["showModal"],
  methods: {
    emitHideModal() {
      this.$emit("showModal", false);
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  width: 100%;
  min-height: 400px;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  overflow-y: scroll;
  box-sizing: border-box;
  z-index: 9;
}

.modal-background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal :deep(h2),
.modal :deep(p) {
  text-align: center;
}

.modal-close {
  width: 26px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 9;
}

@media screen and (min-width: 600px) {
  .modal {
    width: 500px;
  }
}

@media screen and (min-width: 1250px) {
  .modal {
    width: auto;
  }
}
</style>

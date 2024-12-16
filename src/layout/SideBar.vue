<template>
    <aside :class="{ 'sidebar-collapsed': isCollapsed }">
      <ul>
        <li v-for="item in menuItems" :key="item.name">
          <router-link :to="item.path" class="menu-link">
            <img :src="item.icon" :alt="item.name" />
            <span v-if="!isCollapsed">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </aside>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
    props: {
      isCollapsed: {
        type: Boolean,
        required: true,
      },
      menuItems: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
<template>
  <nav class="px-2 space-y-1">
    <a
      v-for="item in navigation"
      :key="item.name"
      :href="item.href"
      :class="[
        item.current
          ? 'bg-indigo-800 text-white'
          : 'text-indigo-100 hover:bg-indigo-600',
        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
      ]"
    >
      <component
        :is="item.icon"
        class="flex-shrink-0 w-6 h-6 mr-4 text-indigo-300"
        aria-hidden="true"
      />
      {{ item.name }}
    </a>
  </nav>
</template>
<script lang="ts">
// import fs from "fs";
// import pathModule from "path";
// import { ref, computed } from "vue";
import { FolderIcon, HomeIcon, XIcon } from '@heroicons/vue/outline';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
];
export default {
  components: {
    FolderIcon,
    HomeIcon,
    XIcon,
  },
  setup() {
    /*
    const path = ref(app.getAppPath());
    const files = computed(() => {
      const fileNames = fs.readdirSync(path.value);
      return fileNames
        .map((file) => {
          const stats = fs.statSync(pathModule.join(path.value, file));
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory(),
          };
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name);
          }
          return a.directory ? -1 : 1;
        });
    });
    */
    return {
      navigation,
    };
  },
};
</script>

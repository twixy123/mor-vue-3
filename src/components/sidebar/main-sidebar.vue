<template>
  <v-navigation-drawer :class="$style['block']" expand-on-hover rail>
    <div :class="$style['block__logo']">
      <v-img src="/images/svg/logo.svg" />
    </div>

    <v-divider />

    <v-list nav :class="$style['block__nav']">
      <RouterLink
        v-for="link in links"
        :key="link.routerName"
        v-slot="{ isActive }"
        :to="{ name: link.routerName }"
      >
        <v-list-item
          :variant="isActive || link.currentPage ? 'tonal' : 'plain'"
          :prepend-icon="link.icon"
        >
          <v-list-item-title> {{ link.name }} </v-list-item-title>
        </v-list-item>
        <!--  -->
        <v-list
          v-if="link.currentPage && link.nested && link.nested.length"
          nav
          :class="$style['block__nav--nested']"
        >
          <RouterLink
            v-for="nestedLink in link.nested"
            :key="nestedLink.routerName"
            v-slot="{ isActive: isNestedActive, href }"
            :to="{ name: nestedLink.routerName }"
            :active-class="$style['nav_item--active']"
          >
            <a :href="href">
              <v-list-item
                :variant="
                  isNestedActive || nestedLink.currentPage ? 'tonal' : 'plain'
                "
                :prepend-icon="nestedLink.icon"
              >
                <v-list-item-title> {{ nestedLink.name }} </v-list-item-title>
              </v-list-item>
            </a>
          </RouterLink>
        </v-list>
      </RouterLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MainSidebar',
}
</script>

<script setup>
import {
  mdiAlphaDBoxOutline,
  mdiAlphaSBoxOutline,
  mdiAlphaFBoxOutline,
} from '@mdi/js'

import { useCssModule, reactive, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import routeNames from '@/constants/routeNames'

const $style = useCssModule()
const route = useRoute()

const links = reactive([
  {
    name: routeNames.DASHBOARD.title,
    routerName: routeNames.DASHBOARD.name,
    icon: mdiAlphaDBoxOutline,
    nested: [],
  },
  {
    name: routeNames.SUPPORT.title,
    routerName: routeNames.SUPPORT.name,
    icon: mdiAlphaSBoxOutline,
    nested: [
      {
        name: routeNames.SUPPORT_FAQ.title,
        routerName: routeNames.SUPPORT_FAQ.name,
        icon: mdiAlphaFBoxOutline,
      },
      {
        name: routeNames.SUPPORT_TERMS.title,
        routerName: routeNames.SUPPORT_TERMS.name,
        icon: mdiAlphaFBoxOutline,
      },
    ],
  },
])

watch(
  () => route,
  (_route) => setCurrentPage(_route.meta),
  {
    immediate: true,
    deep: true,
  }
)

function setCurrentPage (meta) {
  links.forEach((item) => {
    item.currentPage = item.routerName === meta.inheritedFrom

    if (item.nested.length) {
      item.nested.forEach((nestedItem) => {
        nestedItem.currentPage = nestedItem.routerName === meta.inheritedFrom

        if (nestedItem.currentPage) {
          item.currentPage = true
        }
      })
    }
  })
}
</script>

<style lang="scss" module>
.block:global(.v-navigation-drawer--is-hovering) {
  .block__logo {
    padding: 24px;
  }
  .block__nav--nested {
    padding: 0;
    padding-left: 12px;
  }
}
.block:not(:global(.v-navigation-drawer--is-hovering)) {
  .block__nav {
    padding: 0;

    &--nested {
      padding: 0;
      padding-left: 4px;
    }
  }
}
</style>

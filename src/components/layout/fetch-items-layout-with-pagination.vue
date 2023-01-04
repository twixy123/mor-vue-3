<template>
  <AppContentTemplate :header-color="headerColor">
    <template #header>
      <v-container fluid>
        <v-row class="align-center">
          <v-col :cols="titleHasFilterPart ? 4 : 12">
            <slot name="pageTitle" />
          </v-col>
          <v-col v-if="titleHasFilterPart" cols="8">
            <div
              :class="$style['header_actions']"
              class="d-flex align-items-center justify-content-end"
            >
              <Datepicker
                v-if="filterByDate"
                v-model="datePickerValue"
                :enable-time-picker="false"
                :class="[$style['header_actions__item'], $style['datepicker']]"
                placeholder="Select Date"
                format="MM-dd-yyyy"
                model-type="yyyy-MM-dd"
                month-name-format="long"
                range
                multi-calendars
                @update:model-value="fetchItems(1)"
              />
              <AppSelect
                v-if="!!filterOptions.length"
                v-model="filterSelected"
                :options="filteringOptions"
                :class="[$style['header_actions__item']]"
                @change="fetchItems(1)"
              />
              <FormSearch
                v-if="search"
                :icon-color="headerColor"
                :class="[$style['header_actions__item']]"
                @submit="searchItems"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #default>
      <div>
        <slot :items="items" :count="count" />
        <!--  -->
        <slot v-if="pagesLength && showPagination" name="pagination">
          <div class="d-flex align-items-center justify-content-between mt-4">
            <v-pagination
              v-model="page"
              :length="pagesLength"
              :total-visible="7"
              class="my-4"
              @update:model-value="fetchItems"
            />
          </div>
        </slot>
      </div>
    </template>
  </AppContentTemplate>
</template>

<script>
export default {
  name: 'FetchItemsLayoutWithPagination',
}
</script>

<script setup>
import { ref, computed, watch, onBeforeMount, inject } from 'vue'
import FormSearch from '@/components/form/form-search.vue'
import AppSelect from '@/components/ui/app-select.vue'
import AppContentTemplate from '@/components/ui/app-content-template.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const loader = inject('loader')
const handleError = inject('handleError')

const props = defineProps({
  getItems: {
    type: Function,
    default: () => [],
  },
  headerColor: {
    type: String,
    default: 'blue',
  },
  search: {
    type: Boolean,
    default: false,
  },
  filterByDate: {
    type: Boolean,
    default: false,
  },
  filterOptions: {
    type: Array,
    default: () => [],
  },
})

const filterSelected = ref(null)
const datePickerValue = ref(null)
let filteringOptions = ref([])
const next = ref(null)
const prev = ref(null)
const count = ref(0)
const items = ref([])
const searchVal = ref('')
const page = ref(1)
const pageSize = ref(10)

const pagesLength = computed(() =>
  Math.ceil((count.value * 100) / pageSize.value)
)
const showPagination = computed(() => next.value || page.value > 1)
const titleHasFilterPart = computed(
  () => props.search || !!props.filterOptions.length
)

watch(
  () => props.filterOptions,
  () => setFilteringOptions(),
  {
    immediate: true,
  }
)

onBeforeMount(async () => {
  await fetchItems(1)
  setFilteringOptions()
})

function setFilteringOptions () {
  if (props.filterOptions.length) {
    filteringOptions.value = [...props.filterOptions]

    if (!filteringOptions.value.some((_option) => _option.value === null)) {
      filteringOptions.value = [
        {
          value: null,
          text: 'Please select an option',
        },
        ...props.filterOptions,
      ]
    }
  }
}

async function fetchItems (_page = 1) {
  loader.show()

  try {
    const requestData = {
      params: { _page },
    }

    if (searchVal.value !== '') {
      requestData.params.search = searchVal.value
    }

    if (filterSelected.value) {
      const filterVia = filteringOptions.value.find((_filter) => {
        if (
          _filter.value &&
          typeof filterSelected.value === 'object' &&
          typeof _filter.value === 'object'
        ) {
          return (
            _filter.value.text === filterSelected.value.text &&
            _filter.value.value === filterSelected.value.value
          )
        } else {
          return _filter.value === filterSelected.value
        }
      })

      if (filterVia) {
        if (typeof filterVia.value === 'object') {
          requestData.params[filterVia.key] = filterVia.value.value
        } else {
          requestData.params[filterVia.key] = filterVia.value
        }
      }
    }

    if (datePickerValue.value) {
      requestData.params.start_date = datePickerValue.value[0]
      requestData.params.end_date = datePickerValue.value[1]
    }

    const response = await props.getItems(requestData)
    let data = {
      results: [],
      count: 0,
      next: null,
      previous: null,
    }

    pageSize.value = 10

    if (Array.isArray(response)) {
      data.results = [...response]
      data.count = response.length

      pageSize.value = data.count
    } else {
      data = { ...response }
    }

    page.value = _page
    items.value = [...data.results]
    count.value = data.count
    next.value = data.next
    prev.value = data.previous
  } catch (error) {
    handleError(error)
  } finally {
    loader.hide()
  }
}

function searchItems (val) {
  searchVal.value = val
  fetchItems(1)
}
</script>

<style lang="scss" module>
.header_actions {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__item {
    height: 34px;
    &:not(:last-child) {
      margin-right: 10px;
    }
    width: calc(33% - 10px);
  }
}

.datepicker {
  input {
    @include app-input();
    padding-left: 40px;
  }
}
</style>

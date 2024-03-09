<template>
  <div>
    <div class="row justify-left">
      <div class="col-xs-12 col-lg-12 h-table" style="height: calc(100vh - 160px);">
        <q-table
          ref="tableRef"
          :row-key="rowKey"
          :grid="$q.screen.xs"
          :rows="data"
          :columns="columns"
          :pagination.sync="pagination"
          :loading="loading"
          :filter="filter"
          @request="refreshData"
          :selected.sync="selectedRows"
          separator="horizontal"
          color="secondary"
          selection="single"
          bordered
          :no-data-label="noDataText()"
          :rows-per-page-label="perPageText()"
          :pagination-label="paginationText"
          :selected-rows-label="selectedRowsText"
          @row-click="singleRowClick"
          :dense="$q.screen.lt.md"
          class="sticky-last-column-table full-height my-sticky-header-table selectedTable "
        >
          <template v-slot:no-data>
            {{ $t('system.no_matching_found') }}
          </template>
          <template v-slot:top>
            <div class="fit row flex text-primary justify-center text-h6">
              {{ $t('fp_captions.l_elements') + ' oilasi'}}
              <q-space/>
              <q-btn-group>
                <q-btn icon="add" class="bg-primary text-white" @click="rowAdd" dense>
                  <q-tooltip content-class="bg-primary">
                    {{ $t('system.add') }}
                  </q-tooltip>
                </q-btn>
              </q-btn-group>
            </div>
          </template>

          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              {{props.row[changeLang('name')]}}
            </q-td>

          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn size="sm" dense color="secondary" icon="edit" @click.stop="rowEdit(props.row)" class="q-mr-xs">
                <q-tooltip content-class="bg-secondary">
                  {{ $t('system.edit') }}
                </q-tooltip>
              </q-btn>
              <q-btn size="sm" dense color="negative" icon="delete" @click.stop="rowDelete(props.row)" class="q-mr-sm">
                <q-tooltip content-class="bg-negative">
                  {{ $t('system.delete') }}
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>

          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            >
              <q-card :class="props.selected ? 'row-selected' : ''">
                <q-card-section>
                  <q-checkbox dense v-model="props.selected" :label="props.row[cardCheckField]"/>
                </q-card-section>

                <q-separator/>

                <q-list dense>
                  <q-item v-for="col in props.cols.filter(col => col.name !== actionsColumnName)" :key="col.name"
                          class="row">
                    <q-item-section class="col-xs-4">
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section class="col-xs-8 text-right">
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <q-separator/>

                <q-card-section class="row justify-end"
                                v-if="props.cols.filter(col => col.name === actionsColumnName).length>0">
                  <q-btn size="sm" dense color="secondary" icon="edit" @click.stop="rowEdit(props.row)" class="q-mr-xs">
                    <q-tooltip content-class="bg-secondary">
                      {{ $t('system.edit') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn size="sm" dense color="negative" icon="delete" @click.stop="rowDelete(props.row)"
                         class="q-mr-sm">
                    <q-tooltip content-class="bg-negative">
                      {{ $t('system.delete') }}
                    </q-tooltip>
                  </q-btn>
                </q-card-section>

              </q-card>
            </div>
          </template>


        </q-table>
      </div>

      <!--DIALOG-->

      <standart-input-dialog v-model="formDialog" :model-id="bean.id" :on-submit="onSubmit"
                             :on-validation-error="onValidationError">
        <div class="row">
          <q-input v-model="bean.nameEn" :placeholder="$t('captions.l_name_en')"
                   :label="$t('captions.l_name_en')"
                   class="q-pa-md col-xs-12 col-sm-12 col-md-6 col-lg-6" dense
                   lazy-rules :rules="[val => !!val || $t('system.field_is_required')]">
          </q-input>

          <q-input type="textarea" v-model="bean.description" :placeholder="$t('captions.l_description')"
                   :label="$t('captions.l_description')"
                   class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
          >
            <template v-slot:prepend="props">
              <q-icon name="mdi-text"/>
            </template>
          </q-input>
        </div>

      </standart-input-dialog>

    </div>
  </div>
</template>

<script>
import {cfghttp, urls} from 'src/utils/constants';
import useStandartTable from "src/composables/standartTable";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
} from "vue";
import {i18n} from "src/boot/i18n";
import useComp from "src/composables/mixins";
import {useQuasar} from "quasar";
import StandartInputDialog from "components/base/StandartInputDialog.vue";
export default defineComponent({
  name: "StaffList",
  components: {StandartInputDialog},
  setup(){
    const app = getCurrentInstance();
    let $dateutil = {
      formatDate: (x, s) => {
      }
    };
    if (app != null) {
      $dateutil = app.appContext.config.globalProperties.$dateutil;
    }
    const {
      noDataText,
      perPageText,
      pagedGet,
      showError,
      showInfo,
      paginationText,
      selectedRowsText,
      tableFilterQuery,
      changeLang
    } = useComp();
    const apiUrl = urls.STAFFS;
    const loading = ref(false);
    const rowKey = "id";
    const cardCheckField = "name";
    const actionsColumnName = "actions";
    const selectedRows = ref([]);
    const formDialog = ref(false);
    const file =  ref([])
    let newGuideObj = ref({});
    const pagination = ref({
      sortBy: "id",
      descending: true,
      page: 1,
      rowsPerPage: 7,
      rowsNumber: 0,
    });
    const filter = ref({});
    const data = ref([]);
    const beanDefault = ref({
      id: null,
      name_uz: '',
      name_ru: '',
      name_uk: ''
    });
    const bean = ref({});
    const $t = i18n.global.t;
    const visibleColumns = ref([
      "id",
      "name",
      "description",
      "actions",
    ]);
    const columns = [
      {
        name: 'id',
        field: 'id',
        label: $t('captions.l_id'),
        sortable: true,
        align: 'center',
        classes: 'col-2',
        style: 'width:1rem'
      },
      {
        name: 'name',
        field: (row) => row[changeLang('name')],
        label: $t('fp_captions.l_name'),
        align: 'left',
        classes: 'col-1',

      },
      {
        name: 'actions',
        field: 'actions',
        label: $t('captions.l_actions'),
        align: 'left',
        classes: 'col-2',
        style: 'width:1rem'
      },
    ];
    const standartTable = useStandartTable();
    const uriPdf = computed(() => {
      return (id) => {
        return cfghttp.BASE_URL + '/resources/' + id + '/view'
      }
    })
    const propsData = computed(() => {
      return {
        apiUrl: apiUrl,
        filter: JSON.parse(JSON.stringify(filter.value)),
        pagination: JSON.parse(JSON.stringify(pagination.value)),
        loading: JSON.parse(JSON.stringify(loading.value)),
        bean: bean.value,
      };
    });
    const tableRef = ref();

    function refreshTable() {
      loading.value = true;
      standartTable.refreshData(propsData.value).then((res) => {
        data.value = res.data;
        Object.assign(pagination.value, res.pagination);
        loading.value = res.loading;
      }).catch((error) => {
        console.log(error);
        showError(error);
      }).finally(()=>{
        loading.value = false;
      });
    }
    const $q = useQuasar()
    function refreshData(props) {
      loading.value = true;

      let obj = {
        apiUrl: apiUrl,
        filter: props.filter,
        pagination: props.pagination,
        loading: loading.value,
      };

      standartTable.refreshData(obj).then((res) => {
        data.value = res.data;
        Object.assign(pagination.value, res.pagination);
        loading.value = res.loading;
      });
    };
    function rowClick(evt, row) {
      tableRef.value = standartTable.rowClick(evt, row, tableRef);
    }

    function singleRowClick(evt, row) {
      tableRef.value = standartTable.singleRowClick(evt, row, tableRef);
      // resource_id = selectedRows[0].resource_id;
      // refreshTable();
    }

    function onSubmit() {
      loading.value = true;

      standartTable.onSubmit(propsData.value).then((res) => {
        loading.value = res.loading;

        if (!res.formDialog) {
          formDialog.value = res.formDialog;
          refreshTable();
        }
      });
    }

    function rowAdd(row) {
      // $q.notify({
      //   message:'rowAdd worked'
      // })
      formDialog.value = true;
    }


    function rowEdit(row) {
      [bean.value, formDialog.value] = Object.values(
        standartTable.rowEdit(row)
      );
    }

    function rowDelete(row) {
      loading.value = true
      standartTable.rowDelete(row, apiUrl);
    }
    function onValidationError() {
    }
    //addFn
    const resourceTypeID = ref(1);
    const resourceId = ref(null);
    function fileUploader(file) {
      console.log('123',file)
      let formData = new FormData();
      formData.append('file', file);
      // formData.append('system_language', 'uz');
      formData.append('resourceTypeId', resourceTypeID.value);

      this.$axios.post(urls.UPLOAD_RESOURCE, formData, {headers: {'Content-Type': 'multipart/form-data' }})
        .then(response => {
          console.log('formData => ', response.data)
          resourceId: response.data
          showInfo(this.$t('captions.l_upload_successfully'));
        }).catch(error => {
        showError(error)
      })
    };
    watch(standartTable.refResher, (newVal, oldVal) => {
      refreshTable();
    });


    onMounted(() => {
      refreshTable();
    });
    return{
      // data
      tableRef,
      apiUrl,
      newGuideObj,
      uriPdf,
      $q,
      resourceId,
      file,
      formDialog,
      loading,
      rowKey,
      cardCheckField,
      actionsColumnName,
      selectedRows,
      filter,
      data,
      pagination,
      beanDefault,
      bean,
      columns,
      propsData,
      visibleColumns,

      // functions
      noDataText,
      perPageText,
      pagedGet,
      showError,
      showInfo,
      changeLang,
      paginationText,
      selectedRowsText,
      singleRowClick,
      tableFilterQuery,
      standartTable,
      refreshTable,
      refreshData,
      rowClick,
      onSubmit,
      rowEdit,
      rowAdd,
      rowDelete,
      onValidationError,
      //addFn
      fileUploader
    }
  }
})
</script>

<style scoped>

</style>

import useComp from "src/composables/mixins";
import { i18n } from "src/boot/i18n";
import { ref } from "vue";
import { $axios } from "src/boot/axios";

export default function useStandartTable(){
  let pagination = {} ;

  let filter = {} ;
  let bean = {} ;

  let loading = false;

  const refResher = ref(false);

  let expansable = false;

  let { pagedGet, showError, ask } = useComp();

  let data = [];
  let expanded = [];

  let last_refresh = 0;
  let wait_time = 0;

  const $t = i18n.global.t;

  async function refreshData(propsData) {
    await pagedGet(propsData.apiUrl, propsData.pagination, propsData.filter)
      .then((response) => {
        if (!response) return;
        Object.assign(pagination, propsData.pagination);
        pagination.rowsNumber = response.data.totalElements;
        data.splice(0, data.length, ...response.data.content);

        // last_refresh = response.data.last_refresh;
        // wait_time = response.data.wait_time;

        if (data.length > 0 && expansable && data[0]) {
          expanded.push(data[0].id);
        }
      })
      .catch((e) => {
        console.log(e)
        showError(e);
      });

    return {
      data: data,
      filter: filter,
      pagination: pagination,
      loading: false,
    };
  }
  function showForm() {
    return true;
  }

  function closeForm() {
    return false;
  }

  function rowAdd(beanDefault) {
    bean = Object.assign({}, beanDefault);

    return { bean: bean, formDialog: showForm() };
  }

  function rowAddPreBean(preBean) {
    bean = Object.assign({}, preBean);

    return { bean: bean, formDialog: showForm() };
  }
  function rowEdit(row) {
    for (let k in row) {
      bean[k] = row[k];
    }

    return { bean: bean, formDialog: showForm() };
  }
  async function onSubmit(propsData) {
    let result = {};
    if (!!propsData.bean.id) {
      await $axios
        .put(propsData.apiUrl, propsData.bean)
        .then((response) => {
          result.formDialog = closeForm();
        })
        .catch((error) => {
          showError(error);
        })
        .finally(() => {
          result.loading = false;
        });
    } else {
      await $axios
        .post(propsData.apiUrl, propsData.bean)
        .then((response) => {
          result.formDialog = closeForm();
        })
        .catch((error) => {
          showError(error);
        })
        .finally(() => {
          result.loading = false;
        });
    }

    return result;
  }
  function onValidationError() {}

  async function rowDelete(row, apiUrl) {
    ask($t("app_name"), $t("system.confirm", [row.id]), async () => {
      await $axios
        .delete(apiUrl + "/" + row.id)
        .then((response) => {
          refResher.value = true;
        })
        .catch((error) => {
          showError(error);
        });
    });
  }

  function rowDeleteWithTitle(row, title) {
    ask($t(title), $t("system.confirm", [row.id]), () => {
      $axios
        .delete(apiUrl + "/" + row.id)
        .then((response) => {
          refreshTable();
        })
        .catch((error) => {
          showError(error);
        });
    });
  }

  function rowClick(evt, row, table) {
    const rowKey = "id";
    if (table && table.value) {
      if (table.value.selection == "single") {
        table.value.$emit("update:selected", [row]);
      } else {
        if (table.value.selected &&
          table.value.selected.filter(
            (item) => item[rowKey] == row[rowKey]
          ).length > 0
        ) {
          table.value.selected.forEach((el, inx) => {
            if(el[rowKey] == row[rowKey]) {
              table.value.selected.splice(inx, 1)
            }
          });
        } else {
          table.value.selected.push(row)
        }
      }
    }

    return table.value;
  }

  function singleRowClick(evt, row, table) {
    if (table && table.value) {
      if (table.value.selected.shift() === row) {
        table.value.selected.shift();
      } else {
        table.value.selected.push(row);
      }
    }
    return table.value;
  }

  return {
    singleRowClick,
    rowClick,
    showForm,
    closeForm,
    rowAdd,
    rowAddPreBean,
    rowEdit,
    onSubmit,
    onValidationError,
    rowDelete,
    rowDeleteWithTitle,
    refreshData,

    bean,
    data,
    loading,
    expanded,
    pagination,
    filter,
    expansable,
    wait_time,
    last_refresh,
    refResher,
  };
}

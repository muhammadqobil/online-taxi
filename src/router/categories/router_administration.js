
const modules = [
  {
    path: 'staff',
    name: 'PageStaffs',
    component: () => import('pages/myTaxi/PageStaffs.vue'),
    meta: {
      icon: 'mdi-bank',
      title: 'modules.staffs',
      description: 'modules.staffs_description',
    }
  },
]

const administration = {
  path: '/administration',
  name: 'administration',
  component: () => import('layouts/MainLayout.vue'),
  meta: {
    title: 'Boshqaruv',
    description: 'Boshqaruv',
    icon: 'mdi-bank',
  },
  children: modules
}

export default administration;

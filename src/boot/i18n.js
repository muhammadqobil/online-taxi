import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

let i18n = null
export default boot(({ app }) => {
  i18n = createI18n({
    locale: 'uz',
    globalInjection: true,
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})
export { i18n };

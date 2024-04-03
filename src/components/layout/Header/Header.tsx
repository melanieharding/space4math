import { createClient } from '@/prismicio'
import Navbar from './Navbar'

const Header = async (): Promise<JSX.Element> => {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const layout = await client.getSingle('layout', {
    graphQuery: `
      {
        layout {
          cta_label
          cta_link
          logo
          navigation
        }
      }
    `,
  })
  return (
    <>
      <Navbar
        site_title={settings.data.site_title}
        logo={layout.data.logo}
        navigation={layout.data.navigation}
        cta_link={layout.data.cta_link}
        cta_label={layout.data.cta_label}
      />
    </>
  )
}

export default Header

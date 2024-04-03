import { createClient } from '@/prismicio'
import FooterContent from './FooterContent'

const Footer = async (): Promise<JSX.Element> => {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const layout = await client.getSingle('layout', {
    graphQuery: `
    {
      layout {
        copyright
        cta_label
        cta_link
        privacy_label
        privacy_link
        slices1 {
          ...on footer_heading {
            variation {
              ...on default {
                primary {
                  heading
                }
              }
            }
          }
          ...on footer_multi_column {
            variation {
              ...on default {
                primary {
                  heading
                  layout {
                    slices
                    slices1
                    slices2
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
  })
  return (
    <>
      <FooterContent data={layout.data} settings={settings.data} />
    </>
  )
}

export default Footer

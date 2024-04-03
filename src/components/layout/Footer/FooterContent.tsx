import { cn } from '@/lib/utils'
import {
  LayoutDocumentData,
  SettingsDocumentData,
} from '../../../../prismicio-types'
import Section from '../Section'
import { SliceZone } from '@prismicio/react'
import { components } from '@/slices'
// import Copyright from './Copyright'
import { PrismicNextLink } from '@prismicio/next'
import { CopyrightIcon } from 'lucide-react'
import Copyright from './Copyright'

type FooterContentProps = {
  data: LayoutDocumentData
  settings: SettingsDocumentData
}
const FooterContent = ({ data, settings }: FooterContentProps): JSX.Element => {
  return (
    <Section as="footer" className="bg-primary text-primary-foreground">
      <SliceZone components={components} slices={data.slices1} />

      <div className="my-4 text-center lg:my-8">
        <PrismicNextLink field={data.privacy_link}>
          {data.privacy_label}
        </PrismicNextLink>
      </div>
      <div className="text-center text-xs lg:text-sm">
        {data.copyright} <CopyrightIcon className="inline w-3 pb-1" />{' '}
        <Copyright /> {settings.site_title}
      </div>
    </Section>
  )
}

export default FooterContent

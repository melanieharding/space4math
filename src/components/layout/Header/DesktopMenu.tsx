import { LayoutDocumentDataNavigationItem } from '../../../../prismicio-types'
import { PrismicNextLink } from '@prismicio/next'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

type DesktopMenuProps = {
  navigation: Array<LayoutDocumentDataNavigationItem>
}
const DesktopMenu = ({ navigation }: DesktopMenuProps) => {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-x-3">
        {navigation.map((item, i) => {
          return (
            <li key={item.label ? item.label + i : i}>
              <PrismicNextLink
                field={item.link}
                className={cn(buttonVariants({ variant: 'ghost' }))}
              >
                {item.label}
              </PrismicNextLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default DesktopMenu

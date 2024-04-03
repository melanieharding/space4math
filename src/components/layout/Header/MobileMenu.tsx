import { cn } from '@/lib/utils'
import { LayoutDocumentDataNavigationItem } from '../../../../prismicio-types'
import { MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button, buttonVariants } from '@/components/ui/button'
import { isFilled, KeyTextField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'

type MobileMenuProps = {
  className?: string
  site_title: KeyTextField
  navigation: Array<LayoutDocumentDataNavigationItem>
}

const MobileMenu = ({ navigation, className, site_title }: MobileMenuProps) => {
  return (
    <div className={cn('md:hidden text-primary-foreground', className)}>
      <Sheet>
        <SheetTrigger className={cn(buttonVariants({ variant: 'link' }))}>
          <MenuIcon />
          <span className="sr-only">Open Menu</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {isFilled.keyText(site_title) && (
              <SheetTitle className="font-bold text-primary">
                {site_title}
              </SheetTitle>
            )}
          </SheetHeader>
          <ul className="mt-8 grid gap-y-4">
            {navigation.map((item, i) => {
              return (
                <li key={item.label ? item.label + i : i}>
                  <SheetClose asChild>
                    <Button asChild variant={'outline'} className="flex">
                      <PrismicNextLink field={item.link}>
                        {item.label}
                      </PrismicNextLink>
                    </Button>
                  </SheetClose>
                </li>
              )
            })}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu

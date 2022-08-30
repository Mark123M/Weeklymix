// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

export const myTheme = extendTheme({
    colors: {
        primary:'#7cb77a'
        //...
    },
    components: {
        Center: {
          // 1. We can update the base styles
          baseStyle: {
            fontWeight: 'bold', // Normally, it is "semibold"
          },
          // 2. We can add a new button size or extend existing
          sizes: {
            xl: {
              h: '56px',
              fontSize: 'lg',
              px: '32px',
            },
          },
          // 3. We can add a new visual variant
          variants: {
            'with-shadow': {
              color: 'red.400',
              bg: 'red.400',
              boxShadow: '0 0 2px 2px #efdfde',
              fontWeight: 800
            },
            // 5. We can add responsive variants
            sm: {
              bg: 'teal.500',
              fontSize: 'md',
            },
          },
          // 6. We can overwrite defaultProps
          defaultProps: {
            size: 'lg', // default is md
            variant: 'sm', // default is solid
            colorScheme: 'green', // default is gray
          },
        },
      },
})
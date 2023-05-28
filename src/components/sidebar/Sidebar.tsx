import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { IconType } from 'react-icons'

import { usePlaylist } from '@/src/hooks/useApiClient'

import { PlayList } from '@prisma/client'

const navMenu = [
  {
    name: 'home',
    icon: MdHome,
    path: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    path: '/search',
  },
  {
    name: 'your library',
    icon: MdLibraryMusic,
    path: '/library',
  },
]

const musicMenu = [
  {
    name: 'create playlist',
    icon: MdPlaylistAdd,
    path: '/',
  },
  {
    name: 'favorite',
    icon: MdFavorite,
    path: '/favorite',
  },
]

interface ISidebarItem {
  name: string
  icon: IconType
  path: string
  isActive?: boolean
}

const SidebarItem = ({ name, icon, path, isActive }: ISidebarItem) => (
  <ListItem sx={{ paddingX: '20px', fontSize: '16px' }}>
    <LinkBox
      _hover={{ color: 'white' }}
      sx={isActive ? { color: 'white', fontWeight: '500' } : undefined}
    >
      <Link href={path}>
        <LinkOverlay as="div" sx={{ textTransform: 'capitalize' }}>
          <ListIcon as={icon} sx={{ color: 'white', marginRight: '20px' }} />
          {name}
        </LinkOverlay>
      </Link>
    </LinkBox>
  </ListItem>
)

const Sidebar = () => {
  const router = useRouter()
  const { playlist, isLoading } = usePlaylist()

  return (
    <Box
      as="aside"
      sx={{
        width: '100%',
        height: '100%',
        background: 'black',
        paddingX: '5px',
        color: 'gray',
      }}
    >
      <Box
        sx={{
          marginBottom: '20px',
          paddingY: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          height: '100%',
        }}
      >
        <Image
          src="/next.svg"
          width={60}
          height={120}
          alt="Logo"
          style={{ filter: 'invert(1)' }}
        />
        <Box>
          <List spacing={2}>
            {navMenu.map((m) => (
              <SidebarItem
                key={`${m.name}-${m.path}}`}
                isActive={router.pathname === m.path}
                {...m}
              />
            ))}
          </List>
        </Box>
        <Divider bg="gray.700" />
        <Box>
          <List spacing={2}>
            {musicMenu.map((m) => (
              <SidebarItem key={`${m.name}-${m.path}}`} {...m} />
            ))}
          </List>
        </Box>
        <Divider bg="gray.700" />
        <Box sx={{ overflowY: 'auto' }}>
          {isLoading ? (
            <p>Loading playlist...</p>
          ) : (
            <List spacing={2}>
              {playlist?.map((pl: PlayList) => (
                <ListItem
                  key={pl.id}
                  sx={{ paddingX: '20px', fontSize: '16px' }}
                >
                  <LinkBox _hover={{ color: 'white' }}>
                    <Link href={`/playlist/${pl.id}`}>
                      <LinkOverlay
                        as="div"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {pl.name}
                      </LinkOverlay>
                    </Link>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar

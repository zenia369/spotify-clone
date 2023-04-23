import { Artist } from '@prisma/client'

import { useMe } from '../hooks/useApiClient'

import PageLayout from '../components/layouts/PageLayout'
import Artists from '../components/profile/artist/Artists'
import ProfileHeader from '../components/profile/profileHeader'

const Profile = ({ artists }: { artists: Artist[] }) => {
  const { user } = useMe()

  return (
    <PageLayout
      gradient="gray"
      headerComponent={
        <ProfileHeader
          gradient="gray"
          title={!user ? '---- ----' : user.name}
          subtitle="profile"
          description={`You have ${user?.playlistCount} public playlists`}
          imageSrc="https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fimage%2FKeqing.png?alt=media&token"
        />
      }
    >
      <Artists artists={artists} />
    </PageLayout>
  )
}

export default Profile

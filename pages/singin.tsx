import Singin from '@/src/pages/Singin'

const SinginPage = () => {
  return <Singin />
}

export async function getServerSideProps() {
  return {
    props: {
      authPage: true,
    },
  }
}

export default SinginPage

import Singup from '@/src/pages/Singup'

const SingupPage = () => {
  return <Singup />
}

export async function getServerSideProps() {
  return {
    props: {
      authPage: true,
    },
  }
}

export default SingupPage

import Head from 'next/head';
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "./../lib/ironOptions";

export default function Home({ user }) {
  return (
    <div>
      <Head>
        <title>WELCOME TO HOME { user?.full_name } !</title>
      </Head>

      <h2>WELCOME TO HOME { user?.full_name } !</h2>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}


const logoutHandler = async (event) => {
  event.preventDefault()
  const req = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: ''
  }
  const res = await fetch('/api/auth/logout', req)
  if (res) window.location.reload();
}


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps( { req } ) {
    if (req.session.user === undefined){
      return { props: { } }
      }
    return { props: { user: req.session?.user } }
  },
  ironOptions
);
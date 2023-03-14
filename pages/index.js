/* Importing the necessary components from the Material UI library. */
import Head from 'next/head';
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "./../lib/ironOptions";
import Layout from "./../components/Index/Layout";

export default function Index({ user }) {
  return (
    <>
      <Layout user={ user }>
        <h1>Index</h1>
      </Layout>
    </>
  )
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

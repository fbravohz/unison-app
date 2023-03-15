import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "./../lib/ironOptions";
import Layout from "./../components/Index/Layout";
import React from 'react'


export default function Index({ user }) {
  return (
    <>
      <Layout user={ user }>
        <h1>hola</h1>
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





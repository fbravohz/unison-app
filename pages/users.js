/* Importing the necessary components from the Material UI library. */
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "./../lib/ironOptions";
import Layout from '../components/Index/Layout';
/**
 * It renders the IndexComponent component and passes the user object to it
 * @returns The Home component is being returned.
 */
export default function Users( props ) {
  return (
    <>
      <Layout user={ props.user }>
        <h1>Users</h1>
      </Layout>
    </>
  )
}
/* A function that is called on every request to the page. It is used to fetch data and then pass it to
the page as props. */
export const getServerSideProps = withIronSessionSsr(
  /**
   * If the user is logged in, pass the user object to the page. If not, don't pass anything
   * @returns The user object is being returned.
   */
  async function getServerSideProps( { req } ) {
    if (req.session.user === undefined){
      return { props: { } }
      }
    return { props: { user: req.session?.user } }
  },
/* A configuration object that is passed to the `withIronSessionSsr` function. */
  ironOptions
);
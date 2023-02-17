/* This is importing the necessary modules to use the middleware. */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from "iron-session/edge";
import { ironOptions } from "./lib/ironOptions";
/**
 * If the user is not logged in, redirect to the login page
 * @param {NextRequest} req - NextRequest - The request object
 * @returns A function that takes in a request and returns a response.
 */
export async function middleware(req: NextRequest) {
/* Creating a response object. */
  const res = NextResponse.next()
/* Getting the session from the request. */
  const session = await getIronSession(req, res, ironOptions);
/* Destructuring the session object to get the user property. */
  const { user } = session;
/* If the user is not logged in, redirect to the login page. */
  if (user === undefined){
    return NextResponse.redirect(new URL('/login', req.url))
  }
/* If the user is logged in, it will return the next response. */
  else{
  return NextResponse.next();
  }
}
/* This is a configuration for the middleware. It is saying that the middleware will be used on all
routes except for the ones listed. */
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|login|favicon.ico).*)']
}

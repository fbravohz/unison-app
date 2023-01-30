// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from "iron-session/edge";
import { ironOptions } from "./lib/ironOptions";


export async function middleware(req: NextRequest) {

  const res = NextResponse.next()
  const session = await getIronSession(req, res, ironOptions);
  const { user } = session;

  if (user === undefined){
    return NextResponse.redirect(new URL('/login', req.url))
  }
  else{
  return NextResponse.next();
  }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|login|favicon.ico).*)']
}

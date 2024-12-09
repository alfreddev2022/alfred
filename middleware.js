import { NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/organizer', ]
const publicRoutes = ['/login', '/signup', '/']
import { cookies } from 'next/headers'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';



export default async function middleware(req) {

    const path = req.nextUrl.pathname
 const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const cookie = cookies().get('encrypted_UserData')
    

        // const encryptedData = Cookies.get('encrypted_UserData');
      
      
    console.log(cookie)
   
    if (!cookie && isProtectedRoute) {
        // Redirect to "/" if user data is not present and the route is protected
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    // Allow the request to proceed for both public and protected routes
    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

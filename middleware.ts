import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID()
  const csp = `default-src: self; script-src: 'nonce-${nonce}'; style-src: 'nonce-${nonce}'`
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set("x-nonce", nonce)

  requestHeaders.set("content-security-policy", csp)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set(`content-security-policy`, csp)

  return response
}

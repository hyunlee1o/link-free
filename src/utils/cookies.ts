import { destroyCookie, setCookie } from 'nookies'

import { env } from 'constants/env'
import { api } from 'services/api'

import type { GetServerSidePropsContext } from 'next'

type SetCookiesProps = {
  ctx?: GetServerSidePropsContext
  accessToken: string
  refreshToken: string
}

export function setCookies({ ctx = undefined, accessToken, refreshToken }: SetCookiesProps) {
  const { SESSION_EXPIRES_IN_S } = env
  // @ts-ignore
  api.defaults.headers['authorization'] = `Bearer ${accessToken}`

  setCookie(ctx, 'accessToken', accessToken, {
    maxAge: SESSION_EXPIRES_IN_S,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  setCookie(ctx, 'refreshToken', refreshToken, {
    maxAge: SESSION_EXPIRES_IN_S,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })
}

export function destroyCookies(ctx: GetServerSidePropsContext | undefined = undefined) {
  destroyCookie(ctx, 'accessToken')
  destroyCookie(ctx, 'refreshToken')
}

import { Response } from 'express';

// httpOnly: 브라우저에서 접근 금지
// secure: https에서만 쿠키 전송
// domain: 쿠키를 전송할 도메인

const domains =
  process.env.NODE_ENV === 'production' ? ['.example.com'] : [undefined];

export const setTokenCookie = (
  res: Response,
  {
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken?: string;
  },
) => {
  console.log('여기 온다.');

  domains.forEach((domain) => {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 1000 * 60 * 60 * 1, // 1h
      domain,
    });

    if (refreshToken) {
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
        domain,
      });
    }
  });
};

export const clearTokenCookie = (res: Response) => {
  domains.forEach((domain) => {
    res.clearCookie('access_token', {
      path: '/',
      domain,
    });
    res.clearCookie('refresh_token', {
      path: '/',
      domain,
    });
  });
};

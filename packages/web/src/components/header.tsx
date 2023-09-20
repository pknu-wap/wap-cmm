'use client';

import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/posts">Posts</Link>
    </div>
  );
};

export default Header;

import * as React from 'react';
import { Link } from 'react-router-dom';
import locationServices from '@/shared/services/locationServices';

export interface LinkProps {
  to: string;
  pathParams?: Record<string, string | number>;
  query?: Record<string, string | number>;
  hash?: string;
  children: React.ReactNode;
  state?: unknown;
  className?: string;
  [key: string]: unknown;
}

const LinkWrap = ({ to, pathParams, query, hash, ...rest }: LinkProps) => (
  <Link
    to={locationServices.buildURL(to, { pathParams, query, hash })}
    {...rest}
  />
);

export default LinkWrap;

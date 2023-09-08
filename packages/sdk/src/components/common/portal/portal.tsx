import { createPortal } from 'react-dom';

import usePortal from '../../../hooks/user-portal';

interface PortalProps {
  id: string;
  children: React.ReactNode;
}

const Portal = ({ children, id }: PortalProps) => {
  const targetElement = usePortal(id);

  if (!targetElement) return null;

  return createPortal(children, targetElement);
};

export default Portal;

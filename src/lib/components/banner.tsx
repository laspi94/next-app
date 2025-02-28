import { Icon } from './icon';
import React, { useEffect, useState } from 'react'

export type props = {
  message: string | null,
  color?: string,
  iconSize?: string,
  iconClassName?: string
}

export function Banner({
  message = "Ops! ocurrió un error inesperado",
  color = 'success',
  iconSize = '28',
  iconClassName = 'pb-1' }: props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    return () => {
      //
    }
  }, [message])

  return (
    <>
      <div className={`alert alert-${color} alert-dismissible fade ${isVisible ? 'show' : ''}`} style={{ width: '100%' }} role="alert">
        <Icon icon={'bi bi-exclamation-lg'} />
        {message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setIsVisible(false)} />
      </div>
    </>
  );
}
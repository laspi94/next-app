import { Alert } from 'react-bootstrap';
import { Icon } from './icon';
import * as icons from 'react-bootstrap-icons';
import React, { useEffect, useState } from 'react'

export type props = {
  message: string | null,
  color?: string,
  icon?: keyof typeof icons,
  iconSize?: string,
  iconClassName?: string
}

export function Banner({
  message = "Ops! ocurrió un error inesperado",
  color = 'success',
  icon = 'Question',
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
      <div className="mt-5 mb-3" style={{ width: '100%' }}>
        <Alert key={color} variant={color} show={isVisible} dismissible={true} onClose={() => setIsVisible(false)}>
          <Icon iconName={icon} size={iconSize} className={iconClassName} />
          {message}
        </Alert>
      </div>
    </>
  );
}
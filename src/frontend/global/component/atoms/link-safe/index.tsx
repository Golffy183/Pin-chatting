import { Link } from 'react-router-dom';

const LinkSafe = (props: {
  className?: string;
  to: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  return props.disabled ? (
    <div className={props.className || ''}>{props.children}</div>
  ) : (
    <Link className={props.className || ''} to={props.to}>
      {props.children}
    </Link>
  );
};

export default LinkSafe;

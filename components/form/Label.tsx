import classNames from "classnames";
import type { ReactNode } from "react";

type ILabelProps = {
  htmlFor?: string;
  children: ReactNode;
  colSpanSize?: string;
};

/**
 * Wrapper for html <label> tag with design style.
 * @component
 * @params props - Component props.
 * @param props.htmlFor - for attribute in HTML.
 * @param props.children - Children components.
 * @param props.colSpanSize - Tailwind CSS class to control how elements are sized in grid.
 */
const Label = (props: ILabelProps) => {
  const labelClass = classNames(
    "font-nunito font-semibold text-gray-100 dark:text-slate-200",
    "mt-2",
    props.colSpanSize
  );

  return (
    <label htmlFor={props.htmlFor} className={labelClass}>
      {props.children}
    </label>
  );
};

export { Label };

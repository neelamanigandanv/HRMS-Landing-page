import { isValidElement, type MouseEventHandler, type ReactNode } from "react";
import { Link } from "react-router-dom";

export interface CtaButtonAction {
  label: ReactNode;
  to?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  icon?: ReactNode;
  iconPosition?: "before" | "after";
  iconBox?: boolean;
  iconClassName?: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface CtaButtonGroupProps {
  primary: CtaButtonAction;
  secondary?: CtaButtonAction;
  extra?: CtaButtonAction[];
  className?: string;
  align?: "start" | "center";
}

function labelText(label: ReactNode): string {
  if (typeof label === "string" || typeof label === "number") return String(label);
  if (Array.isArray(label)) return label.map(labelText).join("");
  if (isValidElement(label)) return labelText(label.props.children);
  return "";
}

function actionClasses(action: CtaButtonAction, kind: "primary" | "secondary") {
  const compact = labelText(action.label).length > 18;
  const colorClasses =
    kind === "primary"
      ? "max-md:!border-[#004B49] max-md:!bg-[#004B49] max-md:!text-white"
      : "max-md:!border-[#ebdcd5] max-md:!bg-white max-md:!text-[#0c152e]";
  const sizeClasses = compact
    ? "max-md:!text-[clamp(7.5px,2.4vw,12px)]"
    : "max-md:!text-[clamp(10px,3.2vw,14px)]";
  const layoutClasses =
    kind === "primary"
      ? [
          "max-md:!h-[44px]",
          "max-md:!gap-[10px]",
          "max-md:!justify-between",
          "max-md:!py-0",
          "max-md:!pl-[16px]",
          "max-md:!pr-[5px]",
        ].join(" ")
      : [
          "max-md:!h-[44px]",
          action.icon ? "max-md:!gap-[6px]" : "max-md:!gap-[clamp(5px,1.7vw,10px)]",
          "max-md:!justify-center",
          "max-md:!px-[5px]",
        ].join(" ");

  return [
    "cta-button-group__action",
    "max-md:!inline-flex",
    "max-md:!w-full",
    "max-md:!min-w-0",
    "max-md:!items-center",
    "max-md:!flex-nowrap",
    "max-md:!rounded-lg",
    "max-md:!font-bold",
    "max-md:!leading-none",
    "max-md:!tracking-tight",
    "max-md:!text-center",
    "max-md:!whitespace-nowrap",
    layoutClasses,
    sizeClasses,
    colorClasses,
    action.className ?? "",
  ]
    .join(" ")
    .trim();
}

function actionContent(action: CtaButtonAction) {
  const iconSize = "max-md:!h-[14px] max-md:!w-[14px]";
  const iconBoxSize = "max-md:!h-[32px] max-md:!w-[32px]";
  const icon = action.icon ? (
    <span
      className={[
        "cta-button-group__icon",
        "max-md:!inline-flex",
        "max-md:!shrink-0",
        "max-md:!items-center",
        "max-md:!justify-center",
        "max-md:[&_svg]:!h-[14px]",
        "max-md:[&_svg]:!w-[14px]",
        "max-md:[&_svg]:!stroke-2",
        iconSize,
        action.iconBox ? "cta-button-group__icon-box" : "",
        action.iconBox ? iconBoxSize : "",
        action.iconBox ? "max-md:!rounded-lg" : "",
        action.iconClassName ?? "",
      ]
        .join(" ")
        .trim()}
      aria-hidden="true"
    >
      {action.icon}
    </span>
  ) : null;

  return (
    <>
      {action.iconPosition === "before" ? icon : null}
      <span className="cta-button-group__label max-md:!mr-0 max-md:!min-w-0">
        {action.label}
      </span>
      {action.iconPosition !== "before" ? icon : null}
    </>
  );
}

export function CtaButtonGroup({
  primary,
  secondary,
  extra = [],
  className = "",
  align = "start",
}: CtaButtonGroupProps) {
  const actions = secondary ? [primary, secondary, ...extra] : [primary, ...extra];
  const columns = actions.length >= 2 ? "max-md:!grid-cols-2" : "max-md:!grid-cols-1";
  const alignment = align === "center" ? "max-md:!justify-center" : "max-md:!justify-start";

  return (
    <div
      className={[
        "cta-button-group",
        "max-md:!grid",
        "max-md:!w-full",
        "max-md:!items-stretch",
        "max-md:!justify-items-stretch",
        "max-md:!gap-2.5",
        columns,
        alignment,
        className,
      ]
        .join(" ")
        .trim()}
    >
      {actions.map((action, index) => {
        const classes = actionClasses(action, index === 0 ? "primary" : "secondary");
        const content = actionContent(action);

        if (action.to) {
          return (
            <Link
              key={`${action.to}-${index}`}
              to={action.to}
              className={classes}
              id={action.id}
              onClick={action.onClick}
              aria-label={action.ariaLabel}
            >
              {content}
            </Link>
          );
        }

        if (action.href) {
          return (
            <a
              key={`${action.href}-${index}`}
              href={action.href}
              className={classes}
              id={action.id}
              onClick={action.onClick}
              aria-label={action.ariaLabel}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={`${index}-${classes}`}
            type={action.type ?? "button"}
            className={classes}
            id={action.id}
            onClick={action.onClick}
            disabled={action.disabled}
            aria-label={action.ariaLabel}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

export default CtaButtonGroup;

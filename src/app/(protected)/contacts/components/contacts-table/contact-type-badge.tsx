import { ContactType } from "@/constants/contact-types";
import { cn } from "@/lib/utils";

type ContactTypeBadgeProps = {
  type: ContactType;
};

function ContactTypeBadge({
  type,
}: ContactTypeBadgeProps) {
  if (!type) {
    return null;
  }

  const classes = {
    work: "bg-blue-50 text-blue-600",
    client: "bg-red-50 text-red-600",
    recruiter: "bg-violet-50 text-violet-600",
    personal: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1",
        "text-xs font-medium capitalize",
        classes[type],
      )}
    >
      {type}
    </span>
  );
}

export default ContactTypeBadge;
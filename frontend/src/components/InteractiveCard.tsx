"use client";

export default function InteractiveCard({
  children,
}: {
  children: React.ReactNode;
}) {
  function onCardMouseAction(event: React.SyntheticEvent) {
    if (event.type == "mouseover") {
      event.currentTarget.classList.remove("shadow-lg");
      event.currentTarget.classList.add("shadow-2xl");
    } else {
      event.currentTarget.classList.remove("shadow-2xl");
      event.currentTarget.classList.add("shadow-lg");
    }
  }
  return (
    <div
      id="campground-card"
      className="campground-card w-full h-[418px] rounded-lg shadow-lg bg-white"
      onMouseOver={(e) => onCardMouseAction(e)}
      onMouseOut={(e) => onCardMouseAction(e)}
    >
      {children}
    </div>
  );
}

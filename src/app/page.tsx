export default function Home() {
  const links = [
    { name: "Itinerary Builder", href: "/itinerary" },
    { name: "Product Filter", href: "/filter" },
  ];
  return (
    <div className="text-center">
      <h1 className="text-6xl mt-12 mb-6">Genkitchen</h1>
      <ul className=" text-2xl mx-auto max-w-screen-sm">
        {links.map((link) => (
          <li className="first:rounded-t-xl last:border-b-gray-300 border-b-transparent last:rounded-b-xl border border-gray-300">
            <a className="block py-4" href={link.href}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
